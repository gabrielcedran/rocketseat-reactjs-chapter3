import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { query as q} from 'faunadb';
import { fauna } from "../../services/fauna";
import { stripe } from "../../services/stripe";

type User = {
    ref: {
        id: string
    },
    data: {
        stripe_customer_id: string;
    }
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === 'POST') {
        const session = await getSession({ req: request });

        const user = await fauna.query<User>(
            q.Get(
                q.Match(
                    q.Index('user_by_username'),
                    q.Casefold(session.user.name)
                )
            )
        )

        let stripeCustomerId = user.data.stripe_customer_id;


        if (!stripeCustomerId) {
            const stripeCustomer = await stripe.customers.create({
                name: session.user.name
            }) 

            await fauna.query(
                q.Update(
                    q.Ref(q.Collection('users'), user.ref.id),
                    {
                        data: {
                            stripe_customer_id: stripeCustomer.id
                        }
                    }
                )
            )

            stripeCustomerId = stripeCustomer.id;
        }

        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: stripeCustomerId,
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [
                {price: 'price_1KdMNMJEXW7bCbDM9nQt4ede', quantity: 1}
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL
        })

        return response.status(200).json({sessionId: stripeCheckoutSession.id});

    } else {
        response.setHeader('Allow', 'POST');
        response.status(405).end('Method not allowed');
    }
}
import { query as q } from 'faunadb';
import NextAuth, { Account, Profile, User } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

import { fauna } from '../../../services/fauna';

export default NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            authorization: {
                params: {scope: 'read:user'}
            },
        })
    ], 
    callbacks: {
        async signIn({user, account, profile}) {
            const {name: username} = user;
            
            try {
                await fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Index('user_by_username'),
                                    q.Casefold(username)
                                )
                            )
                        ),
                        q.Create(
                            q.Collection('users'),
                            { data: { username } }
                        ),
                        //q.Update = could update if the user exists
                        q.Get(
                            q.Match(
                                q.Index('user_by_username'),
                                q.Casefold(username)
                            )
                        )
                    )
                )
                return true
            } catch(err) {
                console.log(err)
            }

            return false;
        }
    }
})
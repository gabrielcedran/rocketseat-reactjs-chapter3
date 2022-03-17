import Head from 'next/head';
import styles from './styles.module.scss';

export default function Posts() {
    return(
        <>
            <Head>
                <title>ignews Posts</title>
            </Head>
            
            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="#">
                        <time>
                            12 de Abril de 2022
                        </time>
                        <strong>Bla bla bla</strong>
                        <p>
                            Hello you naughty naughty boy.
                        </p>
                    </a>
                    <a href="#">
                        <time>
                            12 de Abril de 2022
                        </time>
                        <strong>Bla bla bla</strong>
                        <p>
                            Hello you naughty naughty boy.
                        </p>
                    </a>
                    <a href="#">
                        <time>
                            12 de Abril de 2022
                        </time>
                        <strong>Bla bla bla</strong>
                        <p>
                            Hello you naughty naughty boy.
                        </p>
                    </a>
                </div>
            </main>
        </>
    )
}
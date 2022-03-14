import Head from 'next/head';
import { SubscribeButton } from '../components/Main/SubscribeButton';
import styles from './home.module.scss';

export default function Home() {
  return (
    <>
      {// tag Head allows to add custom headers per route (page). It supports anything that would go inside the html tag head (canonical tag, meta tags, etc). 
      }
      <Head><title>ig.news Home</title></Head> 
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br/>
            <span>for R$ 9.90 month</span>
          </p>
          <SubscribeButton />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

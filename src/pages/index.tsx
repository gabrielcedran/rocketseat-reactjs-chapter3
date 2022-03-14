import styles from '../styles/global.module.scss';
import Head from 'next/head';



export default function Home() {
  return (
    <>
      {// tag Head allows to add custom headers per route (page). It supports anything that would go inside the html tag head (canonical tag, meta tags, etc). 
      }
      <Head><title>ig.news Home</title></Head> 
      <h1 className={styles.title}>
        Hello World
      </h1>
    </>
  )
}

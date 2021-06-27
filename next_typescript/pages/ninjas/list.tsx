import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Ninjas.module.css'

export const getStaticProps = async () => {
  const response: Response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data: object = await response.json();

  return {
    props: { ninjas: data }
  }
}

interface User {
  id: number,
  name: string
}

export default function List( props: any ) {

  return (
    <>
    <Head>
      <title>Ninjas List</title>
      <meta name="keywords" content="ninjas list" />
    </Head>
    <div>
        <h1>List</h1>
        {
          props.ninjas.map((ninja: User) => {
            return (
              <Link href={`/ninjas/${ninja.id}`} key={ ninja.id }>
                <a className={styles.single}>
                  <h3>{ ninja.name }</h3>
                </a>
              </Link>
            )
          })}
    </div>
    </>
  )
}
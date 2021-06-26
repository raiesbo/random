import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navBar'
import Footer from '../components/footer'
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1 className={styles.title}>Homepage tro </h1>
      <p className={styles.text}>Hi guys!</p>
      <Link href="/ninjas/list">
        <a className={styles.btn}>See the list</a>
      </Link>
    </div>
  )
}

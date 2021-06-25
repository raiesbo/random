import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navBar'
import Footer from '../components/footer'

export default function Home() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <h1>Homepage tro </h1>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

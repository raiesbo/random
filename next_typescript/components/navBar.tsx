import styles from '../styles/Home.module.css'
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav>
    <div className="logo">
        <h1>List</h1>
    </div>
    <Link href="/"><a>Home</a></Link>
    <Link href="/about"><a>About</a></Link>
    <Link href="/ninjas/list"><a>List</a></Link>
    </nav>
  )
}
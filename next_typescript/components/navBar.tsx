import styles from '../styles/Home.module.css'
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav>
    <div className="logo">
        <h1>List</h1>
    </div>
    <ul>
    <li><Link href="/"><a>Home</a></Link></li>
    <li><Link href="/about"><a>About</a></Link></li>
    <li><Link href="/list"><a>List</a></Link></li>
    </ul>
    </nav>
  )
}
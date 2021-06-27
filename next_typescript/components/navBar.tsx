import styles from '../styles/Home.module.css'
import Link from 'next/link';
import Image from 'next/image';

export default function NavBar() {
  return (
    <nav>
    <div className="logo">
        <Image src="/logo.png" alt="logo" width={128} height={77} />
    </div>
    <Link href="/"><a>Home</a></Link>
    <Link href="/about"><a>About</a></Link>
    <Link href="/ninjas/list"><a>List</a></Link>
    </nav>
  )
}
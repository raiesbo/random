import Link from "../../node_modules/next/link";

export default function Header() {
    return (
        <header>
            <div className="w-full absolute text-white z-10">
                <nav className="container relative flex flex-wrap items-center justify-between mx-auto p-8">
                    <Link href='/' className="front-bold text-3xl" >Cloud Corp</Link>
                    <div className="space-x-4 text-xl">
                        <Link href='/performance' >Performance</Link>
                        <Link href='/reliability' >Reliability</Link>
                        <Link href='/scale' >Scale</Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}
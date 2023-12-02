import { db } from "@/db/index";
import Link from 'next/link';

export default async function Home() {
  const snippets = await db.snippet.findMany();

  return (
    <div>
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">Home page</h1>
        <Link className="border p-2 rounded" href='/snippets/new'>
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {snippets.length > 0 && snippets.map(({ id, title }) => (
          <Link
            key={id}
            className='flex justify-between items-center p-2 border rounded'
            href={`/snippets/${id}`}
          >
            <div>
              {title}
            </div>
            <div>
              View
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

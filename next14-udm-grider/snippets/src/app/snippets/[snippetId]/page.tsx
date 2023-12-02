import { deleteSnippet } from "@/app/actions";
import { db } from "@/db";
import Link from "next/link";
import { notFound } from 'next/navigation';

type Props = {
    params: { snippetId: string }
}

export default async function SnippetDetailsPage({ params }: Props) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const snippet = await db.snippet.findUnique({ where: { id: Number(params.snippetId) } });

    if (!snippet) return notFound()

    const deleteSnippetActions = deleteSnippet.bind(null, snippet.id)

    return (
        <div>
            <div className="flex m-4 justify-between items-center">
                <h1 className="text-xl font-bold">
                    {snippet.title}
                </h1>
                <div className="flex gap-4">
                    <Link href={`/snippets/${snippet.id}/edit`} className="p-2 border rounded">
                        Edit
                    </Link>
                    <form action={deleteSnippetActions}>
                        <button type='submit' className="p-2 border rounded">
                            Delete
                        </button>
                    </form>
                </div>
            </div>
            <pre className="p-3 border rounded bg-gray-200 border-gray-200">
                {snippet.code}
            </pre>
        </div>
    )
}

export async function generateStaticParams() {
    return await db.snippet.findMany({ select: { id: true } })
}

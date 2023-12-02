import SnippetEditForm from "@/components/SnippetEditForm";
import { db } from "@/db";
import { notFound } from "next/navigation";

type Props = { params: { snippetId: string } }

export default async function SnippetEditPage({ params }: Props) {
    const snippet = await db.snippet.findUnique({ where: { id: Number(params.snippetId) } })

    if (!snippet) return notFound();

    return (
        <SnippetEditForm snippet={snippet} />
    )
}

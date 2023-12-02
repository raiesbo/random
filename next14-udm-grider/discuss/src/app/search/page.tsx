import PostList from "@/components/posts/PostList";
import { fetchPostsBySearchTerm } from '@/db/queries/post';
import { redirect } from "next/navigation";

interface Props {
    searchParams: {
        term: string
    }
}

export default function SearchPage({ searchParams }: Props) {
    const term = searchParams.term;

    if (!term) redirect('/');

    return (
        <div>
            {/* @ts-ignore */}
            <PostList fetchPosts={() => fetchPostsBySearchTerm(term)} />
        </div>
    )
}
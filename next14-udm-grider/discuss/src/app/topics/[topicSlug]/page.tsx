import PostCreateForm from "@/components/posts/PostCreateForm";
import PostList from "@/components/posts/PostList";
import { fetchPostsBySlug } from "@/db/queries/post";

interface Props {
    params: {
        topicSlug: string
    }
}

export default async function TopicDetailsPage({ params: { topicSlug } }: Props) {
    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            <div className="col-span-3">
                <h1 className="text-2xl font-bold mb-2">{topicSlug}</h1>
                {/* @ts-ignore */}
                <PostList fetchPosts={() => fetchPostsBySlug(topicSlug)} />
            </div>
            <div>
                <PostCreateForm topicSlug={topicSlug} />
            </div>
        </div>
    )
}

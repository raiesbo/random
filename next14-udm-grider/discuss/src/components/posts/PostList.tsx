import { PostListItem } from '@/db/queries/post';
import paths from '@/paths';
import Link from 'next/link';

interface Props {
  fetchPosts: () => Promise<PostListItem[]>
}

export default async function PostList({ fetchPosts }: Props) {
  const posts = await fetchPosts();

  return (
    <div className="space-y-2">
      {posts.map(post => {
        const topicSlug = post.topic.slug;

        if (!topicSlug) throw new Error('Need a slug to link to a post')

        return (
          <div key={post.id} className="border rounded p-2">
            <Link href={paths.postShow(topicSlug, post.id)}>
              <h3 className="text-lg font-bold">{post.title}</h3>
              <div className="flex flex-row gap-8">
                <p className="text-xs text-gray-400">By {post.user.name}</p>
                <p className="text-xs text-gray-400">
                  {post._count.comments} comments
                </p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  )
}

import CommentCreateForm from "@/components/comments/CommentCreateForm";
import CommentList from "@/components/comments/CommentList";
import PostShow from "@/components/posts/PostShow";
import PostShowLoading from "@/components/posts/PostShowLoading";
import paths from "@/paths";
import Link from "next/link";
import { Suspense } from 'react';

interface PostShowPageProps {
  params: {
    topicSlug: string;
    postId: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { topicSlug, postId } = params;

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(topicSlug)}>
        {"< "}Back to {topicSlug}
      </Link>
      <Suspense fallback={<PostShowLoading />}>
        {/* @ts-ignore */}
        <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      {/* @ts-ignore */}
      <CommentList postId={postId} />
    </div>
  );
}

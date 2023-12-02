import { Post } from "@prisma/client";
import { db } from "..";

export type PostListItem = Post & {
    topic: { slug: string },
    _count: { comments: number },
    user: { name: string | null, image?: string | null }
}

// export type PostWithData = Awaited<
//     ReturnType<typeof fetchPostsBySlug>
// >[number]

export function fetchPostsBySearchTerm(term: string): Promise<PostListItem[]> {
    return db.post.findMany({
        where: {
            OR: [
                { title: { contains: term } },
                { content: { contains: term } }
            ]
        },
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true, image: true } },
            _count: { select: { comments: true } }
        }
    })
}

export function fetchPostsBySlug(slug: string): Promise<PostListItem[]> {
    return db.post.findMany({
        where: { topic: { slug } },
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true } },
            _count: { select: { comments: true } }
        }
    })
}

export function fetchTopPosts(): Promise<PostListItem[]> {
    return db.post.findMany({
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true, image: true } },
            _count: { select: { comments: true } }
        },
        orderBy: [{ comments: { _count: "desc" } }],
        take: 5
    })
}

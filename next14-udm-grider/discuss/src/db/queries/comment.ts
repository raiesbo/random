import { Comment, User } from "@prisma/client";
import { cache } from 'react';
import { db } from "..";

export type CommentWithUser = Comment & { user: Pick<User, 'name' | 'image'> }

interface Props {
    postId: string
}

// cache function caches the result and shares it with all the request triggered at the same time with the same params
export const fetchCommentsByPostId = cache(({ postId }: Props): Promise<CommentWithUser[]> => {
    return db.comment.findMany({
        where: { postId },
        include: {
            user: {
                select: {
                    name: true,
                    image: true
                }
            }
        }
    })
})

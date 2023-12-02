'use server'

import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';
import { Post } from "@prisma/client";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from "zod";

const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10)
})

interface Props {
    errors: {
        title?: Array<string>,
        content?: Array<string>,
        _form?: Array<string>,
    }
}

export async function createPost(topicSlug: string, formState: Props, formData: FormData): Promise<Props> {
    const session = await auth();

    if (!session?.user) return {
        errors: { _form: ['Please, sign in to create new posts'] }
    }

    const validationResult = createPostSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content')
    });

    if (!validationResult.success) return {
        errors: validationResult.error.flatten().fieldErrors
    }

    let newPost: Post | null;

    try {
        const topic = await db.topic.findFirst({ where: { slug: topicSlug } })

        if (!topic) return { errors: { _form: [`Topic with slug ${topicSlug} not found`] } }

        newPost = await db.post.create({
            data: {
                ...validationResult.data,
                topicId: topic.id,
                userId: session?.user.id
            }
        })
    } catch (e: unknown) {
        if (e instanceof Error) return { errors: { _form: [e.message] } }
        return { errors: { _form: ['Failed to create the post'] } }
    }

    revalidatePath(paths.topicShow(topicSlug))
    redirect(paths.postShow(topicSlug, newPost.id))
}

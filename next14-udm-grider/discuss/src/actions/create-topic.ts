'use server'

import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";
import { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createTopicSchema = z.object({
    slug: z.string().min(3).regex(/^[a-z-]+$/, { message: "Must be lowercase letters or dashes without spaces" }),
    description: z.string().min(10)
})

interface CreateTopicFormState {
    errors: {
        slug?: string[],
        description?: string[],
        _form?: string[]
    }
}

export async function createTopic(state: CreateTopicFormState, formData: FormData): Promise<CreateTopicFormState> {
    const slug = formData.get('name');
    const description = formData.get('description');

    const validation = createTopicSchema.safeParse({ slug, description })

    if (!validation.success) return {
        errors: validation.error.flatten().fieldErrors
    }

    const session = await auth();
    if (!session?.user) return {
        errors: { _form: ['You must be signed in'] }
    }

    let topic: Topic;
    try {
        topic = await db.topic.create({ data: validation.data });
    } catch (e: unknown) {
        if (e instanceof Error) return { errors: { _form: [e.message] } }
        return { errors: { _form: ['Something went wrong'] } }
    }

    revalidatePath(paths.home());
    redirect(paths.topicShow(topic.slug));
}

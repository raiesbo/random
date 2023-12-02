'use client';

import { createPost } from "@/actions";
import { Button, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";
import FormButton from "../common/FormButton";

interface Props {
    topicSlug: string
}

export default function PostCreateForm({ topicSlug }: Props) {
    const [formState, action] = useFormState(createPost.bind(null, topicSlug), { errors: {} });

    return (
        <Popover>
            <PopoverTrigger>
                <Button color="primary">
                    Create a Post
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className="flex flex-col gap-4 p-4 w-80">
                        <h3 className="text-lg">Create a Post</h3>
                        <Input
                            name='title'
                            label='Title'
                            labelPlacement="outside"
                            placeholder="Title"
                            isInvalid={!!formState.errors.title}
                            errorMessage={formState.errors.title?.join(", ")}
                        />
                        <Textarea
                            name='content'
                            label='Content'
                            labelPlacement="outside"
                            placeholder="Content"
                            isInvalid={!!formState.errors.content}
                            errorMessage={formState.errors.content?.join(", ")}
                        />
                        {formState.errors._form && (
                            <div className="rounded p-2 bg-red-200 border border-red-400">
                                {formState.errors._form.join(', ')}
                            </div>
                        )}
                        <FormButton>
                            Save Post
                        </FormButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}

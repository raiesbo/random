'use client';

import { createTopic } from '@/actions';
import {
    Button,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger, Textarea
} from "@nextui-org/react";
import { useFormState } from 'react-dom';
import FormButton from '../common/FormButton';

export default function TopicCreateForm() {
    const [{ errors }, createTopicAction] = useFormState(createTopic, { errors: {} });

    return (
        <Popover>
            <PopoverTrigger>
                <Button color="primary">Create a Topic</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={createTopicAction}>
                    <div className="flex flex-col gap-4 p-4 w-80">
                        <h3 className="text-lg">Create a Topic</h3>
                        <Input
                            label="Name"
                            name='name'
                            labelPlacement="outside"
                            placeholder="name"
                            isInvalid={!!errors.slug}
                            errorMessage={errors.slug?.join(', ')}
                        />
                        <Textarea
                            name='description'
                            label="Description"
                            labelPlacement="outside"
                            placeholder="Describe your topic"
                            isInvalid={!!errors.description}
                            errorMessage={errors.description?.join(', ')}
                        />
                        {errors._form && (
                            <div className='p-2 bg-red-200 border rounded border-red-400'>
                                {errors._form.join(', ')}
                            </div>
                        )}
                        <FormButton>Save Topic</FormButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}

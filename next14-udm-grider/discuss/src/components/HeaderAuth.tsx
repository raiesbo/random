'use client';

import { signIn, signOut } from '@/actions';
import { Avatar, Button, NavbarItem, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useSession } from "next-auth/react";

export default function HeaderAuth() {
    const session = useSession();

    if (session.status === 'loading') return null

    if (session.data?.user) return (
        <Popover placement='left'>
            <PopoverTrigger>
                <Avatar src={session.data.user.image || ''} />
            </PopoverTrigger>
            <PopoverContent>
                <div className='p-4'>
                    <form action={signOut}>
                        <Button type='submit'>
                            Sign Out
                        </Button>
                    </form>
                </div>
            </PopoverContent>
        </Popover>
    )

    return (
        <>
            <NavbarItem>
                <form action={signIn}>
                    <Button
                        type='submit'
                        color='secondary'
                        variant="bordered"
                    >
                        Sign In
                    </Button>
                </form>
            </NavbarItem>
            <NavbarItem>
                <form action={signIn}>
                    <Button
                        type='submit'
                        color='primary'
                        variant="flat"
                    >
                        Sign Up
                    </Button>
                </form>
            </NavbarItem>
        </>
    )
}

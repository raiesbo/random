'use client'

import { useSession } from "next-auth/react";

export default function Profile() {
    const session = useSession();

    return (
        <div>
            {session.data?.user ? (
                <div>USER AUTHENTICATED</div>
            ) : (
                <div>USER not AUTHENTICATED</div>
            )}
        </div>
    )
}

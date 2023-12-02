import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { db } from "./db";

const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

if (!clientId || !clientSecret) throw new Error("Missing github oauth credentials")

export const { handlers: { GET, POST }, auth, signOut, signIn } = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        GitHub({ clientId, clientSecret })
    ],
    callbacks: {
        // Usually not needed. Fixing a bug in nextAuth
        async session({ session, user }: any) {
            if (session && user) session.user.id = user.id;
            return session;
        }
    }
})

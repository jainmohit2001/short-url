import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'

import { AuthOptions } from 'next-auth'
import { prisma } from './prisma'

/**
 * The authOptions used for NextAuth.
 * We are using a MongoDB adapter along with GoogleProvider to store user data.
 * In the callbacks we are making sure that the ID of the user is available in the Session object.
 *
 * @type {AuthOptions}
 */
export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Update the token to have user id available in session callback
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token, user }) {
      // If token is not null, use the id present in the Token
      if (token) {
        session.user.id = token.id as string
      }

      // If user object is available, use the id present in it
      if (user) {
        session.user.id = user.id
      }
      return session
    },
  },
}

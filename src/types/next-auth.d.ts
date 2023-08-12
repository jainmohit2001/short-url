import { DefaultUser } from 'next-auth'

// To make the User ID available on the client side,
// we need to extend the Session interface provided by NextAuth
declare module 'next-auth' {
  interface Session {
    user: DefaultUser & {
      id: string
    }
  }
}

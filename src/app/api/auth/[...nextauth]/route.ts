import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      usename?: string;
      uid?: string;
    } & DefaultSession["user"];
  }
}

 const handler = NextAuth ({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.Google_ID as string,
      clientSecret: process.env.Google_SECRET as string,
    }),
    // ...add more providers here
  ],
  callbacks:{
    async session({session,token}){
      if (session.user) { 
      session.user.usename=session.user.name?.split('').join('').toLocaleLowerCase();
      session.user.uid=token.sub;
      
    }
    return session;
    }
}
});

export {handler as GET, handler as POST};
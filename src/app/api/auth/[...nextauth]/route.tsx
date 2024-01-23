// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      console.log(session);
      if (session && session.user && token.sub) {
        session.user.email = token.sub;
      }
      return session;
    },
  },
  theme: {
    logo: "https://dall-e-images-bucket.s3.eu-west-2.amazonaws.com/resources/logo.png",
  },
});

export { handler as GET, handler as POST };

export const SignIn = () => {
  return <div>hello</div>;
};

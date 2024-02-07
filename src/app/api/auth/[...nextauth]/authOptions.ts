import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

type SessionProps = {
  session: any;
  token: any;
};

export const authOptions = {
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
    session: async ({ session, token }: SessionProps) => {
      if (session?.user) {
        session.user.id = token.sub;
        delete session.user.email; // sanitize data for security
      }
      return session;
    },
  },
  theme: {
    logo: "https://dall-e-images-bucket.s3.eu-west-2.amazonaws.com/resources/logo.png",
  },
};


import User from "@/app/models/user.schema";
import { dbConnect } from "@/lib/mogoDb";
import NextAuth, { AuthOptions } from "next-auth"; 
import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
  providers:[
    GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',
  session : {
    strategy : "jwt"
  },
  secret : process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await dbConnect(); // Ensure DB connection

        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({ email: user.email,name: user.name,image:profile?.image});
        } 
        return true;
      } catch (error) {
        console.error('Error saving user to database', error);
        return false;
      }
    },
  },
}

export default NextAuth(authOptions);

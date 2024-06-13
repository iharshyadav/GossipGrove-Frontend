
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
  debug: process.env.NODE_ENV === 'production',
  session : {
    strategy : "jwt"
  },
  secret : process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        console.log('Starting signIn callback');
        await dbConnect();
        console.log('Database connected');
  
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          console.log('Creating new user');
          await User.create({ email: user.email, name: user.name, image: profile?.image });
          console.log('User created');
        } else {
          console.log('User already exists');
        }
        return true;
      } catch (error) {
        console.error('Error in signIn callback', error);
        return false;
      }
    },
  },
}

export default NextAuth(authOptions);

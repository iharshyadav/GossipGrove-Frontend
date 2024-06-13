
import User from "@/app/models/user.schema";
import { dbConnect } from "@/lib/mogoDb";
import NextAuth, { AuthOptions } from "next-auth"; 
import GoogleProvider from "next-auth/providers/google"

dbConnect().then(() => {
  console.log('Database connected');
}).catch(err => {
  console.error('Database connection error', err);
});

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
    async signIn({ user, profile }) {
      try {
        console.log('Starting signIn callback');
        const existingUser = await User.findOne({ email: user.email });
        // await dbConnect();
        console.log('Database connected');
  
        if (!existingUser) {
          console.log('Creating new user');
          const users = await User.create({ email: user.email, name: user.name, image: profile?.image });
          console.log('User created');
          return users;
        } else {
          console.log('User already exists');
          return existingUser;
        }
        // console.log("completed") 
        // return true;
      } catch (error) {
        console.error('Error in signIn callback', error);
        throw new Error('Sign in failed');
      }
    },
  },
}

export default NextAuth(authOptions);

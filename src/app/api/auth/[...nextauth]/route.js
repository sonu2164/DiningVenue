// import clientPromise from "@/libs/mongoConnect";
// import bcrypt from "bcrypt";
// import GoogleProvider from "next-auth/providers/google";
import * as mongoose from "mongoose";
import { UserInfo } from "@/models/UserInfo";
import { User } from '@/models/User';
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import admin from 'firebase-admin'




if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}
const authOptions = {
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    CredentialsProvider({
      name: 'Phone OTP',

      credentials: {
        phone: { label: "Phone Number", type: "text", placeholder: "1234567890" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {


        try {


          const { phone, otp } = credentials;
          const decodedToken = await admin.auth().verifyIdToken(otp);

          mongoose.connect(process.env.MONGO_URL
          );
          const user = await User.findOneAndUpdate(
            { email: phone },
            { $setOnInsert: { email: phone } },
            { upsert: true, new: true, setDefaultsOnInsert: true }
          );
          return user;


        } catch (error) {
          console.error("Error verifying OTP:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },


};

async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({ email: userEmail });
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions, isAdmin }




// import clientPromise from "@/libs/mongoConnect";
// import { UserInfo } from "@/models/UserInfo";
// import bcrypt from "bcrypt";
// import * as mongoose from "mongoose";
// import { User } from '@/models/User';
// import NextAuth, { getServerSession } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import { getConfirmation } from '../../../../libs/serverstore'


// export const authOptions = {
//   secret: process.env.SECRET,
//   // adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       name: 'Credentials',
//       id: 'credentials',
//       credentials: {
//         phone: { label: 'Phone Number', type: 'tel', placeholder: '1234567890' },
//         otp: { label: 'OTP', type: 'text' },
//       },
//       async authorize(credentials, req) {
//         const { phone, otp } = credentials;

//         try {


//           return { phone, };
//         } catch (err) {
//           console.error(err);
//           return null;
//         }
//       },
//     }),
//   ],
// };

// export async function isAdmin() {
//   const session = await getServerSession(authOptions);
//   const userEmail = session?.user?.email;
//   if (!userEmail) {
//     return false;
//   }
//   const userInfo = await UserInfo.findOne({ email: userEmail });
//   if (!userInfo) {
//     return false;
//   }
//   return userInfo.admin;
// }

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

import * as mongoose from "mongoose";
import { User } from "@/models/User";
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import admin from "firebase-admin";

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
  providers: [
    CredentialsProvider({
      name: "Phone OTP",
      credentials: {
        phone: { label: "Phone Number", type: "text", placeholder: "1234567890" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        try {
          const { phone, otp } = credentials;
          const decodedToken = await admin.auth().verifyIdToken(otp);
          if (!decodedToken) {
            throw new Error("Invalid OTP");
          }

          await mongoose.connect(process.env.MONGO_URL);
          let user = await User.findOne({ email: phone });

          if (!user) {
            user = await User.create({ email: phone });
          }

          // ✅ Return all necessary fields
          return {
            id: user._id.toString(),
            email: user.email,
            admin: user.admin || false,
            name: user.name || "",
            image: user.image || "",
          };
        } catch (error) {
          console.error("Error verifying OTP:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.admin = user.admin;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.admin = token.admin;
      session.user.name = token.name;
      session.user.image = token.image;
      return session;
    },
  },
};

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.admin || false;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions, isAdmin };















// // import clientPromise from "@/libs/mongoConnect";
// // import bcrypt from "bcrypt";
// // import GoogleProvider from "next-auth/providers/google";
// import * as mongoose from "mongoose";
// import { UserInfo } from "@/models/UserInfo";
// import { User } from '@/models/User';
// import NextAuth, { getServerSession } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import admin from 'firebase-admin'




// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       project_id: process.env.FIREBASE_PROJECT_ID,
//       client_email: process.env.FIREBASE_CLIENT_EMAIL,
//       private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//     }),
//   });
// }
// const authOptions = {
//   // adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     // GoogleProvider({
//     //   clientId: process.env.GOOGLE_CLIENT_ID,
//     //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     // }),
//     CredentialsProvider({
//       name: 'Phone OTP',

//       credentials: {
//         phone: { label: "Phone Number", type: "text", placeholder: "1234567890" },
//         otp: { label: "OTP", type: "text" },
//       },
//       async authorize(credentials) {


//         try {


//           const { phone, otp } = credentials;
//           const decodedToken = await admin.auth().verifyIdToken(otp);
//           if (!decodedToken) {
//             throw new Error("Invalid OTP");
//           }
//           mongoose.connect(process.env.MONGO_URL
//           );
//           const user = await User.findOneAndUpdate(
//             { email: phone },
//             { $setOnInsert: { email: phone } },
//             { upsert: true, new: true, setDefaultsOnInsert: true }
//           );

//           console.log("backend", user);
//           return user;


//         } catch (error) {
//           console.error("Error verifying OTP:", error);
//           return null;
//         }
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   session: { strategy: "jwt" },

//   callbacks: {
//     async session({ session, token }) {
//       if (token?.userId) {
//         // Fetch extra user data
//         const user = await User.findById(token.userId);
//         if (user) {
//           session.user.id = user._id;
//           session.user.phone = user.phone;
//           session.user.admin = user.admin || false; // Default to false if not set
//         }
//       }
//       return session;
//     },

//     async jwt({ token, user }) {
//       if (user) {
//         token.userId = user.id;
//       }
//       return token;
//     },
//   },


// };

// async function isAdmin() {
//   const session = await getServerSession(authOptions);
//   const userEmail = session?.user?.email;
//   if (!userEmail) {
//     return false;
//   }
//   const userInfo = await User.findOne({ email: userEmail });
//   if (!userInfo) {
//     return false;
//   }
//   return userInfo.admin;
// }

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST, authOptions, isAdmin }




// // import clientPromise from "@/libs/mongoConnect";
// // import { UserInfo } from "@/models/UserInfo";
// // import bcrypt from "bcrypt";
// // import * as mongoose from "mongoose";
// // import { User } from '@/models/User';
// // import NextAuth, { getServerSession } from "next-auth";
// // import CredentialsProvider from "next-auth/providers/credentials";
// // import GoogleProvider from "next-auth/providers/google";
// // import { MongoDBAdapter } from "@auth/mongodb-adapter";
// // import { getConfirmation } from '../../../../libs/serverstore'


// // export const authOptions = {
// //   secret: process.env.SECRET,
// //   // adapter: MongoDBAdapter(clientPromise),
// //   providers: [
// //     GoogleProvider({
// //       clientId: process.env.GOOGLE_CLIENT_ID,
// //       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// //     }),
// //     CredentialsProvider({
// //       name: 'Credentials',
// //       id: 'credentials',
// //       credentials: {
// //         phone: { label: 'Phone Number', type: 'tel', placeholder: '1234567890' },
// //         otp: { label: 'OTP', type: 'text' },
// //       },
// //       async authorize(credentials, req) {
// //         const { phone, otp } = credentials;

// //         try {


// //           return { phone, };
// //         } catch (err) {
// //           console.error(err);
// //           return null;
// //         }
// //       },
// //     }),
// //   ],
// // };

// // export async function isAdmin() {
// //   const session = await getServerSession(authOptions);
// //   const userEmail = session?.user?.email;
// //   if (!userEmail) {
// //     return false;
// //   }
// //   const userInfo = await UserInfo.findOne({ email: userEmail });
// //   if (!userInfo) {
// //     return false;
// //   }
// //   return userInfo.admin;
// // }

// // const handler = NextAuth(authOptions);

// // export { handler as GET, handler as POST };

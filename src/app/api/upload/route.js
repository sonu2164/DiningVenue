// import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
// import uniqid from 'uniqid';

// export async function POST(req) {
//   const data =  await req.formData();
//   if (data.get('file')) {
//     // upload the file
//     const file = data.get('file');

//     const s3Client = new S3Client({
//       region: 'us-east-1',
//       credentials: {
//         accessKeyId: process.env.MY_AWS_ACCESS_KEY,
//         secretAccessKey: process.env.MY_AWS_SECRET_KEY,
//       },
//     });

//     const ext = file.name.split('.').slice(-1)[0];
//     const newFileName = uniqid() + '.' + ext;

//     const chunks = [];
//     for await (const chunk of file.stream()) {
//       chunks.push(chunk);
//     }
//     const buffer = Buffer.concat(chunks);

//     const bucket = 'dawid-food-ordering';
//     await s3Client.send(new PutObjectCommand({
//       Bucket: bucket,
//       Key: newFileName,
//       ACL: 'public-read',
//       ContentType: file.type,
//       Body: buffer,
//     }));


//     const link = 'https://'+bucket+'.s3.amazonaws.com/'+newFileName;
//     return Response.json(link);
//   }
//   return Response.json(true);
// }


import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import uniqid from 'uniqid';

// Initialize Firebase with your configuration
const firebaseConfig = {
  apiKey: "AIzaSyD89thScbM1d7dkfx2GEZmRFPbJouXMEys",
  authDomain: "briyaniapp-79bce.firebaseapp.com",
  projectId: "briyaniapp-79bce",
  storageBucket: "briyaniapp-79bce.appspot.com",
  messagingSenderId: "305086535354",
  appId: "1:305086535354:web:73f8351d2b62da1c521483",
  measurementId: "G-9VJ0F85FYW"
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export async function POST(req) {
  const data = await req.formData();
  if (data.get('file')) {
    // Upload the file
    const file = data.get('file');

    const ext = file.name.split('.').slice(-1)[0];
    const newFileName = uniqid() + '.' + ext;

    const storageRef = ref(storage, 'images/' + newFileName);

    // Upload the file to Firebase Storage
    await uploadBytes(storageRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);

    return Response.json(downloadURL);
  }

  return Response.json(true);
}

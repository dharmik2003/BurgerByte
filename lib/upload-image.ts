// import cloudinary from 'cloudinary';


// export const UploadImage=async(file:File,folder:string)=>{
//     return new Promise(async(resolve,reject)=>{
//         await cloudinary.uploader.upload_stream({
//             resource_type:"auto",
//             folder:folder
//         },async(err:any,result:any)=>{
//             if(err){
//                 reject(err.message)
//             }
//             resolve(resolve)
//         })
//     })

// }

import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file: File, folder: string) => {

    console.log("process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME", process.env.CLOUDINARY_API_SECRET, process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)

    const buffer=await file.arrayBuffer();
    const bytes=Buffer.from(buffer)
    console.log("bytes", bytes)

    return  new Promise(async (resolve,reject)=>{
        await cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: folder
      },
      (err, info) => {
        if (err) {
             return reject(err.message);
        }
          return resolve(info);
      }
    ).end(bytes);
})
}
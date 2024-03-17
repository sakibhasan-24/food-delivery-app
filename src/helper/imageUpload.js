import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase/firebase.config";

// const handleUploadImage = (imageFile) => {
//   const storage = getStorage(app);
//   const imageName = new Date().getTime() + imageFile.name;
//   const storageRef = ref(storage, imageName);
//   const uploadTask = uploadBytesResumable(storageRef, imageFile);
//   uploadTask.on(
//     "state_changed",
//     (snapshot) => {
//       const progress = Math.round(
//         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//       );

//       console.log("Upload is " + progress + "% done");
//       switch (snapshot.state) {
//         case "paused":
//           console.log("Upload is paused");
//           break;
//         case "running":
//           console.log("Upload is running");
//           break;
//       }
//     },
//     (error) => {
//       switch (error.code) {
//         case "storage/unauthorized":
//           break;
//         case "storage/canceled":
//           break;

//         case "storage/unknown":
//           break;
//       }
//     },
//     () => {
//       // Upload completed successfully, now we can get the download URL
//       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//         // console.log(downloadURL);
//         return downloadURL;
//       });
//     }
//   );
// };

// export default handleUploadImage;
// import React from 'react'

// export default function imageUpload() {
//   const handleUploadImage = (imageFile) => {
//   return new Promise((resolve, reject) => {
//     const storage = getStorage(app);
//     const imageName = new Date().getTime() + imageFile.name;
//     const storageRef = ref(storage, imageName);
//     const uploadTask = uploadBytesResumable(storageRef, imageFile);
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         // Progress tracking logic
//       },
//       (error) => {
//         // Error handling logic
//         reject(error);
//       },
//       () => {
//         // Upload completed successfully, now we can get the download URL
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           resolve(downloadURL);
//         }).catch((error) => {
//           reject(error);
//         });
//       }
//     );
//   });
// };
// return handleUploadImage
// }
const handleUploadImage = (imageFile) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage(app);
    const imageName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, imageName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress tracking logic
      },
      (error) => {
        // Error handling logic
        reject(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            resolve(downloadURL);
          })
          .catch((error) => {
            reject(error);
          });
      }
    );
  });
};
export default handleUploadImage;

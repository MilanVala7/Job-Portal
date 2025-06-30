import multer from "multer";

const storage = multer.memoryStorage();
export const multipleUpload = multer({ storage }).fields([
  { name: "file", maxCount: 1 },           // Resume
  { name: "profilePhoto", maxCount: 1 },   // Profile photo
]);

export const singleUpload = multer({ storage }).single("file")
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

export async function imageUploadLocal(file) {
  const incomingFileType = file.type;
  let fileTypeCheckResult = true;
  let uploadDir = "";
  if (incomingFileType !== "image/jpeg") {
    if (incomingFileType !== "image/png") {
      fileTypeCheckResult = false;
      return { uploadDir, fileTypeCheckResult };
    }
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + file.name.replaceAll(" ", "_");

  if (fs.existsSync(path.join(process.cwd() + "/public", "/uploads"))) {
    uploadDir = path.join(process.cwd(), "public/uploads/" + filename);
    await writeFile(uploadDir, buffer);
  } else {
    fs.mkdirSync(path.join(process.cwd() + "/public", "/uploads"));
    uploadDir = path.join(process.cwd(), "public/uploads/" + filename);
    await writeFile(uploadDir, buffer);
  }
  return {
    uploadDir,
    fileTypeCheckResult,
  };
}

export async function multiImageUploadLocal(arr) {
  // recieving the file object in an array
  let imgDirArr = [];
  let uploadStatus = true;
  for (let i = 0; i < arr.length; i++) {
    let result = await imageUploadLocal(arr[i]);
    if (result.fileTypeCheckResult === false) {
      uploadStatus = false;
      if (i < 1) {
        return { uploadStatus, imgDirArr };
      } else {
        for (let dir of imgDirArr) {
          fs.unlink(dir, (err) => {
            if (err) {
              console.log(err);
              throw err;
            }
          });
        }
      }
      return {
        uploadStatus,
        imgDirArr,
      };
    } else {
      imgDirArr.push(result.uploadDir);
    }
  }
  return {
    uploadStatus,
    imgDirArr,
  };
}

export async function formDataMultiImageUploadLocal(formData) {
  let imgDirArr = [];
  let i = 1;
  let uploadStatus = false;
  for (let data of formData) {
    if (data[0] === "image") {
      const result = await imageUploadLocal(data[1]);
      if (result.fileTypeCheckResult == false) {
        uploadStatus = false;
        if (i == 0) {
          console.log("no image uploaded yet");
        }
        return {
          uploadStatus,
          imgDirArr,
        };
      }
      const obj = {};
      let imgName = "img" + i;
      obj[imgName] = result["uploadDir"];
      imgDirArr.push(obj);
      i++;
    }
  }
  return {
    uploadStatus,
    imgDirArr,
  };
}

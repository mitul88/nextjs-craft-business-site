import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

export async function imageUploadLocal(file) {
  const incomingFileType = file.type;
  let fileTypeCheckResult = true;
  let uploadDir = "";
  if (incomingFileType !== "image/jpeg") {
    if (incomingFileType !== "image/png") {
      return (fileTypeCheckResult = false);
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

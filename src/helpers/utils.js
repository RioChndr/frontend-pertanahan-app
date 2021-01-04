import { downloadFile } from "../http/dropbox";
import "es6-promise/auto";

export function downloadFileHelpers(filePath) {
  return new Promise((resolve, reject) => {
    downloadFile({ filePath: filePath })
      .then(result => {
        let link = document.createElement("a");
        link.href = result.result.link;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        resolve(true);
      })
      .catch(err => {
        reject(err);
        console.error(err, "Error Dropbox Download");
      });
  });
}

export function checkFileSize(fileSize = 0) {
  console.log(fileSize);
  const maxSize = 5 * 1024 * 1024;
  if (fileSize > maxSize) {
    return false;
  }
  return true;
}

export function checkFileType(fileType = null) {
  const allowedFileType = ["pdf"];
  if (allowedFileType.includes(fileType)) {
    return true;
  }
  return false;
}

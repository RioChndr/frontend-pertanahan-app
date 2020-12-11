import { Dropbox } from "dropbox";

const accessToken = process.env.VUE_APP_DROPBOX_TOKEN;

const dbx = new Dropbox({
  accessToken
});

export function getFileLists() {
  return dbx.filesListFolder({ path: "" });
}

export function uploadFile({ fileName: fileName, fileDocument: file }) {
  return dbx.filesUpload({ path: "/" + fileName, contents: file });
}

export function downloadFile({ filePath: filePath }) {
  // return dbx.filesDownload({ path: filePath });
  return dbx.filesGetTemporaryLink({ path: filePath });
}

export function deleteFile({ filePath: filePath }) {
  return dbx.filesDeleteV2({ path: filePath });
}

export function createSharedLink({ filePath: filePath }) {
  return dbx.sharingCreateSharedLinkWithSettings({
    path: filePath,
    settings: {
      requested_visibility: "public",
      audience: "public",
      access: "viewer"
    }
  });
}

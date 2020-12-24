<template>
  <div class="form-group">
    <slot name="label">Label</slot>
    <div class="form-control border" v-show="!fileName">
      <button
        class="btn-block d-flex align-items-center justify-content-center border-0"
        @click="openModalUpload"
        :disabled="loading.submit"
      >
        <i class="fa fa-spinner fa-spin fa-fw my-1" v-if="loading.submit"></i>
        <span v-else>
          Unggah Dokumen
          <span class="ti-upload ml-2"></span>
        </span>
      </button>
      <input
        v-show="false"
        type="file"
        class="col-md-11"
        @input="handleFileUpload(properties, uploadedFileName)"
        :ref="properties"
      />
    </div>
    <slot v-bind:file="fileName" v-if="displayName">
      <p class="mt-1 d-block">
        {{ fileName }}
        <button
          class="btn btn-sm btn-danger"
          v-if="fileName"
          @click.prevent="removeFile"
        >
          <i
            class="fa fa-spinner fa-spin fa-fw fa-2x"
            v-if="loading.delete"
          ></i>
          <i class="fa fa-trash fa-2x" v-else></i>
        </button>
      </p>
    </slot>
  </div>
</template>

<script>
import {
  createSharedLink,
  deleteFile,
  uploadFile
} from "../../../http/dropbox";
export default {
  name: "document-input-file",
  props: {
    fileUrlName: {
      type: String,
      default: null
    },
    properties: {
      type: String,
      default: null
    },
    uploadedFileName: {
      type: String,
      default: null
    },
    authorizerIdentity: {
      type: String,
      default: null
    },
    authorizedIdentity: {
      type: String,
      default: null
    },
    documentId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      fileName: null,
      filePath: null,
      fileUrl: null,
      loading: {
        delete: false,
        submit: false
      },
      displayName: false
    };
  },
  methods: {
    openModalUpload() {
      this.$refs[this.properties].click();
    },
    handleFileUpload() {
      const files = this.$refs[this.properties].files;

      if (files.length) {
        const selectedFile = files[0];
        const MAX_SIZE = 1 * 1024 * 1024;
        if (selectedFile.size > MAX_SIZE) {
          this.$toast.error("Ukuran file yang diupload maksimal 1 MB");
          return;
        }

        if (selectedFile.type !== "application/pdf") {
          this.$toast.error("File yang diupload harus berupa PDF");
          return;
        }

        this.loading.submit = true;

        const fileType = selectedFile.name.split(".")[1];
        const userId = JSON.parse(
          localStorage.getItem(process.env.VUE_APP_USER_INFO)
        ).id;

        const fileName =
          userId +
          "/" +
          this.documentId +
          "/" +
          this.uploadedFileName +
          "_" +
          this.prefixDate +
          "." +
          fileType;

        uploadFile({ fileName: fileName, fileDocument: selectedFile })
          .then(result => {
            const { path_display, name } = result.result;
            this.fileName = name;
            this.filePath = path_display;
            this.$emit("get-uploaded-url", this.properties, path_display);
            return createSharedLink({ filePath: path_display });
          })
          .then(result => {
            const { url } = result.result;
            this.fileUrl = url;
            this.$emit("get-uploaded-url", this.fileUrlName, url);
          })
          .catch(err => {
            console.error("error", err);
            this.$toast.error("File tidak berhasil diunggah");
          })
          .finally(() => {
            this.displayName = true;
            this.loading.submit = false;
          });
      }
    },
    removeFile() {
      this.loading.delete = true;
      deleteFile({ filePath: this.filePath })
        .then(result => {
          this.$emit("get-uploaded-url", this.fileUrlName, null);
          this.$emit("get-uploaded-url", this.properties, null);

          this.fileName = null;
          this.fileUrl = null;
          this.filePath = null;
        })
        .catch(err => {
          this.$toast.error("File Tidak Terhapus");
        })
        .finally(() => {
          this.loading.delete = false;
        });
    }
  },
  computed: {
    prefixDate() {
      const date = new Date();
      const prefixDate =
        date.getFullYear().toString() +
        date.getMonth().toString() +
        date.getDate().toString() +
        date.getHours().toString() +
        date.getMinutes().toString() +
        date.getSeconds().toString();
      return prefixDate;
    }
  }
};
</script>

<style></style>

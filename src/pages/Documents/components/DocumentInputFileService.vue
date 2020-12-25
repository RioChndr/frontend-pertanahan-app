<template>
  <div class="form-group">
    <div v-if="uploadedFileName === 'file_sertifikat_hak_atas_tanah'">
      <label for="sertifikat_tanah" class="control-label">
        Sertifikat Hak Atas Tanah *
        <small>
          (HM, HGB, HW, HMSRS, HP, HPL) / Kecamatan /Kelurahan, yang dimohon)
        </small>
      </label>
      <input
        v-model="form.detail"
        type="text"
        class="form-control border"
        placeholder="Format M100/Sekajati ( Hak Milik No 100 kelurahan sekejati )"
      />
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <slot name="label">Label</slot>
    </div>
    <div class="form-control border" v-show="displayButton">
      <button
        class="btn-block d-flex align-items-center justify-content-center border-0"
        @click="openModalUpload"
      >
        File PDF * <small>Max 5 Mb</small>
        <i class="fa fa-spinner fa-spin fa-fw" v-if="loading.submit"></i>
        <span v-else class="ti-upload ml-2"></span>
      </button>
      <input
        v-show="false"
        type="file"
        class="col-md-11"
        @input="handleFileUpload(properties, uploadedFileName)"
        :ref="properties"
      />
    </div>
    <p class="mt-1 d-block" v-if="!displayButton">
      {{ form.file_name }}
      <button
        class="btn btn-sm btn-danger"
        v-if="form.file_name"
        @click.prevent="removeFile"
      >
        <i class="fa fa-spinner fa-spin fa-fw fa-2x" v-if="loading.delete"></i>
        <i class="fa fa-trash fa-2x" v-else></i>
      </button>
    </p>
  </div>
</template>

<script>
import { createSharedLink, deleteFile, uploadFile } from "@/http/dropbox";
import {
  apiPostFile,
  apiRemoveFile,
  apiRemoveService
} from "../../../http/api";
import { checkFileSize, checkFileType } from "../../../helpers/utils";
export default {
  name: "document-input-file-service",
  props: {
    properties: {
      type: String,
      default: null
    },
    uploadedFileName: {
      type: String,
      default: null
    },
    serviceId: {
      type: String,
      default: null
    },
    subFolder: {
      type: String,
      default: null
    },
    identityCard: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      loading: {
        delete: false,
        submit: false
      },
      form: {
        file_name: null,
        file_path: null,
        file_url: null,
        file_type: null,
        description: null
      },
      displayButton: true
    };
  },
  methods: {
    openModalUpload() {
      this.$refs[this.properties].click();
    },
    handleFileUpload() {
      const files = this.$refs[this.properties].files;

      if (
        !this.form.description &&
        this.uploadedFileName === "file_sertifikat_hak_atas_tanah"
      ) {
        this.$toast.error("Harap isi jenis Sertifikat Hak Atas Tanah");
        return;
      }

      // console.log(files);

      // if (files.length) {
      //   this.loading.submit = true;

      const selectedFile = files[0];
      const fileType = selectedFile.name.split(".")[1];
      if (!checkFileType(fileType)) {
        this.$toast.error(
          "Jenis file tidak didukung, silahkan upload file PDF"
        );
        return;
      }

      if (!checkFileSize(selectedFile.size)) {
        this.$toast.error("Ukuran file tidak boleh lebih dari 5 MB");
        return;
      }
      //   const userId = JSON.parse(
      //     localStorage.getItem(process.env.VUE_APP_USER_INFO)
      //   ).id;

      //   const fileName = `${userId}/pelayanan/${this.subFolder}/${this.serviceId}/${this.uploadedFileName}_${this.prefixDate}.${fileType}`;

      //   uploadFile({ fileName: fileName, fileDocument: selectedFile })
      //     .then(result => {
      //       const { path_display, name } = result.result;
      //       this.form.file_name = name;
      //       this.form.file_path = path_display;
      //       this.form.file_type = this.uploadedFileName;
      //       return createSharedLink({ filePath: path_display });
      //     })
      //     .then(result => {
      //       const { url } = result.result;
      //       this.form.file_url = url;
      //       this.form.service_id = this.serviceId;
      //       this.form.document_id = this.subFolder;
      //       return apiPostFile(this.form);
      //     })
      //     .then(result => {
      //       console.log(result);
      //       this.$store.dispatch("apiGetDetailDocument", {
      //         doc_id: this.$route.params.id
      //       });
      //     })
      //     .then(() => this.$toast.success(`File berhasil diunggal`))
      //     .catch(err => {
      //       console.error("error", err);
      //       this.$toast.error("file Gagal di unggah");
      //     })
      //     .finally(() => {
      //       this.displayButton = false;
      //       this.loading.submit = false;
      //     });
      // }
    },
    removeFile() {
      this.loading.delete = true;

      deleteFile({ filePath: this.form.file_path })
        .then(result => {
          this.form.file_name = null;
          this.form.file_url = null;
          this.form.file_path = null;
          this.form.file_type = null;
          this.$toast.success("File Berhasil terhapus");
          return apiRemoveFile();
        })
        .catch(err => {
          this.$toast.error("File Tidak Terhapus");
        })
        .finally(() => {
          this.displayButton = true;
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

<style lang="scss" scoped>
label {
  color: #89857f;
}
</style>

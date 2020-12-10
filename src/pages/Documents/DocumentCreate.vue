<template>
  <div class="container-fluid">
    <div class="d-flex align-items-center justify-content-between">
      <router-link class="d-flex align-items-center" :to="{ name: 'list' }">
        <span class="ti-arrow-left mr-2"></span>
        Kembali
      </router-link>
      <span>Buat Permohonan</span>
    </div>
    <div class="container-body">
      <div class="row">
        <div
          class="col-md-8 col-sm-8 col-lg-6 offset-md-2 offset-sm-2 offset-lg-3"
        >
          <div class="form-group">
            <fg-input
              label="Alamat Email *"
              v-model="form.email"
              placeholder="Alamat Email"
              type="email"
            ></fg-input>
          </div>
        </div>

        <div
          class="col-md-8 col-sm-8 col-lg-6 offset-md-2 offset-sm-2 offset-lg-3"
        >
          <div class="form-group">
            <fg-input
              label="Nama Penerima Kuasa / Pemohon *"
              v-model="form.authorized_name"
              placeholder="Nama Lengkap Anda"
              type="text"
            ></fg-input>
          </div>
        </div>

        <div
          class="col-md-8 col-sm-8 col-lg-6 offset-md-2 offset-sm-2 offset-lg-3"
        >
          <div class="form-group">
            <label for="authorizer_card_path" class="control-label">
              File Penerima Kuasa ( KTP ) *
            </label>
            <div class="form-control border">
              <button
                class="btn-block d-flex align-items-center justify-content-center border-0"
                @click="openModalUpload('authorized_card_path')"
              >
                Unggah Dokumen
                <i
                  class="fa fa-spinner fa-spin fa-fw"
                  v-if="document.authorized_card_path.is_loading"
                ></i>
                <span v-else class="ti-upload ml-2"></span>
              </button>
              <input
                v-show="false"
                type="file"
                class="col-md-11"
                @input="
                  handleFileUpload(
                    'authorized_card_path',
                    'ktp_file_penerima_kuasa'
                  )
                "
                ref="authorized_card_path"
              />
            </div>
            <span class="mt-2">
              {{ document.authorized_card_path.file_name || "Not selected" }}
            </span>
          </div>
        </div>

        <div
          class="col-md-8 col-sm-8 col-lg-6 offset-md-2 offset-sm-2 offset-lg-3"
        >
          <div class="form-group">
            <fg-input
              label="Nomor Telepon"
              v-model="form.authorized_phone_number"
              placeholder="Nomor telepon yang bisa kami hubungi"
              type="text"
            ></fg-input>
          </div>
        </div>

        <div
          class="col-md-8 col-sm-8 col-lg-6 offset-md-2 offset-sm-2 offset-lg-3"
        >
          <div class="form-group">
            <fg-input
              label="Pemberi Kuasa"
              v-model="form.authorizer_name"
              placeholder="Nama Pemberi Kuasa (Jika Dikuasakan)"
              type="text"
            ></fg-input>
          </div>
        </div>

        <div
          class="col-md-8 col-sm-8 col-lg-6 offset-md-2 offset-sm-2 offset-lg-3"
        >
          <div class="form-group">
            <label for="authorizer_card_path" class="control-label">
              File Pemberi Kuasa ( KTP )
            </label>
            <div class="form-control border">
              <button
                class="btn-block d-flex align-items-center justify-content-center border-0"
                @click="openModalUpload('authorizer_card_path')"
              >
                Unggah Dokumen
                <i
                  class="fa fa-spinner fa-spin fa-fw"
                  v-if="document.authorizer_card_path.is_loading"
                ></i>
                <span v-else class="ti-upload ml-2"></span>
              </button>
              <input
                v-show="false"
                type="file"
                class="col-md-11"
                @input="
                  handleFileUpload(
                    'authorizer_card_path',
                    'ktp_file_pemberi_kuasa'
                  )
                "
                ref="authorizer_card_path"
              />
            </div>
            {{ document.authorizer_card_path.file_name || "Not Selected" }}
          </div>
        </div>

        <div
          class="col-md-8 col-sm-8 col-lg-6 offset-md-2 offset-sm-2 offset-lg-3"
        >
          <div class="form-group">
            <button class="btn btn-block" @click.prevent="postDocument">
              Simpan
              <i class="fa fa-spinner fa-spin fa-fw" v-if="loading"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiPostDocument } from "../../http/api";
import { createSharedLink, uploadFile } from "../../http/dropbox";
export default {
  data() {
    return {
      form: {
        email: null,
        authorized_name: null,
        authorized_card_path: null,
        authorized_phone_number: null,
        authorizer_name: null,
        authorizer_card_path: null
      },

      document: {
        authorized_card_path: {
          is_loading: false,
          file_name: null
        },
        authorizer_card_path: {
          is_loading: false,
          file_name: null
        }
      },

      loading: false
    };
  },
  methods: {
    handleFileUpload(ref, file_name) {
      const files = this.$refs[ref].files;

      if (files.length) {
        this.document[ref].is_loading = true;
        const selectedFile = files[0];
        const fileType = selectedFile.name.split(".")[1];
        const userId = JSON.parse(
          localStorage.getItem(process.env.VUE_APP_USER_INFO)
        ).id;
        const fileName = userId + "/" + file_name + "." + fileType;
        uploadFile({ fileName: fileName, fileDocument: selectedFile })
          .then(result => {
            const { path_display, name } = result.result;
            this.document[ref].file_name = name;
            return createSharedLink({ filePath: path_display });
          })
          .then(result => {
            const { url } = result.result;
            this.form[ref] = url;
          })
          .catch(err => {
            this.$toast.error("File tidak berhasil diunggah");
          })
          .finally(() => {
            this.document[ref].is_loading = false;
          });
      }
    },
    openModalUpload(ref) {
      this.$refs[ref].click();
    },
    postDocument() {
      this.loading = true;
      apiPostDocument(this.form)
        .then(result => {
          console.log(result);
          this.$toast.success("Permohan berhasil diajukan");
        })
        .catch(err => {
          this.$toast.error("Permohonan Gagal Diajukan");
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.container-body {
  border-top: 1px solid #c3c3c3;
  margin-top: 1rem;
  padding-top: 1rem;
}
</style>

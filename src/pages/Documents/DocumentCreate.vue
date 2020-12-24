<template>
  <div class="container-fluid">
    <div class="d-flex align-items-center justify-content-between">
      <!-- <router-link class="d-flex align-items-center" :to="{ name: 'list' }">
        <span class="ti-arrow-left mr-2"></span>
        Kembali
      </router-link> -->
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
              label="Nomor KTP Penerima Kuasa / Pemohon *"
              v-model="form.authorized_card_identity"
              placeholder="Nomor KTP Penerima Kuasa"
              :is-number="true"
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
          <document-input-file
            properties="authorized_card_path"
            uploaded-file-name="ktp_file_penerima_kuasa"
            file-url-name="authorized_card_url"
            :authorizer-identity="form.authorizer_card_identity"
            :authorized-identity="form.authorized_card_identity"
            @get-uploaded-url="uploadedUrl"
            :document-id="form.unique_id"
          >
            <template #label>
              <label for="authorized_card_path" class="control-label">
                File Penerima Kuasa / Pemohon ( KTP ) *
              </label>
            </template>
          </document-input-file>
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
          class="col-md-8 col-sm-8 col-lg-6 offset-md-2 offset-lg-3 offset-sm-2"
        >
          <div class="form-group">
            <label for="services" class="control-label">Jenis Layanan *</label>
            <v-select
              :options="services"
              label="service_name"
              :reduce="service => service.id"
              v-model="form.service_id"
            ></v-select>
          </div>
        </div>

        <div
          class="col-md-8 col-sm-8 col-lg-6 offset-md-2 offset-sm-2 offset-lg-3"
        >
          <div class="form-group">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="customCheck1"
                v-model="isEmpowered"
                value="true"
              />
              <label class="custom-control-label" for="customCheck1">
                Apakah Permohonan dikuasakan ?
              </label>
            </div>
          </div>
        </div>

        <div
          class="col-md-8 col-sm-8 col-lg-6 offset-md-2 offset-sm-2 offset-lg-3"
          v-if="isEmpowered"
        >
          <div class="form-group">
            <fg-input
              label="Nomor KTP Pemberi Kuasa"
              v-model="form.authorizer_card_identity"
              placeholder="Nomor KTP Pemberi Kuasa (Jika Dikuasakan)"
              :is-number="true"
            ></fg-input>
          </div>
        </div>

        <div
          class="col-md-8 col-sm-8 col-lg-6 offset-md-2 offset-sm-2 offset-lg-3"
          v-if="isEmpowered"
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
          v-if="isEmpowered"
        >
          <document-input-file
            properties="authorizer_card_path"
            uploaded-file-name="ktp_file_pemberi_kuasa"
            file-url-name="authorizer_card_url"
            :authorizer-identity="form.authorizer_card_identity"
            :authorized-identity="form.authorized_card_identity"
            @get-uploaded-url="uploadedUrl"
            :document-id="form.unique_id"
          >
            <template #label>
              <label for="authorizer_card_path" class="control-label">
                File Pemberi Kuasa ( KTP )
              </label>
            </template>
          </document-input-file>
        </div>

        <div
          class="col-md-8 col-sm-8 col-lg-6 offset-md-2 offset-sm-2 offset-lg-3"
        >
          <div class="form-group">
            <button
              class="btn btn-block"
              @click.prevent="postDocument"
              :disabled="loading"
            >
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
import { mapState } from "vuex";
import { apiPostDocument } from "../../http/api";
import { createSharedLink, deleteFile, uploadFile } from "../../http/dropbox";
import DocumentInputFile from "./components/DocumentInputFile";
export default {
  components: {
    DocumentInputFile
  },
  data() {
    return {
      form: {
        email: null,
        authorized_name: null,
        authorized_card_path: null,
        authorized_card_url: null,
        authorized_phone_number: null,
        authorized_card_identity: null,
        authorizer_name: null,
        authorizer_card_path: null,
        authorizer_card_url: null,
        authorizer_card_identity: null,
        unique_id: null,
        service_id: null
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

      isEmpowered: false,

      loading: false
    };
  },
  methods: {
    uploadedUrl(ref, url) {
      this.form[ref] = url;
    },
    postDocument() {
      if (!this.form.email) {
        this.$toast.error("Email Wajib Terisi");
        return;
      }

      if (!this.form.authorized_phone_number) {
        this.$toast.error("Nomor Telepon Wajib Terisi");
        return;
      }

      this.loading = true;
      apiPostDocument(this.form)
        .then(result => {
          this.$toast.success("Permohan berhasil diajukan");
        })
        .catch(err => {
          this.$toast.error("Permohonan Gagal Diajukan");
          if (this.form.authorized_card_path) {
            deleteFile({ filePath: this.form.authorized_card_path });
          }

          if (this.form.authorizer_card_path) {
            deleteFile({ filePath: this.form.authorizer_card_path });
          }
        })
        .finally(() => {
          this.$router.replace({ name: "request" });
          this.loading = false;
        });
    }
  },
  created() {
    const dateNow = Date.now();
    const mathRandom = Math.floor(Math.random() * 99999999);
    const uniqueId = dateNow + mathRandom;
    this.form.unique_id = uniqueId;

    this.$store.dispatch("apiGetServices");
  },
  computed: {
    ...mapState(["services"])
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

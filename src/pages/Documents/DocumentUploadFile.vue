<template>
  <div class="container-fluid">
    <nav class="d-flex align-items-center justify-content-between">
      <router-link :to="{ name: 'list' }" class="d-flex align-items-center">
        <span class="ti-arrow-left mr-2"></span>
        Kembali
      </router-link>

      <span>Unggah Dokumen / Surat - Surat</span>
    </nav>
    <hr />

    <div class="row">
      <v-loading
        :active.sync="loadingOverlay"
        :can-cancel="false"
        :is-full-page="true"
      ></v-loading>

      <div class="col-lg 6 col-md-6 col-sm-12 border mx-2 px-4">
        <div class="form-group">
          <label for="services" class="control-label">
            Penerima Kuasa / Pemohon
          </label>
          <h4 class="m-0 font-weight-bold">
            {{ detailDocument.authorized_name }}
          </h4>
        </div>

        <div class="form-group">
          <label for="services" class="control-label">
            Nomor KTP Penerima Kuasa / Pemohon
          </label>
          <h4 class="m-0 font-weight-bold">
            {{ detailDocument.authorized_card_identity || "-" }}
          </h4>
        </div>

        <div class="form-group">
          <label for="services" class="control-label">
            Email
          </label>
          <h4 class="m-0 font-weight-bold">
            {{ detailDocument.email }}
          </h4>
        </div>

        <div class="form-group">
          <label for="services" class="control-label">
            Nomor Telephone
          </label>
          <h4 class="m-0 font-weight-bold">
            {{ detailDocument.authorized_phone_number }}
          </h4>
        </div>

        <div class="form-group">
          <label for="services" class="control-label">
            Jenis Layanan
          </label>
          <h4 class="m-0 font-weight-bold">
            {{ detailDocument.service.service_name }}
          </h4>
        </div>

        <div id="section-authorizer" v-if="detailDocument.authorizer_name">
          <hr />

          <div class="form-group">
            <label for="services" class="control-label">
              Pemberi Kuasa
            </label>
            <h4 class="m-0 font-weight-bold">
              {{ detailDocument.authorizer_name || "-" }}
            </h4>
          </div>

          <div class="form-group">
            <label for="services" class="control-label">
              Nomor KTP Pemberi Kuasa
            </label>
            <h4 class="m-0 font-weight-bold">
              {{ detailDocument.authorizer_card_identity || "-" }}
            </h4>
          </div>
        </div>
        <div class="form-group" v-if="!detailDocument.is_submitted">
          <button
            class="btn btn-info"
            :disabled="fileLength === 0"
            @click.prevent="submitRequest"
          >
            Ajukan Permohonan
          </button>
        </div>

        <hr />

        <div class="form-group">
          <label for="services" class="control-label">
            Dokumen yang telah diupload
          </label>
          <div class="row mt-2">
            <div
              class="col-md-6"
              v-for="file in detailDocument.files"
              :key="file.id"
            >
              <div class="card border">
                <div class="card-body">
                  <p>{{ file.file_type | fileType }}</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                  <a
                    @click="downloadFile(file.file_path)"
                    target="_blank"
                    class="d-flex align-items-center"
                    style="cursor: pointer"
                  >
                    <span class="ti-download mr-2"></span>
                    <span>Download</span>
                  </a>
                  <span>{{ file.updated_at | dateHuman }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-6 col-md-6 col-sm-10 border mx-2 px-4">
        <!-- Surat Permohonan -->
        <document-input-file-service
          uploaded-file-name="surat_permohonan"
          properties="application_letter"
          file-url-name="application_letter_url"
          :service-id="form.service_id"
          :sub-folder="$route.params.id"
          :identity-card="identityCard"
        >
          <template #label>
            <label for="authorized_card_path" class="control-label">
              Surat Permohonan *
            </label>
          </template>
        </document-input-file-service>

        <!-- Bukti Alas Hak -->
        <document-input-file-service
          uploaded-file-name="bukti_alas_hak"
          properties="proof_of_rights"
          :service-id="form.service_id"
          :sub-folder="$route.params.id"
          :identity-card="identityCard"
        >
          <template #label>
            <label for="bukti_alas_hak" class="control-label">
              Bukti Alas Hak *
            </label>
          </template>
        </document-input-file-service>

        <!-- Pajak Bumi dan Bangunan -->
        <document-input-file-service
          uploaded-file-name="pajak_bumi_dan_bangunan"
          properties="property_tax"
          :service-id="form.service_id"
          :sub-folder="$route.params.id"
          :identity-card="identityCard"
        >
          <template #label>
            <label for="pajak_bumi_dan_bangunan" class="control-label">
              Pajak Bumi dan Bangunan *
            </label>
          </template>
        </document-input-file-service>

        <!-- Bukti Verifikasi BPHTB -->
        <document-input-file-service
          uploaded-file-name="bukti_verifikasi_bphtb"
          properties="verification_bphtb"
          :service-id="form.service_id"
          :sub-folder="$route.params.id"
          :identity-card="identityCard"
        >
          <template #label>
            <label for="bukti_verifikasi_bphtb" class="control-label">
              Bukti Verifikasi BPHTB
              <small>( Jika jenis layanan mewajibkan)</small>
            </label>
          </template>
        </document-input-file-service>

        <!-- File Akta -->
        <document-input-file-service
          uploaded-file-name="file_akta"
          properties="file_akta"
          :service-id="form.service_id"
          :sub-folder="$route.params.id"
          :identity-card="identityCard"
        >
          <template #label>
            <label for="file_akta" class="control-label">
              File Akta
              <small>
                (Jika Permohonan Peralihan, File ini Wajib Di Upload Semua
                Halaman)
              </small>
            </label>
          </template>
        </document-input-file-service>

        <!-- Sertifikat Hak Atas Tanah -->
        <document-input-file-service
          uploaded-file-name="file_sertifikat_hak_atas_tanah"
          properties="file_sertifikat_hak_atas_tanah"
          :service-id="form.service_id"
          :sub-folder="$route.params.id"
          :identity-card="identityCard"
        >
          <template #label>
            <label for="file_sertifikat_hak_atas_tanah" class="control-label">
              File Sertipikat Hak Atas Tanah *
              <small>
                Berwarna Seperti Sertipikat Aslinya Semua Halaman
              </small>
            </label>
          </template>
        </document-input-file-service>

        <!-- Kelengkapan Berkas Lainnya 1 -->
        <document-input-file-service
          uploaded-file-name="kelengkapan_berkas_lainnya_1"
          properties="kelengkapan_berkas_lainnya_1"
          :service-id="form.service_id"
          :sub-folder="$route.params.id"
          :identity-card="identityCard"
        >
          <template #label>
            <label for="kelengkapan_berkas_lainnya_1" class="control-label">
              Kelengkapan Berkas Lainnya 1
            </label>
          </template>
        </document-input-file-service>

        <!-- Kelengkapan Berkas Lainnya 2 -->
        <document-input-file-service
          uploaded-file-name="kelengkapan_berkas_lainnya_2"
          properties="kelengkapan_berkas_lainnya_2"
          :service-id="form.service_id"
          :sub-folder="$route.params.id"
          :identity-card="identityCard"
        >
          <template #label>
            <label for="kelengkapan_berkas_lainnya_2" class="control-label">
              Kelengkapan Berkas Lainnya 2
            </label>
          </template>
        </document-input-file-service>

        <!-- Kelengkapan Berkas Lainnya 3 -->
        <document-input-file-service
          uploaded-file-name="kelengkapan_berkas_lainnya_3"
          properties="kelengkapan_berkas_lainnya_3"
          :service-id="form.service_id"
          :sub-folder="$route.params.id"
          :identity-card="identityCard"
        >
          <template #label>
            <label for="kelengkapan_berkas_lainnya_3" class="control-label">
              Kelengkapan Berkas Lainnya 3
            </label>
          </template>
        </document-input-file-service>

        <!-- Kelengkapan Berkas Lainnya 4 -->
        <document-input-file-service
          uploaded-file-name="kelengkapan_berkas_lainnya_4"
          properties="kelengkapan_berkas_lainnya_4"
          :service-id="form.service_id"
          :sub-folder="$route.params.id"
          :identity-card="identityCard"
        >
          <template #label>
            <label for="kelengkapan_berkas_lainnya_4" class="control-label">
              Kelengkapan Berkas Lainnya 4
            </label>
          </template>
        </document-input-file-service>

        <!-- Kelengkapan Berkas Lainnya 5 -->
        <document-input-file-service
          uploaded-file-name="kelengkapan_berkas_lainnya_5"
          properties="kelengkapan_berkas_lainnya_5"
          :service-id="form.service_id"
          :sub-folder="$route.params.id"
          :identity-card="identityCard"
        >
          <template #label>
            <label for="kelengkapan_berkas_lainnya_5" class="control-label">
              Kelengkapan Berkas Lainnya 5
            </label>
          </template>
        </document-input-file-service>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { createSharedLink, downloadFile, uploadFile } from "../../http/dropbox";
import DocumentInputFileService from "./components/DocumentInputFileService";
import { mapState } from "vuex";

export default {
  components: {
    DocumentInputFileService
  },
  filters: {
    dateHuman(val) {
      let date = new Date(val);

      return moment(date).from();
    },
    fileType(val) {
      return val
        .split("_")
        .map(v => v.charAt(0).toUpperCase() + v.substr(1).toLowerCase())
        .join(" ");
    }
  },
  data() {
    return {
      identityCard: null,
      form: {
        service_id: null,
        application_letter: null,
        proof_of_rights: null,
        property_tax: null,
        verification_bphtb: null,
        file_akta: null,
        file_sertifikat_hak_atas_tanah: null,
        kelengkapan_berkas_lainnya_1: null,
        kelengkapan_berkas_lainnya_2: null,
        kelengkapan_berkas_lainnya_3: null,
        kelengkapan_berkas_lainnya_4: null,
        kelengkapan_berkas_lainnya_5: null,
        sertifikat_hak_atas_tanah: null
      },
      document: {
        application_letter: {
          is_loading: false,
          file_name: null,
          file_path: null,
          file_type: null,
          file_url: null
        },
        proof_of_rights: {
          is_loading: false,
          file_name: null,
          file_path: null,
          file_type: null,
          file_url: null
        },
        property_tax: {
          is_loading: false,
          file_name: null,
          file_path: null,
          file_type: null,
          file_url: null
        },
        verification_bphtb: {
          is_loading: false,
          file_name: null,
          file_path: null,
          file_type: null,
          file_url: null
        },
        file_akta: {
          is_loading: false,
          file_name: null,
          file_path: null,
          file_type: null,
          file_url: null
        },
        file_sertifikat_hak_atas_tanah: {
          is_loading: false,
          file_name: null,
          file_path: null,
          file_type: null,
          file_url: null,
          description: null
        },
        kelengkapan_berkas_lainnya_1: {
          is_loading: false,
          file_name: null,
          file_path: null,
          file_type: null,
          file_url: null
        },
        kelengkapan_berkas_lainnya_2: {
          is_loading: false,
          file_name: null,
          file_path: null,
          file_type: null,
          file_url: null
        },
        kelengkapan_berkas_lainnya_3: {
          is_loading: false,
          file_name: null,
          file_path: null,
          file_type: null,
          file_url: null
        },
        kelengkapan_berkas_lainnya_4: {
          is_loading: false,
          file_name: null,
          file_path: null,
          file_type: null,
          file_url: null
        },
        kelengkapan_berkas_lainnya_5: {
          is_loading: false,
          file_name: null,
          file_path: null,
          file_type: null,
          file_url: null
        }
      },
      loadingOverlay: false
    };
  },
  created() {
    this.loadingOverlay = true;
    this.$store
      .dispatch("apiGetDetailDocument", {
        doc_id: this.$route.params.id
      })
      .finally(() => {
        this.loadingOverlay = false;
      });
  },
  methods: {
    downloadFile(path) {
      downloadFile({ filePath: path })
        .then(result => {
          let link = document.createElement("a");
          link.href = result.result.link;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch(err => {
          console.error(err);
        });
    },
    submitRequest() {
      this.loadingOverlay = true;
      this.$store
        .dispatch("actionPutDocument", {
          doc_id: this.$route.params.id,
          form: {
            is_submitted: true,
            is_waiting: true
          }
        })
        .then(() => {
          this.$toast.success("Permohonan Berhasil diajukan");
        })
        .catch(err => console.error(err, "Error"))
        .finally(() => {
          this.loadingOverlay = false;
        });
    }
  },
  computed: {
    ...mapState(["detailDocument"]),
    fileLength() {
      return (
        this.detailDocument &&
        this.detailDocument.files &&
        this.detailDocument.files.length
      );
    }
  }
};
</script>

<style lang="scss" scoped>
label {
  color: #89857f;
}

.form-group {
  margin: 2.5rem 0;
}
</style>

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
              <div class="card p-2 border">
                {{ file.service.service_name }}
                <hr class="mb-1 mt-1" />
                <span class="py-2">{{ file.file_name }}</span>
                <span class="badge badge-primary py-1">
                  {{ file.updated_at | dateHuman }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-6 col-md-6 col-sm-10 border mx-2 px-4">
        <!-- Jenis Layanan -->
        <div class="form-group">
          <label for="services" class="control-label">Jenis Layanan *</label>
          <v-select
            :options="services"
            label="service_name"
            :reduce="service => service.id"
            v-model="form.service_id"
          ></v-select>
        </div>

        <div v-if="form.service_id">
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
  </div>
</template>

<script>
import moment from "moment";
import moduleName, {
  apiGetDetailDocument,
  apiGetServices,
  apiPostFile
} from "../../http/api";
import { createSharedLink, uploadFile } from "../../http/dropbox";
import DocumentInputFileService from "./components/DocumentInputFileService";

export default {
  components: {
    DocumentInputFileService
  },
  filters: {
    dateHuman(val) {
      let date = new Date(val);

      return moment(date).from();
    }
  },
  data() {
    return {
      identityCard: null,
      services: [],
      detailDocument: {},
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
      }
    };
  },
  async mounted() {
    const services = await apiGetServices();
    if (services.status === 200) {
      this.services = services.data.message.services;
    }

    const requestDocument = await apiGetDetailDocument(this.$route.params.id);
    if (requestDocument.data.success) {
      const detail = requestDocument.data.document;
      console.log(detail);
      this.detailDocument = detail;
      this.identityCard =
        detail.authorizer_card_identity || detail.authorized_card_identity;
    }
  },
  methods: {
    openModalUpload(ref) {
      this.$refs[ref].click();
    },
    handleFileUpload(ref, file_name) {
      const files = this.$refs[ref].files;

      if (file_name === "file_sertifikat_hak_atas_tanah") {
        if (!this.form.file_sertifikat_hak_atas_tanah) {
          this.$toast.error("Harap Cantumkan Jenis Sertifikat Tanah");
          return;
        }
      }
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
            this.document[ref].file_path = path_display;
            this.document[ref].file_type = file_name;
            return createSharedLink({ filePath: path_display });
          })
          .then(result => {
            const { url } = result.result;
            this.form[ref] = url;
            this.document[ref].file_url = url;
            this.document[ref].service_id = this.form.service_id;
            this.document[ref].document_id = this.$route.params.id;
            const { is_loading, ...formData } = this.document[ref];
            return apiPostFile(formData);
          })
          .then(result => {
            console.log(result);
          })
          .catch(err => {
            this.$toast.error("Dokumen Gagal di unggah");
          })
          .finally(() => {
            this.document[ref].is_loading = false;
          });
      }
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

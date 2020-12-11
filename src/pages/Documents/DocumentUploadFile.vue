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

        <hr />

        <div class="form-group">
          <label for="services" class="control-label">
            Pemberi Kuasa
          </label>
          <h4 class="m-0 font-weight-bold">
            {{ detailDocument.authorizer_card_identity || "-" }}
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

          <div class="form-group">
            <label for="authorizer_card_path" class="control-label">
              Surat Permohonan *
            </label>
            <div class="form-control border">
              <button
                class="btn-block d-flex align-items-center justify-content-center border-0"
                @click="openModalUpload('application_letter')"
              >
                Unggah Dokumen
                <i
                  class="fa fa-spinner fa-spin fa-fw"
                  v-if="document.application_letter.is_loading"
                ></i>
                <span v-else class="ti-upload ml-2"></span>
              </button>
              <input
                v-show="false"
                type="file"
                class="col-md-11"
                @input="
                  handleFileUpload('application_letter', 'surat_permohonan')
                "
                ref="application_letter"
              />
            </div>
            <span class="mt-2">
              {{ document.application_letter.file_name || "Not selected" }}
            </span>
          </div>

          <!-- Bukti Alas Hak -->
          <div class="form-group">
            <label for="authorizer_card_path" class="control-label">
              Bukti Alas Hak *
            </label>
            <div class="form-control border">
              <button
                class="btn-block d-flex align-items-center justify-content-center border-0"
                @click="openModalUpload('proof_of_rights')"
              >
                Unggah Dokumen
                <i
                  class="fa fa-spinner fa-spin fa-fw"
                  v-if="document.proof_of_rights.is_loading"
                ></i>
                <span v-else class="ti-upload ml-2"></span>
              </button>
              <input
                v-show="false"
                type="file"
                class="col-md-11"
                @input="handleFileUpload('proof_of_rights', 'bukti_alas_hak')"
                ref="proof_of_rights"
              />
            </div>
            <span class="mt-2">
              {{ document.proof_of_rights.file_name || "Not selected" }}
            </span>
          </div>

          <!-- Pajak Bumi dan Bangunan -->
          <div class="form-group">
            <label for="authorizer_card_path" class="control-label">
              Pajak Bumi dan Bangunan *
            </label>
            <div class="form-control border">
              <button
                class="btn-block d-flex align-items-center justify-content-center border-0"
                @click="openModalUpload('property_tax')"
              >
                Unggah Dokumen
                <i
                  class="fa fa-spinner fa-spin fa-fw"
                  v-if="document.property_tax.is_loading"
                ></i>
                <span v-else class="ti-upload ml-2"></span>
              </button>
              <input
                v-show="false"
                type="file"
                class="col-md-11"
                @input="
                  handleFileUpload('property_tax', 'pajak_bumi_dan_bangunan')
                "
                ref="property_tax"
              />
            </div>
            <span class="mt-2">
              {{ document.property_tax.file_name || "Not selected" }}
            </span>
          </div>

          <!-- Bukti Verifikasi BPHTB -->
          <div class="form-group">
            <label for="authorizer_card_path" class="control-label">
              Bukti Verifikasi BPHTB
              <small>( Jika jenis layanan mewajibkan)</small>
            </label>
            <div class="form-control border">
              <button
                class="btn-block d-flex align-items-center justify-content-center border-0"
                @click="openModalUpload('verification_bphtb')"
              >
                Unggah Dokumen
                <i
                  class="fa fa-spinner fa-spin fa-fw"
                  v-if="document.verification_bphtb.is_loading"
                ></i>
                <span v-else class="ti-upload ml-2"></span>
              </button>
              <input
                v-show="false"
                type="file"
                class="col-md-11"
                @input="
                  handleFileUpload(
                    'verification_bphtb',
                    'bukti_verifikasi_bphtb'
                  )
                "
                ref="verification_bphtb"
              />
            </div>
            <span class="mt-2">
              {{ document.verification_bphtb.file_name || "Not selected" }}
            </span>
          </div>

          <!-- File Akta -->
          <div class="form-group">
            <label for="authorizer_card_path" class="control-label">
              File Akta
              <small>
                (Jika Permohonan Peralihan, File ini Wajib Di Upload Semua
                Halaman)
              </small>
            </label>
            <div class="form-control border">
              <button
                class="btn-block d-flex align-items-center justify-content-center border-0"
                @click="openModalUpload('file_akta')"
              >
                Unggah Dokumen
                <i
                  class="fa fa-spinner fa-spin fa-fw"
                  v-if="document.file_akta.is_loading"
                ></i>
                <span v-else class="ti-upload ml-2"></span>
              </button>
              <input
                v-show="false"
                type="file"
                class="col-md-11"
                @input="handleFileUpload('file_akta', 'file_akta')"
                ref="file_akta"
              />
            </div>
            <span class="mt-2">
              {{ document.file_akta.file_name || "Not selected" }}
            </span>
          </div>

          <!-- Sertifikat Hak Atas Tanah -->
          <div class="form-group">
            <label for="sertifikat_tanah" class="control-label">
              Sertifikat Hak Atas Tanah *
              <small>
                (HM, HGB, HW, HMSRS, HP, HPL) / Kecamatan /Kelurahan, yang
                dimohon)
              </small>
            </label>
            <input
              v-model="form.sertifikat_hak_atas_tanah"
              type="text"
              class="form-control border"
              placeholder="(HM, HGB, HW, HMSRS, HP, HPL) / Kecamatan /Kelurahan, yang dimohon )"
            />
          </div>

          <!-- File Sertipikat Hak Atas Tanah * -->
          <div class="form-group">
            <label for="authorizer_card_path" class="control-label">
              File Sertipikat Hak Atas Tanah *
              <small>
                Berwarna Seperti Sertipikat Aslinya Semua Halaman
              </small>
            </label>
            <div class="form-control border">
              <button
                class="btn-block d-flex align-items-center justify-content-center border-0"
                @click="openModalUpload('file_sertifikat_hak_atas_tanah')"
              >
                Unggah Dokumen
                <i
                  class="fa fa-spinner fa-spin fa-fw"
                  v-if="document.file_sertifikat_hak_atas_tanah.is_loading"
                ></i>
                <span v-else class="ti-upload ml-2"></span>
              </button>
              <input
                v-show="false"
                type="file"
                class="col-md-11"
                @input="
                  handleFileUpload(
                    'file_sertifikat_hak_atas_tanah',
                    'file_sertifikat_hak_atas_tanah'
                  )
                "
                ref="file_sertifikat_hak_atas_tanah"
              />
            </div>
            <span class="mt-2">
              {{
                document.file_sertifikat_hak_atas_tanah.file_name ||
                  "Not selected"
              }}
            </span>
          </div>

          <!-- Kelengkapan Berkas Lainnya 1 -->
          <div class="form-group">
            <label for="authorizer_card_path" class="control-label">
              Kelengkapan Berkas Lainnya 1
            </label>
            <div class="form-control border">
              <button
                class="btn-block d-flex align-items-center justify-content-center border-0"
                @click="openModalUpload('kelengkapan_berkas_lainnya_1')"
              >
                Unggah Dokumen
                <i
                  class="fa fa-spinner fa-spin fa-fw"
                  v-if="document.kelengkapan_berkas_lainnya_1.is_loading"
                ></i>
                <span v-else class="ti-upload ml-2"></span>
              </button>
              <input
                v-show="false"
                type="file"
                class="col-md-11"
                @input="
                  handleFileUpload(
                    'kelengkapan_berkas_lainnya_1',
                    'kelengkapan_berkas_lainnya_1'
                  )
                "
                ref="kelengkapan_berkas_lainnya_1"
              />
            </div>
            <span class="mt-2">
              {{
                document.kelengkapan_berkas_lainnya_1.file_name ||
                  "Not selected"
              }}
            </span>
          </div>

          <!-- Kelengkapan Berkas Lainnya 2 -->
          <div class="form-group">
            <label for="authorizer_card_path" class="control-label">
              Kelengkapan Berkas Lainnya 2
            </label>
            <div class="form-control border">
              <button
                class="btn-block d-flex align-items-center justify-content-center border-0"
                @click="openModalUpload('kelengkapan_berkas_lainnya_2')"
              >
                Unggah Dokumen
                <i
                  class="fa fa-spinner fa-spin fa-fw"
                  v-if="document.kelengkapan_berkas_lainnya_2.is_loading"
                ></i>
                <span v-else class="ti-upload ml-2"></span>
              </button>
              <input
                v-show="false"
                type="file"
                class="col-md-11"
                @input="
                  handleFileUpload(
                    'kelengkapan_berkas_lainnya_2',
                    'kelengkapan_berkas_lainnya_2'
                  )
                "
                ref="kelengkapan_berkas_lainnya_2"
              />
            </div>
            <span class="mt-2">
              {{
                document.kelengkapan_berkas_lainnya_2.file_name ||
                  "Not selected"
              }}
            </span>
          </div>

          <!-- Kelengkapan Berkas Lainnya 3 -->
          <div class="form-group">
            <label for="authorizer_card_path" class="control-label">
              Kelengkapan Berkas Lainnya 3
            </label>
            <div class="form-control border">
              <button
                class="btn-block d-flex align-items-center justify-content-center border-0"
                @click="openModalUpload('kelengkapan_berkas_lainnya_3')"
              >
                Unggah Dokumen
                <i
                  class="fa fa-spinner fa-spin fa-fw"
                  v-if="document.kelengkapan_berkas_lainnya_3.is_loading"
                ></i>
                <span v-else class="ti-upload ml-2"></span>
              </button>
              <input
                v-show="false"
                type="file"
                class="col-md-11"
                @input="
                  handleFileUpload(
                    'kelengkapan_berkas_lainnya_3',
                    'kelengkapan_berkas_lainnya_3'
                  )
                "
                ref="kelengkapan_berkas_lainnya_3"
              />
            </div>
            <span class="mt-2">
              {{
                document.kelengkapan_berkas_lainnya_3.file_name ||
                  "Not selected"
              }}
            </span>
          </div>

          <!-- Kelengkapan Berkas Lainnya 4 -->
          <div class="form-group">
            <label for="authorizer_card_path" class="control-label">
              Kelengkapan Berkas Lainnya 4
            </label>
            <div class="form-control border">
              <button
                class="btn-block d-flex align-items-center justify-content-center border-0"
                @click="openModalUpload('kelengkapan_berkas_lainnya_4')"
              >
                Unggah Dokumen
                <i
                  class="fa fa-spinner fa-spin fa-fw"
                  v-if="document.kelengkapan_berkas_lainnya_4.is_loading"
                ></i>
                <span v-else class="ti-upload ml-2"></span>
              </button>
              <input
                v-show="false"
                type="file"
                class="col-md-11"
                @input="
                  handleFileUpload(
                    'kelengkapan_berkas_lainnya_4',
                    'kelengkapan_berkas_lainnya_4'
                  )
                "
                ref="kelengkapan_berkas_lainnya_4"
              />
            </div>
            <span class="mt-2">
              {{
                document.kelengkapan_berkas_lainnya_4.file_name ||
                  "Not selected"
              }}
            </span>
          </div>

          <!-- Kelengkapan Berkas Lainnya 5 -->
          <div class="form-group">
            <label for="authorizer_card_path" class="control-label">
              Kelengkapan Berkas Lainnya 5
            </label>
            <div class="form-control border">
              <button
                class="btn-block d-flex align-items-center justify-content-center border-0"
                @click="openModalUpload('kelengkapan_berkas_lainnya_5')"
              >
                Unggah Dokumen
                <i
                  class="fa fa-spinner fa-spin fa-fw"
                  v-if="document.kelengkapan_berkas_lainnya_5.is_loading"
                ></i>
                <span v-else class="ti-upload ml-2"></span>
              </button>
              <input
                v-show="false"
                type="file"
                class="col-md-11"
                @input="
                  handleFileUpload(
                    'kelengkapan_berkas_lainnya_5',
                    'kelengkapan_berkas_lainnya_5'
                  )
                "
                ref="kelengkapan_berkas_lainnya_5"
              />
            </div>
            <span class="mt-2">
              {{
                document.kelengkapan_berkas_lainnya_5.file_name ||
                  "Not selected"
              }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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

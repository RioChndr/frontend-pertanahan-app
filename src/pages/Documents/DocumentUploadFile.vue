<script>
import moment from "moment";
import { createSharedLink, downloadFile, uploadFile } from "../../http/dropbox";
import DocumentInputFileService from "./components/DocumentInputFileService";
import { mapState } from "vuex";
import { apiPrintDocument } from "../../http/api";
import jsPDF from "jspdf";

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
      const requiredDocument = [
        "surat_permohonan",
        "bukti_alas_hak",
        "pajak_bumi_dan_bangunan"
      ];

      const uploadedFiles = [];
      this.detailDocument.files.map(v => {
        uploadedFiles.push(v.file_type);
      });

      const result = requiredDocument.map(v => uploadedFiles.includes(v));

      if (result.includes(false)) {
        this.$toast.error("Dokumen yang Anda unggah belum lengkap");
        return;
      }

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
    },
    printRequest() {
      const perLine = 8;
      let pdfFile = this.detailDocument.unique_id;
      const doc = new jsPDF({
        orientation: "potrait"
      });
      doc.text("Kode Berkas ", 15, perLine * 2);
      doc.text(":", 75, perLine * 2);
      doc.text(this.detailDocument.unique_id, 80, perLine * 2);

      doc.text("Pemohon ", 15, perLine * 3);
      doc.text(":", 75, perLine * 3);
      doc.text(this.detailDocument.authorized_name, 80, perLine * 3);

      doc.text("Jenis Pelayanan ", 15, perLine * 4);
      doc.text(":", 75, perLine * 4);
      doc.text(this.detailDocument.service.service_name, 80, perLine * 4);

      // If document have authorizer

      if (this.detailDocument.authorizer_name) {
        doc.text("Pemberi Kuasa ", 15, perLine * 5);
        doc.text(":", 75, perLine * 5);
        doc.text(this.detailDocument.authorizer_name, 80, perLine * 5);
      }

      doc.save(pdfFile + ".pdf");
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
      <div class="col">
        <div class="alert alert-success" role="alert">
          Apabila File PDF Anda terlalu besar, perkecil ukurannya pada
          <a
            href="https://smallpdf.com/compress-pdf"
            target="_blank"
            class="font-weight-bold"
          >
            Link Ini
          </a>
        </div>
      </div>
    </div>

    <div
      class="row"
      v-if="
        document.is_submitted &&
          !detailDocument.is_done &&
          !detailDocument.is_waiting
      "
    >
      <div class="col">
        <div class="alert alert-danger" role="alert">
          <h4 class="alert-heading m-0">Pengajuan Anda Ditolak!</h4>
          <hr />
          <p class="mb-0">
            {{ detailDocument.description }}
          </p>
        </div>
      </div>
    </div>

    <div
      class="row"
      v-if="detailDocument.is_done && !detailDocument.is_waiting"
    >
      <div class="col">
        <div class="alert alert-success" role="alert">
          <h4 class="alert-heading m-0">Pengajuan Anda Diterima!</h4>
          <hr />
          <p class="mb-0">
            {{ detailDocument.description }}
          </p>
        </div>
      </div>
    </div>

    <div class="row">
      <v-loading
        :active.sync="loadingOverlay"
        :can-cancel="false"
        :is-full-page="true"
      ></v-loading>

      <div class="col-lg 6 col-md-6 col-sm-12 mx-2 px-4">
        <div class="form-group">
          <label for="services" class="control-label">
            Kode Berkas
          </label>
          <h4 class="m-0 font-weight-bold d-flex align-items-center">
            {{ detailDocument.unique_id }}
          </h4>
        </div>

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
            {{ detailDocument.service && detailDocument.service.service_name }}
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
        <div class="form-group">
          <button
            class="btn btn-info btn-sm mr-2"
            :disabled="fileLength === 0"
            @click.prevent="submitRequest"
            v-if="!detailDocument.is_submitted"
          >
            <span class="ti-share mr-2"></span>
            Ajukan Permohonan
          </button>

          <button class="btn btn-sm" @click="printRequest">
            <span class="ti-printer mr-2"></span>
            Cetak Permohonan
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
          :service-id="detailDocument.service_id"
          :document-id="detailDocument.unique_id"
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
          :service-id="detailDocument.service_id"
          :document-id="detailDocument.unique_id"
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
          :service-id="detailDocument.service_id"
          :document-id="detailDocument.unique_id"
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
          :service-id="detailDocument.service_id"
          :document-id="detailDocument.unique_id"
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
          :service-id="detailDocument.service_id"
          :document-id="detailDocument.unique_id"
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
          :service-id="detailDocument.service_id"
          :document-id="detailDocument.unique_id"
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
          :service-id="detailDocument.service_id"
          :document-id="detailDocument.unique_id"
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
          :service-id="detailDocument.service_id"
          :document-id="detailDocument.unique_id"
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
          :service-id="detailDocument.service_id"
          :document-id="detailDocument.unique_id"
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
          :service-id="detailDocument.service_id"
          :document-id="detailDocument.unique_id"
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
          :service-id="detailDocument.service_id"
          :document-id="detailDocument.unique_id"
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

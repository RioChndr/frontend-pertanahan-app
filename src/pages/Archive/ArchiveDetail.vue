<template>
  <div class="card">
    <div class="container-fluid py-2">
      <div class="row my-2">
        <div class="col d-flex align-items-center justify-content-center">
          <h4>Proses Permohonan Pelayanan</h4>
        </div>
      </div>
      <hr />
      <div class="row" v-if="!loading_content">
        <div class="col-lg-12 col-md-12">
          <div class="container-fluid px-2">
            <div class="row">
              <div class="col-sm-12 col-md-10 offset-md-1">
                <label-horizontal-vue>
                  <template #left-column> Penerima Kuasa / Pemohon </template>
                  <template #right-column>
                    {{ detail.authorized_name }}
                  </template>
                </label-horizontal-vue>

                <label-horizontal-vue>
                  <template #left-column> Email </template>
                  <template #right-column>
                    {{ detail.email }}
                  </template>
                </label-horizontal-vue>

                <label-horizontal-vue>
                  <template #left-column> Telephone Pemohon / Kuasa </template>
                  <template #right-column>
                    {{ detail.authorized_phone_number }}
                  </template>
                </label-horizontal-vue>

                <label-horizontal-vue v-if="detail.authorizer_name">
                  <template #left-column> Nama Pemberi Kuasa </template>
                  <template #right-column>
                    {{ detail.authorizer_name }}
                  </template>
                </label-horizontal-vue>

                <label-horizontal-vue>
                  <template #left-column> Jenis Hak </template>
                  <template #right-column>
                    {{ detail.type_hak.name }}
                  </template>
                </label-horizontal-vue>

                <label-horizontal-vue>
                  <template #left-column> Nomor Hak </template>
                  <template #right-column>
                    {{ detail.number_hak }}
                  </template>
                </label-horizontal-vue>

                <label-horizontal-vue>
                  <template #left-column> Jenis Pelayanan </template>
                  <template #right-column>
                    {{ detail.service.service_name }}
                  </template>
                </label-horizontal-vue>

                <label-horizontal-vue>
                  <template #left-column> Status </template>
                  <template #right-column>
                    <h4 class="m-0">
                      <span class="badge badge-lg badge-primary">
                        {{ detail.status | getStatusValue }}
                      </span>
                    </h4>
                  </template>
                </label-horizontal-vue>

                <label-horizontal-vue>
                  <template #left-column> Keterangan </template>
                  <template #right-column>
                    <p class="m-0">{{ detail.description || "-" }}</p>
                  </template>
                </label-horizontal-vue>

                <label-horizontal-vue
                  v-if="
                    ['process_submission', 'finish_submission'].includes(
                      detail.status
                    )
                  "
                >
                  <template #left-column> SPS </template>
                  <template #right-column>
                    <a
                      v-if="detail.sps_path"
                      @click="downloadFile(detail.sps_path)"
                      target="_blank"
                      class="d-flex align-items-center"
                      style="cursor: pointer"
                    >
                      <span class="ti-download mr-2"></span>
                      <span>Download</span>
                    </a>
                    <document-input-file
                      v-else
                      properties="sps_path"
                      uploaded-file-name="sps_file"
                      file-url-name="sps"
                      @get-uploaded-url="uploadedUrl"
                      :file-code="form.unique_id"
                    >
                    </document-input-file>
                  </template>
                </label-horizontal-vue>

                <label-horizontal-vue>
                  <template #right-column>
                    <button
                      v-if="detail.status === 'finish_verification'"
                      class="
                        btn btn-danger btn-sm
                        px-4
                        d-flex
                        align-items-center
                      "
                      @click="updateVerificationDone"
                      :disabled="loading_process_submission"
                    >
                      <div v-if="loading_process_submission">
                        <i class="fa fa-spinner fa-spin fa-fw"></i>
                      </div>
                      <div v-else>Proses Permohonan</div>
                    </button>

                    <button
                      v-if="detail.status === 'process_submission'"
                      class="
                        btn btn-danger btn-sm
                        px-4
                        d-flex
                        align-items-center
                      "
                      @click="updateServiceDone"
                      :disabled="loading_finish_submission"
                    >
                      <div v-if="loading_finish_submission">
                        <i class="fa fa-spinner fa-spin fa-fw"></i>
                      </div>
                      <div v-else>SPS Telah tercetak</div>
                    </button>
                  </template>
                </label-horizontal-vue>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 col-md-12">
                <table class="table table-border">
                  <tbody>
                    <tr>
                      <td>KTP Penerima Kuasa / Pemohon</td>
                      <td class="d-flex align-items-center justify-content-end">
                        <DownloadButtonVue
                          :file="{
                            file_path: detail.authorized_card_path,
                          }"
                        />
                      </td>
                    </tr>
                    <tr v-if="detail.authorizer_card_path">
                      <td>KTP Pemberi Kuasa</td>
                      <td class="d-flex align-items-center justify-content-end">
                        <DownloadButtonVue
                          :file="{
                            file_path: detail.authorizer_card_path,
                          }"
                        />
                      </td>
                    </tr>
                    <tr v-for="file in detail.files" :key="file.id">
                      <td>{{ file.file_type }}</td>
                      <td class="d-flex align-items-center justify-content-end">
                        <DownloadButtonVue :file="file" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DownloadButtonVue from "@/components/DownloadButton.vue";
import LabelHorizontalVue from "@/components/LabelHorizontal.vue";
import {
  apiGetDetailDocument,
  apiPostLogsDocuments,
  apiPutDocument,
} from "../../http/api";
import DocumentInputFile from "../Documents/components/DocumentInputFile.vue";
import { downloadFile } from "../../http/dropbox";
export default {
  components: { DownloadButtonVue, LabelHorizontalVue, DocumentInputFile },
  data() {
    return {
      detail: {},
      loadingArchived: false,
      loading_content: true,
      loading_process_submission: false,
      loading_finish_submission: false,

      form: {
        sps_path: null,
        sps_url: null,
        sps_identity: null,
        unique_id: new Date().getTime().toString(),
      },
    };
  },
  async created() {
    try {
      const response = await apiGetDetailDocument(this.$route.params.id);

      if (response.data.success) {
        this.detail = response.data.document;
      }
    } catch (error) {
      this.$toast.error("Terjadi Kesalahan pada Sistem");
    } finally {
      this.loading_content = false;
    }
  },
  methods: {
    downloadFile(path) {
      downloadFile({ filePath: path })
        .then((result) => {
          let link = document.createElement("a");
          link.href = result.result.link;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    uploadedUrl(ref, url) {
      this.form[ref] = url;
    },
    async updateVerificationDone() {
      this.loading_process_submission = true;
      try {
        const response = await apiPostLogsDocuments({
          document_id: this.$route.params.id,
          status: "process_submission",
        });

        if (response.data.success) {
          this.$toast.success("Permohonan Pelayanan di menuju di Proses");

          const detailDocument = await apiGetDetailDocument(
            this.$route.params.id
          );

          if (detailDocument.data.success) {
            this.detail = detailDocument.data.document;
          }
        }
      } catch (error) {
        this.$toast.error("Terjadi kesalahan pada Sistem");
      } finally {
        this.loading_process_submission = false;
      }
    },
    async updateServiceDone() {
      this.loading_finish_submission = true;
      try {
        const response = await apiPostLogsDocuments({
          document_id: this.$route.params.id,
          status: "finish_submission",
        });

        if (response.data.success) {
          const update = apiPutDocument(this.$route.params.id, {
            sps_path: this.form.sps_path,
            status: "finish_submission",
          });

          console.log(update);

          const detailDocument = await apiGetDetailDocument(
            this.$route.params.id
          );

          this.$toast.success("Permohonan Telah Selessai");

          if (detailDocument.data.success) {
            this.detail = detailDocument.data.document;
          }
        }
      } catch (error) {
        this.$toast.error("Terjadi kesalahan pada Sistem");
      } finally {
        this.loading_finish_submission = false;
      }
    },
  },
};
</script>

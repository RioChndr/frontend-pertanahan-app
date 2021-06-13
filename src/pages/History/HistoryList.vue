<template>
  <div class="container-fluid">
    <div class="row mt-2">
      <div class="col-12">
        <h4 class="m-0">Riwayat Permohonan</h4>
      </div>
    </div>
    <hr />
    <div class="row mb-4">
      <div class="col-md-4 col-lg-4 col-sm-12 offset-md-4 offset-lg-4">
        <input
          type="text"
          class="form-control border"
          placeholder="Email / Kode Berkas / No. Unik / Nama Pemohon / Nama Pemberi Kuasa"
          v-model="keyword"
        />
      </div>
    </div>

    <div
      v-infinite-scroll="loadData"
      infinite-scroll-disabled="busy"
      :infinite-scroll-distance="pagination.pageSize"
      class="row mx-1"
    >
      <HistoryItemVue
        v-for="item in documents"
        :key="item.id"
        :document="item"
      />
    </div>

    <div class="row" v-if="loading">
      <div class="col-12 text-center">
        <FacebookLoader :color="'#35495e'" />
      </div>
    </div>

    <div class="row" v-if="!documents.length">
      <div class="col-12 text-center">
        Tidak Terdapat Riwayat Permohonan
      </div>
    </div>

    <modal-vue v-if="displayModal" @close="closeModal">
      <template #header>
        <h4 class="m-0">
          {{ detail.authorized_name }} -
          {{ detail.service.service_name }}
        </h4>
      </template>
      <template #body>
        <div class="container-fluid px-2">
          <div class="row">
            <div class="col-sm-12 col-md-8 offset-md-2">
              <label-horizontal-vue>
                <template #left-column>
                  Penerima Kuasa / Pemohon
                </template>
                <template #right-column>
                  {{ detail.authorized_name }}
                </template>
              </label-horizontal-vue>

              <label-horizontal-vue>
                <template #left-column>
                  Email
                </template>
                <template #right-column>
                  {{ detail.email }}
                </template>
              </label-horizontal-vue>

              <label-horizontal-vue>
                <template #left-column>
                  Telephone Pemohon / Kuasa
                </template>
                <template #right-column>
                  {{ detail.authorized_phone_number }}
                </template>
              </label-horizontal-vue>

              <label-horizontal-vue v-if="detail.authorizer_name">
                <template #left-column>
                  Nama Pemberi Kuasa
                </template>
                <template #right-column>
                  {{ detail.authorizer_name }}
                </template>
              </label-horizontal-vue>

              <label-horizontal-vue>
                <template #left-column>
                  Jenis Pelayanan
                </template>
                <template #right-column>
                  {{ detail.service.service_name }}
                </template>
              </label-horizontal-vue>

              <label-horizontal-vue v-if="!detail.is_waiting">
                <template #left-column>
                  Status
                </template>
                <template #right-column>
                  <h4 class="m-0">
                    <span
                      class="badge badge-lg"
                      :class="{
                        'badge-success': detail.is_done,
                        'badge-danger': !detail.is_done
                      }"
                    >
                      {{ detail.is_done ? "Disetujui" : "Ditolak" }}
                    </span>
                  </h4>
                </template>
              </label-horizontal-vue>

              <label-horizontal-vue>
                <template #left-column>
                  Keterangan
                </template>
                <template #right-column>
                  <p class="m-0">{{ detail.description || "-" }}</p>
                </template>
              </label-horizontal-vue>

              <label-horizontal-vue v-if="!detail.is_waiting">
                <template #right-column>
                  <button
                    class="btn btn-danger btn-sm px-4 d-flex align-items-center"
                    @click="archiveRequest"
                    :disabled="loadingArchived"
                  >
                    <div v-if="loadingArchived">
                      <i class="fa fa-spinner fa-spin fa-fw"></i>
                    </div>
                    <div v-else>
                      <span class="ti-package mr-2"></span>
                      Arsipkan Permohonan
                    </div>
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
                          file_path: detail.authorized_card_path
                        }"
                      />
                      <button
                        class="mx-4 btn btn-sm btn-danger"
                        @click="deleteItem(detail.authorized_card_path)"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  <tr v-if="detail.authorizer_card_path">
                    <td>KTP Pemberi Kuasa</td>
                    <td class="d-flex align-items-center justify-content-end">
                      <DownloadButtonVue
                        :file="{
                          file_path: detail.authorizer_card_path
                        }"
                      />
                      <button
                        class="mx-4 btn btn-sm btn-danger"
                        @click="deleteItem(detail.authorizer_card_path)"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  <tr v-for="file in detail.files" :key="file.id">
                    <td>{{ file.file_type }}</td>
                    <td class="d-flex align-items-center justify-content-end">
                      <DownloadButtonVue :file="file" />
                      <DeleteButtonVue
                        :file-path="file.file_path"
                        :file-id="file.id"
                        :document-id="detail.id"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </template>
    </modal-vue>
  </div>
</template>

<script>
import { mapState } from "vuex";
import HistoryItemVue from "./components/HistoryItem.vue";
import { FacebookLoader } from "vue-spinners-css";
import ModalVue from "../../components/Modal.vue";
import LabelHorizontalVue from "../../components/LabelHorizontal.vue";
import DownloadButtonVue from "../../components/DownloadButton.vue";
import { apiDeleteDocument, apiRemoveFile } from "../../http/api";
import { deleteFile } from "../../http/dropbox";
import DeleteButtonVue from "../../components/DeleteButton.vue";

export default {
  components: {
    HistoryItemVue,
    FacebookLoader,
    ModalVue,
    LabelHorizontalVue,
    DownloadButtonVue,
    DeleteButtonVue
  },
  watch: {
    keyword: function(value) {
      if (value.length >= 3) {
        this.loadData();
      } else if (value.length <= 0) {
        this.loadData();
      }
    }
  },
  data() {
    return {
      keyword: "",
      pagination: {
        page: 0,
        pageSize: 10
      },
      loading: false,
      loadingArchived: false,
      modal: {
        display: false
      },
      busy: false
    };
  },
  created() {
    this.pagination.page = 0;
    this.$store.commit("setListRequestEmpty");
  },
  methods: {
    loadData() {
      this.busy = true;
      this.loading = true;
      this.$store
        .dispatch("apiGetAllRequest", {
          page: this.pagination.page,
          pageSize: this.pagination.pageSize,
          keyword: this.keyword
        })
        .catch(err => {
          this.$toast.error("Terjadi Kesalahan pada Server");
        })
        .finally(() => {
          this.loading = false;
          if (this.documents.length < this.documentLength) {
            this.pagination.page++;
            this.busy = false;
          } else {
            this.busy = true;
          }
        });
    },
    closeModal() {
      this.$store.commit("setDisplayModalDetailHistory", false);
    },
    archiveRequest() {
      const { id } = JSON.parse(
        localStorage.getItem(process.env.VUE_APP_USER_INFO)
      );
      this.loadingArchived = true;
      this.$store
        .dispatch("actionPutDocument", {
          doc_id: this.detail.id,
          form: {
            is_archived: true,
            archived_by: id
          }
        })
        .then(result => {
          this.$toast.success("Permohonan Berhasil di Arsipkan");
          this.$store.commit("setListRequestEmpty");
          return this.$store.dispatch("apiGetAllRequest", {
            page: 0,
            pageSize: this.pagination.pageSize
          });
        })
        .catch(err => {
          console.error(err, "error_archived");
          this.$toast.error("Terjadi Kesalahan Pada Server");
        })
        .finally(() => {
          this.loadingArchived = false;
        });
    },
    deleteItem(filePath, fileId) {
      this.$toast.info("On Progress");
    }
  },
  computed: {
    ...mapState({
      detail: "detailDocument",
      displayModal: "displayModalDetailHistory",
      documents: "documents",
      documentLength: "documentPagination"
    })
  }
};
</script>

<style></style>

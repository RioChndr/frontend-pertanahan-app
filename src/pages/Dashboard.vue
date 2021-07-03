<template>
  <div>
    <!--Stats cards-->

    <div class="row card">
      <div class="col-12">
        <table-component>
          <template #table-title>Daftar Permohonan Pelayanan</template>
          <template #table-search>
            <i class="ti-search"></i>
            <input
              type="text"
              v-model="keywords"
              class="input-field"
              placeholder="Masukan Nomor Hak"
              @keypress.enter="searchItems"
              maxlength="5"
            />
          </template>
          <template #table-filter-status>
            <div class="row mb-4">
              <div class="col-2">Filter Kecamatan</div>
              <div class="col-4">
                <v-select
                  :options="kecamatan"
                  label="nama"
                  :reduce="kecamatan => kecamatan.id"
                  v-model="kecamatan_id"
                  @input="setFilterKelurahan"
                ></v-select>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col-2">Filter Kelurahan</div>
              <div class="col-4">
                <v-select
                  :options="kelurahan"
                  label="nama"
                  :reduce="kelurahan => kelurahan.id"
                  v-model="kelurahan_id"
                  @input="loadMoreData(1)"
                ></v-select>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col-2">Type Hak</div>
              <div class="col-4">
                <v-select
                  :options="type_hak"
                  label="name"
                  :reduce="type_hak => type_hak.id"
                  v-model="type_hak_id"
                  @input="loadMoreData(1)"
                ></v-select>
              </div>
            </div>
          </template>
          <template #table-header>
            <th>Jenis Hak</th>
            <th>No. Hak</th>
            <th>Pemohon</th>
            <th>Jenis Permohonan</th>
            <th>Tanggal Pengajuan</th>
            <th>Status</th>
            <th>Aksi</th>
          </template>
          <template #table-body>
            <tr v-for="item in resultList" :key="item.id">
              <td>{{ item.type_hak.name }}</td>
              <td>{{ item.number_hak }}</td>
              <td>{{ item.authorized_name }}</td>
              <td>{{ item.service.service_name }}</td>
              <td>{{ item.submitted_at | moment("LL") }}</td>
              <td>{{ item.status | getStatusValue }}</td>
              <td>
                <button
                  class="btn btn-sm btn-primary"
                  @click="openDetailRequest(item)"
                >
                  <i class="ti-eye"></i>
                </button>
              </td>
            </tr>
          </template>
          <template #table-pagination>
            <pagination
              v-model="pagination.page"
              :records="pagination.totalData"
              :per-page="pagination.pageSize"
              :options="{ chunk: 5 }"
              @paginate="loadMoreData"
            ></pagination>
          </template>
        </table-component>
      </div>
    </div>

    <modal-vue
      v-if="modal.displayModalDetail"
      @close="modal.displayModalDetail = false"
    >
      <template #header>
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="m-0">
            {{ document.authorized_name }} - {{ document.service.service_name }}
          </h4>
        </div>
      </template>
      <template #body>
        <v-loading
          :active.sync="modal.loading"
          :can-cancel="false"
          :is-full-page="false"
        ></v-loading>
        <div class="row mx-2">
          <div class="col-8">
            <label-horizontal-vue>
              <template #left-column> Penerima Kuasa / Pemohon </template>
              <template #right-column>
                {{ document.authorized_name }}
              </template>
            </label-horizontal-vue>

            <label-horizontal-vue>
              <template #left-column> Email </template>
              <template #right-column>
                {{ document.email }}
              </template>
            </label-horizontal-vue>

            <label-horizontal-vue>
              <template #left-column> Telephone Pemohon / Kuasa </template>
              <template #right-column>
                {{ document.authorized_phone_number }}
              </template>
            </label-horizontal-vue>

            <label-horizontal-vue v-if="document.authorizer_name">
              <template #left-column> Nama Pemberi Kuasa </template>
              <template #right-column>
                {{ document.authorizer_name }}
              </template>
            </label-horizontal-vue>

            <label-horizontal-vue>
              <template #left-column> Alamat </template>
              <template #right-column>
                {{ document.kecamatan_name }}, {{ document.kelurahan_name }}
              </template>
            </label-horizontal-vue>

            <label-horizontal-vue>
              <template #left-column> Jenis Pelayanan </template>
              <template #right-column>
                {{ document.service.service_name }}
              </template>
            </label-horizontal-vue>

            <label-horizontal-vue>
              <template #left-column> Tipe HAK </template>
              <template #right-column>
                {{ document.type_hak.name }}
              </template>
            </label-horizontal-vue>

            <label-horizontal-vue>
              <template #left-column> No. HAK </template>
              <template #right-column>
                {{ document.number_hak }}
              </template>
            </label-horizontal-vue>

            <label-horizontal-vue v-if="document.authorizer_name">
              <template #left-column> Pemberi Kuasa </template>
              <template #right-column>
                {{ document.authorizer_name || "-" }}
              </template>
            </label-horizontal-vue>

            <label-horizontal-vue v-if="document.authorizer_card_identity">
              <template #left-column> Nomor KTP Pemberi Kuasa </template>
              <template #right-column>
                {{ document.authorizer_card_identity || "-" }}
              </template>
            </label-horizontal-vue>
          </div>
          <div class="col-4">
            <div class="row">
              <div class="col-12">
                <textarea
                  name="description"
                  id="description"
                  cols="30"
                  rows="5"
                  class="form-control border"
                  placeholder="Keterangan"
                  v-model="modal.descriptionBox"
                ></textarea>
              </div>
              <div class="col-12 d-flex align-items-center my-2">
                <button
                  class="btn btn-danger flex-fill mx-2"
                  @click="discardRequest"
                >
                  Tolak
                </button>
                <button
                  class="btn btn-primary flex-fill mx-2"
                  @click="acceptRequest"
                >
                  Proses
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                * Proses dilanjutkan apabila Buku Tanah sudah ditemukan
              </div>
            </div>
          </div>
        </div>

        <div class="row mx-2">
          <div class="col">
            <table class="table">
              <tbody>
                <tr>
                  <td>KTP Penerima Kuasa / Pemohon</td>
                  <td>
                    <DownloadButtonVue
                      :file="{
                        file_path: document.authorized_card_path
                      }"
                    />
                  </td>
                </tr>
                <tr v-if="document.authorizer_card_path">
                  <td>KTP Pemberi Kuasa</td>
                  <td>
                    <DownloadButtonVue
                      :file="{
                        file_path: document.authorizer_card_path
                      }"
                    />
                  </td>
                </tr>
                <tr v-for="file in document.files" :key="file.id">
                  <td>{{ file.file_type }}</td>
                  <td>
                    <DownloadButtonVue :file="file" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
    </modal-vue>
  </div>
</template>
<script>
import {
  apiPostArchiveLogs,
  apiPutDocument,
  apiGetArchiveSectionList,
  apiGetDetailDocument,
  apiGetListTypeHak
} from "../http/api";
import Dropdown from "bp-vuejs-dropdown";
import ModalVue from "../components/Modal.vue";
import LabelHorizontalVue from "../components/LabelHorizontal.vue";
import DownloadButtonVue from "../components/DownloadButton.vue";
import TableComponent from "../components/TableComponent.vue";
import Pagination from "vue-pagination-2";
import axios from "axios";

export default {
  components: {
    Dropdown,
    Pagination,
    ModalVue,
    LabelHorizontalVue,
    DownloadButtonVue,
    TableComponent
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      resultList: [],
      requestLength: 0,
      modal: {
        displayModalDetail: false,
        descriptionBox: null,
        loading: false
      },

      pagination: {
        page: 1,
        pageSize: 5,
        loading: false,
        totalData: 0
      },
      keywords: null,
      document: {},

      kecamatan: [],
      kecamatan_id: null,
      kelurahan: [],
      kelurahan_id: null,
      type_hak: [],
      type_hak_id: null
    };
  },
  methods: {
    openDetailRequest(item) {
      const { id } = item;
      apiGetDetailDocument(id)
        .then(result => {
          this.document = result.data.document;
          this.modal.displayModalDetail = true;
        })
        .catch(err => {
          console.error(err);
          this.$toast.error("Terjadi Kesalahan pada Server");
        });
    },
    acceptRequest() {
      this.modal.loading = true;

      apiPutDocument(this.document.id, {
        description: this.modal.descriptionBox,
        status: "finish_verification"
      })
        .then(result => {
          this.modal.descriptionBox = null;
          this.$toast.success("Permohonan berhasil di terima");
          return apiPostArchiveLogs({
            document: this.document.id
          });
        })
        .then(result => {
          console.log(result);
          return apiGetArchiveSectionList(
            this.keywords,
            this.pagination.page,
            this.pagination.pageSize,
            this.kelurahan_id,
            this.type_hak_id
          );
        })
        .then(result => {
          this.pagination.totalData = result.data.data.total;
          this.resultList = result.data.data.results;
        })
        .catch(err => {
          console.error(err);
          this.$toast.error("Terjadi Kesalahan pada Server");
        })
        .finally(() => {
          this.modal.loading = false;
          this.modal.displayModalDetail = false;
        });
    },
    discardRequest() {
      if (!this.modal.descriptionBox) {
        this.$toast.error("Harap isi keterangan Penolakan");
        return;
      }

      this.modal.loading = true;

      apiPutDocument(this.document.id, {
        description: this.modal.descriptionBox,
        status: "reject_submission"
      })
        .then(result => {
          this.modal.descriptionBox = null;
          this.$toast.success("Permohonan berhasil di tolak");
          return apiGetArchiveSectionList(
            this.keywords,
            this.pagination.page,
            this.pagination.pageSize,
            this.kelurahan_id,
            this.type_hak_id
          );
        })
        .then(result => {
          this.pagination.totalData = result.data.data.total;
          this.resultList = result.data.data.results;
        })
        .catch(err => {
          this.$toast.error("Terjadi Kesalahan pada Server");
        })
        .finally(() => {
          this.modal.loading = false;
          this.modal.displayModalDetail = false;
        });
    },
    loadMoreData(params) {
      this.pagination.page = params;

      apiGetArchiveSectionList(
        this.keywords,
        this.pagination.page,
        this.pagination.pageSize,
        this.kelurahan_id,
        this.type_hak_id
      )
        .then(result => {
          if (result.data.success) {
            this.pagination.totalData = result.data.data.total;
            this.resultList = result.data.data.results;
          } else {
            this.pagination.totalData = 0;
            this.resultList = [];
          }
        })
        .catch(err => {
          console.error(err, "error");
        })
        .finally(() => {});
    },
    async searchItems() {
      this.pagination.loading = true;
      try {
        this.pagination.page = 1;
        const response = await apiGetArchiveSectionList(
          this.keywords,
          this.pagination.page,
          this.pagination.pageSize,
          this.kelurahan_id,
          this.type_hak_id
        );

        if (response.data.success) {
          if (response.data.data.total > 0) {
            this.resultList = response.data.data.results;
            this.pagination.totalData = response.data.data.total;
          } else {
            this.resultList = [];
            this.pagination.totalData = 0;
          }
        }
      } catch (error) {
        console.log(error);
        this.$toast.error("Terjadi kesalahan pada Sistem");
      } finally {
        this.pagination.loading = false;
      }
    },
    async setFilterKelurahan(id) {
      const responseKelurahan = await axios.get(
        `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${id}`
      );

      if (responseKelurahan.status === 200) {
        this.kelurahan = responseKelurahan.data.kelurahan;
      }
    }
  },
  created() {
    apiGetArchiveSectionList(
      this.keywords,
      this.pagination.page,
      this.pagination.pageSize,
      this.kelurahan_id,
      this.type_hak_id
    )
      .then(result => {
        if (result.data.success) {
          this.pagination.totalData = result.data.data.total;
          this.resultList = result.data.data.results;
        } else {
          this.pagination.totalData = 0;
          this.resultList = [];
        }

        return axios.get(
          "https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=3273"
        );
      })
      .then(result => {
        if (result.status === 200) {
          this.kecamatan = result.data.kecamatan;
        }
        return apiGetListTypeHak();
      })
      .then(result => {
        if (result.status === 200) {
          this.type_hak = result.data.typeHak;
        }
      })
      .catch(err => {
        console.error(err, "error");
      })
      .finally(() => {});
  }
};
</script>
<style>
.bp-dropdown__body {
  padding: 0 !important;
  margin: 0 !important;
  border-radius: 4px;
}

.card {
  z-index: 0 !important;
}
</style>
<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}

.dropdown-child {
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    padding: 0.65rem 3rem 0.65rem 1rem;
    // margin: 0 1.5rem;

    &:hover {
      background-color: rgba($color: #000000, $alpha: 0.1);
      cursor: pointer;
    }
  }

  hr {
    margin: 0;
  }
}
</style>

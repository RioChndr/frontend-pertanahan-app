<template>
  <div class="container-fluid card">
    <table-component>
      <template #table-title>Daftar Permohonan Pelayanan</template>
      <template #table-search>
        <i class="ti-search"></i>
        <input
          type="text"
          v-model="keyword"
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
              @input="searchItems"
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
              @input="searchItems"
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
        <tr v-for="item in documents" :key="item.id">
          <td>{{ item.type_hak.name }}</td>
          <td>{{ item.number_hak }}</td>
          <td>{{ item.authorized_name }}</td>
          <td>{{ item.service.service_name }}</td>
          <td>{{ item.submitted_at | moment("LL") }}</td>
          <td>{{ item.status | getStatusValue }}</td>
          <td>
            <button
              class="btn btn-sm btn-primary"
              @click="setDisplayModal(item.id)"
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
          @paginate="callPagination"
        ></pagination>
      </template>
    </table-component>

    <submission-modal
      :detail="detail"
      :display-modal="displayModal"
      @update-verification-done="updateVerificationDone"
      @close="displayModal = false"
      :loading-archived="loadingArchived"
    ></submission-modal>
  </div>
</template>

<script>
import SubmissionModal from "./components/SubmissionModal.vue";
import { FacebookLoader } from "vue-spinners-css";
import {
  apiGetDetailDocument,
  apiPostLogsDocuments,
  apiGetListFinishVerification,
  apiGetListTypeHak
} from "../../http/api";
import Pagination from "vue-pagination-2";
import TableComponent from "../../components/TableComponent.vue";
import axios from "axios";

export default {
  components: {
    FacebookLoader,
    Pagination,
    SubmissionModal,
    TableComponent
  },
  data() {
    return {
      keyword: "",
      pagination: {
        page: 1,
        pageSize: 5,
        totalData: 0
      },
      loading: false,
      loadingArchived: false,
      modal: {
        display: false
      },
      data: [],
      displayModal: false,
      detail: null,
      kecamatan: [],
      kecamatan_id: null,
      kelurahan: [],
      kelurahan_id: null,
      type_hak: [],
      type_hak_id: null
    };
  },
  created() {
    apiGetListFinishVerification(
      this.keyword,
      this.pagination.page,
      this.pagination.pageSize,
      this.kecamatan_id,
      this.type_hak_id
    )
      .then(result => {
        if (result.data.success) {
          this.data = result.data.data.results;
          this.pagination.totalData = result.data.data.total;
        } else {
          this.data = [];
          this.pagination.totalData = 0;
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
        console.log(err);
        this.$toast.error("Terjadi kesalahan pada Sistem");
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    loadData() {
      this.pagination.page = 1;
      apiGetListFinishVerification(
        this.keyword,
        this.pagination.page,
        this.pagination.pageSize
      )
        .then(result => {
          if (result.data.success) {
            this.data = result.data.data.results;
            this.pagination.totalData = result.data.data.total;
          } else {
            this.data = [];
            this.pagination.totalData = 0;
          }
        })
        .catch(err => {
          console.log(err);
          this.$toast.error("Terjadi kesalahan pada Sistem");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    closeModal() {
      this.$store.commit("setDisplayModalDetailHistory", false);
    },
    updateVerificationDone() {
      this.loadingArchived = true;
      apiPostLogsDocuments({
        document_id: this.detail.id,
        status: "process_submission"
      })
        .then(result => {
          if (result.data.success) {
            this.$toast.success("Permohonan Selesai di Verifikasi");
            this.loadData();
          }
        })
        .catch(err => {
          console.error(err, "error_archived");
          this.$toast.error("Terjadi Kesalahan Pada Server");
        })
        .finally(() => {
          this.displayModal = false;
          this.loadingArchived = false;
        });
    },
    setDisplayModal(id) {
      apiGetDetailDocument(id)
        .then(result => {
          this.detail = result.data.document;
        })
        .catch(err => {
          this.$toast.error("Terjadi Kesalahan pada Sistem");
        })
        .finally(() => {
          this.displayModal = true;
        });
    },
    callPagination(params) {
      this.pagination.page = params;
      apiGetListFinishVerification(
        this.keyword,
        this.pagination.page,
        this.pagination.pageSize,
        this.kecamatan_id,
        this.type_hak_id
      )
        .then(result => {
          if (result.data.success) {
            this.data = result.data.data.results;
            this.pagination.totalData = result.data.data.total;
          } else {
            this.data = [];
            this.pagination.totalData = 0;
          }
        })
        .catch(err => {
          console.log(err);
          this.$toast.error("Terjadi kesalahan pada Sistem");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    searchItems() {
      apiGetListFinishVerification(
        this.keyword,
        this.pagination.page,
        this.pagination.pageSize,
        this.kecamatan_id,
        this.type_hak_id
      )
        .then(result => {
          if (result.data.success) {
            this.data = result.data.data.results;
            this.pagination.totalData = result.data.data.total;
          } else {
            this.data = [];
            this.pagination.totalData = 0;
          }
        })
        .catch(err => {
          console.log(err);
          this.$toast.error("Terjadi kesalahan pada Sistem");
        })
        .finally(() => {
          this.loading = false;
        });
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
  computed: {
    documents() {
      return this.data;
    }
  }
};
</script>

<style></style>

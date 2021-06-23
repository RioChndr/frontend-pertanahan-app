<template>
  <div class="row">
    <div class="col-12">
      <card :title="table.title" :subTitle="table.subTitle">
        <div slot="raw-content" class="table-responsive">
          <table class="table">
            <thead>
              <th v-for="column in table.columns" :key="column.val">
                {{ column.title }}
              </th>
            </thead>
            <tbody>
              <tr v-for="item in table.data" :key="item.id">
                <td style="width: 30%">
                  {{ item.document.service.service_name }} [
                  <strong>{{ item.document_type | deliveryType }}</strong>
                  ]
                </td>
                <td style="width: 20%">{{ item.receipent_name }}</td>
                <td style="width: 10%">
                  {{ item.last_status }}
                </td>
                <td style="width: 25%">{{ item.courir || "-" }}</td>
                <td style="width: 15%">
                  <button
                    v-if="item.last_status !== 'submit' || roleId === 3"
                    type="button"
                    class="btn btn-primary btn-sm"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Detail &amp; Assign Kurir"
                    @click="openDetail(item)"
                  >
                    <span class="ti-eye"></span>
                  </button>
                  <button
                    v-if="item.last_status === 'submit' && roleId === 2"
                    class="btn btn-sm btn-info"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Process Permohonan"
                    @click="approveDeliveryService(item)"
                  >
                    <span class="ti-check"></span>
                  </button>

                  <button
                    v-if="item.last_status === 'sent' && roleId === 2"
                    class="btn btn-sm btn-info ml-2"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Konfirmasi Berkas telah Tiba"
                    @click="approveDocumentsArrive(item)"
                  >
                    <span class="ti-check"></span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <div class="row">
            <div class="col-12 mx-4">
              <pagination
                v-model="pagination.page"
                :records="pagination.totalData"
                :per-page="pagination.pageSize"
                :options="{ chunk: 5 }"
                @paginate="callPagination"
              />
            </div>
          </div>

          <v-loading
            :active.sync="pagination.loading"
            :can-cancel="false"
            :is-full-page="false"
          ></v-loading>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import Pagination from "vue-pagination-2";
import {
  apiGetListDeliveryServices,
  apiPostDeliveryLogs,
} from "../../http/api";
const tableColumns = [
  { val: "service", title: "Pelayanan" },
  { val: "type", title: "Penerima Kuasa" },
  { val: "last_status", title: "Status" },
  { val: "courir", title: "Kurir" },
  { val: "action", title: "Aksi" },
];

export default {
  components: {
    Pagination,
  },
  filters: {
    deliveryType(value) {
      if (value === "documents") {
        return "Penjemputan";
      } else if (value === "certificate") {
        return "Pengiriman";
      } else {
        return "Ekspedisi";
      }
    },
  },
  data() {
    return {
      table: {
        title: "Daftar Riwayat dan Progress Pengiriman",
        columns: [...tableColumns],
        data: [],
      },

      pagination: {
        page: 1,
        pageSize: 5,
        loading: false,
        totalData: 0,
      },

      roleId: JSON.parse(localStorage.getItem(process.env.VUE_APP_USER_INFO))
        .role_id,
    };
  },
  methods: {
    openDetail(value) {
      this.$router.push({ name: "delivery.detail", params: { id: value.id } });
    },
    async load_more_data() {
      this.pagination.loading = true;
      try {
        const response = await apiGetListDeliveryServices(
          this.pagination.page,
          this.pagination.pageSize
        );

        if (response.data.success) {
          this.table.data = response.data.data.results;
          this.pagination.totalData = response.data.data.total;
        }
      } catch (error) {
        this.$toast.error("terjadi kesalahan pada sistem");
      } finally {
        this.pagination.loading = false;
      }
    },
    callPagination(params) {
      this.pagination.page = params;
      this.load_more_data();
    },
    approveDeliveryService(params) {
      const self = this;
      const type =
        params.document_type === "documents"
          ? "Penjemputan Berkas"
          : "Pengiriman Berkas";
      const message = `Proses ${type} untuk Layanan ${params.document.service.service_name} ?`;

      this.$dialog({
        title: "Informasi",
        content: message,
        btns: [
          {
            label: "OK",
            color: "#09f",
            callback: () => {
              self.approveEkspedisiBerkas(params, type);
            },
          },
          {
            label: "Cancel",
            color: "#444",
            ghost: true,
          },
        ],
      });
    },
    async approveEkspedisiBerkas(params, type, action) {
      this.pagination.loading = true;

      try {
        let message = null;
        const documentId = params.id;
        const response = await apiPostDeliveryLogs({
          status: action,
          delivery_id: parseInt(documentId),
        });
        if (action === "deliver") {
          message = `Berkas ${type} Telah diterima`;
        } else {
          message = `Permohonan ${type} Berhasil di Proses !.`;
        }

        if (response.data.success) {
          this.$dialog({
            title: "Informasi",
            content: message,
            btns: [
              {
                label: "OK",
                color: "#09f",
              },
              {
                label: "Cancel",
                color: "#444",
                ghost: true,
              },
            ],
          });
        }
      } catch (error) {
        this.$toast.error("Terjadi kesalahan pada Sistem");
      } finally {
        this.load_more_data();
      }
    },
    approveDeliveryService(params) {
      const self = this;
      const type =
        params.document_type === "documents"
          ? "Penjemputan Berkas"
          : "Pengiriman Berkas";
      const message = `Proses ${type} untuk Layanan ${params.document.service.service_name} ?`;

      this.$dialog({
        title: "Informasi",
        content: message,
        btns: [
          {
            label: "OK",
            color: "#09f",
            callback: () => {
              self.approveEkspedisiBerkas(params, type, "process");
            },
          },
          {
            label: "Cancel",
            color: "#444",
            ghost: true,
          },
        ],
      });
    },
    approveDocumentsArrive(params) {
      const self = this;
      const type =
        params.document_type === "documents"
          ? "Penjemputan Berkas"
          : "Pengiriman Berkas";
      const message = `${type} untuk Layanan ${params.document.service.service_name} telah Selesai. Berkas telah diterima.`;

      this.$dialog({
        title: "Informasi",
        content: message,
        btns: [
          {
            label: "OK",
            color: "#09f",
            callback: () => {
              self.approveEkspedisiBerkas(params, type, "deliver");
            },
          },
          {
            label: "Cancel",
            color: "#444",
            ghost: true,
          },
        ],
      });
    },
  },
  mounted() {
    this.load_more_data();
  },
};
</script>
<style lang="scss">
.dialog {
  .contet {
    margin-bottom: 0px !important;
  }
}
</style>

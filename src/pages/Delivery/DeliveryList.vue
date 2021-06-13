<template>
  <div class="row">
    <div class="col-12">
      <card :title="table.title" :subTitle="table.subTitle">
        <div slot="raw-content" class="table-responsive">
          <paper-table
            :data="table.data"
            :columns="table.columns"
            @click="openDetail"
          >
          </paper-table>
          <v-loading
            :active.sync="pagination.loading"
            :can-cancel="false"
            :is-full-page="false"
          ></v-loading>
        </div>
        <div slot="footer">
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-end">
              <li
                class="page-item"
                :class="{ disabled: pagination.page === 1 }"
              >
                <a class="page-link" @click.prevent="load_more_data('add')">
                  Previous
                </a>
              </li>
              <li
                class="page-item"
                :class="{ disabled: disabledButtonPagination }"
              >
                <a class="page-link" @click.prevent="load_more_data('remove')">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { PaperTable } from "@/components";
import { apiGetListDeliveryServices } from "../../http/api";
const tableColumns = [
  { val: "service", title: "Pelayanan" },
  { val: "type", title: "Jenis Berkas" },
  { val: "last_status", title: "Status" },
  { val: "courir", title: "Kurir" },
  { val: "action", title: "Detail" },
];

export default {
  components: {
    PaperTable,
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
      },
    };
  },
  methods: {
    openDetail(value) {
      this.$router.push({ name: "delivery.detail", params: { id: value.id } });
    },
    async load_more_data(options) {
      if (options === "add") {
        this.pagination.page++;
      } else {
        this.pagination.page--;
      }

      try {
        const response = await apiGetListDeliveryServices(
          this.pagination.page,
          this.pagination.pageSize
        );

        if (response.data.success) {
          response.data.data.results.map((v) => {
            self.table.data.push({
              id: v.id,
              service: v.document.service.service_name,
              type: v.document_type,
              last_status: v.last_status,
              courir: v.courir_info ? v.courir_info.name : "-",
            });
          });
        }
      } catch (error) {
        this.$toast.error("terjadi kesalahan pada sistem");
      }
    },
  },
  async mounted() {
    const self = this;
    try {
      const response = await apiGetListDeliveryServices(
        this.pagination.page,
        this.pagination.pageSize
      );

      if (response.data.success) {
        response.data.data.results.map((v) => {
          self.table.data.push({
            id: v.id,
            service: v.document.service.service_name,
            type: v.document_type,
            last_status: v.last_status,
            courir: v.courir_info ? v.courir_info.name : "-",
          });
        });
      }
    } catch (error) {
      this.$toast.error("terjadi kesalahan pada sistem");
    }
  },
  computed: {
    disabledButtonPagination() {
      const data_length = this.table.data.length;
      if (data_length > 0) {
        return false;
      } else {
        const response_length = this.table.data.total;

        return true;
      }
    },
  },
};
</script>
<style>
</style>

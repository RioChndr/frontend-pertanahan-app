<template>
  <div class="card">
    <div class="container-fluid py-2">
      <div class="row my-2">
        <div class="col d-flex align-items-center justify-content-center">
          <h4>Proses Ekspedisi Buku Tanah</h4>
        </div>
      </div>
      <hr />
      <div class="row" v-if="!loading_content">
        <div class="col-lg-12 col-md-12">
          <div class="container-fluid px-2">
            <div class="row px-4">
              <div class="col-sm-5 col-lg-5 border">
                <label-horizontal-vue>
                  <template #left-column> Nomor Hak </template>
                  <template #right-column>
                    {{ detail.document_detail.number_hak }}
                  </template>
                </label-horizontal-vue>
                <label-horizontal-vue>
                  <template #left-column> Kode. Berkas </template>
                  <template #right-column>
                    {{ detail.document_detail.unique_id }}
                  </template>
                </label-horizontal-vue>
                <label-horizontal-vue>
                  <template #left-column> Jenis Permohonan </template>
                  <template #right-column>
                    {{ detail.document_detail.service.service_name }}
                  </template>
                </label-horizontal-vue>
                <label-horizontal-vue>
                  <template #left-column> Tipe Hak </template>
                  <template #right-column>
                    {{ detail.document_detail.type_hak.name }}
                  </template>
                </label-horizontal-vue>
              </div>
              <div class="col-md-6 col-lg-6 border mx-4">
                <label-horizontal-vue>
                  <template #left-column> Dibuat Oleh [ Arsip ] </template>
                  <template #right-column v-if="detail.created_by_detail">
                    {{ detail.created_by_detail.full_name }}
                    [ {{ detail.created_at | moment("LL") }} ]
                  </template>
                </label-horizontal-vue>
                <label-horizontal-vue>
                  <template #left-column>
                    Diambil Oleh [ Back Office ]</template
                  >
                  <template #right-column v-if="detail.pickup_by_detail">
                    {{ detail.pickup_by_detail.full_name }}
                    [ {{ detail.pickup_at | moment("LL") }} ]
                  </template>
                </label-horizontal-vue>
                <label-horizontal-vue>
                  <template #left-column> Diserahkan Oleh [ Arsip ] </template>
                  <template #right-column v-if="detail.approved_by_detail">
                    {{ detail.approved_by_detail.full_name }}
                    [ {{ detail.approved_at | moment("LL") }} ]
                  </template>
                </label-horizontal-vue>
                <label-horizontal-vue>
                  <template #left-column>
                    Dikembalikan Oleh [ Back Office ]</template
                  >
                  <template #right-column v-if="detail.return_by_detail">
                    {{ detail.return_by_detail.full_name }}
                    [ {{ detail.return_at | moment("LL") }} ]
                  </template>
                </label-horizontal-vue>
                <label-horizontal-vue>
                  <template #left-column> Diterima Oleh [ Arsip ]</template>
                  <template #right-column v-if="detail.accepted_by_detail">
                    {{ detail.accepted_by_detail.full_name }}
                    [ {{ detail.accepted_at | moment("LL") }} ]
                  </template>
                </label-horizontal-vue>
              </div>
            </div>

            <div class="row my-4" v-if="user_info.role_id === 1">
              <div class="col-lg-12 col-md-12 offset-lg-4">
                <button
                  @click="
                    updateArchiveLogs('approved_by', 'approved_at', 'picked_up')
                  "
                  class="btn btn-sm btn-primary"
                  v-if="detail.status === 'pick_up'"
                >
                  Serahkan Buku Tanah
                </button>
                <button
                  @click="
                    updateArchiveLogs(
                      'accepted_by',
                      'accepted_at',
                      'file_returned'
                    )
                  "
                  class="btn btn-sm btn-primary mx-2"
                  v-if="detail.status === 'return_file'"
                >
                  Terima Buku Tanah
                </button>
              </div>
            </div>
            <div class="row my-4" v-if="user_info.role_id === 4">
              <div class="col-lg-12 col-md-12 offset-lg-4">
                <button
                  @click="
                    updateArchiveLogs('pickup_by', 'pickup_at', 'pick_up')
                  "
                  class="btn btn-sm btn-primary"
                  v-if="detail.status === 'found'"
                >
                  Ambil Buku Tanah
                </button>
                <button
                  @click="
                    updateArchiveLogs('return_by', 'return_at', 'return_file')
                  "
                  class="btn btn-sm btn-primary"
                  v-if="detail.status === 'picked_up'"
                >
                  Kembalikan Buku Tanah
                </button>
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
import { apiGetDetailArchiveLogs, apiPutArchiveLogs } from "../../http/api";
import DocumentInputFile from "../Documents/components/DocumentInputFile.vue";
import TableComponent from "../../components/TableComponent.vue";
export default {
  components: {
    DownloadButtonVue,
    LabelHorizontalVue,
    DocumentInputFile,
    TableComponent
  },
  data() {
    return {
      detail: {},
      loading_content: false,
      user_info: JSON.parse(localStorage.getItem(process.env.VUE_APP_USER_INFO))
    };
  },
  async created() {
    this.loading_content = true;
    try {
      const response = await apiGetDetailArchiveLogs(this.$route.params.id);
      console.log(response);

      if (response.data.success) {
        this.detail = response.data.data;
      }
    } catch (error) {
      this.$toast.error("Terjadi Kesalahan pada Sistem");
    } finally {
      this.loading_content = false;
    }
  },
  methods: {
    async updateArchiveLogs(user, time, status) {
      const formBody = {};

      formBody[user] = this.user_info.id;
      formBody[time] = new Date().toISOString();
      formBody.status = status;

      const response = await apiPutArchiveLogs(this.$route.params.id, formBody);

      if (response.data.success) {
        this.detail = response.data.data;
        this.$toast.success("Data Berhasil di Update");
      }
    }
  }
};
</script>

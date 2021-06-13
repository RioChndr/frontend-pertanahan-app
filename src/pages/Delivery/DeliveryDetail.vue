<template>
  <div class="container-fluid" v-if="!loading_content">
    <div class="row">
      <div class="col d-flex align-items-center">
        <router-link to="/delivery" class="d-flex align-items-center">
          <div class="ti-arrow-left mr-2"></div>
          Kembali
        </router-link>
        <h3 class="m-0 ml-4">Detail Pengiriman Berkas</h3>
      </div>
    </div>
    <div class="row my-2">
      <div class="col-lg-6 col-md-6 col-sm-12 mb-2">
        <div class="border rounded px-2 py-1">
          <div class="row">
            <div class="col-5">
              <div class="row">
                <div class="col">
                  <strong><p>Detail Pengiriman</p></strong>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 col-lg-12">
                  <div class="form-group">
                    <label for="">Nama Penerima</label>
                    <p>{{ detail.receipent_name }}</p>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 col-lg-12">
                  <div class="form-group">
                    <label for="">Nomor Handphone Penerima</label>
                    <p>{{ detail.receipent_phone_number }}</p>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 col-lg-12">
                  <div class="form-group">
                    <label for="">Email Penerima</label>
                    <p>{{ detail.receipent_email }}</p>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 col-lg-12">
                  <div class="form-group">
                    <label for="">Alamat Penerima</label>
                    <p>{{ detail.receipent_address }}</p>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 col-lg-12">
                  <div class="form-group">
                    <label for="">Deskripsi Singkat</label>
                    <p>{{ detail.description }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-7">
              <div class="row">
                <div class="col-12">
                  <strong>
                    <p>History Pengiriman</p>
                  </strong>
                  <ul>
                    <li v-for="log in detail.logs" :key="log.id">
                      <span class="badge badge-success">{{ log.status }}</span>
                      -
                      <span>[ {{ log.created_at | moment("lll") }} ] </span>
                      <span>{{ log.description }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12">
        <div class="border rounded px-2 py-1 mb-2">
          <strong>
            <p>Keterangan</p>
          </strong>

          <div class="row">
            <div class="col">
              <ul>
                <li>
                  Biaya Pengiriman Berkas dari Kantor BPN kepada Pemohon adalah
                  Sebesar <strong>Rp. 50.000,-</strong>
                </li>
                <li>
                  Biaya Pengiriman Dibayarkan ketika Pemohon / Penerima Berkas
                  telah menerima Berkas
                </li>
                <li>
                  Untuk saat ini, Biaya pengiriman hanya dapat dibayarkan secara
                  Cash
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="border rounded px-2 py-1">
          <strong>
            <p>Detail Permohonan</p>
          </strong>

          <div class="row">
            <div class="col-lg-5">
              <div class="form-group">
                <label for="">Jenis Pelayanan</label>
              </div>
            </div>
            <div class="col-lg-7">
              <p>{{ detail.document.service.service_name }}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-5">
              <div class="form-group">
                <label for="">Nama Pemohon</label>
              </div>
            </div>
            <div class="col-lg-7">
              <p>{{ detail.document.authorized_name }}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-5">
              <div class="form-group">
                <label for="">Kecamatan</label>
              </div>
            </div>
            <div class="col-lg-7">
              <p>{{ detail.document.kecamatan_name }}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-5">
              <div class="form-group">
                <label for="">Kelurahan</label>
              </div>
            </div>
            <div class="col-lg-7">
              <p>{{ detail.document.kelurahan_name }}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-5">
              <div class="form-group">
                <label for="">Tipe Hak</label>
              </div>
            </div>
            <div class="col-lg-7">
              <p>{{ detail.document.type_hak.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid" v-else>
    <div class="d-flex align-items-center justify-content-center">
      <label for="">Loading Detail Berkas ...</label>
    </div>
  </div>
</template>

<script>
import {
  apiGetDeliveryDetail,
  apiRequestDeliveryServices,
} from "../../http/api";
export default {
  data() {
    return {
      form: {
        receipent: null,
        receipent_phone_number: null,
        receipent_address: null,
        receipent_email: null,
        description: null,
      },

      detail: null,

      loading_content: true,

      loading_button: false,
    };
  },

  async mounted() {
    try {
      const documentId = this.$route.params.id;
      const detail = await apiGetDeliveryDetail(documentId);

      if (detail.data.success) {
        this.detail = detail.data.data;
      }
    } catch (error) {
      this.$toast.error("Terjadi kesalahan pada Sistem");
    } finally {
      this.loading_content = false;
    }
  },

  methods: {
    async sendDocument() {
      this.loading_button = true;
      try {
        const _obj = {
          receipent_name: this.form.receipent,
          receipent_email: this.form.receipent_email,
          receipent_address: this.form.receipent_address,
          receipent_phone_number: this.form.receipent_phone_number,
          description: this.form.description,
          document_id: this.$route.params.document_id,
          document_type: "certificate",
        };

        const response = await apiRequestDeliveryServices(_obj);
        if (response.data.success) {
          this.$toast.success("Permohoan Pengiriman Berkas berhasil diajukan");
        }
      } catch (error) {
        console.error(error);
        this.$toast.error("Terjadi kesalahan pada Sistem");
      } finally {
        this.loading_button = false;
      }
    },
  },
};
</script>

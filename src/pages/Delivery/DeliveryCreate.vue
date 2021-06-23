<template>
  <div class="card container-fluid py-4" v-if="!loading_content">
    <div class="row">
      <div class="col">
        <h3 class="m-0">Detail {{ deliveryType }}</h3>
      </div>
    </div>
    <div class="row my-2">
      <div class="col-lg-6 col-md-6 col-sm-12 mb-2">
        <div class="border rounded px-2 py-1">
          <strong>
            <p>Detail Pemohon {{ deliveryType }}</p>
          </strong>

          <div class="row">
            <div class="col-md-6 col-lg-6">
              <div class="form-group">
                <fg-input
                  type="text"
                  label="Nama Penerima"
                  placeholder="Nama Penerima Berkas"
                  v-model="form.receipent"
                ></fg-input>
              </div>
            </div>
            <div class="col-md-6 col-lg-6">
              <div class="form-group">
                <fg-input
                  type="text"
                  :is-number="true"
                  label="Nomor Handphone Penerima"
                  placeholder="Nomor Handphone Penerima Berkas"
                  v-model="form.receipent_phone_number"
                ></fg-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-lg-12">
              <div class="form-group">
                <fg-input
                  type="text"
                  label="Email Penerima"
                  placeholder="Email Penerima Berkas"
                  v-model="form.receipent_email"
                ></fg-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-lg-12">
              <div class="form-group">
                <label for="">Alamat Penerima</label>
                <textarea
                  rows="5"
                  class="form-control border-input"
                  placeholder="Alamat Penerima Berkas"
                  v-model="form.receipent_address"
                >
                </textarea>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-lg-12">
              <div class="form-group">
                <label for="">Deskripsi Singkat</label>
                <textarea
                  rows="2"
                  class="form-control border-input"
                  placeholder="Ex : Gang Toko Belok Kiri"
                  v-model="form.description"
                >
                </textarea>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg d-flex">
              <button
                class="px-4 btn btn-sm btn-primary mb-2"
                :disabled="loading_button"
                @click.prevent="sendDocument"
              >
                {{ buttonText }}
                <i
                  class="fa fa-spinner fa-spin fa-fw"
                  v-if="loading_button"
                ></i>
              </button>
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
              <p>{{ detail.service.service_name }}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-5">
              <div class="form-group">
                <label for="">Nama Pemohon</label>
              </div>
            </div>
            <div class="col-lg-7">
              <p>{{ detail.authorized_name }}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-5">
              <div class="form-group">
                <label for="">Kecamatan</label>
              </div>
            </div>
            <div class="col-lg-7">
              <p>{{ detail.kecamatan_name }}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-5">
              <div class="form-group">
                <label for="">Kelurahan</label>
              </div>
            </div>
            <div class="col-lg-7">
              <p>{{ detail.kelurahan_name }}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-5">
              <div class="form-group">
                <label for="">Tipe Hak</label>
              </div>
            </div>
            <div class="col-lg-7">
              <p>{{ detail.type_hak.name }}</p>
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
  apiGetDetailDocument,
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
      const documentId = this.$route.params.document_id;
      const detail = await apiGetDetailDocument(documentId);

      if (detail.data.success) {
        this.detail = detail.data.document;
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
          document_type: this.$route.query.type,
        };

        const response = await apiRequestDeliveryServices(_obj);
        if (response.data.success) {
          this.$toast.success("Permohoan Pengiriman Berkas berhasil diajukan");
          setTimeout(() => {
            this.$router.push({ name: "delivery.list" });
          }, 2000);
        }
      } catch (error) {
        console.error(error);
        this.$toast.error("Terjadi kesalahan pada Sistem");
      } finally {
        this.loading_button = false;
      }
    },
  },

  computed: {
    deliveryType() {
      if (this.$route.query.type === "documents") {
        return "Penjemputan Berkas";
      } else if (this.$route.query.type === "certificate") {
        return "Pengiriman Berkas";
      } else {
        return "Pengiriman";
      }
    },

    buttonText() {
      if (this.$route.query.type === "documents") {
        return "Jemput Berkas";
      } else if (this.$route.query.type === "certificate") {
        return "Kirim Berkas";
      } else {
        return "Aksi";
      }
    },
  },
};
</script>

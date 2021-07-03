<template>
  <div class="container-fluid">
    <h4 class="m-0">{{ deliveryType }}</h4>
    <hr />
    <div class="row">
      <div class="col-lg-6 col-sm-6 mb-2">
        <div class="border rounded px-3 py-2">
          <strong class="mb-2">
            <p>Pilih Jadwal {{ deliveryType }}</p>
          </strong>
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="form-group row d-flex align-items-center">
                <div class="col-4">
                  <label class="control-label m-0">Jadwal Pengambilan</label>
                </div>
                <div class="col-8">
                  <datepicker v-model="date" :min="min_date"></datepicker>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-if="display_button">
            <div class="col-lg-12 col-md-12">
              <div class="form-group row d-flex align-items-center">
                <div class="col-8 offset-4">
                  <button
                    type="buttin"
                    class="btn btn-sm btn-primary"
                    @click.prevent="updateDocument"
                  >
                    Buat Jadwal
                    <i
                      class="fa fa-spinner fa-spin fa-fw my-1"
                      v-if="loading"
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-sm-6">
        <div class="border rounded px-3 py-2">
          <strong class="mb-2"><p>Keterangan</p></strong>
          <ul>
            <li>
              Pengiriman / Pengambilan Berkas / Sertifikat oleh Pribadi dibatasi
              1 hari maksimal sampai dengan 500 Pemohon
            </li>
            <li>
              Nomor Antrian pengambilan disesuaikan dengan Antrian yang ada di
              Kantor ATR/BPN Kota Bandung
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import datepicker from "vue-date";
import moment from "moment";
import {
  apiGetCheckSchedule,
  apiPutDocument,
  apiUpdateDeliverDocument
} from "../../http/api";
export default {
  data() {
    return {
      min_date: moment()
        .add(1, "days")
        .format("y-MM-D"),
      date: moment()
        .add(1, "days")
        .format("y-MM-D"),
      display_button: false,
      loading: false
    };
  },
  components: {
    datepicker
  },
  watch: {
    date(value) {
      let type;
      if (this.$route.query.type === "documents") {
        type = "delivery";
      } else if (this.$route.query.type === "certificate") {
        type = "pickup";
      }

      apiGetCheckSchedule(value, type)
        .then(result => {
          if (result.data.success) {
            if (result.data.data.total < 100) {
              this.display_button = true;
              return;
            }
            this.$toast.error(
              "Jadwal tersebut sudah penuh, pilih tanggal lain"
            );
          }
        })
        .catch(err => {
          this.$toast.error("Terjadi kesalahan pada Sistem");
        });
    }
  },
  methods: {
    async updateDocument() {
      this.loading = true;
      try {
        let params = {};
        if (this.$route.query.type === "documents") {
          params.delivery_schedule = this.date;
        } else if (this.$route.query.type === "certificate") {
          params.pickup_schedule = this.date;
        }
        const updated = await apiUpdateDeliverDocument(
          this.$route.params.document_id,
          params
        );
        if (updated.data.success) {
          this.$toast.success(updated.data.message);
          setTimeout(() => {
            this.$router.push({
              name: "upload-file",
              params: {
                id: this.$route.params.document_id
              }
            });
          }, 500);
        }
      } catch (error) {
        this.$toast.error("Terjadi kesalahan pada Sistem");
      } finally {
        this.loading = false;
      }
    }
  },
  computed: {
    deliveryType() {
      if (this.$route.query.type === "documents") {
        return "Pengantaran Berkas Sendiri";
      } else if (this.$route.query.type === "certificate") {
        return "Pengambilan Berkas Sendiri";
      } else {
        return "Pengambilan";
      }
    },

    buttonText() {
      if (this.$route.query.type === "documents") {
        return "Pengantaran Berkas Sendiri";
      } else if (this.$route.query.type === "certificate") {
        return "Pengiriman Berkas Sendiri";
      } else {
        return "Aksi";
      }
    }
  }
};
</script>

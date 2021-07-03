<template>
  <div class="container-fluid">
    <div class="d-flex align-items-center justify-content-between">
      <span>Buat Permohonan</span>
    </div>
    <div class="container-body">
      <div class="row">
        <div class="col-lg col-md col-sm">
          <div class="border py-2 px-2 mb-4">
            <div class="my-4 ml-2">
              <u>Keterangan Jenis Permohonan</u>
            </div>
            <div class="row">
              <div class="col-lg-4 col-md-4 col-sm-12">
                <div class="form-group">
                  <label for="services" class="control-label">
                    Jenis Layanan
                  </label>
                  <label style="color: red">
                    <i><sup>* Mandatory</sup></i>
                  </label>
                  <v-select
                    @input="displayFormMortgage"
                    :options="services"
                    label="service_name"
                    :reduce="(service) => service"
                  ></v-select>
                </div>
              </div>

              <div class="col-lg-4 col-md-4 col-sm-12">
                <div class="form-group">
                  <label for="services" class="control-label"> Tipe HAK </label>
                  <label style="color: red">
                    <i><sup>* Mandatory</sup></i>
                  </label>
                  <v-select
                    :options="list_type_hak"
                    label="name"
                    :reduce="(type_hak) => type_hak.id"
                    v-model="form.type_hak_id"
                  ></v-select>
                </div>
              </div>

              <div class="col-lg-4 col-md-4 col-sm-12" v-if="display_form_mortgage">
                <div class="form-group">
                  <fg-input
                    label="Nomor HAK Tanggungan"
                    v-model="form.mortgage_number"
                    placeholder="Nomor Hak"
                    :is-number="true"
                    :is-required="true"
                    :max-length="5"
                  ></fg-input>
                </div>
              </div>

              <div class="col-lg-4 col-md-4 col-sm-12">
                <div class="form-group">
                  <fg-input
                    label="Nomor HAK"
                    v-model="form.number_hak"
                    placeholder="Nomor Hak"
                    :is-number="true"
                    :is-required="true"
                    :max-length="5"
                  ></fg-input>
                </div>
              </div>

              <div
                class="
                  col-lg-4 col-md-4 col-sm-12
                  d-flex
                  align-items-center
                  text-justify
                "
              >
                * Nomor sertifikat tanah terdiri dari 14 angka di dalamnya.
                Sebagai contoh nomor sertifikat tanah yaitu 12.34.56.78.9.10111.
                Panjang nomor tersebut memiliki arti sebagai berikut. Lima digit
                terakhir yaitu (10111) merupakan kode dari hak milik
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-lg-6">
          <div class="row">
            <div class="col-lg-12">
              <div class="form-group">
                <fg-input
                  label="Nama Penerima Kuasa / Pemohon"
                  v-model="form.authorized_name"
                  placeholder="Nama Lengkap Anda"
                  type="text"
                  :is-required="true"
                ></fg-input>
              </div>
            </div>

            <div class="col-lg-12">
              <div class="form-group">
                <fg-input
                  label="Alamat Email"
                  v-model="form.email"
                  placeholder="Alamat Email"
                  type="email"
                  :is-required="true"
                ></fg-input>
              </div>
            </div>

            <div class="col-lg-12">
              <div class="form-group">
                <fg-input
                  label="Nomor KTP Penerima Kuasa / Pemohon"
                  v-model="form.authorized_card_identity"
                  placeholder="Nomor KTP Penerima Kuasa"
                  :is-number="true"
                  :is-required="true"
                ></fg-input>
              </div>
            </div>

            <div class="col-lg-12">
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="services" class="control-label">
                      Kecamatan
                    </label>
                    <label style="color: red">
                      <i><sup>* Mandatory</sup></i>
                    </label>
                    <v-select
                      @input="setKelurahan"
                      :options="list_kecamatan"
                      label="nama"
                      :reduce="(kecamatan) => kecamatan"
                    ></v-select>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="services" class="control-label">
                      Kelurahan
                    </label>
                    <label style="color: red">
                      <i><sup>* Mandatory</sup></i>
                    </label>
                    <v-select
                      :options="list_kelurahan"
                      label="nama"
                      :reduce="(kelurahan) => kelurahan"
                      @input="selectedOptionKelurahan"
                    ></v-select>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-12">
              <document-input-file
                properties="authorized_card_path"
                uploaded-file-name="ktp_file_penerima_kuasa"
                file-url-name="authorized_card_url"
                @get-uploaded-url="uploadedUrl"
                :file-code="form.unique_id"
              >
                <template #label>
                  <label for="authorized_card_path" class="control-label">
                    File Penerima Kuasa / Pemohon ( KTP )
                  </label>
                  <label style="color: red">
                    <i><sup>* Mandatory</sup></i>
                  </label>
                </template>
              </document-input-file>
            </div>

            <div class="col-lg-12">
              <div class="form-group">
                <fg-input
                  label="Nomor Telepon"
                  v-model="form.authorized_phone_number"
                  placeholder="Nomor telepon yang bisa kami hubungi"
                  type="text"
                  :is-required="true"
                ></fg-input>
              </div>
            </div>

            <div class="col-lg-12">
              <div class="form-group">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="customCheck1"
                    v-model="isEmpowered"
                    value="true"
                  />
                  <label class="custom-control-label" for="customCheck1">
                    Apakah Permohonan dikuasakan ?
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-6">
          <div class="row">
            <div class="col-lg-12" v-if="isEmpowered">
              <div class="form-group">
                <fg-input
                  label="Nomor KTP Pemberi Kuasa"
                  v-model="form.authorizer_card_identity"
                  placeholder="Nomor KTP Pemberi Kuasa (Jika Dikuasakan)"
                  :is-number="true"
                ></fg-input>
              </div>
            </div>

            <div class="col-lg-12" v-if="isEmpowered">
              <div class="form-group">
                <fg-input
                  label="Pemberi Kuasa"
                  v-model="form.authorizer_name"
                  placeholder="Nama Pemberi Kuasa (Jika Dikuasakan)"
                  type="text"
                ></fg-input>
              </div>
            </div>

            <div class="col-lg-12" v-if="isEmpowered">
              <document-input-file
                properties="authorizer_card_path"
                uploaded-file-name="ktp_file_pemberi_kuasa"
                file-url-name="authorizer_card_url"
                @get-uploaded-url="uploadedUrl"
                :file-code="form.unique_id"
              >
                <template #label>
                  <label for="authorizer_card_path" class="control-label">
                    File Pemberi Kuasa ( KTP )
                  </label>
                </template>
              </document-input-file>
            </div>

            <div class="col-lg-12" v-if="isEmpowered">
              <document-input-file
                properties="empower_file_path"
                uploaded-file-name="file_surat_kuasa"
                file-url-name="empower_file_url"
                @get-uploaded-url="uploadedUrl"
                :file-code="form.unique_id"
              >
                <template #label>
                  <label for="empower_file_path" class="control-label">
                    Surat Kuasa
                  </label>
                </template>
              </document-input-file>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-lg-6">
          <div class="row">
            <div class="col-lg-12">
              <div class="form-group">
                <button
                  class="btn btn-block"
                  @click.prevent="postDocument"
                  :disabled="loading"
                >
                  Simpan
                  <i class="fa fa-spinner fa-spin fa-fw" v-if="loading"></i>
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
import { mapState } from "vuex";
import { apiGetListTypeHak, apiPostDocument } from "../../http/api";
import { deleteFile } from "../../http/dropbox";
import DocumentInputFile from "./components/DocumentInputFile";
import axios from "axios";

export default {
  components: {
    DocumentInputFile,
  },
  data() {
    return {
      form: {
        email: null,
        authorized_name: null,
        authorized_card_path: null,
        authorized_card_url: null,
        authorized_phone_number: null,
        authorized_card_identity: null,
        authorizer_name: null,
        authorizer_card_path: null,
        authorizer_card_url: null,
        authorizer_card_identity: null,
        empower_file_path: null,
        empower_file_url: null,
        empower_file_identity: null,
        unique_id: null,
        service_id: null,

        kecamatan_id: null,
        kecamatan_name: null,
        kelurahan_id: null,
        kelurahan_name: null,
        type_hak_id: null,
        number_hak: null,
        mortgage_number: null,
      },

      document: {
        authorized_card_path: {
          is_loading: false,
          file_name: null,
        },
        authorizer_card_path: {
          is_loading: false,
          file_name: null,
        },
        empower_file_path: {
          is_loading: false,
          file_name: null,
        },
      },

      isEmpowered: false,

      loading: false,

      list_kecamatan: [],

      list_kelurahan: [],

      list_type_hak: [],

      display_form_mortgage: false
    };
  },
  methods: {
    displayFormMortgage(value) {
      if (value.is_form_display) {
        this.display_form_mortgage = true
      } else {
        this.display_form_mortgage = false
      }
      this.form.service_id = value.id
    },
    uploadedUrl(ref, url) {
      this.form[ref] = url;
    },
    postDocument() {
      if (!this.form.email) {
        this.$toast.error("Email Wajib Terisi");
        return;
      }

      if (!this.form.authorized_phone_number) {
        this.$toast.error("Nomor Telepon Wajib Terisi");
        return;
      }

      this.loading = true;

      apiPostDocument(this.form)
        .then((result) => {
          this.$toast.success("Permohan berhasil diajukan");
        })
        .catch((err) => {
          this.$toast.error("Permohonan Gagal Diajukan");
          if (this.form.authorized_card_path) {
            deleteFile({ filePath: this.form.authorized_card_path });
          }

          if (this.form.authorizer_card_path) {
            deleteFile({ filePath: this.form.authorizer_card_path });
          }
        })
        .finally(() => {
          this.$router.replace({ name: "request" });
          this.loading = false;
        });
    },
    setKelurahan(value) {
      console.log(value);
      this.form.kecamatan_id = value.id;
      this.form.kecamatan_name = value.nama;

      this.form.kelurahan_id = null;
      this.list_kelurahan = [];

      axios
        .get(
          `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${value.id}`
        )
        .then((response) => {
          this.list_kelurahan = response.data.kelurahan;
        })
        .catch((err) => {
          console.error(err);
          this.$toast.error("Terjadi Kesalahan pada Sever");
        });
    },
    selectedOptionKelurahan(value) {
      this.form.kelurahan_id = value.id;
      this.form.kelurahan_name = value.nama;
    },
  },
  created() {
    const dateNow = Date.now();
    const mathRandom = Math.floor(Math.random() * 99999999);
    const uniqueId = dateNow + mathRandom;
    const arrayNumber = uniqueId.toString().match(/.{1,3}/g);
    this.form.unique_id = arrayNumber.join("-");

    axios
      .get(
        "https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=3273"
      )
      .then((response) => {
        this.list_kecamatan = response.data.kecamatan;
      })
      .catch((err) => {
        console.error(err);
        this.$toast.error("Terjadi Kesalahan pada Sever");
      });

    apiGetListTypeHak()
      .then((result) => {
        this.list_type_hak = result.data.typeHak;
      })
      .catch((err) => {
        console.error(err);
        this.$toast.error("Terjadi Kesalahan pada Sever");
      });

    this.$store.dispatch("apiGetServices");
  },
  computed: {
    ...mapState(["services"]),
  },
};
</script>

<style lang="scss" scoped>
.container-body {
  border-top: 1px solid #c3c3c3;
  margin-top: 1rem;
  padding-top: 1rem;
}
</style>

<template>
  <div>
    <!--Stats cards-->
    <div class="row">
      <div class="col-md-6 col-lg-6 col-sm-12 offset-md-3 offset-lg-3">
        <p for="keyword" class="text-center">Masukan Kata Kunci</p>
        <input
          type="text"
          class="form-control border form-control-lg"
          name="keyword"
          placeholder="Email / No. Unik / Nama Pemohon / Nama Pemberi Kuasa"
          v-model="keyword"
          @keyup="findKeyword"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 col-lg-6 col-sm-12 offset-md-3 offset-lg-3">
        <div class="d-flex justify-content-center" v-if="loadingOverlay">
          <FacebookLoader :color="'#35495e'"></FacebookLoader>
        </div>
      </div>
    </div>

    <div
      class="row pointer"
      v-for="item in resultList"
      :key="item.id"
      @click="openDetailRequest(item)"
    >
      <div class="col-md-8 col-lg-8 col-sm-12 offset-md-2 offset-lg-2">
        <div class="card p-2 my-2 border">
          <div
            class="d-flex justify-content-between align-items-center px-2 py-2"
          >
            <div class="information">
              <div class="d-flex mb-1">
                <span class="badge badge-success px-2 py-2">
                  {{ item.unique_id }}
                </span>
                <span class="badge badge-secondary mx-2 px-2 py-2">
                  {{ item.service.service_name }}
                </span>
              </div>
              <div class="d-flex align-items-center">
                <h4 class="m-0 mr-2">
                  {{ item.authorized_name }}
                </h4>
                <span>( {{ item.email }} )</span>
              </div>
            </div>
            <dropdown :trigger="'click'" :is-icon="false">
              <template slot="btn">
                <span class="ti-more pointer"></span>
              </template>
              <template slot="body">
                <ul class="dropdown-child">
                  <li @click="openDetailRequest(item)">
                    <span class="ti-eye mr-2"></span>
                    Detail
                  </li>
                </ul>
              </template>
            </dropdown>
          </div>
        </div>
      </div>
    </div>

    <modal-vue
      v-show="modal.displayModalDetail"
      @close="modal.displayModalDetail = false"
    >
      <template #header>
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="m-0">{{ modal.detailItem.authorized_name }}</h4>
        </div>
      </template>
      <template #body>
        <div class="mx-4">
          <label-horizontal-vue>
            <template #left-column>
              Nama Pemohon / Kuasa
            </template>
            <template #right-column>
              {{ modal.detailItem.authorized_name }}
            </template>
          </label-horizontal-vue>

          <label-horizontal-vue>
            <template #left-column>
              Email
            </template>
            <template #right-column>
              {{ modal.detailItem.email }}
            </template>
          </label-horizontal-vue>

          <label-horizontal-vue>
            <template #left-column>
              Telephone Pemohon / Kuasa
            </template>
            <template #right-column>
              {{ modal.detailItem.authorized_phone_number }}
            </template>
          </label-horizontal-vue>

          <label-horizontal-vue v-if="modal.detailItem.authorizer_name">
            <template #left-column>
              Nama Pemberi Kuasa
            </template>
            <template #right-column>
              {{ modal.detailItem.authorizer_name }}
            </template>
          </label-horizontal-vue>

          <label-horizontal-vue>
            <template #left-column>
              Jenis Pelayanan
            </template>
            <template #right-column>
              {{ modal.detailItem.service.service_name }}
            </template>
          </label-horizontal-vue>
        </div>

        <table class="table mx-2">
          <tbody>
            <tr>
              <td>KTP</td>
              <td>
                <a :href="modal.detailItem.authorized_card_url" download>
                  Download
                </a>
              </td>
            </tr>
            <tr v-for="file in modal.detailItem.files" :key="file.id">
              <td>{{ file.file_type }}</td>
              <td><a :href="file.file_url">Download</a></td>
            </tr>
          </tbody>
        </table>
      </template>
    </modal-vue>
  </div>
</template>
<script>
import { FacebookLoader } from "vue-spinners-css";
import { StatsCard, ChartCard } from "@/components/index";
import Chartist from "chartist";
import { apiFindDocument, apiGetDetailDocument } from "../http/api";
import Dropdown from "bp-vuejs-dropdown";
import ModalVue from "../components/Modal.vue";
import LabelHorizontalVue from "../components/LabelHorizontal.vue";

export default {
  components: {
    StatsCard,
    ChartCard,
    FacebookLoader,
    Dropdown,
    ModalVue,
    LabelHorizontalVue
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      keyword: null,
      loadingOverlay: false,
      statsCards: [
        {
          type: "warning",
          icon: "ti-server",
          title: "Dokumen",
          value: "8",
          footerText: "Unggah Dokumen",
          footerIcon: "ti-upload"
        }
      ],
      resultList: [],
      modal: {
        displayModalDetail: false,
        detailItem: {}
      }
    };
  },
  methods: {
    findKeyword(e) {
      if (e.target.value) {
        this.loadingOverlay = true;
        setTimeout(() => {
          apiFindDocument(e.target.value)
            .then(result => {
              this.resultList = result.data.documents;
            })
            .catch(err => {
              console.error(err, "error");
            })
            .finally(() => {
              this.loadingOverlay = false;
            });
        }, 1500);
      } else {
        this.resultList = [];
      }
    },
    openDetailRequest(item) {
      const { id } = item;

      apiGetDetailDocument(id)
        .then(result => {
          console.log(result);
          this.modal.displayModalDetail = true;
          this.modal.detailItem = { ...result.data.document };
        })
        .catch(err => {
          this.$toast.error("Terjadi Kesalahan pada Server");
        });
    }
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

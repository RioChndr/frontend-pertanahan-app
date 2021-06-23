<template>
  <modal-vue v-if="displayModal" @close="$emit('close')">
    <template #header>
      <h4 class="m-0">
        {{ detail.authorized_name }} -
        {{ detail.service.service_name }}
      </h4>
    </template>
    <template #body>
      <div class="container-fluid px-2">
        <div class="row">
          <div class="col-sm-12 col-md-10 offset-md-1">
            <label-horizontal-vue>
              <template #left-column> Penerima Kuasa / Pemohon </template>
              <template #right-column>
                {{ detail.authorized_name }}
              </template>
            </label-horizontal-vue>

            <label-horizontal-vue>
              <template #left-column> Email </template>
              <template #right-column>
                {{ detail.email }}
              </template>
            </label-horizontal-vue>

            <label-horizontal-vue>
              <template #left-column> Telephone Pemohon / Kuasa </template>
              <template #right-column>
                {{ detail.authorized_phone_number }}
              </template>
            </label-horizontal-vue>

            <label-horizontal-vue v-if="detail.authorizer_name">
              <template #left-column> Nama Pemberi Kuasa </template>
              <template #right-column>
                {{ detail.authorizer_name }}
              </template>
            </label-horizontal-vue>

            <label-horizontal-vue>
              <template #left-column> Jenis Pelayanan </template>
              <template #right-column>
                {{ detail.service.service_name }}
              </template>
            </label-horizontal-vue>

            <label-horizontal-vue>
              <template #left-column> Status </template>
              <template #right-column>
                <h4 class="m-0">
                  <span class="badge badge-lg badge-primary">
                    {{ detail.status | getStatusValue }}
                  </span>
                </h4>
              </template>
            </label-horizontal-vue>

            <label-horizontal-vue>
              <template #left-column> Keterangan </template>
              <template #right-column>
                <p class="m-0">{{ detail.description || "-" }}</p>
              </template>
            </label-horizontal-vue>

            <label-horizontal-vue>
              <template #right-column>
                <button
                  class="btn btn-danger btn-sm px-4 d-flex align-items-center"
                  @click="$emit('update-verification-done', detail.id)"
                  :disabled="loadingArchived"
                >
                  <div v-if="loadingArchived">
                    <i class="fa fa-spinner fa-spin fa-fw"></i>
                  </div>
                  <div v-else>
                    <span class="ti-package mr-2"></span>
                    Verifikasi Selesai
                  </div>
                </button>
                <button
                  v-if="detail.status === 'finish_submission'"
                  class="btn btn-danger btn-sm px-4 d-flex align-items-center"
                  @click="archiveRequest"
                  :disabled="loadingArchived"
                >
                  <div v-if="loadingArchived">
                    <i class="fa fa-spinner fa-spin fa-fw"></i>
                  </div>
                  <div v-else>
                    <span class="ti-package mr-2"></span>
                    Arsipkan Permohonan
                  </div>
                </button>
              </template>
            </label-horizontal-vue>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <table class="table table-border">
              <tbody>
                <tr>
                  <td>KTP Penerima Kuasa / Pemohon</td>
                  <td class="d-flex align-items-center justify-content-end">
                    <DownloadButtonVue
                      :file="{
                        file_path: detail.authorized_card_path,
                      }"
                    />
                    <button
                      class="mx-4 btn btn-sm btn-danger"
                      @click="deleteItem(detail.authorized_card_path)"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                <tr v-if="detail.authorizer_card_path">
                  <td>KTP Pemberi Kuasa</td>
                  <td class="d-flex align-items-center justify-content-end">
                    <DownloadButtonVue
                      :file="{
                        file_path: detail.authorizer_card_path,
                      }"
                    />
                    <button
                      class="mx-4 btn btn-sm btn-danger"
                      @click="deleteItem(detail.authorizer_card_path)"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                <tr v-for="file in detail.files" :key="file.id">
                  <td>{{ file.file_type }}</td>
                  <td class="d-flex align-items-center justify-content-end">
                    <DownloadButtonVue :file="file" />
                    <DeleteButtonVue
                      :file-path="file.file_path"
                      :file-id="file.id"
                      :document-id="detail.id"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>
  </modal-vue>
</template>

<script>
import ModalVue from "@/components/Modal.vue";
import DeleteButtonVue from "@/components/DeleteButton.vue";
import LabelHorizontalVue from "@/components/LabelHorizontal.vue";
import DownloadButtonVue from "@/components/DownloadButton.vue";
export default {
  components: {
    ModalVue,
    DeleteButtonVue,
    LabelHorizontalVue,
    DownloadButtonVue,
  },
  props: {
    detail: {
      type: Object,
      default: () => {},
    },
    displayModal: {
      type: Boolean,
      default: false,
    },
    loadingArchived: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>

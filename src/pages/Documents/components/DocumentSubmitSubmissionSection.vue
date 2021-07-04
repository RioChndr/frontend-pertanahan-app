<template>
  <div class="row border mb-2">
    <div class="col-lg-6 col-md-6 col-sm-12">
      <div class="row">
        <div
          class="col-sm-12 d-flex align-items-center"
          :class="[
            detail.status !== '' ? 'col-lg-9 col-md-9' : 'col-lg-6 col-md-6',
          ]"
        >
          <div class="form-group my-2">
            <label for="services" class="control-label">
              Kode Berkas
              <status-permohonan permohonan :status="detail.status"/>
            </label>
            <h4 class="m-0 font-weight-bold d-flex align-items-center">
              {{ detail.unique_id }}
            </h4>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-12 d-flex justify-content-end">
      <div class="form-group my-2 d-flex align-items-center">
        <button
          class="btn btn-info btn-sm mr-2"
          @click.prevent="$emit('submit-request')"
          v-if="
            detail.status === '' ||
            detail.status === 'reject_submission' ||
            detail.status === null
          "
        >
          <span class="ti-share mr-2"></span>
          Ajukan Permohonan
        </button>

        <button class="btn btn-sm" @click="$emit('print-request')">
          <span class="ti-printer mr-2"></span>
          Cetak Permohonan
        </button>
        <button
          class="btn btn-sm ml-2"
          @click="$emit('open-modal')"
          data-toggle="tooltip"
          data-placement="top"
          title="Catatan Riwayat Permohonan"
          type="button"
        >
          <span class="ti-view-list-alt"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DocumentSubmitSubmissionSection",
  props: {
    detail: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style>
</style>

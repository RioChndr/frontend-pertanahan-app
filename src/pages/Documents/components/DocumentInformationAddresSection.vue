<template>
  <div class="row border mb-2">
    <div class="col">
      <div class="row">
        <div class="col-lg-3 col-sm-12 col-md-3 d-flex align-items-center">
          <div class="form-group my-2">
            <label for="services" class="control-label"> Jenis Layanan </label>
            <h4 class="m-0 font-weight-bold">
              {{ detail.service && detail.service.service_name }}
            </h4>
          </div>
        </div>

        <div class="col-lg-3 col-sm-12 col-md-3 d-flex align-items-center">
          <div class="form-group my-2">
            <label for="services" class="control-label"> Tipe Hak </label>
            <h4 class="m-0 font-weight-bold d-flex align-items-center">
              {{ detail.type_hak ? detail.type_hak.name : "-" }}
            </h4>
          </div>
        </div>
        <div class="col-lg-3 col-sm-12 col-md-3 d-flex align-items-center">
          <div class="form-group my-2">
            <label for="services" class="control-label"> No. Hak </label>
            <h4 class="m-0 font-weight-bold d-flex align-items-center">
              {{ detail.number_hak || "-" }}
            </h4>
          </div>
        </div>
        <div
          class="col-lg-3 col-sm-12 col-md-3 d-flex align-items-center"
          v-if="detail.mortgage_number"
        >
          <div class="form-group my-2">
            <label for="services" class="control-label">
              No. Hak Tanggungan</label
            >
            <h4 class="m-0 font-weight-bold d-flex align-items-center">
              {{ detail.mortgage_number || "-" }}
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DocumentInformationAddresSection",
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

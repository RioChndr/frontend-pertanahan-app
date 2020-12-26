<template>
  <div class="card col-sm-12 col-md-6 offset-md-3 py-2">
    <div class="d-flex align-items-center my-2 mx-2">
      <div class="flex-fill d-flex flex-column">
        <div id="files-code">
          Kode Berkas :
          <span class="badge badge-primary px-2 py-1">
            {{ document.unique_id }}
          </span>
        </div>
        <div id="authorized-name">
          <h4 class="m-0">
            {{ document.authorized_name }}
          </h4>
        </div>
        <div id="authorized-phone">
          <p class="m-0">{{ document.authorized_phone_number }}</p>
        </div>
      </div>
      <div class="flex-fill d-flex">
        <span
          class="badge badge-success"
          v-if="document.is_done && !document.is_waiting"
        >
          Disetujui
        </span>

        <span
          class="badge badge-danger"
          v-else-if="!document.is_done && !document.is_waiting"
        >
          Ditolak
        </span>

        <span class="badge badge-success" v-else-if="document.is_waiting">
          Menunggu Persetujuan
        </span>

        <!-- <span class="badge">Diteolak</span> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HistoryItem",
  props: {
    document: { type: Object, default: null }
  }
};
</script>

<style></style>

<template>
  <div class="row border mb-2" v-if="detail.status === 'finish_verification'">
    <div class="col-12 p-2 d-flex align-items-center justify-content-center">
      <strong v-if="detail.delivery_services === null">
        Verifikasi Berkas telah selesai, silahkan kirim kan Berkasnya.
      </strong>
      <strong v-else>
        Lacak Penjemputan Berkas
        <router-link
          :to="{
            name: 'delivery.detail',
            params: { id: detail.delivery_services.id },
          }"
        >
          disini
        </router-link>
      </strong>
    </div>

    <div
      v-if="detail.delivery_services === null"
      class="col-12 my-2 d-flex align-items-center justify-content-center"
    >
      <button
        class="btn btn-sm btn-primary mx-2"
        @click="
          $router.push({
            name: 'delivery.send',
            params: {
              document_id: detail.id,
            },
            query: {
              type: 'documents',
            },
          })
        "
      >
        Jemput Berkas oleh BPN
      </button>
      <button
        class="btn btn-sm btn-secondary mx-2"
        @click="
          $router.push({
            name: 'request.pickup',
            params: {
              document_id: detail.id,
            },
            query: {
              type: 'documents',
            },
          })
        "
      >
        Antar Sendiri Berkas
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DocumentDeliveryFileSection",
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

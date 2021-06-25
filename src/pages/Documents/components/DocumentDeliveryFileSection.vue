<template>
  <div class="row border mb-2" v-if="detail.status === 'finish_verification'">
    <div class="col-12 p-2 d-flex align-items-center justify-content-center">
      <div
        v-if="
          detail.delivery_services === null && detail.delivery_schedule === null
        "
      >
        <strong>
          Verifikasi Berkas telah selesai, silahkan kirim kan Berkasnya.
        </strong>
        <div
          class="col-12 my-2 d-flex align-items-center justify-content-center"
        >
          <button class="btn btn-sm btn-primary mx-2" @click="openDialog">
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

      <strong v-if="detail.delivery_services !== null">
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
      <div v-if="detail.delivery_schedule !== null">
        <strong>
          Jadwal Mengantarkan Berkas pada
          {{ detail.delivery_schedule | moment("LL") }}
        </strong>
      </div>
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
  methods: {
    openDialog() {
      this.$dialog({
        title: "Informasi",
        content: "Sedang dalam Pengembangan",
        btns: [
          {
            label: "OK",
            color: "#09f",
          },
          {
            label: "Cancel",
            color: "#444",
            ghost: true,
          },
        ],
      });
      // this.$router.push({
      //   name: "delivery.send",
      //   params: {
      //     document_id: this.detail.id,
      //   },
      //   query: {
      //     type: "documents",
      //   },
      // });
    },
  },
};
</script>

<style>
</style>

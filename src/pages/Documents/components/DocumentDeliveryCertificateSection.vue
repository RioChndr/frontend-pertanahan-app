<template>
  <div class="row border mb-2">
    <div
      class="col-12 p-2 d-flex align-items-center justify-content-center"
      v-if="detail.sps_path"
    >
      <strong>
        SPS Telah Terbit
        <a
          v-if="detail.sps_path"
          @click="downloadFile(detail.sps_path)"
          target="_blank"
          class="d-flex align-items-center"
          style="cursor: pointer"
        >
          <span class="ti-download mr-2"></span>
          <span>Download</span>
        </a>
      </strong>
    </div>
    <div
      class="col-12 p-2 d-flex align-items-center justify-content-center"
      v-if="
        detail.pickup_schedule !== null && detail.status === 'finish_submission'
      "
    >
      <strong>
        Anda telah memilih untuk mengambil Berkas dengan perorangan pada
        {{ detail.pickup_schedule | moment("LL") }}
      </strong>
    </div>

    <div
      class="col-12 my-2 d-flex align-items-center justify-content-center"
      v-if="
        detail.pickup_schedule === null && detail.status === 'finish_submission'
      "
    >
      <button
        class="btn btn-sm btn-secondary mx-2"
        @click="
          $router.push({
            name: 'request.pickup',
            params: {
              document_id: detail.id
            },
            query: {
              type: 'certificate'
            }
          })
        "
      >
        Ambil Sendiri Berkas
      </button>
      <button class="btn btn-sm btn-primary mx-2" @click="openDialogModal">
        Kirim Berkas oleh BPN
      </button>
    </div>
  </div>
</template>

<script>
import { downloadFile } from "../../../http/dropbox";
export default {
  name: "DocumentDeliveryCertificateSection",
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    downloadFile(path) {
      downloadFile({ filePath: path })
        .then(result => {
          let link = document.createElement("a");
          link.href = result.result.link;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch(err => {
          console.error(err);
        });
    },
    openDialogModal() {
      this.$dialog({
        title: "Informasi",
        content: "Sedang dalam pengembangan",
        btns: [
          {
            label: "OK",
            color: "#09f"
          },
          {
            label: "Cancel",
            color: "#444",
            ghost: true
          }
        ]
      });
      // this.$router.push({
      //   name: "delivery.send",
      //   params: {
      //     document_id: this.detail.id,
      //   },
      //   query: {
      //     type: "certificate",
      //   },
      // });
    }
  }
};
</script>

<style></style>

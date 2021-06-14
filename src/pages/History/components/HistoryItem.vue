<template>
  <div
    class="card col-sm-12 col-md-6 offset-md-3 py-2 pointer"
    @click="displayModal"
  >
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
        <div id="authorized-phone" class="mt-2">
          <p class="m-0 d-flex align-items-center">
            <span class="ti-mobile mr-2"></span>
            {{ document.authorized_phone_number }}
          </p>
        </div>
      </div>
      <div class="flex-fill d-flex justify-content-end pr-4">
        <h4 class="m-0 text-primary">
          {{ document.status | getStatusValue }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HistoryItem",
  props: {
    document: { type: Object, default: null },
  },
  data() {
    return {
      success: {
        color: "",
      },
    };
  },
  methods: {
    displayModal() {
      this.$store
        .dispatch("apiGetDetailDocument", { doc_id: this.document.id })
        .then((result) => {
          this.$store.commit("setDisplayModalDetailHistory", true);
        })
        .catch((err) => {
          this.$toast.error("Terjadi Kesalahan pada Server");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.pointer {
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    background-color: rgba($color: #000000, $alpha: 0.2);
  }
}
</style>

<template>
  <a @click="downloadFile(file)" class="pointer">
    <i class="fa fa-spinner fa-spin fa-fw" v-if="loading"></i>
    <span v-else>Download</span>
  </a>
</template>

<script>
import { downloadFileHelpers } from "../helpers/utils";
export default {
  name: "DownloadButton",
  props: {
    file: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    downloadFile({ file_path }) {
      this.loading = true;
      downloadFileHelpers(file_path)
        .catch(err => {
          console.error(err, "error");
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

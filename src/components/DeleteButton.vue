<template>
  <button
    class="btn btn-sm btn-danger mx-4"
    @click="deleteItem"
    :disabled="displayLoading"
  >
    <i class="fa fa-spinner fa-spin fa-fw" v-if="displayLoading"></i>
    <span v-else>Delete</span>
  </button>
</template>

<script>
import { apiRemoveFile } from "../http/api";
import { deleteFile } from "../http/dropbox";
export default {
  name: "DeleteButton",
  props: {
    fileId: {
      type: String,
      default: null
    },
    filePath: {
      type: String,
      default: null
    },
    documentId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      displayLoading: false
    };
  },
  methods: {
    async deleteItem() {
      this.displayLoading = true;
      try {
        const resultDeleteDropbox = await deleteFile({
          filePath: this.filePath
        });
        if (resultDeleteDropbox.status === 200) {
          const resultDeleteFiles = await apiRemoveFile(this.fileId);
          console.log(resultDeleteFiles);
          if (resultDeleteFiles.data.status) {
            this.$store
              .dispatch("apiGetDetailDocument", {
                doc_id: this.documentId
              })
              .finally(() => {
                this.$toast.success("File terhapus");
                this.displayLoading = false;
              });
          }
        }
      } catch (error) {
        this.$toast.error("Terjadi Kesalahan pada Sever");
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

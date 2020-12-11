<template>
  <div class="container-fluid">
    <div class="alert alert-success font-weight-bold" v-if="!documents.length">
      <button type="button" aria-hidden="true" class="close">×</button>
      <span>
        Anda belum menggunggah / membuat Permohonan
        <a href=""><u>Buat Permohonan</u></a>
      </span>
    </div>

    <div class="container text-center" v-if="!documents.length">
      <h3>Tidak Terdapat Dokumen Permohonan</h3>
      <router-link :to="{ name: 'create' }">Buat Permohonan</router-link>
    </div>

    <div class="row" v-if="documents.length">
      <document-item-vue
        v-for="d in documents"
        :key="d.id"
        :detail="d"
      ></document-item-vue>
    </div>
  </div>
</template>

<script>
import { apiGetListDocument } from "../../http/api";
import DocumentItemVue from "./components/DocumentItem.vue";
export default {
  data() {
    return {
      documents: []
    };
  },
  components: {
    DocumentItemVue
  },
  async mounted() {
    const responseDocument = await apiGetListDocument();
    console.log(responseDocument);
    if (responseDocument.status === 200) {
      this.documents = responseDocument.data.message.documents;
    }
  }
};
</script>

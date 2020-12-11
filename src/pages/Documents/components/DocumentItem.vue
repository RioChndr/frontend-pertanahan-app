<template>
  <div class="col-md-3 mb-2">
    <div class="card-no-shadow">
      <div class="card-flex-top">
        <div class="card-flex-left">
          <p class="m-0">Pemohon</p>
          <h4 class="m-0">{{ detail.authorized_name }}</h4>
        </div>
        <div class="card-flex-right">
          <p>Dokumen</p>
          <h4 class="m-0">{{ detail.files.length }}</h4>
        </div>
      </div>
      <router-link
        :to="{ name: 'upload-file', params: { id: detail.id } }"
        class="card-flex-bottom mt-2"
      >
        Lengkapi Dokumen
        <span class="ti-angle-double-right ml-2"></span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "document-item",
  props: {
    detail: {
      type: Object,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped>
.card-no-shadow {
  border: 1px solid #c3c3c3;
  border-radius: 4px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  min-height: 10rem;
  position: relative;

  & p {
    margin: 0;
  }

  .card-flex-top {
    display: flex;

    .card-flex-left {
      flex: 1;
    }

    .card-flex-right {
      flex: 1;
      padding: 0 0.5rem;
      text-align: center;
    }
  }

  .card-flex-bottom {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    margin-bottom: 1rem;
  }
}
</style>

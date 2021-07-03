<template>
  <div class="col-md-4 col-lg-3 col-sm-12 mb-2">
    <div class="card-no-shadow" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title font-weight-bold">
          {{ detail.service.service_name }}
        </h5>
        <p class="card-text">
          <!-- Some quick example text to build on the card title and make up the
          bulk of the card's content. -->
        </p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">{{ detail.authorized_name }}</li>
        <li
          class="list-group-item"
          :class="{
            'bg-success text-white': detail.status === 'finish_submission',
            'bg-primary text-white': detail.status === null,
            'bg-warning text-white':
              [null, 'finish_submission'].includes(detail.status) === false,
          }"
        >
          {{ detail.status | getStatusValue }}
        </li>
        <li class="list-group-item">{{ detail.unique_id }}</li>
      </ul>

      <div class="card-body">
        <router-link
          :to="{ name: 'upload-file', params: { id: detail.id } }"
          v-if="detail.status === null"
        >
          Silahkan Legkapi Berkas
          <i class="ti-arrow-right ml-2"></i>
        </router-link>
        <router-link
          :to="{ name: 'upload-file', params: { id: detail.id } }"
          v-else
        >
          Detail Permohonan
          <i class="ti-arrow-right ml-2"></i>
        </router-link>
      </div>
    </div>
    <!-- <div class="card-no-shadow">
      <div class="row">
        <div class="col-lg-6 col-sm-12 col-md-12">
          <span class="badge badge-success">
            {{ detail.unique_id }}
          </span>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-sm-12 col-md-12">
          <span class="badge badge-info">
            {{detail.status | getStatusValue}}
          </span>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <span class="m-0 d-flex align-items-center my-2">
            {{ detail.service.service_name }}
          </span>
        </div>
      </div>
      <div class="row my-2">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <h4 class="m-0 mr-2 limit-text">
            {{ detail.authorized_name }}
          </h4>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <router-link
            :to="{ name: 'upload-file', params: { id: detail.id } }"
            class=" mt-2"
          >
            Lengkapi Dokumen
            <span class="ti-angle-double-right ml-2"></span>
          </router-link>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "document-item",
  props: {
    detail: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.card-no-shadow {
  border: 1px solid #c3c3c3;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  min-height: 10rem;

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

  .limit-text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
  }
}
</style>

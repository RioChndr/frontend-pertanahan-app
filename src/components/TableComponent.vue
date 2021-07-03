<template>
  <div class="px-2 py-4">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div class="row">
        <div class="col-12">
          <h4><slot name="table-title">This is Title</slot></h4>
        </div>
      </div>
      <div id="input-search">
        <slot name="table-search"></slot>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <slot name="table-filter-status"></slot>
      </div>
    </div>
    <table class="table border">
      <thead>
        <slot name="table-header">Table header</slot>
      </thead>
      <tbody>
        <slot name="table-body">
          <tr>
            <td>No Data</td>
          </tr>
        </slot>
      </tbody>
    </table>
    <slot name="table-pagination"></slot>
  </div>
</template>

<script>
import Pagination from "vue-pagination-2";
export default {
  name: "TableComponent",
  components: { Pagination },
  props: {
    totalData: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 0,
    },
    page: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    keywords: null,
  }),
};
</script>

<style lang="scss" scoped>
div {
  h4 {
    margin: 0;
    padding: 0;
  }

  #input-search {
    padding: 4px 8px;
    border: 1px solid #222;
    border-radius: 4px;

    display: flex;
    align-items: center;
  }

  .ti-search {
    font-size: 22px;
  }

  .input-field {
    border: none;
    margin: 0 8px;
    font-size: 22px;
  }

  .keywords {
    font-weight: 500;
    font-size: 20px;
  }
}
</style>

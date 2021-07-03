<template>
  <table class="table" :class="tableClass">
    <thead>
      <slot name="columns">
        <th v-for="column in columns" :key="column.val">{{ column.title }}</th>
      </slot>
    </thead>
    <tbody>
      <tr v-if="!data.length">
        <td :colspan="columns.length" style="text-align: center">
          Tidak Terdapat Pengiriman
        </td>
      </tr>
      <tr v-for="(item, index) in data" :key="index">
        <slot :row="item">
          <td v-for="(column, index) in columns" :key="index">
            <div v-if="column.val === 'action'">
              <button
                @click="$emit('click', item)"
                type="button"
                class="btn btn-primary btn-sm"
              >
                <span class="ti-eye"></span>
              </button>
            </div>
            <div v-else>
              {{ item[column.val] }}
            </div>
          </td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: "paper-table",
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    columns: Array,
    data: Array,
    type: {
      type: String, // striped | hover
      default: "striped"
    },
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    }
  },
  filters: {
    getValue(val) {}
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    }
  },
  methods: {
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    }
  }
};
</script>
<style></style>

<template>
  <div class="card">
    <table class="table table-hover">
      <thead>
        <th width="5%">No.</th>
        <th width="50%">Nama</th>
        <th width="20%">Role</th>
        <th width="15%">Aksi</th>
      </thead>
      <tbody>
        <tr v-for="(user, i) in users" :key="user.id">
          <td>{{ i + 1 }}</td>
          <td>{{ user.full_name }}</td>
          <td>{{ user.role.role_name }}</td>
          <td>
            <button class="btn btn-warning btn-sm">Edit</button>
            <button class="btn btn-danger btn-sm mx-2">Delete</button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">Total : {{ totalData }}</td>
          <td class="text-right">
            <button class="m-2 btn btn-sm">Prev</button>
            <button class="m-2 btn btn-sm">Next</button>
          </td>
        </tr>
      </tfoot>
    </table>
    <div class="d-flex justify-content-end"></div>
  </div>
</template>

<script>
import { apiGetListUsers } from "../../http/api";
export default {
  data() {
    return {
      users: [],
      totalData: 0
    };
  },
  async created() {
    const users = await apiGetListUsers();
    if (users.status === 200) {
      this.users = users.data.datas.results;
      this.totalData = users.data.datas.total;
    }
  }
};
</script>

<style></style>

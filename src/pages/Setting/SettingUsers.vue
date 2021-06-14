<template>
  <div class="row">
    <div class="col-12 my-2">
      <button class="float-right btn btn-white" @click="displayModal = true">
        Tambah Admin Pengguna
      </button>
    </div>
    <div class="col-12">
      <div class="card">
        <table class="table table-hover">
          <thead>
            <th width="5%">No.</th>
            <th width="50%">Nama</th>
            <th width="20%">Role</th>
            <th width="15%">Aksi</th>
          </thead>
          <tbody>
            <v-loading
              :active.sync="tableLoading"
              :can-cancel="false"
              :is-full-page="false"
            ></v-loading>
            <tr v-for="(user, i) in users" :key="user.id">
              <td>{{ i + 1 }}</td>
              <td>{{ user.full_name }}</td>
              <td>{{ user.role.role_name }}</td>
              <td>
                <button
                  class="btn btn-warning btn-sm"
                  @click="resetPassword(user)"
                >
                  Reset Password
                </button>
                <button
                  v-if="user.is_lock"
                  class="btn btn-danger btn-sm mx-2"
                  @click="enableAdmin(user)"
                >
                  Unlock
                </button>
                <button
                  v-else
                  class="btn btn-success btn-sm mx-2"
                  @click="disableAdmin(user)"
                >
                  Lock
                </button>
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
      </div>
    </div>
    <modal-vue v-if="displayModal" @close="displayModal = false">
      <template #header> Tambah Admin Pengguna </template>
      <template #body>
        <v-loading
          :active.sync="modalLoading"
          :can-cancel="false"
          :is-full-page="false"
        ></v-loading>
        <div class="row m-0">
          <div class="col-md-6 col-sm-12 offset-md-3">
            <form @submit.prevent="submitForm">
              <div class="form-group row">
                <label for="inputName" class="col-sm-2 col-form-label">
                  Nama
                </label>
                <div class="col-sm-10">
                  <input
                    v-model="form.full_name"
                    type="text"
                    class="form-control border"
                    id="inputName"
                    placeholder="Nama"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">
                  Email
                </label>
                <div class="col-sm-10">
                  <input
                    v-model="form.email"
                    type="email"
                    class="form-control border"
                    id="inputEmail3"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="services" class="col-sm-2 col-form-label">
                  Role
                </label>
                <div class="col-sm-10">
                  <v-select
                    :options="roles"
                    label="role_name"
                    :reduce="(role) => role.id"
                    v-model="form.role_id"
                  ></v-select>
                </div>
              </div>
              <div class="form-group row">
                <label for="inputPassword3" class="col-sm-2 col-form-label">
                  Password
                </label>
                <div class="col-sm-10">
                  <input
                    v-model="form.password"
                    type="password"
                    class="form-control border"
                    id="inputPassword3"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-12 col-md-3 offset-md-2">
                  <button
                    type="submit"
                    class="btn btn-primary btn-block"
                    :disabled="disabledButtonSubmit"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </template>
    </modal-vue>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ModalVue from "../../components/Modal.vue";
import {
  apiGetListUsers,
  apiGetRoles,
  apiPatchDisableUser,
  apiPatchEnableUser,
  apiPostSignup,
} from "../../http/api";

export default {
  components: {
    ModalVue,
  },
  data() {
    return {
      totalData: 0,
      displayModal: false,
      modalLoading: false,
      tableLoading: false,
      roles: [],
      form: {
        full_name: null,
        email: null,
        password: null,
        role_id: null,
      },
      pagination: {
        page: 0,
        pageSize: 10,
      },
    };
  },
  created() {
    this.$store.commit("setListUsersEmpty");
    this.tableLoading = true;
    this.$store
      .dispatch("apiListUser", {
        page: this.pagination.page,
        pageSize: this.pagination.pageSize,
      })
      .catch((err) => {
        this.$toast.error("Terjadi kesalahan pada server");
      })
      .finally(() => {
        this.tableLoading = false;
      });

    apiGetRoles()
      .then((result) => {
        this.roles = result.data;
      })
      .catch((err) => {
        this.$toast.error("Terjadi Kesalahan pada Sistem");
      });
  },
  methods: {
    submitForm(e) {
      this.modalLoading = true;
      this.$store.commit("setListUsersEmpty");
      apiPostSignup(this.form)
        .then((result) => {
          this.$toast.success("Admin berhasil ditambahkan");
          this.displayModal = false;
          return this.$store.dispatch("apiListUser", {
            page: this.pagination.page,
            pageSize: this.pagination.pageSize,
          });
        })
        .catch((err) => {
          this.$toast.error("Data tidak tersimpan");
        })
        .finally(() => {
          this.modalLoading = false;
        });
    },
    disableAdmin({ id }) {
      this.$store.commit("setListUsersEmpty");
      this.tableLoading = true;
      this.$store
        .dispatch("apiLockUser", {
          id: id,
          page: this.pagination.page,
          pageSize: this.pagination.pageSize,
        })
        .then((result) => {
          this.$toast.success(result.data.message);
        })
        .catch((err) => {
          this.$toast.error("Terjadi kesalahan pada server");
        })
        .finally(() => (this.tableLoading = false));
    },
    enableAdmin({ id }) {
      this.$store.commit("setListUsersEmpty");
      this.tableLoading = true;
      this.$store
        .dispatch("apiUnlockUser", {
          id: id,
          page: this.pagination.page,
          pageSize: this.pagination.pageSize,
        })
        .then((result) => {
          this.$toast.success(result.data.message);
        })
        .catch((err) => {
          this.$toast.error("Terjadi kesalahan pada server");
        })
        .finally(() => (this.tableLoading = false));
    },
    resetPassword({ id }) {
      this.tableLoading = true;
      this.$store
        .dispatch("apiResetPassword", {
          page: this.pagination.page,
          pageSize: this.pagination.pageSize,
          id: id,
        })
        .then((result) => {
          this.$toast.success("Password berhasil di reset ulang");
        })
        .catch((err) => {
          console.error(err, "Error");
          this.$toast.err("Gagal mereset ulang password");
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
  },
  computed: {
    disabledButtonSubmit() {
      if (
        this.form.email == null ||
        this.form.email == "" ||
        this.form.password == null ||
        this.form.password == "" ||
        this.form.full_name == "" ||
        this.form.full_name == null
      ) {
        return true;
      }
      return false;
    },
    ...mapState(["users"]),
  },
};
</script>

<style></style>

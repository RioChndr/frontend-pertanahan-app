<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link
          v-if="userInfo.role.id === 3"
          to="/request"
          name="Permohonan"
          icon="ti-view-list-alt"
        />
        <sidebar-link
          v-if="userInfo.role.id === 3"
          to="/request/create"
          name="Buat Permohonan"
          icon="ti-plus"
        />

        <sidebar-link
          v-if="userInfo.role.id === 5"
          to="/dashboard"
          name="Dashboard"
          icon="ti-home"
        />

        <sidebar-link
          v-if="userInfo.role.id === 5"
          to="/setting/users"
          name="Pengguna"
          icon="ti-user"
        />

        <sidebar-link
          v-if="userInfo.role.id === 5"
          to="/setting/services"
          name="Pelayanan"
          icon="ti-rss-alt"
        />

        <li class="nav-item" @click="logout" style="cursor: pointer">
          <div class="nav-link d-flex ">
            <span class="ti-shift-left mr-2" style="font-size: 1.5rem"></span>
            <span style="font-size: 1rem; font-weight: 400" class="ml-2 pl-1">
              Keluar
            </span>
          </div>
        </li>
      </template>
      <mobile-menu>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-panel"></i>
            <p>Stats</p>
          </a>
        </li>
        <drop-down
          class="nav-item"
          title="5 Notifications"
          title-classes="nav-link"
          icon="ti-bell"
        >
          <a class="dropdown-item">Notification 1</a>
          <a class="dropdown-item">Notification 2</a>
          <a class="dropdown-item">Notification 3</a>
          <a class="dropdown-item">Notification 4</a>
          <a class="dropdown-item">Another notification</a>
        </drop-down>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-settings"></i>
            <p>Settings</p>
          </a>
        </li>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    logout() {
      localStorage.clear();
      window.location.reload();
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  }
};
</script>

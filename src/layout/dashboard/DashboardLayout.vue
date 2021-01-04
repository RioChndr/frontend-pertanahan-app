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
          v-if="displayMenu"
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
          v-if="displayMenu"
          to="/setting/services"
          name="Pelayanan"
          icon="ti-rss-alt"
        />

        <sidebar-link
          v-if="displayMenu"
          to="/history"
          name="Riwayat Permohonan"
          icon="ti-reload"
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
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>

      <content-footer></content-footer>
      <a
        target="_blank"
        class="chat-app-widget float-right"
        href="https://wa.me/6282218761876?text=Halo%20Admin%20BPN"
      >
        <i class="fa fa-whatsapp"></i>
        Chat dengan Admin
      </a>
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
  data() {
    return {};
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
    },
    displayMenu() {
      return [5, 4].includes(this.userInfo.role.id);
      // [5, 4].includes(userInfo.role.id)
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  &.chat-app-widget {
    @media screen and (max-width: 600px) {
      position: sticky;
      bottom: 3vh;
      margin-right: 5vw;
    }

    @media screen and (min-width: 1100px) {
      position: absolute;
      bottom: 0;
      margin-bottom: 10vh;
      right: 0;
      margin-right: 2vw;
    }

    z-index: 9999;
    border-radius: 20px;
    border: none;
    background-color: #009688;
    color: #fff;
    padding: 0.4rem 1rem;
    box-shadow: 1px 2px 4px rgba($color: #000000, $alpha: 00.5);
  }
}
</style>

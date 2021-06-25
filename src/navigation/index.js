let userData,
  userRole,
  menus = [];

if (localStorage.getItem(process.env.VUE_APP_TOKEN_STORAGE) !== null) {
  userData = JSON.parse(localStorage.getItem(process.env.VUE_APP_USER_INFO));
  userRole = userData.role;

  if (userRole.id === 4) {
    menus = [
      { path: "/history", title: "Riwayat Permohonan" },
      { path: "/archive", title: "Cetak SPS" }
    ];
  } else if ([2, 6].includes(userRole.id)) {
    menus = [{ path: "/delivery", title: "Kirim & Jemput Berkas" }];
  } else if (userRole.id === 1) {
    menus = [{ path: "/dashboard", title: "Dashboard" }];
  } else if (userRole.id === 5) {
    menus = [
      { path: "/dashboard", title: "Dashboard" },
      { path: "/history", title: "Riwayat Permohonan" },
      { path: "/delivery", title: "Kirim & Jemput Berkas" },
      { path: "/request", title: "Permohonan" },
      { path: "/setting/services", title: "Jenis Pelayanan" },
      { path: "/setting/users", title: "User Management" }
      // { path: '/setting/roles', title: "Role User" },
    ];
  } else if (userRole.id === 3) {
    menus = [
      { path: "/request/list", title: "Permohonan" },
      { path: "/request/create", title: "Buat Permohonan" },
      { path: "/delivery", title: "Kirim & Jemput Berkas" }
    ];
  }
}

export default menus;

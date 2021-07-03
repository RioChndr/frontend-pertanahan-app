let userData,
  userRole,
  menus = [];

if (localStorage.getItem(process.env.VUE_APP_TOKEN_STORAGE) !== null) {
  userData = JSON.parse(localStorage.getItem(process.env.VUE_APP_USER_INFO));
  userRole = userData.role;

  // userRole.id has number in [1,2,3,4,5,6]
  let configMenus = [
    { path: "/dashboard", title: "Dashboard", rules: [1,5] },
    
    { path: "/submissions", title: "Data Permohonan", rules: [4] },
    { path: "/archive", title: "Cetak SPS", rules: [4] },
    { path: "/history", title: "Riwayat Permohonan", rules: [4, 5] },
    
    { path: "/delivery", title: "Kirim & Jemput Berkas", rules: [2,6,5,3] },
    { path: "/archive-logs", title: "Arsip Logs", rules: [1] },
    
    { path: "/request", title: "Permohonan", rules: [5] },
    { path: "/setting/services", title: "Jenis Pelayanan", rules: [5] },
    { path: "/setting/users", title: "User Management", rules: [5] },

    { path: "/request/list", title: "Permohonan", rules:[3] },
    { path: "/request/create", title: "Buat Permohonan", rules:[3] },

    { path: "/account/setting", title: "Pengaturan Akun", rules: [1,2,3,4,5,6]}
  ]
  
  menus = configMenus.filter(v => v.rules.includes(userRole.id))
}

export default menus;

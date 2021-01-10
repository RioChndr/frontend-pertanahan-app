<template>
  <div>
    <div class="auth-form-login">
      <fg-input
        type="text"
        label="Nama Lengkap"
        placeholder="Nama Lengkap"
        v-model="form.full_name"
      ></fg-input>

      <fg-input
        type="email"
        label="Alamat Email"
        placeholder="Email"
        v-model="form.email"
      ></fg-input>

      <fg-input
        type="password"
        label="Password"
        placeholder="Password"
        v-model="form.password"
      ></fg-input>

      <button
        class="btn btn-primary btn-lg btn-block mt-4"
        @click="signup"
        :disabled="loading.signup"
      >
        Daftar
        <i class="fa fa-spinner fa-spin fa-fw" v-if="loading.signup"></i>
      </button>
      <hr />
      <div class="text-center w-full">
        Sudah punya akun?
        <router-link :to="{ name: 'login' }">Silahkan Masuk</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { apiPostSignup } from "../../http/api";
export default {
  data() {
    return {
      form: {
        full_name: null,
        email: null,
        password: null
      },
      loading: {
        signup: false
      },
      appTitle: process.env.VUE_APP_APP_NAME
    };
  },
  methods: {
    signup() {
      this.loading.signup = true;

      if (!this.form.email) {
        this.$toast.error("Email Wajib Terisi !");
        return;
        this.loading.signup = false;
      } else if (!this.validEmail(this.form.email)) {
        this.$toast.error("Format Email yang Anda masukan Salah !");
        this.loading.signup = false;
        return;
      }

      if (!this.form.password) {
        this.$toast.error("Password Wajib Terisi");
        this.loading.signup = false;
        return;
      } else if (this.form.password.length < 8) {
        this.loading.signup = false;
        this.$toast.error("Password Wajib Memiliki 8 Karakter");
        return;
      }

      if (!this.form.full_name) {
        this.loading.signup = false;
        this.$toast.error("Nama Wajib Terisi");
        return;
      }

      apiPostSignup({
        email: this.form.email,
        password: this.form.password,
        full_name: this.form.full_name
      })
        .then(result => {
          this.form.full_name = null;
          this.form.email = null;
          this.form.password = null;
          this.$toast.success("Pendaftaran Berhasil, silahkan melakukan Login");
        })
        .catch(err => {
          this.$toast.error("Pendaftaran Tidak Berhasil, coba email yang lain");
        })
        .finally(() => {
          this.loading.signup = false;
        });
    },
    validEmail: function(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
};
</script>

<style lang="scss" scoped>
$sm: 567px;
$md: 768px;
$lg: 1200px;
$xl: 1300px;

@mixin sm {
  @media (min-width: #{$sm}) {
    @content;
  }
}

@mixin md {
  @media (min-width: #{$md}) {
    @content;
  }
}

@mixin lg {
  @media (min-width: #{$lg}) {
    @content;
  }
}

@mixin xl {
  @media (min-width: #{$xl}) {
    @content;
  }
}

.auth-form-login {
  padding: 1rem 1rem;

  @include sm {
    padding: 8px 8px;
  }

  @include md {
    padding: 16px 16px;
  }

  @include lg {
    padding: 32px 32px;
  }

  @include xl {
    padding: 1rem 2rem;
  }
}
</style>

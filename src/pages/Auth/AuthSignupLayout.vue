<template>
  <div>
    <h3>Pertanahan App</h3>
    <hr />

    <div class="auth-form-login">
      <fg-input
        type="text"
        label="Nama Lengkap"
        placeholder="Paper dashboard"
        v-model="form.full_name"
      ></fg-input>

      <fg-input
        type="text"
        label="Alamat Email"
        placeholder="Paper dashboard"
        v-model="form.email"
      ></fg-input>

      <fg-input
        type="password"
        label="Password"
        placeholder="Paper dashboard"
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
      }
    };
  },
  methods: {
    signup() {
      this.loading.signup = true;
      apiPostSignup({
        emai: this.form.email,
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
          this.$toast.error("Pendaftaran Tidak Berhasil");
        })
        .finally(() => {
          this.loading.signup = false;
        });
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

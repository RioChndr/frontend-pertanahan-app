<template>
  <div>
    <h3>Pertanahan App</h3>
    <hr />

    <div class="auth-form-login">
      <fg-input
        type="text"
        label="Alamat Email"
        placeholder="Alamat Email"
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
        :disabled="loading.signin"
        @click="loginFunction"
      >
        Masuk
        <i class="fa fa-spinner fa-spin fa-fw" v-if="loading.signin"></i>
      </button>
      <hr />
      <!-- <div id="google-signin-button"></div> -->

      <div class="text-center mt-4">
        Tidak punya akun?
        <router-link :to="{ name: 'signup' }">Silahkan Daftar</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { apiPostLogin } from "../../http/api";

export default {
  data() {
    return {
      form: {
        email: null,
        password: null
      },
      loading: {
        signin: false
      },
      clientId: process.env.VUE_APP_OAUTH_CLIENT_ID
    };
  },
  mounted() {
    // window.gapi.load("auth2", function() {});
    window.gapi.signin2.render("google-signin-button", {
      scope: "profile email",
      width: 400,
      height: 50,
      longtitle: true,
      theme: "dark",
      onsuccess: this.OnGoogleAuthSuccess,
      onfailure: this.OnGoogleAuthFail
    });
  },
  methods: {
    loginFunction() {
      this.loading.signin = true;
      apiPostLogin({ email: this.form.email, password: this.form.password })
        .then(result => {
          this.$toast.success("Login Berhasil");
          const { token, ...withoutToken } = result.data;
          localStorage.setItem(process.env.VUE_APP_TOKEN_STORAGE, token);
          localStorage.setItem(
            process.env.VUE_APP_USER_INFO,
            JSON.stringify(withoutToken)
          );
          window.location.reload();
        })
        .catch(err => {
          this.$toast.error("Login Tidak Berhasil");
        })
        .finally(() => {
          this.loading.signin = false;
        });
    },
    OnGoogleAuthSuccess() {
      const auth = window.gapi.auth2.getAuthInstance();
      console.log(auth);
      // Receive the idToken and make your magic with the backend
    },
    OnGoogleAuthFail(error) {
      console.error(error);
    },
    googleSignIn() {}
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
    padding: 2rem 2rem;
  }
}

.google-signin-button {
  color: #222;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  width: 100%;
  border: 1px solid #c3c3c3;
  box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.1);
}
</style>

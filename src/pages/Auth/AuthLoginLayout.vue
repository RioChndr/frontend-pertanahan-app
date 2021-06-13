<template>
  <div>
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

      <GoogleLogin
        :params="params"
        :onSuccess="OnGoogleAuthSuccess"
        :onFailure="OnGoogleAuthFail"
        class="btn-google-login"
      >
        <i class="fa fa-google"></i>
        Login with Google
        <i class="fa fa-spinner fa-spin fa-fw" v-if="loading.google"></i>
      </GoogleLogin>

      <div class="text-center mt-4">
        Tidak punya akun?
        <router-link :to="{ name: 'signup' }">Silahkan Daftar</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {
  apiPostLogin,
  apiPostSignup,
  apiPostVerifyAuthGoogle
} from "../../http/api";
import GoogleLogin from "vue-google-login";

export default {
  components: { GoogleLogin },
  data() {
    return {
      form: {
        email: null,
        password: null
      },
      loading: {
        signin: false,
        google: false
      },
      params: {
        client_id: process.env.VUE_APP_OAUTH_CLIENT_ID
      }
    };
  },
  methods: {
    loginFunction() {
      this.loading.signin = true;
      apiPostLogin({ email: this.form.email, password: this.form.password })
        .then(result => {
          if (result.data.status === 0) {
            this.$toast.error(result.data.message);
          } else {
            this.$toast.success("Login Berhasil");
            const { token, ...withoutToken } = result.data;
            localStorage.setItem(process.env.VUE_APP_TOKEN_STORAGE, token);
            localStorage.setItem(
              process.env.VUE_APP_USER_INFO,
              JSON.stringify(withoutToken)
            );
            window.location.reload();
          }
        })
        .catch(err => {
          this.$toast.error("Login Tidak Berhasil");
        })
        .finally(() => {
          this.loading.signin = false;
        });
    },
    OnGoogleAuthSuccess(googleUser) {
      this.loading.google = true;
      const authInfo = googleUser.getAuthResponse();
      const profile = googleUser.getBasicProfile();
      apiPostVerifyAuthGoogle(authInfo.id_token)
        .then(result => {
          const { token, ...withoutToken } = result.data;
          if (token) {
            this.$toast.success("Login Berhasil");
            localStorage.setItem(process.env.VUE_APP_TOKEN_STORAGE, token);
            localStorage.setItem(
              process.env.VUE_APP_USER_INFO,
              JSON.stringify(withoutToken)
            );
            window.location.reload();
          }
        })
        .catch(err => {
          this.$toast.error("Terjadi Kesalahan Login dengan Google");
        })
        .finally(() => {
          this.loading.google = false;
        });
    },
    OnGoogleAuthFail(error) {
      console.error(error);
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
    padding: 2rem 2rem;
  }
}

.btn-google-login {
  color: #222;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  width: 100%;
  border: 1px solid #c3c3c3;
  background-color: #fff;
  box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.1);
}
</style>

<template>
  <div>
    <form
      v-if="!confirmPassword"
      class="flex flex-col items-center"
      @submit.prevent="signUp"
    >
    <div class="flex flex-col user">
      <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Username</label>
      <input
        type="text"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
        v-model="username"
        id="username"
      >
    </div>
    <div class="flex flex-col password">
      <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
      <input
        type="password"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
        v-model="password"
        id="password"
      >
    </div>
    <div class="flex flex-col email">
      <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
      <input
        type="email"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
        v-model="email"
        id="email"
      >
    </div>
    <button class="btn-blue mt-2">Sign Up</button>
    </form>
    <div v-if="error" class="text-red-600">
      {{ error.message }}
    </div>
    <div v-if="confirmPassword" class="w-4/12 m-auto">
    <h3>Enter your code. Please check your email.</h3>
    <div class="flex flex-col mt-2">
      <label for="password" class="block text-gray-700 text-sm font-bold">Code</label>
      <input
        type="text"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
        v-model="code"
      >
      <button class="btn-blue" @click="confirmSignUp">Confirm Code</button>
    </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
  export default {
    data: () => ({
      username: '',
      password: '',
      email: '',
      error: '',
      confirmPassword: false,
      code: ''
    }),
    methods: {
        ...mapActions({
        signUpVue: 'auth/signUp',
        confirmSignUpVue: 'auth/confirmSignUp',
        loginVue: 'auth/login'
      }),
      async signUp() {
        if(!this.email || !this.password) {
          return
        }
        try {
          const { username, password, email } = this
          await this.signUpVue({
            username,
            password,
            email
            })
            this.confirmPassword = true
        } catch (err) {
          this.error = err
        }
      },
      async confirmSignUp() {
        if (!this.username || !this.code) {
          return
        }
        try {
          const { username, code, password } = this
          await this.confirmSignUpVue({
            username,
            code
          })
          await this.loginVue({
            username,
            password
          })
          this.$router.push('/albums')
        } catch (err) {
          this.error = err
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

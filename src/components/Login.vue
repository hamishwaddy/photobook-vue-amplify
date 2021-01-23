<template>
  <div>
    <form class="flex flex-col items-center" @submit.prevent="login">
      <div class="flex flex-col user">
        <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Username</label>
        <input
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
          v-model="username"
          id="username"
        >
      </div>
      <div class="flex flex-col mt-10">
        <label
          for="password"
          class="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
          v-model="password"
          id="password"
        >
      </div>
      <button class="btn-blue mt-2">Sign In</button>
    </form>
    <div class="text-red-600">{{ error.message }}</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
  export default {
    data: () => ({
      username: '',
      password: '',
      email: '',
      error: ''
    }),
    methods: {
      ...mapActions({
        loginVue: 'auth/login'
      }),
      async login() {
        try {
          await this.loginVue({
            username: this.username,
            password: this.password
          })
          this.$router.push('/albums')
        } catch(err) {
          this.error = err
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

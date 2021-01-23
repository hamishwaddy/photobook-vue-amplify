import { Auth } from 'aws-amplify'

export const auth = {
  namespaced: true,
  state: { user: null },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    }
  },
  actions: {
    async logout({ commit }) {
      commit('SET_USER', null)
      return await Auth.signOut()
    },

    async login({ commit }, { username, password }) {
      try {
        await Auth.signIn({
          username,
          password
        })

        const userInfo = await Auth.currentUserInfo()
        commit('SET_USER', userInfo)
        return Promise.resolve('Success')
      } catch (err) {
        console.log(err);
        return Promise.reject(err)
      }
    },

    async confirmSignUp( _, { username, code }) {
      try {
        Auth.confirmSignUp(username, code)
        return Promise.resolve('Success')
      } catch(err) {
        console.log(err)
        return Promise.reject(err)
      }
    },

    async signUp( _, { username, password, email }) {
      try {
        await Auth.signUp({
          username,
          password,
          attributes: {
            email
          }
        })
        return Promise.resolve('Success');
      } catch(err) {
        console.log(err);
        return Promise.reject(err)
      }
    },

    async authAction({ commit }) {
      const userInfo = await Auth.currentUserInfo()
      commit('SET_USER', userInfo)
    }
  },
  getters: {
    user: (state) => state.user
  }
}

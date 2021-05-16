<template>
<b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">PayPay</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-navbar-nav v-if="isAdmin">
        <b-nav-item href="">
           <router-link to="/admin">Employees</router-link>
        </b-nav-item>
         <b-nav-item href="">
           <router-link to="/admin/performance-reviews">Performance Reviews</router-link>
        </b-nav-item>
    </b-navbar-nav>

    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" v-if="$route.name !== 'Login'">
        <h5> {{ welcomeMessage }} </h5>
        <b-nav-form>
          <b-button size="sm" class="my-2 my-sm-0" type="button" @click="logout">Log out</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
import { logout } from '@/apis'
import store from '@/store'

export default {
  computed: {
    isAdmin() {
      return store.state.auth.isAdmin
    },
    welcomeMessage() {
      if (!store.state.auth.employee) {
        return ''
      }
      if (store.state.auth.isAdmin) {
        return 'Admin'
      } else {
        return 'Welcome ' + store.state.auth.employee.first_name
      }
    }
  },
  methods: {
    async logout() {
      try {
        await logout() 
        store.commit('logout')
        this.$router.push({
          name: 'Login'
        })
      } catch(e) {
        console.log(e)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  a {
    color: white;
  }
</style>
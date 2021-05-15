<template>
<b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
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
</script>>
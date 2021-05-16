<template>
  <div></div>
</template>

<script>
import store from '@/store'

export default {
  name: 'Home',
  mounted() {
    if (store.state.auth.isAdmin) {
      this.$router.push({
        name: 'AdminHome'
      })
    } else {
      this.$router.push({
        name: 'EmployeeHome'
      })
    }
  }
}
</script>

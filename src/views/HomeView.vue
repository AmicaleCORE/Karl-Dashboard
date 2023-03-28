<template>
  <div class="home">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { title } from '@/assets/scripts/configuration'

export default defineComponent({
  name: 'HomeView',
  created () {
    document.title = title(this.$route.name)
  }
})
</script>

<style lang="sass" scoped>

</style>

<template>
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style lang="sass">
@use "assets/css/book"
@forward "assets/css/normalize"

#app
  width: 100%
  min-height: 100vh
  font-family: book.$font
  background-color: book.$bg
</style>

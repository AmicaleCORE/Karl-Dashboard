<template>
  <RouterView />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style lang="scss">
@use "./assets/css/book";
@forward "./assets/css/normalize";

#app {
  width: 100%;
  min-height: 100vh;
  font-family: book.$font;
  background-color: book.$bg;
}

svg {
  height: 100%;
  display: block;
}
</style>

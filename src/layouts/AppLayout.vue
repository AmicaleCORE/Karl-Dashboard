<template>
  <div class="wrapper">
    <nav class="sidebar">
      <header class="sidebar__header">
        <h1 class="sidebar__header--name">Karl</h1>
        <p class="sidebar__header--description">Sales assistant</p>
      </header>

      <main class="sidebar__content">
        <section class="sidebar__content__links">
          <RouterLink to="/" exact-active-class="active" class="sidebar__content__link">Tableau de bord</RouterLink>
          <RouterLink to="/sell" active-class="active" class="sidebar__content__link">Vendre</RouterLink>
        </section>

        <!-- TODO: Theme switcher
        <section class="sidebar__content__theme"></section>
        -->
      </main>
    </nav>

    <aside class="page">
      <header class="page__header">
        <h2 class="page__header__name">{{ $route.name }}</h2>
      </header>

      <RouterView />
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppLayout'
})
</script>

<style lang="sass" scoped>
@use '../assets/css/book'

.wrapper
  display: flex

.sidebar
  gap: 1.5em
  height: 100vh
  display: flex
  color: book.$bg
  padding: 2em 1.5em
  flex-direction: column
  border-top-right-radius: 2.5em
  background-image: book.$gradient

  &__header
    flex: 0 0 auto
    padding: 0 1em

    &--name
      font-size: 1.5em
      font-weight: 800

    &--description
      opacity: .7
      line-height: 100%
      white-space: nowrap

  &__content
    display: flex
    flex: 1 1 100%
    flex-direction: column
    justify-content: space-between

    &__links
      gap: .5em
      display: flex
      flex-direction: column

    &__link
      gap: 1em
      display: flex
      line-height: 100%
      padding: 1em 1.5em
      white-space: nowrap
      border-radius: 10em
      align-items: center
      justify-content: space-between
      transition: background-color 200ms ease-in-out

      &::after
        opacity: 0
        width: .5em
        content: ''
        border-radius: 1em
        aspect-ratio: 1 / 1
        background-image: book.$gradient
        transition: opacity 200ms ease-in-out
        box-shadow: 0 0 0 .175em book.$bg-m-opacity

      &.active
        background-color: book.$bg-h-opacity

        &::after
          opacity: 1

      &:hover
        background-color: book.$bg-h-opacity

.page
  flex: 1 1 100%
  min-height: 100vh

  &__header
    top: 0
    width: 100%
    display: flex
    position: sticky
    padding: 2em 3em
    align-items: center
    backdrop-filter: blur(1em)
    justify-content: space-between
    background-color: book.$bg-m-opacity

    &__name
      font-size: 1.5em
      font-weight: 600
</style>

<template>
  <main class="selling">
    <header class="selling__filters">
      Filtres
    </header>

    <section class="selling__products">
      <div class="selling__products__item" @click="click(id)" :class="{ disabled: product.stock <= 0, preferred: false }" :key="product" v-for="(product, id) in products">
        <img :src="product.image" alt="" class="selling__products__item--thumbnail" />

        <div class="selling__products__item--content">
          <h3 class="selling__products__item--name">{{ product.name }}</h3>

          <div class="selling__products__item__creds">
            <p class="selling__products__item__creds--price">{{ product.price.toFixed(2) }} €</p>
            <p class="selling__products__item__cred--amount">{{ product.stock }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="selling__command">
      <p :key="product" v-for="product in $store.state.cart">{{ product.name }}</p>
    </section>
  </main>
</template>

<script>
import { defineComponent } from 'vue'
import products from '@/assets/scripts/products'

export default defineComponent({
  name: 'SellingView',
  data: () => ({
    products
  }),
  methods: {
    click (id) {
      if (!this.products[id] || this.products[id].stock <= 0) return
      this.$store.state.cart.push(this.products[id])
    }
  }
})
</script>

<style lang="sass" scoped>
@use "../../assets/css/book"

.selling
  gap: 2em
  display: grid
  grid-template-columns: repeat(3, 1fr)

  &__filters
    grid-column: span 3

  &__products
    display: grid
    gap: 1.5em 1em
    grid-column: span 2
    background-color: book.$bg
    grid-template-columns: repeat(auto-fill, minmax(12.5em, 1fr))

    &__item
      gap: 1em
      display: flex
      cursor: pointer
      border-radius: 1em
      padding: 1em 1.5em
      align-items: center
      flex-direction: column
      box-shadow: 0 .25em 1em 0 book.$shadow-tint

      &.preferred
        order: -1

      &.disabled
        order: 1
        cursor: not-allowed

        > *
          opacity: .3
          pointer-events: none

      *
        user-select: none

      &--content
        gap: .5em
        width: 100%
        height: 100%
        display: flex
        flex-direction: column
        justify-content: space-between

      &--thumbnail
        width: 3em
        object-fit: cover
        border-radius: 1em
        aspect-ratio: 1 / 1
        transition: transform 250ms ease-in-out

      &--name
        font-weight: 600
        font-size: 1.25em
        line-height: 100%

      &__creds
        width: 100%
        display: flex
        align-items: center
        justify-content: space-between

      &:not(.disabled):hover
        > img
          transform: scale(1.07) translateY(-.35em)
</style>

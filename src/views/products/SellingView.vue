<template>
  <main class="selling">
    <section class="selling__filters">
      <!-- SEARCH BAR-->
      <ShortInput ref="search_bar" class="selling__filters--search" @updated="filterProducts" allow-clear>Rechercher...</ShortInput>
      <!-- FILTER BUTTON -->
      <button class="selling__filters--toggle">
        <IconRenderer category="outline" name="filter" />
        Filtres
      </button>
      <!-- DISPLAY LAYOUT -->
      <div class="selling__filters__display">
        <button class="selling__filters__display--button" @click.prevent="toggleView('grid')" :class="{ active: $store.state.display.products === 'grid' }"><IconRenderer category="outline" name="grid_view" /></button>
        <button class="selling__filters__display--button" @click.prevent="toggleView('line')" :class="{ active: $store.state.display.products !== 'grid' }"><IconRenderer category="outline" name="list_view" /></button>
      </div>
    </section>

    <section class="selling__products" v-if="$store.state.display.products === 'grid'"><ProductCard :product="product" :key="product" v-for="product in products" @clicked="addToCart(product)" /></section>
    <section class="selling__products items" v-else><ProductLine :product="product" :key="product" v-for="product in products" @clicked="addToCart(product)" /></section>

    <section class="selling__command">
      <div class="selling__command__cart">
        <header class="selling__command__cart__header">
          <h2 class="selling__command__cart__header--title">Panier</h2>
          <button class="selling__command__cart__header--clear" @click="clear"><IconRenderer category="outline" name="trash" /></button>
        </header>

        <div class="selling__command__cart--content">
          <p class="selling__command__cart--no-content" v-if="Object.keys($store.state.cart).length === 0">Aucun produit...</p>
          <div class="selling__command__cart__item" :key="product" v-for="(product, key) in $store.state.cart" v-else>
            <div class="selling__command__cart__item--left">
              <div class="selling__command__cart__item__credentials">
                <p class="selling__command__cart__item__credentials--name">{{ key }}</p>
                <div class="selling__command__cart__item__credentials--actions">
                  <button class="selling__command__cart__item__actions--button" @click="decrementQuantity(key, product)"><svg width="5" height="1" viewBox="0 0 5 1" fill="none"><path d="M0.666016 0.0660095H4.33402V0.93401H0.666016V0.0660095Z" fill="currentColor"/></svg></button>
                  <span class="selling__command__cart__item__credentials--amount">{{ product.amount }}</span>
                  <button class="selling__command__cart__item__actions--button" @click="incrementQuantity(product)"><svg width="7" height="7" viewBox="0 0 7 7" fill="none"><path d="M6.54508 3.92001H3.94108V6.46801H3.05908V3.92001H0.455078V3.09401H3.05908V0.532013H3.94108V3.09401H6.54508V3.92001Z" fill="currentColor"/></svg></button>
                </div>
              </div>
            </div>

            <div class="selling__command__cart__item__resume">
              <p class="selling__command__cart__item__resume--total">{{ getProductPrice(product).toFixed(2) }} €</p>
              <button class="selling__command__cart__item__resume--delete" @click="deleteProduct(key)"><IconRenderer category="outline" name="trash" /></button>
            </div>
          </div>
        </div>

        <footer class="selling__command__cart__footer">
          <p class="selling__command__cart__footer--title">Total</p>
          <p class="selling__command__cart__footer--price">{{ (getTotalPrice()).toFixed(2)}} €</p>
        </footer>
      </div>

      <div class="selling__command__payement">
        <button class="selling__command__payement--method" :class="{ disabled: getTotalPrice() === 0 }">Espèce</button>
        <button class="selling__command__payement--method" :class="{ disabled: getTotalPrice() === 0 }">CB</button>
        <button class="selling__command__payement--method" :class="{ disabled: getTotalPrice() === 0 }">Compte personnel</button>
      </div>
    </section>
  </main>
</template>

<script>
import { defineComponent } from 'vue'
import products from '@/assets/scripts/products'
import { searchParser } from '@/assets/scripts/functions'
import ProductCard from '@/components/karl/products/ProductCard.vue'
import IconRenderer from '@/components/framework/misc/IconRenderer.vue'
import ProductLine from '@/components/karl/products/ProductLine.vue'
import ShortInput from '@/components/framework/form/ShortInput.vue'

export default defineComponent({
  name: 'SellingView',
  components: { ShortInput, ProductLine, IconRenderer, ProductCard },
  data: () => ({
    products
  }),
  created () {
    // TODO: save products to store
  },
  methods: {
    addToCart (product) {
      if (!product || product.stock <= 0) return

      if (!this.$store.state.cart[product.name]) {
        this.$store.state.cart[product.name] = {
          stock: product.stock,
          price: product.price,
          amount: 0
        }
      }
      this.incrementQuantity(this.$store.state.cart[product.name])
    },
    clear () {
      this.$store.state.cart = {}
    },
    incrementQuantity (product) {
      product.amount++
    },
    decrementQuantity (name, product) {
      if (product.amount - 1 === 0) return this.deleteProduct(name)
      product.amount--
    },
    deleteProduct (name) {
      delete this.$store.state.cart[name]
    },
    getProductPrice (product) {
      return product.amount * product.price
    },
    getTotalPrice () {
      let amount = 0
      Object.keys(this.$store.state.cart).forEach(key => {
        amount += this.getProductPrice(this.$store.state.cart[key])
      })
      return amount
    },
    toggleView (view) {
      localStorage.setItem('display-products', view)
      this.$store.state.display.products = view
    },
    filterProducts (e) {
      if (!e.value) {
        this.products = products
        return
      }

      const value = searchParser(e.value)
      this.products = products.filter((product) => searchParser(product.name).includes(value))
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
    gap: 1.5em
    display: flex
    grid-column: span 3
    align-items: stretch

    &--search
      flex: 1 1 100%

    &--toggle
      gap: .75em
      display: flex
      color: book.$bg
      line-height: 100%
      padding: 1em 1.5em
      align-items: center
      border-radius: .75em
      background-image: book.$gradient

    &__display
      display: flex
      flex: 0 0 auto

      &--button
        $radius: .75em
        $duration: 350ms

        height: 3em
        display: grid
        overflow: hidden
        position: relative
        isolation: isolate
        aspect-ratio: 1 / 1
        place-content: center
        transition: color $duration ease-in-out

        &::before
          top: 0
          left: 0
          z-index: -1
          content: ''
          width: 100%
          position: absolute
          aspect-ratio: 1 / 1
          border-radius: $radius
          background-image: book.$gradient
          transition: transform $duration ease-in-out

        &:first-child
          border-radius: $radius 0 0 $radius

          &::before
            transform: translateX(100%)

        &:last-child
          border-radius: 0 $radius $radius 0

          &::before
            transform: translateX(-100%)

        &.active
          color: book.$bg

          &::before
            transform: none

  &__products
    display: grid
    gap: 1.5em 1em
    grid-column: span 2
    background-color: book.$bg
    grid-template-columns: repeat(auto-fill, minmax(12.5em, 1fr))

    &.items
      gap: 1em
      grid-template-columns: 1fr

  &__command
    gap: 2em
    display: flex
    flex-direction: column

    &__cart
      gap: 1em
      display: flex
      padding: 0 1.25em
      border-radius: 1.5em
      flex-direction: column
      background-color: book.$bg
      box-shadow: 0 .5em 1.5em 0 book.$shadow-tint

      &__header, &__footer
        display: flex
        padding: 1em .5em
        position: relative
        align-items: center
        justify-content: space-between

        &::before, &::after
          left: 0
          opacity: .1
          width: 100%
          height: 2px
          position: absolute
          background-color: book.$txt

      &__header
        &--title
          font-weight: 700
          font-size: 1.25em
          line-height: 100%

        &::after
          bottom: 0
          content: ''
          transform: translateY(50%)

      &__footer
        *
          line-height: 100%

        &--price
          font-weight: 700

        &::before
          top: 0
          content: ''
          transform: translateY(-50%)

      &--content
        gap: 1em
        display: flex
        flex-direction: column

      &__item
        display: flex
        align-items: stretch

        &--left
          gap: .5em
          display: flex
          flex: 1 1 100%

        &__actions
          gap: .25em
          display: flex
          flex-direction: column

          &--button
            width: 1.5em
            display: grid
            border-radius: .5em
            aspect-ratio: 1 / 1
            place-content: center
            background-color: book.$bg-accent

        &__credentials
          gap: .5em
          display: flex
          flex-direction: column
          justify-content: space-between

          &--name
            font-weight: 600

          &--amount
            opacity: .6
            line-height: 100%

          &--actions
            display: flex
            grid-gap: .5em
            align-items: center

        &__resume
          gap: .5em
          display: flex
          flex: 0 0 auto
          align-items: center

          &--total
            line-height: 100%

          &--delete
            height: 100%
            padding: 0 .5em
            color: book.$alert

    &__payement
      gap: 1em
      display: grid
      grid-template-columns: 1fr 1fr

      &--method
        padding: 1em 1.25em
        border-radius: .75em
        background-color: book.$bg-accent

        &:last-child
          grid-column: span 2

        &.disabled
          cursor: not-allowed
          color: book.$txt-disabled
</style>

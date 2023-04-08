<template>
  <main class="selling">
    <header class="selling__filters">
      Filtres
    </header>

    <section class="selling__products">
      <ProductCard :product_id="index" :key="product" v-for="(product, index) in products" @clicked="addToCart(index)" />
    </section>

    <section class="selling__command">
      <div class="selling__command__cart">
        <header class="selling__command__cart__header">
          <h2 class="selling__command__cart__header--title">Panier</h2>
          <button class="selling__command__cart__header--clear" @click="clear"><IconRenderer category="outline" name="trash" /></button>
        </header>

        <div class="selling__command__cart--content">
          <p class="selling__command__cart--no-content" v-if="Object.keys($store.state.cart).length === 0">Aucun produit...</p>
          <div class="selling__command__cart__item" :key="amount" v-for="(amount, key) in $store.state.cart" v-else>
            <div class="selling__command__cart__item--left">
              <div class="selling__command__cart__item__actions">
                <button class="selling__command__cart__item__actions--button" @click="incrementQuantity(key)"><svg width="7" height="7" viewBox="0 0 7 7" fill="none"><path d="M6.54508 3.92001H3.94108V6.46801H3.05908V3.92001H0.455078V3.09401H3.05908V0.532013H3.94108V3.09401H6.54508V3.92001Z" fill="currentColor"/></svg></button>
                <button class="selling__command__cart__item__actions--button" @click="decrementQuantity(key)"><svg width="5" height="1" viewBox="0 0 5 1" fill="none"><path d="M0.666016 0.0660095H4.33402V0.93401H0.666016V0.0660095Z" fill="currentColor"/></svg></button>
              </div>

              <div class="selling__command__cart__item__credentials">
                <p class="selling__command__cart__item__credentials--name">{{ products[key].name }}</p>
                <span class="selling__command__cart__item__credentials--amount">{{ amount }}</span>
              </div>
            </div>

            <div class="selling__command__cart__item__resume">
              <p class="selling__command__cart__item__resume--total">{{ getProductPrice(key).toFixed(2) }} €</p>
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
import ProductCard from '@/components/karl/products/ProductCard.vue'
import IconRenderer from '@/components/framework/misc/IconRenderer.vue'

export default defineComponent({
  name: 'SellingView',
  components: { IconRenderer, ProductCard },
  data: () => ({
    products
  }),
  methods: {
    addToCart (product) {
      if (!this.products[product] || this.products[product].stock <= 0) return

      if (!this.$store.state.cart[product]) this.$store.state.cart[product] = 0
      this.$store.state.cart[product]++
    },
    clear () {
      this.$store.state.cart = {}
    },
    incrementQuantity (product) {
      this.$store.state.cart[product]++
    },
    decrementQuantity (product) {
      if (this.$store.state.cart[product] === 1) return this.deleteProduct(product)
      this.$store.state.cart[product]--
    },
    deleteProduct (product) {
      delete this.$store.state.cart[product]
    },
    getProductPrice (product) {
      return this.products[product].price * this.$store.state.cart[product]
    },
    getTotalPrice () {
      let amount = 0
      Object.keys(this.$store.state.cart).forEach(key => {
        amount += this.getProductPrice(key)
      })
      return amount
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
            width: 1.25em
            display: grid
            border-radius: .5em
            aspect-ratio: 1 / 1
            place-content: center
            background-color: book.$bg-accent

        &__credentials
          display: flex
          flex-direction: column
          justify-content: space-between

          &--name
            font-weight: 600

          &--amount
            opacity: .6
            line-height: 100%

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

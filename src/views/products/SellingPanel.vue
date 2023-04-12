<template>
  <main class="selling">
    <header class="selling__filters">
      <ShortInput class="selling__filters--search" @updated="filterView" allow-clear>Rechercher...</ShortInput>

      <button class="selling__filters--options"><IconRenderer category="outline" name="filter" /> Filtrer</button>

      <aside class="selling__filters__display">
        <button class="selling__filters__display--button" aria-label="Vue en grille" @click.prevent="toggleView('grid')" :class="{ active: $store.state.display.products === 'grid' }"><IconRenderer category="outline" name="grid_view" /></button>
        <button class="selling__filters__display--button" aria-label="Vue en liste" @click.prevent="toggleView('list')" :class="{ active: $store.state.display.products !== 'grid' }"><IconRenderer category="outline" name="list_view" /></button>
      </aside>
    </header>

    <div class="selling--wrapper">
      <section class="selling__products grid" v-if="$store.state.display.products === 'grid'">
        <ProductCard :product="product" :key="product" v-for="product in products" @clicked="addToCart(product)" />
      </section>
      <section class="selling__products line" v-else>
        <ProductLine :product="product" :key="product" v-for="product in products" @clicked="addToCart(product)" />
      </section>

      <aside class="selling__cart">
        <div class="selling__cart__resume">
          <header class="selling__cart__resume__header">
            <h2 class="selling__cart__resume__header--title">Panier</h2>

            <button class="selling__cart__resume__header--clear" aria-label="Vider le panier" @click.prevent="clearCart"><IconRenderer category="outline" name="trash" /></button>
          </header>

          <section class="selling__cart__resume--wrapper">
            <p class="selling__cart__resume--empty" v-if="Object.keys($store.state.cart).length === 0">Aucun produit...</p>
            <CartProduct class="selling__cart__resume--product" :product="product" :key="product" v-for="product in $store.state.cart" @increase="increaseProductQuantity" @decrease="removeFromCart" @clear="deleteFromCart" />
          </section>

          <footer class="selling__cart__resume__footer">
            <h3 class="selling__cart__resume__footer--label">Total</h3>
            <p class="selling__cart__resume__footer--price">{{ parseMoney(getCartPrice()) }} €</p>
          </footer>
        </div>

        <div class="selling__cart__checkout">
          <button class="selling__cart__checkout--method" :class="{ disabled: Object.keys(this.$store.state.cart).length === 0 }">Espèce</button>
          <button class="selling__cart__checkout--method" :class="{ disabled: Object.keys(this.$store.state.cart).length === 0 }">CB</button>
          <button class="selling__cart__checkout--method" :class="{ disabled: Object.keys(this.$store.state.cart).length === 0 }">Compte personnel</button>
        </div>
      </aside>
    </div>
  </main>
</template>

<script>
import products from '@/assets/scripts/products'
import ShortInput from '@/components/framework/form/ShortInput.vue'
import IconRenderer from '@/components/framework/misc/IconRenderer.vue'
import ProductCard from '@/components/karl/products/ProductCard.vue'
import ProductLine from '@/components/karl/products/ProductLine.vue'
import CartProduct from '@/components/karl/products/cart/CartProduct.vue'
import { parseMoney, searchParser } from '@/assets/scripts/functions'

export default {
  name: 'SellingPanel',
  components: { CartProduct, ProductLine, ProductCard, IconRenderer, ShortInput },
  data: () => ({
    products: []
  }),
  created () {
    this.$store.state.products = products
    this.products = this.$store.state.products
  },
  methods: {
    parseMoney,
    toggleView (view) {
      localStorage.setItem('display-products', view)
      this.$store.state.display.products = view
    },
    filterView (e) {
      if (!e.value) {
        this.products = this.$store.state.products
        return
      }

      const value = searchParser(e.value)
      this.products = this.$store.state.products.filter((product) => searchParser(product.name).includes(value))
    },
    clearCart () {
      this.$store.state.cart = {}
    },
    addToCart (product) {
      let cartProduct = this.$store.state.cart[product.name]

      if (cartProduct && cartProduct.amount >= cartProduct.stock) return

      if (!cartProduct) {
        cartProduct = {
          name: product.name,
          stock: product.stock,
          price: product.price,
          amount: 0
        }
      }
      this.increaseProductQuantity({ target: cartProduct, amount: 1 })
    },
    increaseProductQuantity (e) {
      e.target.amount += e.amount
      this.$store.state.cart[e.target.name] = e.target
    },
    removeFromCart (e) {
      if (e.target.amount - e.amount <= 0) return this.deleteFromCart(e)

      e.target.amount -= e.amount
      this.$store.state.cart[e.target.name] = e.target
    },
    deleteFromCart (e) {
      if (this.$store.state.cart[e.target.name]) delete this.$store.state.cart[e.target.name]
    },
    getCartPrice () {
      let amount = 0

      Object.keys(this.$store.state.cart).forEach(key => {
        const product = this.$store.state.cart[key]
        amount += product.amount * product.price
      })

      return amount
    }
  }
}
</script>

<style lang="scss" scoped>
@use '../../assets/css/book';

$border-radius: .75em;

.selling {
  gap: .5em;
  display: flex;
  position: relative;
  padding-bottom: 2em;
  flex-direction: column;
  height: calc(100vh - 7.5em);

  &__filters {
    gap: 1.5em;
    width: 100%;
    z-index: 999;
    display: flex;
    background: book.$bg;

    &--search {
      flex: 1 1 100%;
    }

    &--options {
      gap: .75em;
      display: flex;
      flex: 0 0 auto;
      color: book.$bg;
      line-height: 100%;
      padding: 1em 1.5em;
      align-items: center;
      background: book.$gradient;
      border-radius: $border-radius;
    }

    &__display {
      display: flex;
      flex: 0 0 auto;

      &--button {
        width: 3em;
        display: grid;
        overflow: hidden;
        position: relative;
        isolation: isolate;
        aspect-ratio: 1 / 1;
        place-content: center;
        transition: color 350ms ease-in-out;

        &::before {
          top: 0;
          left: 0;
          content: '';
          width: 100%;
          z-index: -1;
          position: absolute;
          aspect-ratio: 1 / 1;
          background: book.$gradient;
          border-radius: $border-radius;
          transition: transform 350ms ease-in-out;
        }

        &:first-child {
          border-radius: $border-radius 0 0 $border-radius;

          &::before {
            transform: translateX(100%);
          }
        }

        &:last-child {
          border-radius: 0 $border-radius $border-radius 0;

          &::before {
            transform: translateX(-100%);
          }
        }

        &.active {
          color: book.$bg;

          &::before {
            transform: none;
          }
        }
      }
    }
  }

  &--wrapper {
    gap: 2em;
    display: flex;
    flex: 1 1 100%;
    padding: 1em 0;
    overflow-y: scroll;
    align-items: flex-start;
  }

  &__products {
    flex: 1 1 100%;

    &.grid {
      display: grid;
      gap: 1.5em 1em;
      grid-template-columns: repeat(auto-fill, minmax(12.5em, 1fr));
    }

    &.line {
      gap: 1em;
      display: flex;
      flex-direction: column;
    }
  }

  &__cart {
    top: 0;
    gap: 2em;
    display: flex;
    flex: 0 0 33%;
    position: sticky;
    max-width: 17.5em;
    flex-direction: column;

    &__resume {
      padding: 0 1.25em;
      line-height: 100%;
      border-radius: 1.5em;
      background: book.$bg;
      box-shadow: 0 .5em 1.5em 0 book.$shadow-tint;

      &__header {
        display: flex;
        padding: 1em .5em;
        position: relative;
        align-items: center;
        justify-content: space-between;

        &::after {
          left: 0;
          bottom: 0;
          content: '';
          height: 2px;
          width: 100%;
          opacity: .2;
          position: absolute;
          background: book.$txt;
          transform: translateY(50%);
        }

        &--title {
          font-weight: 700;
          font-size: 1.25em;
        }
      }

      &--wrapper {
        gap: 1.5em;
        display: flex;
        overflow: auto;
        padding: .5em 0;
        max-height: 17.5em;
        flex-direction: column;
      }

      &--empty {
        opacity: .4;
        padding: .5em 0;
        text-align: center;
      }

      &--product {
        position: relative;

        &:not(:last-child) {
          &::after {
            left: 0;
            width: 100%;
            height: 1px;
            content: '';
            opacity: .1;
            bottom: -.75em;
            position: absolute;
            background: book.$txt;
          }
        }
      }

      &__footer {
        display: flex;
        padding: 1em .5em;
        line-height: 100%;
        position: relative;
        align-items: center;
        justify-content: space-between;

        &::before {
          top: 0;
          left: 0;
          content: '';
          height: 2px;
          width: 100%;
          opacity: .2;
          position: absolute;
          background: book.$txt;
          transform: translateY(-50%);
        }

        &--price {
          font-weight: 700;
        }
      }
    }

    &__checkout {
      gap: 1em;
      display: grid;
      grid-template-columns: 1fr 1fr;

      &--method {
        padding: 1em 1.25em;
        border-radius: .75em;
        background: book.$bg-accent;
        transition: color 150ms ease-in-out;

        &.disabled {
          cursor: not-allowed;
          color: book.$txt-disabled;
        }

        &:last-child {
          grid-column: span 2;
        }
      }
    }
  }
}
</style>

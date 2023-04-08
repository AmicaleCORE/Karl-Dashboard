<template>
  <div @click.prevent="$emit('clicked', { id: product_id })" class="product" :class="{ preferred: false, disabled: product.stock <= 0 }">
    <img :src="product.image" alt="" class="product--thumbnail" />

    <div class="product--content">
      <h3 class="product--name">{{ product.name }}</h3>

      <div class="product__credentials">
        <p class="product__credentials--price">{{ product.price.toFixed(2) }} €</p>
        <p class="product__credentials--amount">{{ product.stock }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import products from '@/assets/scripts/products'

export default defineComponent({
  name: 'ProductCard',
  data: () => ({
    product: undefined
  }),
  props: {
    product_id: {
      type: String,
      required: true
    }
  },
  created () {
    this.product = products[this.product_id]
  }
})
</script>

<style lang="sass" scoped>
@use "../../../assets/css/book"

.product
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

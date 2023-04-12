<template>
  <div v-if="product" @click.prevent="$emit('clicked', { product })" class="product" :class="{ preferred: false, disabled: product.stock <= 0 }">
    <img :src="product.image" alt="" class="product--thumbnail" />
    <p class="product--name">{{ product.name }}</p>

    <article class="product__info">
      <p class="product__info--price">{{ product.price.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }} €</p>
      <p class="product__info--quantity">{{ product.stock }}</p>
    </article>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProductLine',
  props: {
    product: {
      type: Object,
      required: true
    }
  }
})
</script>

<style lang="sass" scoped>
@use "../../../assets/css/book"

.product
  gap: 1em
  display: flex
  cursor: pointer
  align-items: center
  border-radius: 1.4em
  padding: .5em 1em .5em .5em
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

  &--thumbnail
    width: 3em
    object-fit: cover
    border-radius: 1em
    aspect-ratio: 1 / 1
    transition: transform 250ms ease-in-out

  &--name
    flex: 1 1 100%

  &__info
    gap: 1em
    height: 75%
    display: flex
    flex: 0 0 auto
    align-items: center

    &::before
      width: 1px
      content: ''
      opacity: .15
      height: 100%
      display: block
      background-color: currentColor

    &--price
      order: -1
</style>

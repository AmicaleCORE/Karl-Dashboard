<template>
  <div v-if="product" @click.prevent="$emit('clicked', { product })" class="product" :class="{ preferred: false, disabled: product.stock <= 0, unavailable: $store.state.cart[product.name]?.amount >= product.stock }">
    <img :src="product.image" alt="" class="product--thumbnail" />

    <div class="product--content">
      <h3 class="product--name">{{ product.name }}</h3>

      <div class="product__credentials">
        <p class="product__credentials--price">{{ parseMoney(product.price) }} €</p>
        <p class="product__credentials--amount">{{ product.stock }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { parseMoney } from '@/assets/scripts/functions'

export default defineComponent({
  name: 'ProductCard',
  methods: { parseMoney },
  props: {
    product: {
      type: Object,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
@use "../../../assets/css/book";

.product {
  gap: 1em;
  display: flex;
  cursor: pointer;
  border-radius: 1em;
  padding: 1em 1.5em;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 .25em 1em 0 book.$shadow-tint;

  &.preferred {
    order: -1;
  }

  &.disabled, &.unavailable {
    cursor: not-allowed;

    > * {
      opacity: .3;
      pointer-events: none;
    }
  }

  &.disabled {
    order: 1;
  }

  * {
    user-select: none;
  }

  &--content {
    gap: .5em;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &--thumbnail {
    width: 3em;
    object-fit: cover;
    border-radius: 1em;
    aspect-ratio: 1 / 1;
    transition: transform 250ms ease-in-out;
  }

  &--name {
    font-weight: 600;
    font-size: 1.25em;
    line-height: 100%;
  }

  &__credentials {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &:not(.disabled):not(.unavailable):hover {
    > img {
      transform: scale(1.07) translateY(-.35em);
    }
  }
}
</style>

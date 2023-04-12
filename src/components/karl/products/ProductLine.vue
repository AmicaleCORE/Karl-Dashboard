<template>
  <div v-if="product" @click.prevent="$emit('clicked', { product })" class="product" :class="{ preferred: false, disabled: product.stock <= 0, unavailable: $store.state.cart[product.name]?.amount >= product.stock }">
    <img :src="product.image" alt="" class="product--thumbnail" />
    <p class="product--name">{{ product.name }}</p>

    <article class="product__info">
      <p class="product__info--price">{{ parseMoney(product.price) }} €</p>
      <p class="product__info--quantity" :class="{ tooltip: product.stock >= 1000 }" :data-amount="product.stock">{{ product.stock >= 1000 ? '999+' : product.stock }}</p>
    </article>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { parseMoney } from '@/assets/scripts/functions'

export default defineComponent({
  name: 'ProductLine',
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
  align-items: center;
  border-radius: 1.4em;
  padding: .5em 1em .5em .5em;
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

  &--thumbnail {
    width: 3em;
    object-fit: cover;
    border-radius: 1em;
    aspect-ratio: 1 / 1;
    transition: transform 250ms ease-in-out;
  }

  &--name {
    flex: 1 1 100%;
  }

  &__info {
    gap: 1em;
    display: flex;
    flex: 0 0 auto;
    align-items: center;

    &::before {
      width: 1px;
      content: '';
      height: 2em;
      opacity: .15;
      display: block;
      background-color: currentColor;
    }

    &--price {
      order: -1;
    }

    &--quantity {
      width: 3ch;
      line-height: 2em;
      text-align: right;
      position: relative;

      &.tooltip {
        &::before {
          right: 0;
          opacity: 0;
          bottom: 100%;
          color: book.$bg;
          line-height: 100%;
          user-select: none;
          padding: .5em 1em;
          position: absolute;
          border-radius: .5em;
          pointer-events: none;
          background: book.$txt;
          content: attr(data-amount);
          transition-duration: 350ms;
          transform: translateY(-.5em);
          transition-timing-function: ease-in-out;
          transition-property: opacity, transform;
        }

        &:hover::before {
          opacity: 1;
          transform: none;
        }
      }
    }
  }
}
</style>

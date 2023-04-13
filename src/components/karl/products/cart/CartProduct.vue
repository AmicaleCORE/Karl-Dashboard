<template>
  <div class="product">
    <section class="product__infos">
      <p class="product__infos--name">{{ product.name }}</p>
      <div class="product__infos__actions">
        <button class="product__infos__actions--button" :aria-label="`Retirer un ${product.name}`" @click.prevent="submit('decrease', { target: product, amount: 1 })"><IconRenderer class="product__infos__actions--button-icon" category="default" name="minus" /></button>
        <p class="product__infos__actions--amount">{{ product.amount }}</p>
        <button class="product__infos__actions--button" :class="{ disabled: unavailable }" :aria-label="`Ajouter un ${product.name}`" @click.prevent="submit('increase', { target: product, amount: 1 }, unavailable)"><IconRenderer class="product__infos__actions--button-icon" category="default" name="plus" /></button>
      </div>
    </section>

    <aside class="product__resume">
      <p class="product__resume--price">{{ parseMoney(getTotal()) }} €</p>
      <button class="product__resume--clear" @click.prevent="submit('clear', { target: product })"><IconRenderer category="outline" name="trash" /></button>
    </aside>
  </div>
</template>

<script>
import { parseMoney } from '@/assets/scripts/functions'
import IconRenderer from '@/components/framework/misc/IconRenderer.vue'

export default {
  name: 'CartProduct',
  components: { IconRenderer },
  data: () => ({
    unavailable: true
  }),
  created () {
    this.unavailable = this.product.amount >= this.product.stock
  },
  updated () {
    this.unavailable = this.product.amount >= this.product.stock
  },
  props: {
    product: {
      type: Object
    }
  },
  methods: {
    parseMoney,
    getTotal () {
      return this.product.amount * this.product.price
    },
    submit (event, options, condition) {
      if (!condition) this.$emit(event, options)
    }
  }
}
</script>

<style lang="scss" scoped>
@use '../../../../assets/css/book';

.product {
  gap: .5em;
  display: flex;
  padding: .5em 0;
  justify-content: space-between;

  * {
    user-select: none;
  }

  &__infos {
    gap: .5em;
    display: flex;
    flex-direction: column;

    &--name {
      font-weight: 600;
    }

    &__actions {
      gap: .5em;
      display: flex;
      align-items: center;

      &--button {
        width: 1.5em;
        display: grid;
        border-radius: .5em;
        aspect-ratio: 1 / 1;
        place-content: center;
        background: book.$bg-accent;

        &.disabled {
          cursor: not-allowed
        }
      }

      &--amount {
        opacity: .6;
      }
    }
  }

  &__resume {
    gap: .5em;
    display: flex;
    align-items: center;

    &--price {
      white-space: nowrap;
    }

    &--clear {
      height: 100%;
      padding: 0 .5em;
      color: book.$alert;
    }
  }
}
</style>

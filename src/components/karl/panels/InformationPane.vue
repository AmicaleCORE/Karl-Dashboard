<template>
  <section class="panel">
    <header class="panel__header">
      <h2 class="panel__header--title">{{ name }}</h2>
      <p class="panel__header--info">{{ headerInfo }}</p>
    </header>

    <div class="panel--content">
      <slot></slot>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InformationPane',
  props: {
    name: {
      type: String,
      required: true
    },
    headerInfo: String
  }
})
</script>

<style lang="scss" scoped>
@use '../../../assets/css/book';

.panel {
  gap: 1em;
  display: flex;
  padding: 1.5em 1em;
  background: book.$bg;
  border-radius: 1.5em;
  flex-direction: column;
  box-shadow: 0 .5em 1.5em 0 book.$shadow-tint;

  &__header {
    display: flex;
    position: relative;
    align-items: center;
    padding-bottom: 1em;
    justify-content: space-between;

    &::after {
      left: 0;
      bottom: 0;
      opacity: .1;
      content: '';
      width: 100%;
      height: 1px;
      position: absolute;
      background: book.$txt;
    }

    &--title {
      font-weight: 700;
      line-height: 100%;
    }

    &--info {
      opacity: .5;
      font-size: .75em;
      font-weight: 300;
    }
  }
}
</style>

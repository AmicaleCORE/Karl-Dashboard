<template>
  <div class="input">
    <input type="text" class="input--field" :disabled="readonly" v-model="inputValue" @input="sendUpdate" required />
    <span class="input--label"><slot></slot></span>
    <button v-if="allowClear" class="input--action" @click.prevent="clear">Clear</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ShortInput',
  data: () => ({
    inputValue: undefined
  }),
  props: {
    allowClear: Boolean,
    readonly: Boolean,
    value: String
  },
  created () {
    if (this.value) this.inputValue = this.value
  },
  methods: {
    sendUpdate () {
      this.$emit('updated', { value: this.inputValue })
    },
    clear () {
      this.inputValue = undefined
      this.sendUpdate()
    }
  }
})
</script>

<style lang="scss" scoped>
@use "../../../assets/css/book";

.input {
  $inset: 1.25em;

  position: relative;
  border-radius: .75em;
  background-color: book.$bg-accent;

  &--field {
    width: 100%;
    line-height: 100%;
    padding: 1em $inset;

    &:disabled {
      cursor: not-allowed;
    }

    &:hover {
      + .input--label {
        opacity: 1;
      }
    }

    &:focus, &:valid, &:disabled {
      + .input--label {
        opacity: 0;
      }
    }
  }

  &--label {
    top: 50%;
    opacity: .3;
    left: $inset;
    position: absolute;
    pointer-events: none;
    transform: translateY(-50%);
    transition: opacity 100ms ease-in-out;
  }

  &--action {
    top: 50%;
    opacity: .3;
    right: $inset;
    position: absolute;
    transform: translateY(-50%);
    transition: opacity 100ms ease-in-out;

    &:hover {
      opacity: 1;
    }
  }
}
</style>

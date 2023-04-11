<template>
  <main class="home">
    <section class="home__panel sells">
      <header class="home__panel__header">
        <h2 class="home__panel__header__title">Ventes réalisées</h2>
      </header>

      <div class="home__panel__content">
        <!-- TODO -->
      </div>
    </section>
    <section class="home__panel accounts">
      <header class="home__panel__header">
        <h2 class="home__panel__header__title">Comptes comptables</h2>
      </header>

      <div class="home__panel__content accounts__content">
        <div class="accounts__line" :key="a" v-for="a in accounts">
          <h3 class="accounts__line--name">{{ a.name }}</h3>
          <p class="accounts__line--amount">
            {{ a.toCome < 0 ? '-' : '' }}{{ Math.abs(a.amount).toFixed(2).toString().replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }} €
            <span class="accounts__line--amount__details" v-if="a.toCome">({{ a.toCome >= 0 ? '+' : '-' }} {{ Math.abs(a.toCome).toFixed(2).toString().replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }} €)</span>
          </p>
        </div>
      </div>
    </section>
    <section class="home__panel errors">
      <header class="home__panel__header">
        <h2 class="home__panel__header__title">Dernières erreurs survenues</h2>
      </header>

      <div class="home__panel__content">
        <!-- TODO -->
      </div>
    </section>
    <section class="home__panel stock-alerts">
      <header class="home__panel__header">
        <h2 class="home__panel__header__title">Alertes de stocks</h2>
      </header>

      <div class="home__panel__content">
        <!-- TODO -->

      </div>
    </section>
    <section class="home__panel graph accounts-graph">
      <header class="home__panel__header">
        <h2 class="home__panel__header__title">Graphe de comptes</h2>
      </header>

      <div class="home__panel__content">
        <canvas ref="accounts_graph" aria-label="chart" role="img"></canvas>
      </div>
    </section>
    <section class="home__panel graph products-graph">
      <header class="home__panel__header">
        <h2 class="home__panel__header__title">Classement des produits</h2>
      </header>

      <div class="home__panel__content products-graph__content">
        <div>
          <canvas ref="category_graph" aria-label="chart" role="img"></canvas>
        </div>
        <div>
          <canvas ref="products_graph" aria-label="chart" role="img"></canvas>
        </div>
      </div>
    </section>
    <section class="home__panel graph sellers-graph">
      <header class="home__panel__header">
        <h2 class="home__panel__header__title">Classement des vendeurs</h2>
      </header>

      <div class="home__panel__content">
        <canvas ref="sellers_graph" aria-label="chart" role="img"></canvas>
      </div>
    </section>
  </main>
</template>

<script>
import { defineComponent } from 'vue'
import accounts from '@/assets/scripts/accounts'
// import { Chart } from 'chart.js/auto'

export default defineComponent({
  name: 'HomeView',
  data: () => ({
    accounts
  })
})
</script>

<style lang="sass" scoped>
@use '../assets/css/book'

.home
  gap: 2em
  width: 100%
  display: grid
  grid-template-columns: repeat(3, 1fr)

  &__panel
    gap: 1.5em
    display: flex
    min-height: 18em
    padding: 1.5em 1em
    align-items: stretch
    border-radius: 1.5em
    flex-direction: column
    background-color: book.$bg
    box-shadow: 0 .5em 1.5em 0 book.$shadow-tint

    &__header
      width: 100%
      display: flex
      align-items: center
      justify-content: space-between

      &__title
        font-weight: 700
        line-height: 100%

    // SECTIONS \\
    .accounts
      &__content
        gap: 1em
        display: flex
        align-items: stretch
        flex-direction: column

      &__line
        display: flex
        gap: 1em
        align-items: center
        justify-content: space-between

        &--name
          opacity: .5
          flex: 1 1 100%
          font-weight: 500

        &--amount
          display: flex
          flex: 0 0 auto
          font-size: 1.5em
          font-weight: 500
          align-items: flex-end
          flex-direction: column

          &__details
            font-size: .6em
            font-weight: 400
            position: relative
            color: book.$txt-disabled

            &::after
              left: 0
              top: 100%
              opacity: 0
              z-index: 998
              font-size: 1em
              color: book.$bg
              position: absolute
              white-space: nowrap
              padding: .6em 1.2em
              border-radius: .75em
              pointer-events: none
              transition-duration: 250ms
              background-color: book.$txt
              content: 'Unprocessed sales'
              transform: translateY(-.5em)
              transition-timing-function: ease-in-out
              transition-property: opacity, transform

            &:hover
              &::after
                opacity: 1
                transform: none

    &.stock-alerts
      grid-column: span 2

    &.errors
      grid-row: span 2

    &.graph
      grid-column: span 3

    .products-graph
      &__content
        width: 100%
        display: grid
        place-content: center
        grid-template-columns: repeat(2, 1fr)
</style>

<template>
  <div class="wrapper">
    <nav class="sidebar">
      <header class="sidebar__header">
        <h1 class="sidebar__header--name">Karl</h1>
        <p class="sidebar__header--description">Sales assistant</p>
      </header>

      <main class="sidebar__content">
        <section class="sidebar__content__links">
          <RouterLink to="/" exact-active-class="active" class="sidebar__content__link">Tableau de bord</RouterLink>
          <RouterLink to="/sell" active-class="active" class="sidebar__content__link">Magasin</RouterLink>
        </section>

        <section class="sidebar__content__extra">
          <p class="sidebar__content__extra--hour" v-if="hour">{{ hour }}</p>
        </section>
      </main>
    </nav>

    <aside class="page">
      <header class="page__header">
        <h2 class="page__header__name">{{ $route.name }}</h2>

        <aside class="page__header__account">
          <RouterLink :to="{ path: '/profil', params: { title: username } }"  class="page__header__account__profile" aria-label="Mon profil">
            <span class="page__header__account__profile__avatar">
              <img class="page__header__account__profile__avatar--image" src="/assets/images/avatar.avif" alt="" />
            </span>

            <div class="page__header__account__profile__content">
              <p class="page__header__account__profile__content--name">{{ username }}</p>
              <p class="page__header__account__profile__content--role">{{ role }}</p>
            </div>
          </RouterLink>
          <div class="page__header__account__actions">
            <RouterLink to="/" class="page__header__account__action" :class="{ active: notifications > 0 }"  aria-label="Mes notifications">
              <IconRenderer class="page__header__account__action--icon" category="outline" name="bell" />
            </RouterLink>
            <RouterLink to="/" class="page__header__account__action" aria-label="Déconnexion">
              <IconRenderer class="page__header__account__action--icon" category="outline" name="sign_out" />
            </RouterLink>
          </div>
        </aside>
      </header>

      <section class="page__content" data-scroll>
        <RouterView />
      </section>
    </aside>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import IconRenderer from '@/components/framework/misc/IconRenderer.vue'

const date = new Date()
export default defineComponent({
  name: 'AppLayout',
  components: { IconRenderer },
  data: () => ({
    notifications: 1,
    username: 'Jane DOE',
    role: 'Administrateur',
    hour: `${(date.getHours() < 10 ? '0' : '') + date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`
  }),
  created () {
    setInterval(() => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()

      this.hour = `${(hours < 10 ? '0' : '') + hours}:${(minutes < 10 ? '0' : '') + minutes}`
    }, 500)
  }
})
</script>

<style lang="scss" scoped>
@use '../assets/css/book';

.wrapper {
  display: flex;
}

.sidebar {
  top: 0;
  gap: 1.5em;
  height: 100vh;
  display: flex;
  color: book.$bg;
  position: sticky;
  padding: 2em 1.5em;
  flex-direction: column;
  border-top-right-radius: 2.5em;
  background-image: book.$gradient;

  &__header {
    flex: 0 0 auto;
    padding: 0 1em;

    &--name {
      font-size: 1.5em;
      font-weight: 800;
    }

    &--description {
      opacity: .7;
      line-height: 100%;
      white-space: nowrap;
    }
  }

  &__content {
    display: flex;
    flex: 1 1 100%;
    flex-direction: column;
    justify-content: space-between;

    &__links {
      gap: .5em;
      display: flex;
      flex-direction: column;
    }

    &__extra {
      gap: 1em;
      display: flex;
      align-items: center;
      flex-direction: column;

      &--hour {
        opacity: .5;
        font-size: 1.5em;
        line-height: 100%;
      }
    }

    &__link {
      gap: 1em;
      display: flex;
      line-height: 100%;
      padding: 1em 1.5em;
      white-space: nowrap;
      border-radius: 10em;
      align-items: center;
      justify-content: space-between;
      transition: background-color 200ms ease-in-out;

      &::after {
        opacity: 0;
        width: .5em;
        content: '';
        border-radius: 1em;
        aspect-ratio: 1 / 1;
        background-image: book.$gradient;
        transition: opacity 200ms ease-in-out;
        box-shadow: 0 0 0 .175em book.$bg-m-opacity;
      }

      &.active {
        background-color: book.$bg-h-opacity;

        &::after {
          opacity: 1;
        }
      }

      &:hover {
        background-color: book.$bg-h-opacity;
      }
    }
  }
}

.page {
  flex: 1 1 100%;
  min-height: 100vh;

  &__header {
    top: 0;
    width: 100%;
    z-index: 998;
    display: flex;
    position: sticky;
    padding: 2em 3em;
    align-items: center;
    backdrop-filter: blur(1em);
    justify-content: space-between;
    background-color: book.$bg-m-opacity;

    &__name {
      font-size: 1.5em;
      font-weight: 600;
    }

    &__account {
      gap: 2em;
      display: flex;
      align-items: center;

      &__profile {
        $radius: .75em;

        gap: 1em;
        display: flex;
        padding: .5em 1em .5em .5em;
        align-items: center;
        border-radius: calc($radius * 1.5);
        transition: background-color 200ms ease-in-out;

        &__avatar {
          position: relative;

          &--image {
            height: 2.5em;
            object-fit: cover;
            aspect-ratio: 1 / 1;
            border-radius: $radius;
          }

          &::before {
            left: 0;
            top: 50%;
            content: '';
            height: .75em;
            border-radius: 50%;
            position: absolute;
            aspect-ratio: 1 / 1;
            border: 3px solid book.$bg;
            background-image: book.$gradient;
            transform: translate(-50%, -50%);
            transition: border-color 200ms ease-in-out;
          }
        }

        &:hover {
          background-color: book.$txt-special;
        }

        > span::before {
          border-color: book.$txt-special;
        }
      }

      &__content {
        &--name {
          font-weight: 500;
        }

        &--role {
          opacity: .6;
          font-size: .75em;
          line-height: 100%;
        }
      }

      &__actions {
        gap: 1em;
        display: flex;

        &::before {
          width: 1px;
          content: '';
          opacity: .2;
          display: block;
          background-color: currentColor;
        }
      }

      &__action {
        padding: .5rem;
        font-size: 1.5em;
        position: relative;
        border-radius: .5em;
        transition: background-color 200ms ease-in-out;

        &:first-child {
          order: -1;
        }

        &.active {
          $offset: .15em;

          &::before {
            top: 0;
            right: 0;
            content: '';
            height: .25em;
            border-radius: 50%;
            position: absolute;
            aspect-ratio: 1 / 1;
            background-image: book.$gradient;
            transform: translate(-.5em, .35em);
            box-shadow: 0 0 0 $offset book.$bg;
            transition: box-shadow 200ms ease-in-out;
          }

          &:hover::before {
            box-shadow: 0 0 0 $offset book.$txt-special;
          }
        }

        &:hover {
          background-color: book.$txt-special;
        }
      }
    }
  }

  &__content {
    width: 100%;
    padding: 0 3rem;
    min-height: calc(100vh - 7.5em);
  }
}
</style>

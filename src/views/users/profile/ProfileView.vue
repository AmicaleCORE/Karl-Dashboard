<template>
  <main class="me">
    <InformationPane class="me__credentials" name="Mes informations">
      <div class="me__credentials--wrapper">
        <ShortInput class="me__credentials--input large" value="jane.doe" readonly>Login</ShortInput>
        <ShortInput class="me__credentials--input" value="Jane">Prénom</ShortInput>
        <ShortInput class="me__credentials--input" value="DOE">Nom</ShortInput>
        <ShortInput class="me__credentials--input large" value="jane.doe@amicalecore.org" readonly>Adresse e-mail</ShortInput>
        <button class="me__credentials--password">Modifier mon mot de passe</button>
      </div>
    </InformationPane>

    <InformationPane class="me__permissions" name="Mes permissions" :header-info="group">
      <div class="me__permissions--wrapper v-wrapper">
        <article class="me__permissions__group v-wrapper" v-if="permissions.group && permissions.group.length > 0">
          <h3 class="me__permissions--title">{{ group }}</h3>
          <div class="me__permissions__group--content wrapper">
            <p class="me__permissions--item" :key="permission" v-for="permission in permissions.group">{{ permission }}</p>
          </div>
        </article>
        <article class="me__permissions__specific v-wrapper" v-if="permissions.specific && permissions.specific.length > 0">
          <h3 class="me__permissions--title">Spécifiques</h3>
          <div class="me__permissions__specific--content wrapper">
            <p class="me__permissions--item" :key="permission" v-for="permission in permissions.specific">{{ permission }}</p>
          </div>
        </article>
      </div>
    </InformationPane>

    <InformationPane class="me__logs" name="Logs">

    </InformationPane>
  </main>
</template>

<script>
import { defineComponent } from 'vue'
import InformationPane from '@/components/karl/panels/InformationPane.vue'
import ShortInput from '@/components/framework/form/ShortInput.vue'

export default defineComponent({
  name: 'ProfileView',
  components: { ShortInput, InformationPane },
  data: () => ({
    group: 'Administrateur',
    permissions: {
      group: [
        'Créer un produit',
        'Modifier un produit',
        'Supprimer un produit',
        'Voir les comptes',
        'Voir les graphes'
      ],
      specific: [
        'Ajouter un utilisateur',
        'Supprimer un utilisateur'
      ]
    }
  })
})
</script>

<style lang="scss" scoped>
@use '../../../assets/css/book';

.wrapper {
  gap: .5em;
  display: flex;
  flex-wrap: wrap;
}

.v-wrapper {
  gap: .5em;
  display: flex;
  flex-direction: column;
}

.me {
  gap: 2em;
  display: grid;
  padding-bottom: 2.5em;
  grid-template-columns: repeat(2, 1fr);

  &__credentials {
    &--wrapper {
      gap: .75em;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }

    &--input {
      &.large {
        grid-column: span 2;
      }
    }

    &--password {
      display: grid;
      color: book.$bg;
      padding: 1em 1.5em;
      grid-column: span 2;
      border-radius: .75em;
      place-content: center;
      background-size: 100% 150%;
      background-position: bottom;
      background-image: book.$gradient;
      transition: background-position 350ms ease-in-out;

      &:hover {
        background-position: top;
      }
    }
  }

  &__permissions {
    &--wrapper {
      gap: 1.5em;
    }

    &__group, &__specific {
      gap: .75em;
    }

    &--title {
      gap: 1em;
      opacity: .5;
      display: flex;
      font-weight: 600;
      align-items: center;

      &::before, &::after {
        content: '';
        flex: 1 1 100%;
        height: 1px;
        background: book.$txt;
      }
    }

    &--item {
      font-size: .75em;
      padding: .5em 1em;
      border-radius: 10em;
      background-color: book.$bg-accent;
    }
  }

  &__logs {
    grid-column-start: 2;
    grid-row: 1 / span 2;
  }
}
</style>

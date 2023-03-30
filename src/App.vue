<script>
import { mapGetters } from 'vuex';

export default {
  name: "App",
  computed: {
    ...mapGetters({
      total: "totalItems"
    })
  }
}
</script>

<template>
  <nav class="navbar" role="navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">Ye Artisenal Bread Shoppe</router-link>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <router-link to="/cart" class="navbar-item"><fa-icon icon="fa-solid fa-shopping-cart" /> Cart {{ $filters.price(total) }}</router-link>
        </div>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<style>
</style>

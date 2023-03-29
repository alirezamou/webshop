<script>
export default {
  name: "App",
  computed: {
    total() {
      return this.$store.getters.totalItems;
    }
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
          <router-link to="/cart" class="navbar-item">
            <fa-icon icon="fa-solid fa-shopping-cart">Cart {{ total }}</fa-icon>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<style>
</style>

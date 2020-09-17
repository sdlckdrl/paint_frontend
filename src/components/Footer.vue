<template>
  <div>
      <v-footer app :class="info.theme_color">
        <span class="white--text">&copy; 2020</span>
      </v-footer>
  </div>
</template>

<script>
  export default {
    name: 'footer-component',
    props: ["info"]
  }
</script>
<template>

<div id="app">
  <v-app id="inspire">
      <router-view :key="$route.fullPath"/>  
  </v-app>
</div>
  
</template>


<script>
export default {
  methods : {
  }
}
</script>

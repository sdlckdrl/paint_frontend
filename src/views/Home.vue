<template>
  <div class="home">
    <v-container class="pa-4">
        <v-row dense>
          <v-col
            v-for="card in items"
            :key="card.title"
            :cols="card.flex"
          >
            <v-card link :to="card.link">
              <v-img
                :src="card.src"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.2)"
                height="100px"
              >
                <v-card-title v-text="card.title"></v-card-title>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  created(){
    this.$http.get('/api/menu', { }).then((response) => {
      this.items = response.data
    })
  },
  data: () => ({
    items: [],    
  }),
}
</script>

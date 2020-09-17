<template>
  <div>
      <v-navigation-drawer
        v-model="drawer"
        app
        :mini-variant="false"
        :floating="false"
        :clipped="true"
      >
      <menu-component></menu-component> 
      </v-navigation-drawer>
          
      <v-app-bar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        app
        :color="info.theme_color"
        dark
        dense
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-combobox
              v-model="select"
              ref="selectRef"
              :items='items'
              :search-input.sync="search"
              label='검색'
              :auto-select-first='false'
              v-on:keyup.enter="enterBtn(tab)"
              flat
              dense
              cache-items
              hide-no-data
              hide-details
              solo-inverted
              item-text="cd"
              item-value="cd"
            >
            <template v-slot:item="data">
              <v-list-item-content>
                <v-list-item-title >{{data.item.cd}}</v-list-item-title>
                <v-list-item-subtitle >{{data.item.munsel}}</v-list-item-subtitle>
                <v-list-item-subtitle >{{data.item.name}}</v-list-item-subtitle>
              </v-list-item-content>
            </template>
            </v-combobox>
            
        <v-btn icon @click="enterBtn(tab)">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <template v-slot:extension>
          <v-tabs
            v-model="tab"
            :hide-slider="!select"
            color="black"
            slider-color="blue-grey"
          >
            <v-tab href="#" @click="enterBtn('')">전체</v-tab>
            <v-tab v-for="(item, i) in info.menu" :key="i" :href="'#'+item.type" @click="enterBtn(item.type)">{{item.title}}</v-tab>
          </v-tabs>
        </template>


      </v-app-bar>
  </div>
</template>

<script>
import MenuComponent from './Menu'
//import {eventBus} from "../main"
  export default {
    name: 'head-component',
    components: { MenuComponent },
    props: ["info"],
    data () {
      return {
        drawer: null,
        loading: false,
        items: [],
        search: null,
        select: null,
        tab: null
      }
    },
    watch: {
      search (val) {
        if(val){
          val && val !== this.select && this.querySelections(val)
        }else{
          this.items = [];
          this.$refs.selectRef.isMenuActive = false;
        }
      },
    },
    methods: {
      enterBtn(t) {
        if(t==0) t=""
        //this.$emit("childSearch", this.search)
        if(!this.search){
          this.items = [];
        }
        this.$emit("updateList", this.search, t)
        //eventBus.$emit("updateList", this.search, t)
        this.$refs.selectRef.isMenuActive = false;
      },
      querySelections (v) {
        if(v){
          this.loading = true
          this.$http.get('/api/color_list/autocomplte', {
            params: { gubun : this.$route.params.id, text: v }
          }).then((response) => {
            this.items = [];
            response.data.map((e)=>{
                this.items.push({"cd":e.cd, "name":e.name, "munsel":e.munsel});
            });
            this.loading = false
          })
        }
      },
    },
  }
</script>
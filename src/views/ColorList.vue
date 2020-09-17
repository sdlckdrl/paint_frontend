<template>

<div>
      <head-component @updateList="updateList" :info="info"></head-component>  
      
      <v-main>
          <v-container
            fluid
          >         

          <v-list two-line subheader>

            <v-list-item
              v-for="item in items"
              :key="item.cd"
              @click="link(item)"
            >
              <v-list-item-avatar>
                <v-icon :style="item.style"></v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="item.cd"></v-list-item-title>
                <v-list-item-subtitle v-text="item.munsel"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <infinite-loading ref="infiniteLoading" :identifier="infiniteId" @infinite="infiniteHandler" spinner="waveDots"></infinite-loading>
          </v-list>

          </v-container>          
      </v-main>


      <footer-component :info="info"></footer-component>     

        <v-dialog
              v-model="dialog"
              max-width="300px"
            >

          <v-card
            class="mx-auto"
            v-if="dialog"
          >
            <v-img
              class="white--text align-end"
              height="200px"
              :style="item.style"
            >
              <p class="text-subtitle-2 text-right mb-13 mr-2 pb-10">*실제 색상과 차이가 있을 수 있음</p>
              <v-card-title>{{item.cd}}</v-card-title>
            </v-img>
        
            <v-card-subtitle class="pb-2">{{item.type|typeName(info)}}</v-card-subtitle>
        
            <v-card-text class="text--primary">
              <div>{{item.cd}}</div>
              <div v-if="!!item.sam_cd">{{item.sam_cd}}</div>
              <div v-if="!!item.name">{{item.name}}</div>
              <div v-if="!!item.munsel">Muncell : {{item.munsel}}</div>
              <div>R: {{item.rgb_r}}, G: {{item.rgb_g}}, B: {{item.rgb_b}}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="green darken-1" text @click="$router.push({path : '/color_finder/'+item.rgb_r+' '+item.rgb_g+' '+item.rgb_b})">similar color</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>

        </v-dialog> 
    
</div>
</template>
<script>
import HeadComponent from '@/components/ColorListHead'
import FooterComponent from '@/components/Footer'
import InfiniteLoading from 'vue-infinite-loading'
//import * as hexRgb from 'hex-rgb';
//import * as munsell from 'munsell';
export default {
  components: { HeadComponent, FooterComponent, InfiniteLoading },
  created () {
    this.$http.get('/api/color_list/info', {
      params: { gubun : this.$route.params.id }
    }).then((response) => {
      this.info = response.data
      setTimeout(()=>{
        this.updateList('',"");
      },300);
    })
  },  
  data () {
    return {
      totalPage : 0,
      start:0,
      end:0,
      page:0,
      info:{},
      infiniteId:'',
      temp_items:[],
      items: [],
      item:{},
      dialog : false
    }
  },
  methods:{
    updateList : function(val, tp){
      this.infiniteId = tp;
      this.items=[];
      this.page = 0;
      //this.$refs.infiniteLoading.stateChanger.reset()
      this.$http.get('/api/color_list/list', {
        params: { gubun : this.$route.params.id ,text: val, type : tp }
      }).then((response) => {
        this.temp_items = response.data
        /*this.temp_items = response.data.map((o)=>{
          var rgb = hexRgb(o.rgb);
          return {
             "cd":o.cd, "style":"background-color: rgb("+rgb.red+","+rgb.green+","+rgb.blue+")", "name":o.name, "type":o.type, "rgb_r":rgb.red, "rgb_g":rgb.green, "rgb_b":rgb.blue 
          }
        })*/
        this.items = this.items.concat(this.morePage(this.temp_items))
      })
    },
    link : function(o){
      this.item = o
      this.dialog = true;
      //this.$router.push("/color/"+cd);
    },
    infiniteHandler ($state) {
      setTimeout(() => {
        if(this.page > 0){
          this.items = this.items.concat(this.morePage(this.temp_items))
        }
        if(this.totalPage > this.page){
          $state.loaded();
        }else{
          $state.complete()
        }  
      }, 300);      
    },
    morePage(arr){
      var result = [];
      var size = 100
      this.totalPage = Math.ceil(arr.length / size)
      this.start = ((this.page) * size);
      this.end = this.start + size;
      result = arr.slice(this.start, this.end)     
      this.page++
      return result
    }
  },
  filters: {
    typeName: function (value, info) {
      if (!value) return ''
      
      var tmp_arr = info.menu.filter(o => {return o.type==value})
      if(tmp_arr.length>0) return tmp_arr[0].title
    }
  }
}
</script>
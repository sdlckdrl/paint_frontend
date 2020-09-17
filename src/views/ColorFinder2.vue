<template>
<div>
      <v-navigation-drawer
        app
        v-model="drawer"
        :mini-variant="false"
        :floating="false"
        :clipped="true"
      >
      <menu-component></menu-component> 
      </v-navigation-drawer>
          
      <v-app-bar
        app
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        color="blue darken-4"
        dense
        dark
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-spacer></v-spacer>
        <v-text-field
          v-model="rgb_color" 
          hide-details
          placeholder="255 255 255"
          append-icon="mdi-magnify"
          single-line
          v-on:keyup.enter="onEnter"
        ></v-text-field>
      </v-app-bar>
      
      <v-main >
          <v-container
            fluid 
            fill-height
            ma-0 pa-0 justify-center 
          >
          <v-layout wrap>
            <v-flex xs12>              

              <v-card class="ma-0 pa-0" height="100" :style="select_color" ></v-card>

              <div class="ma-0 pa-0 overflow-x-auto v-card v-sheet theme--light" id="color_list">
                <div role="list" class="v-list v-sheet theme--light v-list--two-line ma-0 pa-0">
                  <div 
                  v-for="item in items" 
                  :key="item.cd"
                  :style="item.style"
                  :seq="item.cd"        
                  role="listitem" 
                  class="v-list-item theme--light"
                  @click="link(item)"
                  >
                    <div class="v-list-item__content">
                      <div class="v-list-item__title" v-text="item.cd"></div>
                      <div class="v-list-item__subtitle" v-text="item.name"></div>
                    </div>
                  </div>
                </div>
                <infinite-loading @infinite="infiniteHandler" spinner="waveDots"></infinite-loading>
              </div>
              <v-sheet elevation="0" class="ma-0 pa-0" id="combobox">
              <v-chip-group
                v-model="select"
                mandatory
                multiple
                active-class="light-blue lighten-3"
                @change="updateCompany()"
              >
                <v-chip v-for="item in dataobj" 
                  :key="JSON.stringify(item.code)"
                  :value="item"
                >
                  {{ item.title }}
                </v-chip>
              </v-chip-group>
              </v-sheet>
              
            </v-flex>
          </v-layout>

        </v-container>
      </v-main>

      <v-footer app class="blue darken-4">
        <span class="white--text">&copy; 2020</span>
      </v-footer>

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
        
            <v-card-subtitle class="pb-2">{{item|company(dataobj)}} | {{item|type_nm(dataobj)}}</v-card-subtitle>
        
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
import MenuComponent from '@/components/Menu'
import InfiniteLoading from 'vue-infinite-loading'
import jQuery from 'jquery' ;
export default {
  name: 'imagefind-component',
  components: { InfiniteLoading, MenuComponent},
  data () {
    return {
      rgb_color:'',
      totalPage : 0,
      start:0,
      end:0,
      page:0,
      drawer: null,
      select_color:'',
      select:[],
      items:[],
      temp_items:[],
      dataobj:[],
      current_rgb_r:null,
      current_rgb_g:null,
      current_rgb_b:null,
      dialog : false,
      item:{}
    }
  },
  methods : {
    onEnter: function(){
      var _this = this;
      var color = _this.rgb_color.split(" ")

      _this.current_rgb_r = color[0];
      _this.current_rgb_g = color[1];
      _this.current_rgb_b = color[2];
      _this.select_color = "background-color:rgb("+_this.current_rgb_r+","+_this.current_rgb_g+","+_this.current_rgb_b+")"
      _this.getLikeRgb();
      jQuery("#color_list").height(jQuery(window).innerHeight() - (jQuery("footer").innerHeight() + jQuery("header").innerHeight() + jQuery("#combobox").innerHeight() + 100))
    },
    getLikeRgb : function(){
      this.sortList()
      this.updateCompany()
    },
    sortList : function(){
      let _this = this
      if(!this.temp_items){
        return false
      }
      this.temp_items.map(o=>{
        var sum = Math.abs(_this.current_rgb_r - o.rgb_r) + Math.abs(_this.current_rgb_g - o.rgb_g) + Math.abs(_this.current_rgb_b - o.rgb_b)
        o.sum = sum
        return o
      });
      this.temp_items.sort(function(a, b){
        return a.sum - b.sum
      })

    },
    updateCompany : function(){
      this.items=[];
      this.temp_items=[];
      this.page = 0;
      this.select.forEach(o => {
        this.temp_items = this.temp_items.concat(o.data)
      })
      this.sortList()
      this.items = this.items.concat(this.morePage(this.temp_items))
      var container = jQuery("#color_list")[0];
      container.scrollTop  = 0
    },
    infiniteHandler ($state) {
      setTimeout(()=>{
        this.items = this.items.concat(this.morePage(this.temp_items))
        if(this.totalPage != this.page){
          $state.loaded();
        }else{
          $state.complete()
        }        
      },100)
    },
    morePage(arr){
      if(!arr){
        return false
      }
      var result = [];
      var size = 100
      this.totalPage = Math.ceil(arr.length / size)
      this.start = ((this.page) * size);
      this.end = this.start + size;
      result = arr.slice(this.start, this.end)     
      this.page++
      return result
    },
    link : function(o){
      this.item = o
      this.dialog = true;
    }
  },
  created(){
    var _this = this
    this.rgb_color = this.$route.params.RGB;

    const init = async () => {
      await
      _this.$http.get('/api/color_list/all').then((response) => {
        _this.dataobj = response.data.filter((o)=>{return o.mt=="01"});
      })
      return "done"
    }
    init().then(() => {
      _this.onEnter();
    })
  },
  filters:{
    company : function (item, dataobj) {
      var rst = ""
      if(!item) return rst;
      var list = dataobj.filter((o)=>{return o.mt=="01"});
      var arr = list.filter((o)=>{
        var rrr = o.data.filter((obj) => {
          return obj.cd==item.cd
        })
        return rrr.length > 0
      });
      if(arr.length>0){        
        rst = arr[0].title;
      }
      return rst;
    },
    type_nm : function (item, dataobj) {
      var rst = ""
      if(!item) return rst;
      var list = dataobj.filter((o)=>{return o.mt=="01"});
      var arr = list.filter((o)=>{
        var rrr = o.data.filter((obj) => {
          return obj.cd==item.cd
        })
        return rrr.length > 0
      });
      if(arr.length>0){
        var tmp_arr = arr[0].menu.filter(o => {return o.type==item.type})        
        rst = tmp_arr[0].title;
      }
      return rst;
    }
  }
}
</script>
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
        dense
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>페인트양 계산</v-toolbar-title>


        <template v-slot:extension>
          <v-tabs
            v-model="tab"
            :hide-slider="!select"
            color="black"
            slider-color="blue-grey"
          >
            <v-tab v-for="(item, i) in menu" :key="i">{{item.title}}</v-tab>
          </v-tabs>
        </template>

      </v-app-bar>
      
      <v-main>
          <v-container
            fluid
          >
            <v-tabs-items v-model="tab">
              <v-tab-item>
                <v-row>
                  <v-col cols="12">
                    <h3>페인트양 계산</h3>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="5">
                    <v-text-field
                      label="미터"
                      v-model="num_x"
                      suffix="m"
                      type="number" @change="squareHandler(1)"
                      onfocus="this.select()"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="1">
                    X
                  </v-col>
                  <v-col cols="5">
                    <v-text-field
                      label="미터"
                      v-model="num_y"
                      suffix="m" 
                      type="number" @change="squareHandler(1)"
                      onfocus="this.select()"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-alert
                      outlined
                    >
                      면적은
                      <input style="width:50px" type="number" v-model="num_m2" @change="num_f=num_m2 / 3.3058;literHandler(1);" onfocus="this.select()"/>
                      ㎡ (
                        <input style="width:50px" type="number" v-model="num_f" @change="num_m2=num_f * 3.3058;literHandler(1);" onfocus="this.select()"/>평
                      )이며, 필요한 페인트 양은 대략 
                      <input style="width:50px" type="number" v-model="num_l1" disabled/>
                      L 입니다.
                    </v-alert>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-alert
                      outlined
                      color="purple"
                    >
                      <div class="caption">상기 면적에 대한 소요량은 내부용 수성도료 2회도장 기준이며, 적용부위(내/외부)·색상에 따라 도장횟수·소요량이 가감될 수 있습니다.</div>
                      <div class="caption">소요량은 이론소요량이며, 도장 작업시 발생하는 Loss율은 포함되지 않았습니다.(Loss율은 도장환경, 도장방법 및 도장작업자에 따라 달라질 수 있습니다.)</div>
                    </v-alert>
                  </v-col>
                </v-row>
              </v-tab-item>







              <v-tab-item>
                <v-row>
                  <v-col cols="12">
                    <h3>페인트양 계산</h3>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="5">
                    <v-text-field
                      label="미터"
                      v-model="num_x"
                      suffix="m"
                      type="number" @change="squareHandler(2)"
                      onfocus="this.select()"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="1">
                    X
                  </v-col>
                  <v-col cols="5">
                    <v-text-field
                      label="미터"
                      v-model="num_y"
                      suffix="m" 
                      type="number" @change="squareHandler(2)"
                      onfocus="this.select()"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-alert
                      outlined
                    >
                      면적은
                      <input style="width:50px" type="number" v-model="num_m2" @change="num_f=num_m2 / 3.3058;literHandler(2);" onfocus="this.select()"/>
                      ㎡ (
                        <input style="width:50px" type="number" v-model="num_f" @change="num_m2=num_f * 3.3058;literHandler(2);" onfocus="this.select()"/>평
                      )이며, 필요한 페인트 양은 대략 
                      <div>
                        하도
                        <input style="width:50px" type="number" v-model="num_l1" disabled/>
                        L
                      </div>
                      <div>
                        중도
                        <input style="width:50px" type="number" v-model="num_k2" disabled/>
                        Kg (건조도막두께 3㎜시)
                      </div>
                      <div>
                        상도
                        <input style="width:50px" type="number" v-model="num_l3" disabled/>
                        L
                      </div> 입니다.
                    </v-alert>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-alert
                      outlined
                      color="purple"
                    >
                      <div class="caption">상기 면적에 대한 소요량은 3mm 시공 1회도장 기준이며, 적용부위·색상에 따라 도장횟수·소요량이 가감될 수 있습니다.</div>
                      <div class="caption">소요량은 이론소요량이며, 도장 작업시 발생하는 Loss율은 포함되지 않았습니다.(Loss율은 도장환경, 도장방법 및 도장작업자에 따라 달라질 수 있습니다.)</div>
                    </v-alert>
                  </v-col>
                </v-row>
              </v-tab-item>





              <v-tab-item>
                <v-row>
                  <v-col cols="12">
                    <h3>페인트양 계산</h3>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="5">
                    <v-text-field
                      label="미터"
                      v-model="num_x"
                      suffix="m"
                      type="number" @change="squareHandler(3)"
                      onfocus="this.select()"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="1">
                    X
                  </v-col>
                  <v-col cols="5">
                    <v-text-field
                      label="미터"
                      v-model="num_y"
                      suffix="m" 
                      type="number" @change="squareHandler(3)"
                      onfocus="this.select()"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-alert
                      outlined
                    >
                      면적은
                      <input style="width:50px" type="number" v-model="num_m2" @change="num_f=num_m2 / 3.3058;literHandler(3);" onfocus="this.select()"/>
                      ㎡ (
                        <input style="width:50px" type="number" v-model="num_f" @change="num_m2=num_f * 3.3058;literHandler(3);" onfocus="this.select()"/>평
                      )이며, 필요한 페인트 양은 대략 
                      <div>
                        하도
                        <input style="width:50px" type="number" v-model="num_l1" disabled/>
                        L
                      </div>
                      <div>
                        상도
                        <input style="width:50px" type="number" v-model="num_l3" disabled/>
                        L (건조도막두께 50㎛시)
                      </div> 입니다.
                    </v-alert>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-alert
                      outlined
                      color="purple"
                    >
                      <div class="caption">상기 면적에 대한 소요량은 50㎛시공 1회도장 기준이며, 적용부위·색상에 따라 도장횟수·소요량이 가감될 수 있습니다.</div>
                      <div class="caption">소요량은 이론소요량이며, 도장 작업시 발생하는 Loss율은 포함되지 않았습니다.(Loss율은 도장환경, 도장방법 및 도장작업자에 따라 달라질 수 있습니다.)</div>
                    </v-alert>
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs-items>


            

          </v-container>
      </v-main>
  
      <footer-component :info="info"></footer-component>   
    
</div>
</template>
<script>
import MenuComponent from '@/components/Menu'
import FooterComponent from '@/components/Footer'
export default {
  components: { MenuComponent, FooterComponent },
  data () {
    return {
      info:{},
      drawer: null,
      select: null,
      tab: null,
      menu: [
        {
            "title": "수성",
        },
        {
            "title": "우레탄 방수",
        },
        {
            "title": "에폭시 바닥",
        }
      ],
      num_x : 0,
      num_y : 0,
      num_m2 :0,
      num_f :0,
      num_l1 :0,
      num_l2 :0,
      num_l3 :0,
      num_k1 :0,
      num_k2 :0,
      num_k3 :0,
    }
  },
  methods : {
    squareHandler : function(tp){
      this.num_m2 = this.num_x * this.num_y
      this.num_f = this.num_m2 / 3.3058
      this.literHandler(tp)
    },    
    literHandler : function(tp){
      if(tp===1){
        this.num_l1 = this.num_m2 / 5
      }else if(tp===2){
        this.num_l1 = this.num_m2 / 7.2
        this.num_k2 = this.num_m2 / 4.83
        this.num_l3 = this.num_m2 / 12.2
      }else if(tp===3){
        this.num_l1 = this.num_m2 / 6
        this.num_l3 = this.num_m2 / 10.6
      }
    }
  },
  created(){
    this.$http.get('/api/color_list/info', {
      params: { gubun : 'color_sum' }
    }).then((response) => {
      this.info = response.data
    })
  },
}
</script>
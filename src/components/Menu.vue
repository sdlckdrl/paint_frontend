<template>
  <div>
        <v-list dense>
          <v-list-item link :to="'/'">
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>메인</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :to="'/color_list/kcc'">
            <v-list-item-action>
              <v-img src="/images/icon_kcc.jpg" width="24" class="menu_icon_img"></v-img>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>KCC색견본</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :to="'/color_list/samhwa'">
            <v-list-item-action>
              <v-img src="/images/icon_samhwa.jpg" width="24" class="menu_icon_img"></v-img>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>삼화색견본</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :to="'/color_list/noro'">
            <v-list-item-action>
              <v-img src="/images/icon_noro.jpg" width="24" class="menu_icon_img"></v-img>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>노루색견본</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :to="'/color_list/chowhang'">
            <v-list-item-action>
              <v-img src="/images/icon_chowhang.png" width="24" class="menu_icon_img"></v-img>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>조광색견본</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :to="'/color_list/benjamin'">
            <v-list-item-action>
              <v-img src="/images/icon_benjamin.jpg" width="24" class="menu_icon_img"></v-img>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>벤자민무어</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :to="'/color_list/sherwin'">
            <v-list-item-action>
              <v-img src="/images/icon_sherwin.jpg" width="24" class="menu_icon_img"></v-img>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>셔윈 윌리암스</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :to="'/color_list/ral'">
            <v-list-item-action>
              <v-img src="/images/icon_ral.jpg" width="24" class="menu_icon_img"></v-img>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>RAL Color</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :to="'/color_list/standard'">
            <v-list-item-action>
              <v-img src="/images/icon_kpic.jpg" width="24" class="menu_icon_img"></v-img>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>표준색견본</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :to="'/color_list/jevisco'">
            <v-list-item-action>
              <v-img src="/images/icon_jevisco.jpg" width="24" class="menu_icon_img"></v-img>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>제비스코</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :to="'/color_finder'">
            <v-list-item-action>
              <v-icon>mdi-palette</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Color Finder</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :href="'mailto:sdlckdrl@gmail.com'">
            <v-list-item-action>
              <v-icon>mdi-email</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Contact</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :to="'/private'">
            <v-list-item-action>
              <v-icon>mdi-key-star</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>개인정보처리방침</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
  </div>
</template>
<style>
.menu_icon_img{
-webkit-filter: grayscale(100%);
filter: gray;
}
</style>
<script>
  export default {
    name: 'menu-component'
  }
</script>
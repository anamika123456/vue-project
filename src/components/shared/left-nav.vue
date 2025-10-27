<template>
  <div class="cap_leftbar p_right" :class="showNav ? 'active' : ' '">
    
    <div class="cap_logo">
      <router-link class="closeMob" to="/dashboard"><img src="/assets/website/images/white-logo.svg" alt="Captail wallet" /></router-link>
      <div class="resPOnsive-menu navbar-light">
        <div class="px-3 customMobMenu onltMOb">
          <div class="d-flex align-items-center justify-content-end mobDir">
            <nav class="cap_profile navbar" :class="$route.path == '/complete-steps' ? 'd-flex align-items-center' : ''">
            
            <div class="notification" v-if="!pageLoader">
              <ul class="nav">
                <li class="nav-item dropdown">
                  <a class="nav-link p-0" href="javascript:void(0)" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click.prevent="markasRead()">
                    <feather type="bell"></feather> 
                    <span class="number" v-if="notificationUnreadList.totalRecords && notificationUnreadList.totalRecords > 0">{{ notificationUnreadList.totalRecords }}</span>
                  </a>
                  <div class="dropdown-menu">
                    <div class="d-flex align-items-center justify-content-between py-3 px-3 notificationHeader">
                      <div class="d-flex align-items-center">
                        <h6 class="mb-0 lh-normal">Notifications</h6>
                        <!-- <p class="redBG text-white px-2 py-1 line-1 mb-0 ml-2 medium rounded f-14" v-if="allList.totalRecords && allList.totalRecords > 0"> {{ allList.totalRecords || 0}}</p> -->
                      </div>


                      <div class="d-flex align-items-center">
                      <router-link class="secondaryBG round-lg text-white mr-0 mr-xl-2 seeAllBtn d-flex align-items-center justify-content-center" to="/notifications">See All</router-link>
                          <!-- <ul class="d-flex align-items-center ml-0 ml-xl-1">
                            
                            <li class="mr-0 mr-xl-2"  @click="userRolePermission($env_var.permissions.notifications , {path : '/settings', query:{settingTab: 'notifications'}})">
                              <a href="javascript:void(0)" class="border-0" >
                                <feather type="settings" size="8px" class="mr-0"></feather>
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0)" class="border-0">
                                <feather type="x" size="15px" class="mr-0"></feather>
                              </a>
                            </li>
                          </ul> -->
                        </div>
                      
                    </div>
                    <!-- <div class="d-flex justify-content-between align-items-center px-3 border-bottom">
                      <div id="tabs" class="text-center mb-0 currencyTab">
                        <ul class="d-flex align-items-center m-0">
                          <li>
                            <a class="d-block" href="javascript:void(0)" :class="[{'active':notificationtab == 1}]" @click.prevent="notificationtab = 1">All</a>
                          </li>
                          <li>
                            <a class="d-block" href="javascript:void(0)" :class="[{'active':notificationtab == 2}]" @click.prevent="notificationtab = 2">Account</a>
                          </li>
                          <li>
                            <a class="d-block" href="javascript:void(0)" :class="[{'active':notificationtab == 3}]" @click.prevent="notificationtab = 3">Transactions</a>
                          </li>
                          <li>
                            <a class="d-block" href="javascript:void(0)" :class="[{'active':notificationtab == 4}]" @click.prevent="notificationtab = 4">Others</a>
                          </li>
                        </ul>
                      </div>
                      <div class="line-1">
                        <a href="javascript:void(0)" class="border-0 settingIcon"><feather type="settings" size="10px"></feather></a>
                      </div>
                    </div> -->

                     
                      <ul class="notificationContent scrollbar border-top" v-if="notificationList.totalRecords && notificationList.totalRecords > 0">
                        <li v-for="list in notificationList.records" class="(parseInt(list.read) == 0 ) ? 'notificationUnread' : ''">
                           <!-- <div  v-html="list.msg"  ></div> -->
                          <div class="notificationImg">
                            <!-- <img src="/assets/website/images/notificationAvatar.svg" alt="Notification Avatar" class="d-block" width="36" height="36" /> -->
                            <span class="profileImg text-white d-flex align-items-center secondaryBG justify-content-center rounded-circle f-12" v-if="get_user.username != '' &&  get_user.username != null">{{ usernameSplitFunc(get_user.username)}}</span>
                          </div>
                           <div class="notificationContentRight">
                           
                            <p v-html="list.msg"></p>
                            <span class="pt-1 d-block">{{ dateFunction(list.created_at) }} | {{list.type.split('_').join(' ')}}</span>
                            <!-- <div class="d-flex pt-3">
                              <a href="javascript:void(0);" class="cap_btn small_btn mr-2 mr-md-3">Reply</a>
                              <a href="javascript:void(0);" class="cap_btn small_btn border-btn" @click="markasRead(list)">Close</a>
                            </div> -->
                           </div> 
                        </li>
                      </ul>

                  </div>
                </li>
              </ul>
            </div>
            

              <ul class="nav-menu leftDrop-down">
            <li class="nav-item dropdown">
              
              <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="nav-link onlyMoble-show">
                <span class="profileImg text-white d-flex align-items-center secondaryBG justify-content-center rounded-circle f-12" v-if="get_user.username != '' &&  get_user.username != null">{{ usernameSplitFunc(get_user.username)}}</span>
                  <span class="profileImg text-white d-flex align-items-center secondaryBG justify-content-center rounded-circle f-12" v-else>{{ get_user.email.charAt(0) }}</span>
                <feather class="icon" type="chevron-down"></feather>
              </a>
              
            <div class="dropdown-menu newMegaDropDown box-shadow">
                  <div class="userName">
                    <p class="userNameImg">

                      <h5 class="d-block w-100 h-100 text-white d-flex align-items-center secondaryBG justify-content-center rounded-circle" v-if="get_user.username != '' &&  get_user.username != null">{{ usernameSplitFunc(get_user.username)}}</h5>
                      <h5 v-else>{{ get_user.email.charAt(0) }}</h5>
                    </p>
                    <h5 class="mb-2">{{get_user.username}}</h5>
                    <p class="mb-2 pb-1 word-break lh-normal">{{get_user.email}}</p>
                    
                    <span class="themeBG text-white py-1 px-4 f-16 round-lg d-block mx-5 planButton">Default</span>
                  </div>

                  <ul aria-labelledby="languages">
                    <li  @click="userRolePermission($env_var.permissions.settings , {path : '/settings'})">
                      <a href="javascript:void(0)" class="dropdown-item" >
                        <span>Settings</span>
                      </a>
                    </li>
                    <li  @click="userRolePermission($env_var.permissions.help_centre , {path : '/help-centre'})">
                      <a href="javascript:void(0)" class="dropdown-item" >
                        <span>Help & Support</span>
                      </a>
                    </li>
                    <li  @click="userRolePermission($env_var.permissions.help_centre , {path : '/user-activity'})">
                      <a href="javascript:void(0)" class="dropdown-item" >
                        <span>User Activity</span>
                      </a>
                    </li>
                    <li  @click="userRolePermission($env_var.permissions.apiDeveloper , {path : '/developers-api'})" v-if="parseInt(get_user.lead_type) == 1">
                      <a href="javascript:void(0)" class="dropdown-item" >
                        <span>Developers API</span>
                      </a>
                    </li>
                    <li @click="logout()">
                      <a href="#" class="dropdown-item red">Sign Out</a>
                    </li>
                  </ul>
                </div>
            </li>
          </ul>
            </nav>
          </div>
        </div>

        <div class="d-flex align-items-center">
          
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
            @click.prevent.stop="showNav = !showNav"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </div>
    <div class="left_scrollbar right_scrollbar justify-content-between" :class="showNav ? 'show' : ''">
      <div class="flex-column d-flex justify-content-between leftCal-height">
        <div class="dir-effect">
          <nav class="side-navbar main-menu">
            <ul id="side-main-menu" class="side-menu list-unstyled" v-if="cardPermissionLeft()">
              <li :class="(($route.name == 'cards' || $route.name == 'card-dashboard' || $route.name == 'card-top-up' || $route.name == 'manage-card' || $route.name == 'card_steps1' || $route.name == 'card-withdraw' ) ? 'active' : '') "  @click="userRolePermission($env_var.permissions.crypto_debit_cards , {path : '/crypto-debit-cards'})">
                <!-- v-if="parseInt(get_user.lead_type) == 2"-->
                <a href="javascript:void(0)" class="closeMob" ><span class="credit-card"></span>Crypto Debit Cards <feather type="chevron-right"></feather></a>
              </li>

              <li :class="(($route.name == 'help_centre' || $route.name == 'view') ? 'active' : '') "  @click="userRolePermission($env_var.permissions.help_centre , {path : '/help-centre'})">
                <a href="javascript:void(0)" class="closeMob" ><span class="support"></span>Support <feather type="chevron-right"></feather></a>
              </li>
            </ul>
            <ul id="side-main-menu" class="side-menu list-unstyled" v-else>
              <li :class="($route.name == 'dashboard' ? 'active' : '') "  @click="userRolePermission($env_var.permissions.dashboard , {path : '/dashboard'})" >
                <a href="javascript:void(0)" class="closeMob" ><span class="dashboard"></span>Dashboard<feather type="chevron-right"></feather></a>
              </li>
              <li :class="($route.name == 'deposits' ? 'active' : '') "  @click="userRolePermission($env_var.permissions.payments , {path : '/deposits'})">
                <a href="javascript:void(0)" class="closeMob" ><span class="payments"></span>Deposits<feather type="chevron-right"></feather></a>
              </li>
              <li :class="($route.name == 'conversions' ? 'active' : '') " v-if="parseInt(get_user.settings.conversion) == 1 && parseInt(get_user.is_registered) == 5"  > <!--- @click="userRolePermission('', {path : '/conversions'}, 'conversion')"--->
                <router-link :to="{path: '/conversions'}" class="closeMob"><span class="conversion"></span>Conversions <feather type="chevron-right"></feather></router-link>
              </li>
              <li :class="($route.name == 'payouts' ? 'active' : '')"  @click="userRolePermission($env_var.permissions.payouts , {path : '/payouts'})">
                <a href="javascript:void(0)" class="closeMob" ><span class="payouts"></span>Payouts<feather type="chevron-right"></feather></a>
              </li>
              <li :class="($route.name == 'transaction-history' ? 'active' : '')"  @click="userRolePermission($env_var.permissions.transactionHistory , {path : '/transaction-history'})">
                <a href="javascript:void(0)" class="closeMob" ><span class="transaction-history"></span>Transaction History<feather type="chevron-right"></feather></a>
              </li><!---v-if="parseInt(get_user.profile.user_id) == 769"-->
             <!--  <li :class="(($route.name == 'cards' || $route.name == 'card-dashboard' || $route.name == 'card-top-up' || $route.name == 'manage-card' || $route.name == 'card_steps1' || $route.name == 'card-withdraw' ) ? 'active' : '') "  @click="userRolePermission($env_var.permissions.crypto_debit_cards , {path : '/crypto-debit-cards'})"  >
                <a href="javascript:void(0)" class="closeMob" ><span class="credit-card"></span>Crypto Debit Cards <feather type="chevron-right"></feather></a>
              </li> -->
              <li :class="(($route.name == 'help_centre' || $route.name == 'view') ? 'active' : '') "  @click="userRolePermission($env_var.permissions.help_centre , {path : '/help-centre'})">
                <a href="javascript:void(0)" class="closeMob" ><span class="support"></span>Support <feather type="chevron-right"></feather></a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="formCode-submit leftNav-bottom"></div> 
      </div>
    </div>
  </div>
</template>

<script>


import 'overlayscrollbars/overlayscrollbars.css';
import  { OverlayScrollbars } from 'overlayscrollbars';
import { tradingMixins } from "@/plugins/trading";
import { notificationsMixins } from '@/plugins/notifications'

import * as types from "@/types";
  import registerStepsMixins from "@/plugins/registerSteps";
  import settingsMixins from "@/plugins/settings";
  import { mapActions } from "vuex";
  import moment from "moment";
  import { Const } from "@/plugins/trading/provider/lib/const.cls";
export default {
  name: "left-nav",
   mixins: [tradingMixins, notificationsMixins],
  data() {
    return {
      showNav: false,
      pageLoader: false,

      notificationtab: 1,

        unreadList : {'records':[], 'totalRecords':0},
        allList : {'records':[], 'totalRecords':0}
    };
  },
 
  computed:{
  
  },
  methods: {
      ...mapActions({
        _runLogout: types.RUN_LOGOUT,
      }),
      dateFunction(getDate) {
        let last_seen_date = moment(getDate).fromNow();
        return last_seen_date;
      },
      logout() {
        localStorage.clear();
        window.location.replace("/")
      },
      markasRead(getData) {
        const _that = this
        //'notification_id' : getData._id
        if(this.unreadList.totalRecords > 0){
          this._runReadUnreadNotification({
            'globalParams': {},
            'localParams': {
              "parameter": _that
            }
          })
        }
      },
      listing(){
        this._runGetNotificationList({
          globalParams: { },
          localParams: { parameter: this },
        });
      }
    },
    created(){
      this._runWalletCurrencyJsonList({
        'globalParams': {},
        'localParams': {
          "parameter": this
        }
      })
      this.listing()
    },
  mounted() {

    const _that = this;

    if ($(window).width() <= 1600 && document.querySelector('.right_scrollbar')) {
      OverlayScrollbars(document.querySelector('.right_scrollbar'), {});
    }

    if(document.querySelector('.mid_scroll_content')){
      OverlayScrollbars(document.querySelector(".mid_scroll_content"), {});
    }

    if(document.querySelector('.wallet_cur')){
      OverlayScrollbars(document.querySelector(".wallet_cur"), {});
    }



    $(document).ready(function () {
      $("g[aria-labelledby]").hide();
    });
    jQuery(document).ready(function ($) {
      var alterClass = function () {
        var ww = document.body.clientWidth;
        if (ww > 1200) {
          _that.showNav = false;
        }
      };
      $(window).resize(function () {
        alterClass();
      });
      alterClass();
      $(".closeMob").on("click", function (event) {
        _that.showNav = false;
      });
    });
  },
};
</script>
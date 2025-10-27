<template>
   <section class="mid_scroll_content">
      <loader v-if="pageLoader"></loader>

      <div v-if="!pageLoader && (Object.keys(card_user).length > 0 && card_user.team_card_users.length == 0 &&  card_user.own_card_users.length == 0) || (Object.keys(card_user).length == 0)">
            <div class="pageContent border-0">
                <div class="bg-white border round-sm p-3 p-md-4 p-xl-5 no-cards new position-relative d-flex align-items-center justify-content-center">
                    <div class="row justify-content-center align-items-center mh-100 z-index-1">
                        
                        <div class="col-lg-5 col-xl-5" v-if="cardPermission()">
                            <div class="content-sec pl-md-2 pl-xl-5 pb-3 pb-md-4 pb-xl-5">
                                <h1 class="mb-3 lh-1">Welcome to your Virtual Debit Card</h1>
                                <p>Your account administrator has invited your user (EMAIL ADDRESS) to apply for a virtual debit card. To proceed, you need to complete a simple KYC (Know Your Customer) process. Once approved and activated, your card is ready to use!</p>

                                <a href="#" class="cap_btn large_btn mt-4 helpTopicsBtn"  @click="applyCard('','','wallet')"> <feather class="mr-1" type="plus-circle"></feather>Complete Your KYC</a>
                            </div>
                        </div>
                        <div class="col-lg-5 col-xl-5" v-else>
                            <div class="content-sec pl-md-2 pl-xl-5 pb-3 pb-md-4 pb-xl-5">
                                <h1 class="mb-3 lh-1">Welcome to your Virtual Debit Card</h1>
                                <p>Spend your crypto effortlessly with Capital Wallet’s Virtual Crypto Debit Cards. Instantly convert digital assets to fiat and securely manage your business expenses anywhere—with real-time transactions, top-tier security, and seamless wallet integration.</p>
                                <p>
                                    <label class=" mb-0">Disclaimer : The virtual cards service is available only to individuals whose KYC verification can be completed as EU citizens or residents
                                    </label>
                                </p>
                                <a href="#" class="cap_btn large_btn mt-4 helpTopicsBtn"  @click="applyCard('','','wallet')"> <feather class="mr-1" type="plus-circle"></feather>Add Card</a>
                            </div>
                        </div>
                        <div class="col-lg-7 col-xl-7">
                            <div class="img-wrap">
                                <img class="img-fluid d-block w-100" src="/assets/website/images/no-cards-img.png">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>

       <div  v-else>
           <div class="pageContent border-0">
               <div class="bg-white border round-sm cryptoCards position-relative mh-calc">
                  <div class="head-sec d-flex align-items-center justify-content-between flex-wrap mb-4 pb-3" v-if="Object.keys(card_user).length > 0 && card_user.own_card_users.length > 0 && !pageLoader">
                    <h4 class="mb-0">Company Cards</h4>
                    <div class="headActions d-flex align-items-center flex-wrap">
                      <div class="searchWrap">
                        <input class="form-control" placeholder="Search User" v-on:keyup="keymonitor" id="myInput">
                        <span class="searchIco">
                            <feather type="search" />
                        </span>
                      </div>
                      <a href="#" class="cap_btn large_btn fixBtn"  @click="applyCard('','','')">
                        <feather class="mr-1" type="plus-circle" size="20" />
                        Apply New Card
                      </a> 
                    </div>
                  </div>

                  <div class="body-sec" v-if="Object.keys(card_user).length > 0 && card_user.own_card_users.length > 0 && !pageLoader">
                    <div class="employeeList" id="myUL">
                      <div class="employeeItem "  v-for="(val, index) in card_user.own_card_users"   :class="cardDetailFlag == index ? 'opened' :''">
                        <div class="itemHead " :class="(val.cards.length == 0  && parseInt(val.steps) <= 8) ? 'align-items-center' : ''">
                          <div class="userItem statuses d-flex align-items-center " :class="(val.KYC_status == 'APPROVED') ? 'active': 'pending'">
                            <div class="img-wrap">
                                <img class="img-fluid" src="/assets/website/images/dummy-user.svg">
                            </div>
                            <div class="content-sec">
                                <h5 class="medium mb-0">{{ val.first_name }} {{ val.last_name }} </h5>
                                 <p class="medium mb-0"> {{ val.email }}</p>
                            </div>
                          </div>
                          <div class="badges" v-if="val.cards.length == 0 " >
                            <p class="badge-item yellow" @click="applyCard(val.str_user_id, 'div','')" v-if="parseInt(val.steps) <= 7">Pending Verification</p>
                            <button class="badge-item cap_btn extra_small_btn border-btn-secondary" @click="applyCard(val.str_user_id, 'div','wallet')" v-if="parseInt(val.steps) > 7">Add Card</button>
                          </div>
                          <h5 class="cardsOpenbtn" @click="cardDetailFlagFunc(index)" v-if="val.cards.length > 0">{{val.cards.length}} card{{val.cards.length > 1 ? 's' : ' '}}
                            <!-- <feather class="ml-2 arrow-icn" type="chevron-up" size="25" v-if="cardDetailFlag != -1" /> -->
                            <feather class="ml-2 arrow-icn" type="chevron-down" size="25"  />
                          </h5>
                        </div> 
                        <div class="itemBody" v-if="cardDetailFlag == index">
                          <div class="cardsRow d-flex flex-wrap">
                            <!----->
                            <div class="card-item" v-for="(val1, index1) in val.cards" :class="(val1.status == 'CLOSED') ? 'cancelled' : (val1.status == 'BLOCKED' ? 'blocked' : '')">
                              <div class="no-sec d-flex align-items-center justify-content-between ">
                                <h6 class="">**** **** **** {{val1.masked_card_number.substr(val1.masked_card_number.length - 4)}}<RouterLink  :to="{path : 'card-dashboard', query:{cardId: val1.card_id}}"><feather class="ml-2" type="eye" size="18" /></RouterLink></h6>
                                <button type="button" class="btn moreBtn p-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <feather class="moreicon" type="more-vertical" size="18" />
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                  <RouterLink class="dropdown-item" type="button" :to="{path : 'card-dashboard', query:{cardId: val1.card_id}}">View Card</RouterLink>
                                  <RouterLink class="dropdown-item" type="button" to="/card-limits">Card Limits</RouterLink>
                                  <!-- <RouterLink class="dropdown-item" type="button" to="/cancel-card">Cancel Card</RouterLink> -->
                                  <a href="#" class="dropdown-item" @click="freezePopup = val1.card_id" >Cancel Card </a>
                                </div>
                              </div>
                              <div class="expiry">
                                <p class="expiry-lable">Expiry date</p>
                                <p class="months">{{ momentFunc(val1.expiry_data,"MM/YYYY","") }}</p>
                              </div>
                            </div>
                            <div class="card-item addcard" @click="applyCard(val.str_user_id, 'div','wallet')" >
                              <a class="addbtn pr-1" href="#"><feather class="mr-2" type="plus" size="20" />Add Card</a>                        
                            </div>
                          </div>
                        </div>
                      </div>
                     <!--  <div class="noDataWrap" v-else>
                        <img class="img-fluid" src="/assets/website/images/no-data.png" alt="Icon">
                        <p>No Records</p>
                      </div> -->
                    </div>
                  </div>


                  <div class="head-sec d-flex align-items-center justify-content-between flex-wrap mb-1 pb-1" v-if="Object.keys(card_user).length > 0 && card_user.team_card_users.length > 0 && !pageLoader">
                    <h4 class="mb-0">Employee Cards</h4>
                    <div class="headActions d-flex align-items-center flex-wrap">
                      
                      <RouterLink  :to="{path : 'settings', query:{settingTab: 'Account', accountTab:2}}" class="cap_btn large_btn fixBtn" v-if="!cardPermission()"><feather class="mr-1" type="eye" size="20"  />
                        Manage Invites
                      </RouterLink>
                      <a href="#" class="cap_btn large_btn fixBtn"  @click="applyCard('','','')" v-if="card_user.own_card_users.length == 0 && !cardPermission()">
                        <feather class="mr-1" type="plus-circle" size="20" />
                        Apply New Card
                      </a> 
                    </div>
                  </div>
                  <div class="body-sec" v-if="Object.keys(card_user).length > 0 && card_user.team_card_users.length > 0 && !pageLoader">
                    <div class="employeeList" id="myUL">
                      <div class="employeeItem "  v-for="(val, index) in card_user.team_card_users" :class="cardDetailFlag1 == index ? 'opened' :''">
                        <div class="itemHead" :class="(val.cards.length == 0  && parseInt(val.steps) <= 8) ? 'align-items-center' : ''">
                          <div class="userItem statuses d-flex align-items-center " :class="(val.KYC_status == 'APPROVED') ? 'active': 'pending'">
                            <div class="img-wrap">
                                <img class="img-fluid" src="/assets/website/images/dummy-user.svg">
                            </div>
                            <div class="content-sec">
                                <h5 class="medium mb-0">{{ val.first_name }} {{ val.last_name }} </h5>
                                 <p class="medium mb-0"> {{ val.email }}</p>
                            </div>
                          </div>
                          <div class="badges" v-if="val.cards.length == 0 " >
                            <p class="badge-item yellow"  @click="applyCard(val.str_user_id,'','')" v-if="cardPermission()">
                              <span v-if="parseInt(val.steps) <= 7">Pending Verification</span>
                              <span v-else>Card Activation Pending</span>
                            </p>
                            <p class="badge-item yellow" v-if="parseInt(val.steps) <= 7 && !cardPermission()" >Pending Verification</p>
                           <!--  -->
                            <!-- <p class="badge-item secondary" @click="ResendInvites(val.id)">Resend Invite</p>
                            <p class="badge-item red"  @click="cancelInvites(val.id)">Cancel Invite</p> -->

                           
                             <button class="badge-item cap_btn extra_small_btn border-btn-secondary" @click="applyCard(val.str_user_id, 'div','wallet')" v-if="parseInt(val.steps) > 7 && !cardPermission()">Add Card</button>
                          </div>
                          <h5 class="cardsOpenbtn" @click="cardDetailFlagFunc1(index)" v-if="val.cards.length > 0">{{val.cards.length}} card{{val.cards.length > 1 ? 's' : ' '}}
                            <feather class="ml-2 arrow-icn" type="chevron-down" size="25"  />
                          </h5>
                        </div>
                        <div class="itemBody"  v-if="cardDetailFlag1 == index">
                          <div class="cardsRow d-flex flex-wrap">
                            <!----->
                            <div class="card-item" v-for="(val1, index1) in val.cards" :class="(val1.status == 'CLOSED') ? 'cancelled' : (val1.status == 'BLOCKED' ? 'blocked' : '')">
                              <div class="no-sec d-flex align-items-center justify-content-between ">
                                <h6 class="">**** **** **** {{val1.masked_card_number.substr(val1.masked_card_number.length - 4)}}<RouterLink  :to="{path : 'card-dashboard', query:{cardId: val1.card_id}}"><feather class="ml-2" type="eye" size="18" /></RouterLink></h6>
                                <button type="button" class="btn moreBtn p-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <feather class="moreicon" type="more-vertical" size="18" />
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                  <RouterLink class="dropdown-item" type="button" :to="{path : 'card-dashboard', query:{cardId: val1.card_id}}">View Card</RouterLink>
                                  <RouterLink class="dropdown-item" type="button" to="/card-limits">Card Limits</RouterLink>
                                  <!-- <RouterLink class="dropdown-item" type="button" to="/cancel-card">Cancel Card</RouterLink> -->
                                  <a href="#" class="dropdown-item" @click="freezePopup = val1.card_id" >Cancel Card </a>
                                </div>
                              </div>
                              <div class="expiry">
                                <p class="expiry-lable">Expiry date</p>
                                <p class="months">{{ momentFunc(val1.expiry_data,"MM/YYYY","") }}</p>
                              </div>
                            </div>
                            <div class="card-item addcard" @click="applyCard(val.str_user_id, 'div','wallet')" v-if="!cardPermission()">
                              <a class="addbtn pr-1" href="#"><feather class="mr-2" type="plus" size="20" />Add Card</a>                        
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- <div class="noDataWrap" v-else>
                        <img class="img-fluid" src="/assets/website/images/no-data.png" alt="Icon">
                        <p>No Records</p>
                      </div> -->
                    </div>
                  </div>
               </div>
           </div>
       </div>

       <div class="modal" tabindex="-1" id="fa-password-two" role="dialog" aria-labelledby="fa-password-two" aria-hidden="true" v-if="freezePopup != ''">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content googleAuthenticationModal">
                <div class="modal-header border-0 d-block text-right">
                    <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="reset()">
                    <feather type="x" size="22px"></feather>
                    </a>
                </div>
                <div class="modal-body pt-0">
                    <div class="mb-4">
                    <img src="/assets/website/images/google-authenticator.png" alt="Google Authentication" class="d-block m-auto" width="96" height="96" />
                    <h6 class="themecolor mt-4 mb-0 text-center">Google Authentication Code</h6>
                    </div>
                    <div class="form-group">
                    <input type="text" placeholder="Enter 2FA Code" class="form-control" name="otp"  v-model="otp" />
                    </div>
                    
                </div>
                <div class="modal-footer justify-content-center pt-4 border-0">
                    <a class="cap_btn blue px-4 large_btn mb-0" href="javascript:void(0);" @click="verifyQrCode()">Submit</a>
                </div>
                </div>
            </div>
        </div>
   </section>

</template>
<script>
  import { cardsMixins } from "@/plugins/cards";
  import moment from "moment";
  export default {
    name: "card-list",
    mixins: [cardsMixins],
    data() {
      return {
        pageLoader: false,
        cardDetailFlag: '-1',
        cardDetailFlag1: '-1',
        burn: false,
        freezePopup: '',
        otp: '',
        nocards: true,
      };
    },
    methods: {
      keymonitor() {
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        ul = document.getElementById("myUL");
        li = ul.getElementsByTagName("div");

        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
          a = li[i].getElementsByTagName("div")[0];
          // console.log(a.textContent, '=================', a.innerText)
          txtValue = a.textContent || a.innerText;

          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
          } else {
            li[i].style.display = "none";
          }
        }
      },
      cardDetailFlagFunc(getIndex){
        if(this.cardDetailFlag == getIndex){
          this.cardDetailFlag = '-1'
        }else{
          this.cardDetailFlag = getIndex
        }
      },

      cardDetailFlagFunc1(getIndex){
        if(this.cardDetailFlag1 == getIndex){
          this.cardDetailFlag1 = '-1'
        }else{
          this.cardDetailFlag1 = getIndex
        }
      },
      verifyQrCode() {
          let input_json = {
            globalParams: {
              google_token: this.otp.toString(),
              step: 1,
            },
            localParams: { parameter: this, 'page': 'burn-creditCard' },
          };
          this._runVerify2FaQrcode(input_json);
      },
      cardBurn(){
          let input_json = {
              'globalParams': {
                  "cardId": this.freezePopup
              },
              'localParams': { "parameter": this, 'page': 'card-listing' }
          }
          this._runGetCardBurn(input_json)
      },
      reset(){
        this.freezePopup= ''
        this.otp= ''
      },
      listing() {
        let input_json = {
          'globalParams': {
            //"userId": "a19bd628-9540-4350-bc2f-4ce0356592b5"
          },
          'localParams': { "parameter": this }
        }
        this._runGetCardUser(input_json)
      },
      applyCard(getId,getDiv, getWallet){
        // console.log(getId,getDiv, getWallet)
        if(getId != ''){
          let json = {
            path : '/card-steps1', 
            query:{userId: getId}
          }
          if(getDiv != '' && getDiv != undefined && getDiv != null){
            json.query['getDiv'] = 3
          }
          if(getWallet != '' && getWallet != undefined && getWallet != null){
            json.query['flag'] = 'wallet'
          }
          this.$router.push(json)
        }else{
          this.$router.push({path : '/card-steps1'})
        }
      },



       ResendInvites(getId){
        let json = {
                globalParams: {
                    "id" : getId
                },
                localParams: { parameter: this,  'page' : 'cards' },
          }
          this._runResendInvites(json);
       },
       cancelInvites(getId){
        let json = {
                globalParams: {
                    "id" : getId
                },
                localParams: { parameter: this,  'page' : 'cards' },
          }
          this._runCancelInvites(json);
       },
    },
    created() {
      this.listing();
      if(localStorage.getItem("cardActivateState")){
        localStorage.removeItem("cardActivateState");
      }
    },
  };
</script>
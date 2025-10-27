<template>
  <div class="mid_scroll_content">
    <loader v-if="pageLoader"></loader>
    <div class="pageContent border-0">
      <div class="add-card-main">
        <div class="row">
          <div class="col-md-4 col-lg-3 col-xl-2">
              <div class="card-steps" >
                  <div class="step-item" :class="activeClass(4)">
                      <span class="num-wrap">1</span>
                      <p v-if="cardPermission()">Verify your details </p>
                      <p v-else>Apply Card </p>
                  </div>
                  <div class="step-item" :class="activeClass(8)">
                      <span class="num-wrap">2</span>
                      <p>KYC Verification</p>
                  </div>
                  <div class="step-item" >
                      <span class="num-wrap">3</span>
                      <p>Card Activation</p>
                  </div>
                  <div class="step-item" v-if="!cardPermission()">
                      <span class="num-wrap">
                          <feather type="shopping-cart" class="shoppingCart" size="18">
                          </feather>
                      </span>
                      <p>Card all set!</p>
                  </div>
              </div>
          </div> 
          <div class="col-md-8 col-lg-9 col-xl-10">
            <!---------------------common-------------------------------------> 
            <div class="addCards bg-white border round-sm" v-if="div == 1 && !cardPermission()">
              <Form @submit="div = 2" ref="regform">
                <h4 class="mb-4 pb-3 border-bottom">All you need to know</h4>
                <div class="row">
                    <div class="col-lg-7">
                        <ul class="nav nav-tabs cardsTab mb-4 pb-2" id="myTab" role="tablist">
                            <li class="nav-item">
                              <a class="nav-link active" id="features-tab" data-toggle="tab" href="#features" role="tab" aria-controls="features" aria-selected="true">Features</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" id="eligibility-tab" data-toggle="tab" href="#eligibility" role="tab" aria-controls="eligibility" aria-selected="false">Eligibility</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" id="fees-tab" data-toggle="tab" href="#fees" role="tab" aria-controls="fees" aria-selected="false">Fees and charges</a>
                            </li>
                          </ul>
                          <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="features" role="tabpanel" aria-labelledby="features-tab">
                                <div class="features-content">
                                    <p class="semibold themecolor mb-2 pb-1">Key features:</p> 
                                    <ul class="bullet-type mb-4">
                                        <li class="mb-2 textcolor pb-1">Virtual debit cards for seamless online and offline transactions.</li>
                                        <li class=" mb-2 textcolor pb-1">Instant card issuance upon successful KYC and approval.</li>
                                        <li class="mb-2 textcolor pb-1">Supports payments in multiple currencies (BTC, USDT, USDC, ETH).</li>
                                        <li class="mb-2 textcolor pb-1">High-security measures including dynamic CVV and 3D Secure for safe transactions.</li>
                                        <li class=" mb-2 textcolor pb-1">Ability to block, unblock, or cancel cards instantly via the Capital Wallet portal.</li>
                                    </ul>
                                    <p class="semibold themecolor mb-2 pb-1">Additional Perks:</p> 
                                    <ul class="bullet-type mb-5">
                                        <li class="mb-2  textcolor pb-1">Real-time spending notifications for better control.</li>
                                        <li class="mb-2  textcolor pb-1">Transparent transaction history for all card activities.</li>
                                        <li class="mb-2  textcolor pb-1">Integration with top payment gateways and platforms.</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="eligibility" role="tabpanel" aria-labelledby="eligibility-tab">
                                <div class="features-content">
                                    <div class="item mb-5">
                                        <p class="semibold themecolor mb-2">Who can apply:</p> 
                                        <p class="mb-2">Verified users of Capital Wallet with an active individual account.</p>
                                    </div>

                                    <div class="item">
                                        <p class="semibold themecolor mb-2 pb-1">Requirements:</p>
                                        <ul class="bullet-type mb-5">
                                            <li class="mb-2 textcolor pb-1">If you wish to use the Services, you must create an account in the Application. Your account must be linked to a valid e-mail address, and you must create a password that you will be using to log in to your account. </li>
                                            <li class="mb-2 textcolor pb-1">Users must complete the required KYC verification to apply for a Crypto-Backed Virtual Debit Card. Verification may include proof of identity, address, and source of funds, as required by the third-party service provider.</li>
                                            <li class="mb-2 textcolor pb-1">Requirements of Our third-party service provider(s) apply for account creation and access to Services.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="fees" role="tabpanel" aria-labelledby="fees-tab">
                                <div class="features-content">
                                    <p class="semibold themecolor mb-2 pb-1">Card Creation Fee:</p>
                                    <ul class="bullet-type mb-5">
                                        <li class="mb-2 textcolor pb-1">A one-time fee of $X (deducted upon card activation).</li>
                                    </ul>

                                    <p class="semibold themecolor mb-2 pb-1">Transaction Fees:</p>
                                    <ul class="bullet-type mb-5">
                                        <li class="mb-2 textcolor pb-1">Domestic Transactions: $X per transaction.</li>
                                        <li class="mb-2 textcolor pb-1">International Transactions: $X per transaction or X% of the transaction amount.</li>
                                        <li class="mb-2 textcolor pb-1">Currency Conversion Fee: X%.</li>
                                    </ul>

                                    <p class="semibold themecolor mb-2 pb-1">Limits:</p>
                                    <ul class="bullet-type mb-5">
                                        <li class="mb-2 textcolor pb-1">Maximum card spend limit: $X daily/monthly.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div id="carouselExampleIndicators" class="carousel slide card-slider pt-4 mt-5" data-ride="carousel">
                            <ol class="carousel-indicators">
                                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            </ol>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                <img class="d-block w-100" src="/assets/website/images/slidercard-front.png" alt="First slide">
                                </div>
                                <div class="carousel-item">
                                <img class="d-block w-100" src="/assets/website/images/slidercard-back.png" alt="Second slide">
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
                <div class="c_checkbox w-100">
                    <label class="customCheckbox mb-0">I have read and I accept the <a class="text-underline" 
                      :href="envFile.VITE_websiteLink+(envFile.VITE_ENTITY_NAME == 'dmcc'? 'global':'au')+envFile.VITE_termsCond" 
                      target="_blank">Terms Of Use</a> and <a :href="envFile.VITE_websiteLink+(envFile.VITE_ENTITY_NAME == 'dmcc'? 'global':'au')+envFile.VITE_priPol" class="text-underline"  target="_blank">Privacy Policy</a>  and <a href="https://storage.googleapis.com/striga-public-docs/Static%20Partner%20TCs/Striga-Terms-of-Service-Co-Brand-Partners-End-Users.pdf" class="text-underline"  target="_blank">Virtual Card Terms of Service</a>  
                        <!-- <input type="checkbox" class="form-control" id="" name="accept" value="1" v-model="accept"  /> -->
                        <Field type="checkbox" class="form-control" id="" name="accept" value="1" v-model="accept"  rules="required" />
                        <span class="checkmark"></span>
                        <ErrorMessage name="accept" class="text-danger" />
                    </label>
                </div>
                <div class="c_checkbox w-100">
                    <label class=" mb-0">Disclaimer : The virtual cards service is available only to individuals whose KYC verification can be completed as EU citizens or residents
                    </label>
                </div>
               <!-- <a href="#" class="cap_btn large_btn mt-4"  @click="div = 2">Apply</a>  -->
               <input type="submit" class="cap_btn large_btn mt-4" value="Apply" />
              </Form>
            </div>

            <div class="addCards bg-white round-sm border" v-if="div == 2 && !cardPermission()">
              <h4 class="mb-4 pb-3 border-bottom">Apply Card</h4>
              <p class="pt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis nulla nisl. Integer lorem diam, dictum quis urna sed, dignissim malesuada ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis nulla nisl. Integer lorem diam, dictum quis urna sed, dignissim malesuada ex.</p>

              <lable class="customRadioButton d-flex border round-sm selectUser">
                  <div class="img-wrap">
                      <img src="/assets/website/images/slidercard-front.png">
                  </div>
                  <div class="content-sec">
                      <h3 class="mb-3 mt-1">Own Card</h3>
                      <p class="mb-0">Designed for business owners and administrators, this card is issued directly to the account owner upon completing their own KYC. It ensures seamless access to company funds for managing business-related expenses efficiently.</p>
                  </div>
                  <div class="card-radio">
                      <input type="radio" name="selectCard" v-model="cardType" value="own"  />
                      <span class="checkmark"></span>
                  </div>
              </lable>

              <lable class="customRadioButton d-flex border round-sm selectUser">
                  <div class="img-wrap">
                      <img src="/assets/website/images/slidercard-front.png">
                  </div>
                  <div class="content-sec">
                      <h3 class="mb-3 mt-1">Team Card</h3>
                      <p class="mb-0">Designed for team members for authorized business expenses. The account administrators initiate the process by inviting the team member, who must complete their KYC to activate the card.</p>
                  </div>
                  <div class="card-radio">
                      <input type="radio" name="selectCard" v-model="cardType" value="team" />
                      <span class="checkmark"></span>
                  </div>
              </lable>
              <a href="#" class="cap_btn large_btn mt-1"  @click="div = 3">Apply</a>
            </div>





            <div class="" v-if="(div == 3 && cardType == 'own') || (cardPermission())">
              <applyOwnCard v-if="(Object.keys(card_users_by_id).length == 0 || parseInt(card_users_by_id.steps) == null || parseInt(card_users_by_id.steps) == 0)" />
              <verify_mobile_email_otp v-else-if="parseInt(card_users_by_id.steps) == 1 || parseInt(card_users_by_id.steps) == 2" />
              <update_user_detail v-else-if="parseInt(card_users_by_id.steps) == 3" />
              <start_kyc v-else-if="(parseInt(card_users_by_id.steps) >= 4 && parseInt(card_users_by_id.steps) <= 7)" />
              <card_activation v-else-if="parseInt(card_users_by_id.steps) == 8" />
            </div>

            <div class="" v-if="div == 3 && cardType == 'team'">
              <userList v-if="innerDivOfTeamCard == 1" />
              <sendInviteForm  v-if="innerDivOfTeamCard == 2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { cardsMixins } from "@/plugins/cards";
  import applyOwnCard from "./apply-own-card.vue";
  import verify_mobile_email_otp from "./verify_mobile_email_otp.vue";
  import update_user_detail from "./verify-address.vue";
  import start_kyc from "./kyc-verification.vue";
  import card_activation from "./card-activation.vue";

  import userList from "./team-invite-flow/userList.vue";
  import sendInviteForm from "./team-invite-flow/send-invite.vue";

  import { Const } from "@/plugins/cards/provider/lib/const.cls";
  import { Form, Field, ErrorMessage } from "vee-validate";
  export default {
    name: "step-four",
    mixins: [cardsMixins],
    data() {
      return {
        div: 1,
        accept: 0,
        cardType: 'own',


        innerDivOfTeamCard : 1,


        pageLoader: false,
        currencyCat: ["BTC", "USDT", "USDC", "EUR", "ETH"],
        fname : '',
        lname : '',
        email : '',
        currency : '',
        phno : '',

        otp : '',

        dateFocus: false,
        dob : '',
        address : '',
        town_city : '',
        Country : '',
        zip_code : '',

        tier:'1',

        'show_div': 'createCardUser',
        innerDiv: '',

        userId :''
      };
    },
     components: { applyOwnCard, verify_mobile_email_otp, update_user_detail, start_kyc, card_activation, Form, Field, ErrorMessage, userList,sendInviteForm },
    methods: {
      activeClass(getStep) {
          if (parseInt(getStep) <= parseInt(this.card_users_by_id.steps)) {
            return 'active';
          } else {
            return '';
          }
      },
      getAllCardUsersFunc(userId,getStep){
        let input_json = {
          'globalParams': {
            "userId": userId
          },
          'localParams': { "parameter": this, "steps": getStep }
        }
        this._runGetCardUserById(input_json)
      },
      getBacktoStep(backto) {
        let input_json = {
          'globalParams': {},
          'localParams': { "parameter": this, "backto": backto }
        }
        this._runCardStateChange(input_json)

        
      },
      tillCompletedTask(getStep) {
        // if (parseInt(getStep) <= parseInt(this.card_users_by_id.steps)) {
        //   return false
        // } else {
          return true
        // }
      },
      maxDate() {
        return this.momentFunc('', 'YYYY-MM-DD');
      }
    },
    created(){
      if(this.$route.query.getDiv){
        this.div = this.$route.query.getDiv
      }
      if(this.$route.query.userId){
        this.getAllCardUsersFunc(this.$route.query.userId,1)
      }
    }
  };
</script>
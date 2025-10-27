<template>
    <div>
        <loader v-if="pageLoader"></loader>
        <div class="addCards bg-white round-sm border mh-calc">
          <div class="card verifactionWrap"> 
              <div id="sumsub-websdk-container"></div>
          </div>
        </div>
        
        <!-- <div class="addCards bg-white round-sm border mh-calc">
            <RouterLink class="text-center d-block" to="/">
                <img class="img-fluid" src="/assets/website/images/kyc-verification.png">
            </RouterLink>
            <a :href="kycLink" class="cap_btn px-4  mb-0" target="_blank">Start kyc By using this link</a>
            or 
            <a href="#" class="cap_btn px-4  mb-0" >Start kyc here</a>
        </div> -->

        <!-- <div class="modal" tabindex="-1" id="cancelInvoice" role="dialog" aria-hidden="true" >
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-body text-center">
                    <img width="70" class="img-fluid mb-3" src="/assets/website/images/greencheck.svg">
                    <h5 class="text-center medium d-block lh-normal mb-0">You have uploaded your documents for Verification</h5>
                </div>
                <div class="modal-footer border-0 pt-0">
                    <RouterLink to="/card-activation" class="cap_btn large_btn mb-0 m-auto">Proceed to Card Activation</RouterLink>
                </div>
                </div>
            </div>
        </div> -->
    </div>

</template>
<script>
  import "https://static.sumsub.com/idensic/static/sns-websdk-builder.js";
  import { cardsMixins } from "@/plugins/cards";
  export default {
    name: "step-four",
    mixins: [cardsMixins],
    data() {
      return {
        pageLoader: true,
        kycLink: '',
        kycToken: '',
        tier:'1',
        cardType: 'own',
        kycFlag: 0
      };
    },
    methods: {
      getAllCardUsersFunc(userId,getStep, kycFlag){
        this.kycFlag = kycFlag
        let input_json = {
          'globalParams': {
            "userId": userId
          },
          'localParams': { "parameter": this, "steps": getStep, "kycFlag": kycFlag }
        }
        this._runGetCardUserById(input_json)
      },
      startKycFunc(){
        let input_json = {
          'globalParams': {
            "userId": this.card_users_by_id.str_user_id,
            "tier": 1
          },
          'localParams': {
            "parameter": this, "steps" : 5
          }
        }
        this._runStartKyc(input_json)
      },
      launchWebSdk(accessToken, applicantEmail, applicantPhone){
        const _that = this
        _that.pageLoader = false
        let snsWebSdkInstance = snsWebSdk.init(
            accessToken,
            () => _that.startKycFunc()
        )
        .withConf({
            lang: 'en',
            email: applicantEmail,
            phone: applicantPhone,
            i18n: {"document":{"subTitles":{"IDENTITY": "Upload a document that proves your identity"}}},
            onMessage: (type, payload) => {
                console.log('WebSDK onMessage', type, payload)
            },
            uiConf: {
                customCssStr: `:root {\n  --black: #000000;\n   --grey: #F5F5F5;\n  --grey-darker: #B2B2B2;\n  --border-color: #DBDBDB;\n}\n\n*{\n font-family:'Poppins' !important;\n}\n\np {\n  color: var(--black);\n  font-size: 16px;\n  line-height: 24px;\n}\n\nsection {\n  margin: 40px auto;\n}\n\ninput {\n  color: var(--black);\n  font-weight: 600;\n  outline: none;\n}\n\nsection.content {\n  background-color: var(--grey);\n  color: var(--black);\n  padding: 40px 40px 16px;\n  box-shadow: none;\n  border-radius:6px;\n}\n\nbutton.submit,\nbutton.back {\n  text-transform: capitalize;\n  border-radius: 6px;\n  height: 48px;\n  padding: 0 30px;\n  font-size: 16px;\n  background-image: none !important;\n  transform: none !important;\n  box-shadow: none !important;\n  transition: all 0.2s linear;\n}\n\nbutton.submit {\n  min-width: 132px;\n  background: none;\n  background-color: var(--black);\n}\n\n.round-icon {\n  background-color: var(--black) !important;\n  background-image: none !important;\n} .sumsub-logo {background-image: url("https://striga.com/wp-content/uploads/2022/03/Color-1.svg") !important;\n height: 50px;\n background-size: contain;\n background-repeat: no-repeat;\n background-position: center center;\n display: flex;\n align-self: center;\n} .sumsub-logo svg {opacity: 0 !important;}`
            },
            onError: (error) => {
                console.error('WebSDK onError', error)
            },
        })
        .withOptions({ addViewportTag: false, adaptIframeHeight: true})
        .on('stepCompleted', (payload) => {
           
            console.log('stepCompleted', payload)
            
        })
        .on('onError', (error) => {
            console.log('onError', payload)
        })
        .onMessage((type, payload) => {
            console.log('onMessage', type, payload)
            if(payload.authCode && payload.authCode != ''){
             
              setTimeout(function() {
                 _that.pageLoader = true
              }, 1000);
              setTimeout(function() {
                 _that.pageLoader = true
                _that.getAllCardUsersFunc(_that.card_users_by_id.str_user_id, 5, 1)
              }, 10000);
            }
        })
        .build();
        snsWebSdkInstance.launch('#sumsub-websdk-container')
      }
    },
    created(){
      this.getAllCardUsersFunc(this.card_users_by_id.str_user_id, 5, 0)
      this.startKycFunc()
    }
  };
</script>
<style  scoped>
  /*@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap');*/

  *{
    box-sizing:border-box;
  }

  body, html{
    margin:0;
    padding:0;
    height: 100%;
    width: 100%;
  }
  body{
    display: flex;
    justify-content: center;
    align-items: center;
    display: -webkit-flex;
    -webkit-align-items: center;
    -webkit-justify-content: center;
     background-image: linear-gradient(to right top, #a2beeb, #8ecfee, #8edde5, #a4e7d5, #c7eec7);
    flex-direction: column;
    -webkit-flex-direction: column;
  }

  .card{
    width: 100%;
    height: 100%;
    -webkit-perspective: 600px;
    -moz-perspective: 600px;
    perspective:600px;  
  }

  .card__part{
    box-shadow: 1px 1px #aaa3a3;
    top: 0;
    position: absolute;
    z-index: 1000;
    left: 0;
    display: inline-block;
    width: 320px;
    height: 190px;
    background-image: linear-gradient(90deg, #18C0C0 0%, #0564A7 100%);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 8px;
    -webkit-transition: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    -moz-transition: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    -ms-transition: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    -o-transition: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
  }
  h2{
    color: red !important;
  }
</style>
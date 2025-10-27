<template>
    <div>
        <loader v-if="pageLoader"></loader>
        
        <div class="addCards bg-white round-sm border apply mh-calc" >
            <h4 class="mb-4 pb-3 border-bottom">Apply Card</h4>
            <form class="">
                <div class="d-flex align-items-start justify-content-between flex-wrap select-card-type mb-4 py-3" v-if="!cardPermission()">
                    <div class="d-flex align-items-start flex-wrap inner-items">
                        <div class="radio-wrap border round-sm">
                            <label class="customRadioButton d-flex">
                                <div class="mb-0 destinationRadio">
                                <input type="radio" name="role" v-model="cardType" value="own" disabled />
                                <span class="checkmark"></span>
                                </div>
                                <div class="mb-0">
                                <h6 class="medium mb-0">Own Card</h6>
                                <p class="textcolor mb-0 pt-1">
                                    Seamless access to company funds for business-related expenses.
                                </p>
                                </div>
                            </label>
                        </div>
                        <div class="radio-wrap border round-sm">
                            <label class="customRadioButton d-flex">
                                <div class="mb-0 destinationRadio">
                                <input type="radio" name="role" v-model="cardType" value="team" disabled />
                                <span class="checkmark"></span>
                                </div>
                                <div class="mb-0">
                                <h6 class="medium mb-0">Team Card</h6>
                                <p class="textcolor mb-0 pt-1">
                                    Seamless access to company funds for business-related expenses.
                                </p>
                                </div>
                            </label>
                        </div>
                    </div>
                    <RouterLink v-if="cardType == 'team'" class="cap_btn large_btn mt-1" to="/send-invite">Invite User</RouterLink> 
                </div>
                <div class="mw-870" v-if="cardType == 'own'">
                    <div class="row">
                        <div class="col-md-6 col-lg-6"> 
                            <div class="form-group">
                                <label class="labeltext">First Name <span class="red">*</span></label>
                                <input type="text" placeholder="Enter first name" class="form-control" v-model="fname" :disabled='disabled'>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <div class="form-group">
                                <label class="labeltext">Last Name <span class="red">*</span></label>
                                <input type="text" placeholder="Enter last name" class="form-control" v-model="lname"  :disabled='disabled'>
                            </div>
                        </div>
                        
                        
                        <div class="col-md-6 col-lg-6">
                            <div class="form-group">
                                <label class="labeltext">Email Address <span class="red">*</span></label>
                                <div class="verifybtn-wrap">
                                    <input type="email" placeholder="Enter email address" class="form-control" v-model="email" :disabled='disabled'>
                                    <!-- <button class="verifybtn btn">Verify</button> -->
                                    <!-- <span class="green verifybtn text-decoration-none">Verified</span>  -->
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 col-lg-6">
                            <div class="form-group">
                                <label class="labeltext">Mobile Number <span class="red">*</span></label>
                                <div class="verifybtn-wrap phnWrap">
                                    <!-- <input type="tel" placeholder="" class="form-control" v-model="phno" > -->
                                    <vue-tel-input @input="onInput" :value="phno"  mode="international" :class="form-control" :placeholder="parsedPlaceholder"></vue-tel-input>
                                    <!-- <button class="verifybtn btn">Verify</button> -->
                                    <!-- <span class="green verifybtn text-decoration-none">Verified</span> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <input type="button" value="Confirm" class="cap_btn large_btn mt-1 fixBtn" @click="createCarduserFunc()"   />
            </form>
        </div>
    </div>

</template>

<!-- <script src=""></script> -->
<script>
    
  import { cardsMixins } from "@/plugins/cards";
  import { Form, Field, ErrorMessage } from "vee-validate";
  export default {
    name: "step-four",
    mixins: [cardsMixins],
    data() {
      return {
        div: 1,
        cardType: 'own',
        pageLoader: false,
        currencyCat: ["BTC", "USDT", "USDC", "EUR", "ETH"],
        fname : '',
        lname : '',
        email : '',
        currency : '',
        phno : '',
        country: '',
        region: '',
        
        parsedPlaceholder: '',
        disabled : false
      };
    },
    components: { Form, Field, ErrorMessage },
   
    methods: {
        onInput(phone, phoneObject, input) {
          if (phoneObject?.formatted) {
            this.phno = phoneObject.formatted
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
      createCarduserFunc(){
        let phno = this.phno.split(' ');
        let res = phno.slice(1);
        res = res.join("");
        let input_json = {
          'globalParams': {
            "user_id": this.get_user.id.toString(),
            "firstName":this.fname,
            "lastName": this.lname,
            "email": this.email,
            "countryCode": phno[0],
            "number": res.toString(),
            "user_type":(this.cardPermission()) ? "TEAM_CARD" : "OWN_CARD",
            "currency": ''
          },
          'localParams': {
            "parameter": this, "steps" : 1
          }
        }
        this._runCreateCardUser(input_json)
      }
    },
    created(){
      if(this.$route.query.userId){
        this.getAllCardUsersFunc(this.$route.query.userId,1)
      }else{
        if(this.cardPermission()){
            this.fname = this.get_user.profile.firstname
            this.lname = this.get_user.profile.lastname
            this.email = this.get_user.email
            this.disabled = true
        }
      }
    }
  };
</script>
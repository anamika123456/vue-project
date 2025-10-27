<template>
    <div>
        <loader v-if="pageLoader"></loader>
        
        <div class="addCards bg-white round-sm border apply mh-calc" >
            <h4 class="mb-4 pb-3 border-bottom">Apply Card</h4>
            <form class="">
                <div class="d-flex align-items-start justify-content-between flex-wrap select-card-type mb-4 py-3">
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
                    <a href="#"  class="cap_btn large_btn mt-1" @click="$parent.innerDivOfTeamCard = 2">Invite User</a> 
                </div>
                <div class="userList" >
                    <div class="head-sec mb-2 pb-2 border-bottom d-flex align-items-center justify-content-between">
                        <h4 class="mb-0">Users List</h4>
                        <div class="form-group position-relative searchTable mb-0 mt-3 mt-sm-0">
                            <input type="text" placeholder="Search..." class="form-control"/>
                            <span class="searchIco">
                                <feather type="search" />
                            </span>
                        </div>
                    </div>

                    <div class="body-sec" v-if="getSubUsers.length > 0 && !pageLoader">
                        <div class="item-wrap d-flex align-items-center" v-for="list in getSubUsersFun()">
                            <label class="customRadioButton d-flex">
                                <input type="radio" name="user" v-model="user" :value="list" />
                                <span class="checkmark"></span>
                            </label>
                            <div class="img-wrap">
                                <img class="img-fluid" src="/assets/website/images/userimg.png" alt="user image">
                            </div>
                            <div class="content-sec">
                                <h5 class="medium mb-0">{{list.username}}</h5> 
                                <p class="medium mb-0">{{list.email}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="body-sec" v-else>
                         <div class="noDataWrap">
                            <img class="img-fluid" src="/assets/website/images/no-data.png" alt="Icon">
                            <p>No Existing User</p>
                        </div>
                    </div>
                    <div class="dis-sec pt-3" v-if="Object.keys(user).length > 0 != ''">
                        <h6 class="mb-1">Disclaimer:</h6>
                        <p class="mb-0">By proceeding, you acknowledge that the selected user will be assigned as the cardholder for the virtual debit card. The cardholder is required to complete the know Your Customer (KYC) process as mandated by regulatory requirements.</p>
                    </div>
                </div>

                <!-- <RouterLink  class="cap_btn large_btn mt-1 fixBtn" to="/confirm-existing-user" :class="(user != '') ? '' : 'disabled'" @click="sendInvites()">Proceed</RouterLink> -->

                <a href="#"  class="cap_btn large_btn mt-1 fixBtn" :class="(Object.keys(user).length > 0) ? '' : 'disabled'" @click="sendInvites()" v-if="Object.keys(user).length > 0 != ''">Proceed</a>
            </form>
        </div>
    </div>

</template>

<!-- <script src=""></script> -->
<script>
    import settingsMixins from "@/plugins/settings";
  import { cardsMixins } from "@/plugins/cards";
  import { Form, Field, ErrorMessage } from "vee-validate";
  export default {
    name: "step-four",
    mixins: [cardsMixins,settingsMixins],
    data() {
      return {
        div: 1,
        cardType: 'team',
        pageLoader: false,
        user : {},
        role : 'TC',
      };
    },
    components: { Form, Field, ErrorMessage },
   
    methods: {
        reset(){

        },
        sendInvites(){
            const _that = this
            let input_json = {
                'globalParams': {
                    "first_name": _that.user.username ,

                    "last_name": _that.user.username ,
                    "email": _that.user.email ,
                    "role" : _that.role ,
                    "custom_msg": '' ,
                    "type": "role"
                },
                'localParams': {
                  "parameter": _that, 'page' : 'team_card_send_invite_user_list'
                }
            }
            _that._runSendInvites(input_json)
        },
        getSubUsersFun(){
            let arradyData = []
            for(let i=0 ; i<=this.getSubUsers.length-1 ;  i++){
              // if(parseInt(this.getSubUsers[i].role_id) !== 9){
                arradyData.push(this.getSubUsers[i])
              // }
              if(i == this.getSubUsers.length-1){
                return arradyData ;
              }
            }
      },
        userList(){
            let input_json = {
              'globalParams': {
                "filter": {
                    "excluded_role": "8,9,11"
                }
              },
              'localParams': { "parameter": this }
            }
            this._runGetSubUsers(input_json)
        },
    },
    created(){
        this.userList()
    }
  };
</script>
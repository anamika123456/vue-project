<template>
  <div class="accountSetting bg-white round-sm">
    <loader v-if="pageLoader"></loader>
    <h4 class="mb-0 mb-3 pb-3 border-bottom">Payment Methods</h4>
    <div class="pt-0 pt-sm-3">
      <p class="mb-3 medium themecolor">Saved Bank Accounts</p>
      <div class="d-block d-sm-flex align-items-center justify-content-between lightgrayBG round-sm p-3 mb-4" v-for="(list,index) in getBankDataFunc('active_banks')">
        <div class="d-block d-sm-flex align-items-center">
          <div class="bankaccountLogos mb-2 mb-sm-0">
            <img src="/assets/website/images/bankIcon.svg" alt="bank Icon" class="d-block" width="28" height="29" />
          </div>
          <h6 class="mb-0 pl-0 pl-sm-3">Bank {{index+1}} | {{list.bank_name}} ({{list.account_no.substring(0, 2)}}XXXX{{list.account_no.substring(list.account_no.length - 2)}})</h6>
        </div>
        <div class="d-flex align-items-center bankaccountContent pt-2 pt-sm-0">
          <div class="primaryBorderDouble px-3 round-lg lightbluebg medium mr-3 mr-sm-4" v-if="parseInt(list.is_primary) == 1">Primary</div>
          <div class="primaryBorderDouble px-3 round-lg lightbluebg medium mr-3 mr-sm-4" v-if="parseInt(list.is_primary) == 0" @click="makePrimaryFunc(list)">Make Primary</div>
          <a href="javascript:void(0)" class="d-block" data-toggle="modal" data-target="#bank-delete-confirmation" @click.prevent="deleteBank = list">
            <feather type="trash-2" size="17px" class="red d-block"></feather>
          </a>
        </div>
      </div>
      <a href="javascript:void(0);" class="cap_btn large_btn align-items-center" data-toggle="modal" data-target="#add-payment-method" @click.prevent="addBankModal = !addBankModal">
        <feather type="plus" size="20px"></feather>
        <span class="pl-3">Add a payment method</span>
      </a>
      <div class="d-block d-sm-flex align-items-center justify-content-between lightgrayBG round-sm p-3 mt-3 mt-sm-4" v-for="(list,index) in getBankDataFunc('inactive_banks')">
        <div class="d-block d-sm-flex align-items-center">
          <div class="bankaccountLogos mb-2 mb-sm-0">
            <img src="/assets/website/images/bankIcon.svg" alt="bank Icon" class="d-block" width="28" height="29" />
          </div>
          <h6 class="mb-0 pl-0 pl-sm-3">Bank {{index+1}} | {{list.bank_name}} ({{list.account_no.substring(0, 2)}}XXXX{{list.account_no.substring(list.account_no.length - 2)}})</h6>
        </div>
        <div class="d-flex align-items-center bankaccountContent pt-2 pt-sm-0">
          <div class="lightredbg px-4 px-sm-5 py-1 py-sm-2 round-lg">
            <span class="red medium">Cancel</span>
          </div>
        </div>
      </div>
      <div class="d-block d-sm-flex align-items-center justify-content-between lightgrayBG round-sm p-3 mt-3 mt-sm-4" v-for="(list,index) in getBankDataFunc('pending_banks')" >
        <div class="d-block d-sm-flex align-items-center">
          <div class="bankaccountLogos mb-2 mb-sm-0">
            <img src="/assets/website/images/bankIcon.svg" alt="bank Icon" class="d-block" width="28" height="29" />
          </div>
          <h6 class="mb-0 pl-0 pl-sm-3">Bank {{index+1}} | {{list.bank_name}} ({{list.account_no.substring(0, 2)}}XXXX{{list.account_no.substring(list.account_no.length - 2)}})</h6>
        </div>
        <div class="d-flex align-items-center bankaccountContent pt-2 pt-sm-0">
          <a href="javascript:void(0);" class="lightyellowbg px-3 py-2 round-lg text-center" @click="viewTicket(list.ticket)">
            <span class="yellow">Pending</span>
          </a>
        </div>
      </div>
      <div class="modal" id="add-payment-method" tabindex="-1" role="dialog" aria-labelledby="add-payment-method" aria-hidden="true" v-if="addBankModal">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header border-0">
              <div class="modal-title">
                <h3 class="text-left mb-0">Add New Payment Method</h3>
              </div>
              <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="addBankModal = false">
                <feather type="x" size="22px"></feather>
              </a>
            </div>
            <div class="modal-body pt-0">
              <add-bank :pageNameData="'settings'"></add-bank>
            </div>
          </div>
        </div>
      </div>

      <div class="modal" id="bank-delete-confirmation" tabindex="-1" role="dialog" aria-labelledby="bank-delete-confirmation" aria-hidden="true" v-if="Object.keys(deleteBank).length > 0">
          <div class="modal-dialog modal-dialog-centered modal-md" role="document">
            <div class="modal-content">
              <div class="modal-header border-0">
                <div class="modal-title">
                  <h5 class="text-center mb-0 mx-auto">Delete Payment Method</h5>
                </div>
                <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="deleteBank = {}">
                  <feather type="x" size="22px"></feather>
                </a>
              </div>
              <div class="modal-body pt-0">
                <div class="mb-4">
                  <img src="/assets/website/images/google-authenticator.png" alt="Google Authentication" class="d-block m-auto" width="96" height="96" />
                  <h6 class="themecolor mt-4 mb-0 text-center">Google Authentication Code</h6>
                </div>
                  <app-delete-bank :bankData="deleteBank" :pageNameData="'bankList'"></app-delete-bank>
              </div>
           </div>
          </div>
      </div>

      <!-- <div class="modal" id="bank-account-details" tabindex="-1" role="dialog" aria-labelledby="bank-account-details" aria-hidden="true" v-if="Object.keys(editBank).length > 0">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header border-0">
                <div class="modal-title">
                  <h5 class="text-left mb-0">Update Payment Detail</h5>
                </div>
                <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="editBank = {}">
                  <feather type="x" size="22px"></feather>
                </a>
              </div>
              <div class="modal-body pt-0">
                  <app-edit-bank :bankData="editBank" :pageNameData="'bankList'"></app-edit-bank>
              </div>
           </div>
          </div>
      </div> -->
    </div>
  </div>
</template>
<script>
  import settingsMixins from "@/plugins/settings";
  import addBank from "./bank/add-bank.vue";
  import appDeleteBank from "./bank/delete-bank.vue";
  // import appEditBank from "./bank/edit-bank.vue";
  export default {
    name: "accountprofile",
    mixins: [settingsMixins],
    data(){
        return {
            addBankModal : false,
             pageLoader: false,
            page : '1',
            pageLimit : '10',
            deleteBank : {},
            editBank : {}
        }
    },
    components: {
        addBank,appDeleteBank
    },
    methods: {
      getBankDataFunc(getData){
        let arradyData = [];
        if(parseInt(this.getBankData.totalRecords) > 0){
          for(let i=0 ; i<=this.getBankData.records.length-1 ;  i++){
            if(getData == 'active_banks' && parseInt(this.getBankData.records[i].status) == 1){
              arradyData.push(this.getBankData.records[i])
            }

            if(getData == 'inactive_banks' && parseInt(this.getBankData.records[i].status) == 3){
               arradyData.push(this.getBankData.records[i])
            }

            if(getData == 'pending_banks' && parseInt(this.getBankData.records[i].status) == 0 ){
               arradyData.push(this.getBankData.records[i])
            }
            if(i == this.getBankData.records.length-1){
              return arradyData ;
            }
          }
        }else{

        }
      },
      viewTicket(listId){
          this.$router.push({name: 'view' , query: { 'id':listId}})
      },
      makePrimaryFunc(getData){
        let json = {
          globalParams: {
            "bank_id": getData.id
          },
          localParams: { parameter: this },
        }
        this._runBankAsPrimary(json);
      },
      listing() {
          let json = {
              globalParams: {
                  "filter": {},
                  "sort": [],
                  "search": "",
                  "page": this.page,
                  "perPage": this.pageLimit
              },
              localParams: { parameter: this },
          }
          this._runGetBankDetails(json);
      }
    },
    created(){
      this.listing()
    }
  };
</script>
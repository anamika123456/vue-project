<template>
  <div>
    <div class="modal" tabindex="-1" id="otp-verification" role="dialog" aria-labelledby="otp-verification" aria-hidden="true" v-if="trans_id != ''" style="">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content googleAuthenticationModal">
          <Form @submit="submit()" ref="regform">
          <div class="modal-header border-0 d-block text-right">
            <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="showInnerTopic = 3 ; trans_id = ''">
              <feather type="x" size="22px"></feather>
            </a>
          </div>
          <div class="modal-body pt-0">
            <div class="mb-4">
              <img src="/assets/website/images/google-authenticator.png" alt="Google Authentication" class="d-block m-auto" width="96" height="96" />
              <h6 class="themecolor mt-4 mb-0 text-center">Google Authentication Code</h6>
            </div>
            <div class="mb-4">
              <div class="form-group">
                <div class="position-relative">
                  <Field type="text" placeholder="Enter 2FA Code"  class="form-control" id="" name="otp" rules="required|min:6|numeric" v-model="otp"  />
                  <ErrorMessage name="otp" class="text-danger" />
                </div>
              </div>
            </div>
            <!-- <p class="mt-4 mb-0 text-center">OTP not received? <a href="javascript:void(0);" class="mb-0 greylink" @click="resendOtp()">Resend</a></p> -->
          </div>
          <div class="modal-footer justify-content-center pt-4 border-0">
            <input type="submit" class="cap_btn large_btn mb-0"  data-target="#otp-verification-successful-message" data-toggle="modal" value="Submit" :class="pageLoader ? 'disabled' : ''" />
          </div>
        </Form>
        </div>
      </div>
    </div>
    <section class="mid_scroll_content"> 
      <!-- <alert-notification v-if="notification_msg != ''" /> -->
      <loader v-if="pageLoader" />
      <div class="pageContent border-0 helpCentre">
        <h3 class="mb-0 py-3 text-center">How Can We Help You Today?</h3>
        <div class="mt-2 mt-md-4">
          <div class="text-center">
            <ul class="defaultTab d-inline-flex justify-content-center align-items-center">
              <li>
                <a href="javascript:void(0);" class="links" :class="[{'active':showTopic == false}]" @click.prevent="showTopic = false">Support </a>
              </li>
              <li>
                <a href="javascript:void(0);" class="links" :class="[{'active':showTopic == true}]" @click.prevent="showTopic = true ; showInnerTopic = 1" >Create Ticket</a>
              </li>
            </ul>
          </div>

          <div v-if="showTopic == false">
            <div class="row mt-3 mt-md-5 justify-content-center">
              <div class="col-12 col-xxl-11">
                <div class="row">
                  <div class="col-12 col-md-6">
                    <div class="bg-white border round-sm py-3 py-md-4 px-3 px-md-4 mb-3 mb-md-0">
                      <div class="d-block d-lg-flex align-items-center justify-content-between helpCentreHeading">
                        <h3 class="mb-3 mb-lg-0">Tickets</h3>
                        <div class="d-flex align-items-center border round-sm bg-white searchTable">
                          <a href="javascript:void(0)" class="d-block border-0 ml-2 ml-sm-3">
                            <feather size="20px" type="search" class="textcolor d-block"></feather>
                          </a>
                          <input type="text" class="form-control border-0 pr-3 py-0" placeholder="Search Tickets.." v-model="searchTicket" />
                        </div>
                      </div>
                      <div class="pt-3 pt-md-4">
                        <div id="tabs" class="text-center mb-0 walletTab currencyTab pb-0">
                          <ul class="d-flex align-items-center m-0">
                            <li>
                              <a class="d-block" href="javascript:void(0)" :class="[{'active':ticketsTab == 0}]" @click.prevent="ticketsTab = 0">Open</a>
                            </li>
                            <li>
                              <a class="d-block" href="javascript:void(0)" :class="[{'active':ticketsTab == 3}]" @click.prevent="ticketsTab = 3">Closed</a>
                            </li>
                          </ul>
                          
                        </div>
                        <div class="ticket-data-wrapper">
                          <ticket-list />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-6"> 
                    <div class="bg-white border round-sm py-3 py-md-4 px-3 px-md-4 " v-if="faqslist.length > 0">
                      <h3 class="mb-0 helpCentreHeading d-flex align-items-center">Top Questions</h3>
                      <div class="helpCentreBox pr-3 scrollbar">
                        <a :href="'https://www.capitalwallet.com/help-and-support?tab='+value.catSlug" class="d-flex justify-content-between border-bottom helpCentreBoxLink" v-for="value,key in faqslistFunc()" :key="key" :val="value" target="_blank">
                          <span class="medium mr-4">{{value.articleSlug}}</span>
                          <feather size="22px" type="chevron-right" class="textcolor d-block helpCentreBoxArrow"></feather>
                        </a>
                      </div> 
                      <a href="https://www.capitalwallet.com/help-and-support" target="_blank" class="cap_btn large_btn mt-4 helpTopicsBtn">Browse Help Topics</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="showTopic == true">
            <div v-if="ticketReasonList != '' && (showInnerTopic == 1 || showInnerTopic == 2)">
              <div class="col-12 col-xl-11 mt-2 mt-sm-0">
                <a href="javascript:void(0);" class="d-flex align-items-center" v-if="showInnerTopic == 2" @click="showInnerTopic = 1"><img src="/assets/website/images/leftGreyIcon.svg" width="25" height="10" class="d-block"><h6 class="medium textcolor ml-2 mb-0">Back</h6></a>
                <div class="row" v-if="ticketReasonList != '' && showInnerTopic == 1">  
                  <div v-for="list in ticketReasonListFunc()" class="col-12 col-sm-6 col-lg-4" v-show="parseInt(list.is_support) == 1"> 
                    <a href="javascript:void(0)" v-on:click="changeDiv(1,list)" class="bg-white round-md d-block text-center py-4 helpTopicBox mt-4">
                      <span class="d-flex justify-content-center">
                        <span class="maskedIcon" :class="icons[list.id]"></span>
                      </span>
                      <h5 class="mb-0 pt-3">{{list.title}}</h5>
                    </a>
                  </div>
                </div>
                <ul class="row" v-if="ticketReasonList != '' && showInnerTopic == 2">  
                  <div v-for="list in ticketReasonList[innerListData.id].categories" class="col-12 col-sm-6 col-lg-4" v-show="parseInt(list.is_support) == 1">
                    <a href="javascript:void(0)" v-on:click="changeDiv(2,list)" class="bg-white round-md d-block text-center py-4 helpTopicBox mt-4">
                      <h5 class="mb-0">{{list.title}}</h5>
                    </a>
                  </div>
                </ul>
              </div>
            </div>
            <div class="row justify-content-center mt-3" v-if="ticketReasonList != '' && showInnerTopic == 3">
              <div class="col-12 col-md-10 col-md-7 col-xl-6">
                <Form  id="formRequest" @submit="submitNow()" ref="regform" class="mt-0 mt-sm-4">
                  <div class="bg-white border round-sm p-3 p-lg-5">
                    <h3 class="text-center mb-3 mb-sm-4 mb-lg-5">Contact Us </h3>
                    <div class="form-group">
                      <label class="labeltext">Category</label>
                      <Field type="text" class="form-control" id="" name="category"  v-model="category" rules="required" disabled/>
                    </div>
                    <div class="form-group" v-if="innerListData.id != 7">
                      <label class="labeltext">Sub Category</label>
                      <Field type="text" class="form-control" id="" name="sub_category"  v-model="sub_category" rules="required" disabled/>
                    </div>
                    <div class="form-group">
                      <label class="labeltext">Message</label>
                      <textarea class="form-control" placeholder="Your Message"  id="" name="message"  v-model="message" rules="required"></textarea>
                      <ErrorMessage name="message" class="text-danger" />
                    </div>
                    <div class="form-group">
                      <label class="labeltext">Supportive</label>
                      <!-- <Field type="text" name="document" rules="required" /> -->
                      <div class="form-control-file" v-if="document_proof_array.document.length == 0">
                        <Field type="file" name="document" id="document"  :rules="{required : validateDoc() }" @change="onFileChange('document', $event.target.files[0])" />

                        <label for="file">
                          <img src="/assets/website/images/uploadIcon.svg" alt="Upload Icon" class="d-block" width="31" height="35" />
                          <span>Add File</span>
                          <p>No File Chosen</p>
                        </label>
                      </div>
                      <ErrorMessage name="document" class="text-danger" v-if="document_proof_array.document.length == 0" />
                      <div class="linerUpload d-flex align-items-center mb-3" v-if="document_proof_array.document.length > 0">
                        <span class="nameIco"><feather class="mr-2" type="file"></feather>
                        <span>{{document_proof_array.document[0].name}}</span>
                        </span>
                        <a href="#" class="closeBtn" @click="clearDoc('document')"><feather type="x" size="20px"></feather></a>
                      </div>
                    </div>
                    <div class="d-flex mt-3 mt-md-0 justify-content-center">
                      <!-- <a href="javascript:void(0);" class="cap_btn large_btn" data-target="#otp-verification" data-toggle="modal"></a> -->
                      <button class="cap_btn large_btn border-0 mb-0">Submit</button> 
                      <a href="javascript:void(0);" class="cap_btn large_btn border-btn ml-2 ml-md-3 mb-0" @click="(innerListData.id == 7) ? reset(1) :  reset(2)">Back</a>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { supportMixins } from "@/plugins/support";
import profileRequest from "./services/profile_request.vue";
import ticketList from "./ticket-list.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  name: "SERVICES",
  mixins: [supportMixins],
  data() {
    return {
      showInnerTopic : 1,
      innerListData : {},
      document_proof_array : {'document' : []},
      category : '',
      sub_category : '',
      message : '',
      trans_id : '',
      otp : '',
      searchTicket : '',
      icons : { 1 : 'myProfileImg', 2 : 'depositImg', 3 : 'accountSettingsImg', 4 : 'withdrawalsImg', 5 : 'conversionsImg', 6 : 'reportsImg', 7 : 'othersImg' },
      pageLoader: false,
      ticketsTab: "0",
      searchReasons: "",
      allowSearch: false,
      showTopic: false ,
      showDiv: "1",
      docsValidationObject : {1:11, 3:22}
    };
  },
  components: {
    appProfile: profileRequest,
    ticketList, Form, Field, ErrorMessage 
  },
  computed: {
    allReasons() {
      let allList = [];
      for (const index in this.ticketData[-1]) {
        let list = this.ticketData[-1][index];
        if (
          parseInt(
            this.ticketReasonList && this.ticketReasonList[list].status
          ) == 1 &&
          parseInt(this.ticketReasonList[list].tickets) == 1 &&
          list != "16" &&
          this.ticketReasonList[list].categories
        ) {
          allList = allList.concat(
            Object.values(this.ticketReasonList[list].categories)
          );
        }
      }
      return allList.filter(
        (val) =>
          val.title.toLowerCase().includes(this.searchReasons.toLowerCase()) ||
          this.searchReasons.toLowerCase().includes(val.title.toLowerCase())
      );
    },
  },
  methods: {
    reset(showInnerTopic){
      this.showInnerTopic = showInnerTopic
      this.document_proof_array = {'document' : []}
      this.sub_category = ''
      this.message = ''
      this.otp = ''
    },
    validateDoc() {
      if (this.docsValidationObject.hasOwnProperty(parseInt(this.innerListData.id)) && this.docsValidationObject[parseInt(this.innerListData.id)] == this.innerListData.subCat[0].id) {
        return true;
      }else{
        return false ;
      }
    },
    changeDiv(getData,list){
      if(getData == 1){
        this.innerListData = list
        if(list.id == 7){
          this.showInnerTopic = 3
          this.innerListData['subCat'] = []
          this.innerListData['subCat'].push(list)
          this.category = this.innerListData.title
          this.sub_category = this.innerListData.subCat[0].title
        }else{
          this.showInnerTopic = 2 
        }
      }else if(getData == 2){
        this.showInnerTopic = 3 
        this.innerListData['subCat'] = []
        this.innerListData['subCat'].push(list)
        this.category = this.innerListData.title
        this.sub_category = this.innerListData.subCat[0].title
      }
    },
    faqslistFunc(){
      let arrayData =[
        {
          'articleSlug' : 'What is a crypto payment gateway?',
          'catSlug' : 'General FAQ'
        },
        {
          'articleSlug' : 'How do I integrate Capital Wallet’s crypto payment gateway with my website?',
          'catSlug' : 'API Setup and Integration'
        },
        {
          'articleSlug' : 'What is Crypto Invoicing?',
          'catSlug' : 'Crypto Invoicing'
        },
        {
          'articleSlug' : 'What is Capital Wallet’s shopping cart plugin?',
          'catSlug' : 'Shopping Cart Plugins'
        },
        {
          'articleSlug' : 'What are Crypto-Backed Virtual Cards?',
          'catSlug' : 'Crypto Virtual Cards'
        }
      ];
      return arrayData ;
      // let arrayData = [];
      // for(let i= 0 ; i<= 4 ; i++){
      //   arrayData.push(this.faqslist[i])
      //   if(i== 4){
      //     return arrayData ;
      //   }
      // }
    },
    clearDoc(getdocType){
      this.document_proof_array[getdocType] = []
    },
    ticketReasonListFunc(){
      let count = 0 , arrayData = []; 
      // console.log(this.ticketReasonList)
      for(var key in this.ticketReasonList){
        count++
        // console.log('ticketReasonList[key]== ',key, this.ticketReasonList[key])
        if(parseInt(this.ticketReasonList[key].is_support) == 1){
          arrayData.push(this.ticketReasonList[key])
        }

        if(count == Object.keys(this.ticketReasonList).length){
          return arrayData ;
        }
      }
    },
    onFileChange(getdocType , file) {
      this.document_proof_array[getdocType].push({
          'file':file,
          'name':file.name
      })
      // document.getElementById(getdocType).value = ''
    },
    submitNow() {
      const _that = this;
      let form_name = new FormData(); 
      let document = (_that.document_proof_array.document.length > 0) ? _that.document_proof_array.document[0].file : []
      form_name.append("subject", _that.sub_category);
      form_name.append("text", _that.message);
      form_name.append("reason", _that.innerListData.id.toString());
      form_name.append("reason_text", _that.innerListData.title);
      form_name.append("title", _that.innerListData.subCat[0].id.toString());
      form_name.append("title_text", _that.innerListData.subCat[0].title);
      form_name.append("document", document)
      let input_json={
        'globalParams' :{
            'form' : form_name
        },
        'localParams' :{ "parameter" : _that , 'type' :'form'  }
      }
      _that._runTicketRequestOtp(input_json)
    },
    resendOtp(){
      if(this.pageLoader){return;}
      let input_json={
        'globalParams' :{
          'trans_id' : this.trans_id.toString()
        },
        'localParams' :{ "parameter" : this }
      }
      this._runTicketResendOtp(input_json)
    },
    submit(){
      if(this.pageLoader){return;}
      const _that = this
      let input_json={
        'globalParams' :{
            'otp' :  _that.otp.toString(), 
            'trans_id' : _that.trans_id.toString()
        },
        'localParams' :{ "parameter" : _that}
      }
      _that._runTicketCheckOtp(input_json)
    }
  },
  mounted() {
    const _that = this;
    $(document).on("click", function (event) {
      if (!$(event.target).closest(".searchReasons").length) {
        _that.allowSearch = false;
      }
    });
  },
  created() {
    let sendData = {
      'globalParams':{},
      'localParams':{'parameter':this}
    }
    this._runGetFaqsList(sendData)

    if(this.$route.query.ticketData && this.$route.query.innerData){
      let ticketData = this.$route.query.ticketData ;
      let innerData = this.$route.query.innerData ;
      this.$router.replace({query: ""});
      this.showTopic = true
      this.innerListData = this.ticketReasonList[parseInt(ticketData)]
      this.changeDiv(2,this.innerListData.categories[parseInt(innerData)])
    }else if (this.$route.query.ticketData){
      let ticketData = this.$route.query.ticketData ;
      this.$router.replace({query: ""});
      if (parseInt(ticketData) == 1) {
        let innerData = {};
        this.showTopic = true
        this.innerListData = this.ticketReasonList[parseInt(ticketData)]
        this.changeDiv(2,this.innerListData.categories[10])
      } 
    }
  },
};
</script>
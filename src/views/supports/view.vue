<template>
  <section class="mid_scroll_content"> {{upateFunc}}
    <loader v-if="pageLoader && !$parent.ticketUpdate"></loader>
    <alert-notification v-if="notification_msg != ''" />
    <div class="pageContent border-0" v-if="ticketView != ''">
      <router-link to="/help-centre" class="d-flex align-items-center">
        <img src="/assets/website/images/leftGreyIcon.svg" alt="left Grey Icon" class="d-block" width="25" height="10" />
        <p class="mb-0 pl-2">Back</p>
      </router-link>
      <div class="mt-3">
        <div class="d-flex justify-content-between p-3 borderbg round-md rounded-bottom-0 flex-column-reverse flex-lg-row">
          <div class="d-block">
            <div class="d-block d-md-flex align-items-center">
              <!-- <h5 class="mb-0 pt-2 pt-md-0"  v-if="parseInt(ticketView.ticket[0].title) !== 0"><span  v-for="list in ticketReasonList[ticketView.ticket[0].reason].categories" v-if="list.id == ticketView.ticket[0].title">{{list.title}}</span></h5> -->
              <h5 class="mb-0 pt-2 pt-md-0">{{ticketReasonList[parseInt(ticketView.ticket[0].reason)].title}}</h5>
              <h6 class="d-inline-block mb-0 ml-0 ml-md-3 bg-white round-lg px-3 py-2 my-2 my-md-0 word-break">#{{ticketView.ticket[0].ticketnumber}}</h6>
            </div>
            <div class="d-flex pt-1 pt-xl-2 align-items-center">
              <img src="/assets/website/images/calendarIcon.svg" alt="calendar icon" class="d-block" width="20" height="22" />
              <p class="mb-0 ml-2 ml-xl-3 lh-normal">{{dateFunction(ticketView.ticket[0].created)}}</p>
            </div>
          </div>
          <div class="d-block">
            <span href="javascript:void(0);" class="d-inline-block greenBG round-lg px-4 py-1" v-if="ticketView.ticket && parseInt(ticketView.ticket[0].status) != 3">Open</span>
            <span href="javascript:void(0);" class="d-inline-block redBG round-lg px-4 py-1" v-else>Close</span>
            <!-- <a :href="'data:'+imageType+';base64,'+imageSrc" target="_blank()" v-if="imageType != ''"> <img :src="'data:'+imageType+';base64,'+imageSrc"> </a> -->
          </div>
        </div>
        <div class="bg-white p-3 borderbg round-md rounded-top-0 messageMainBox scrollbar" v-chat-scroll>
          <div class="messageBox me">
            <div class="messageMainData">
              <div class="messageData">
              <p v-html="ticketView.ticket[0].comment" class="mb-0 pt-0 themecolor"></p>
              </div>
              <p class="mb-0">{{dateFunction(ticketView.ticket[0].created)}}</p>
            </div>
            <div class="messageAvatar">
               <span class="profileImg text-white d-flex align-items-center secondaryBG justify-content-center rounded-circle f-14" v-if="get_user.username != '' &&  get_user.username != null">{{ usernameSplitFunc(get_user.username)}}</span>
            </div>
          </div>
          <div v-for="(ticketThread,index) in ticketView.threads">
            <div class="messageBox others " v-if="parseInt(ticketThread.ticket_updatedby) == 1">
              <div class="messageAvatar">
                <div class="rounded-circle messageAvatarIcon d-flex align-items-center justify-content-center">
                  <span class="profileImg text-white d-flex align-items-center secondaryBG justify-content-center rounded-circle f-14"><img src="/assets/website/images/userIconWhite.svg" alt="" width="18" height="19" /></span>
                </div>
              </div>
              <div class="messageMainData">
                <div class="messageData">
                  <p v-if="ticketThread.message != '' && ticketThread.docs.length == 0"  v-html="ticketThread.message" class="mb-0 pt-0"></p>
                  <div class="midScale" v-for="ticketThreadDoc in ticketThread.docs" :class="parseInt(ticketThreadDoc.status) == 2? 'greenClass11': parseInt(ticketThreadDoc.status) == 1? 'redClass11': 'pendingClass11'">
                    <div class="attached_msg d-flex align-items-center justify-content-between">
                      <p class="completeStatus greenBG">Approved</p>
                      <p class="completeStatus redBG">declined</p>
                      <p class="completeStatus yellowBG">Pending</p>
                      <a href="javascript:void(0);"  @click="viewTicketDoc(envFile.VITE_APP_API_BASE_URL+envFile.VITE_docsLink1 + 'user&id=' + ticketView.ticket[0].user_id + '&doc=' + ticketThreadDoc.document)"  class="contract_link"  v-if=" parseInt(ticketView.ticket[0].reason) == 1 &&  parseInt(ticketView.ticket[0].title) == 15">
                        <span class="fileText">
                          <feather type="file-text"></feather>
                        </span>
                        <span class="tikStatus"> {{ticketThreadDoc.document_name}}</span>
                        
                        <span class="clickIcon">
                          <feather type="eye"></feather>
                        </span>
                        <span class="tikStatus">{{ticketThread.message}}</span>
                      </a>
                      <a href="javascript:void(0);"  @click="viewTicketDoc(envFile.VITE_APP_API_BASE_URL+envFile.VITE_docsLink1 + 'ticket&id=' + ticketView.ticket[0].user_id + '&doc=' + ticketThreadDoc.document)"  class="contract_link"  v-else>
                        <span class="fileText">
                          <feather type="file-text"></feather>
                        </span>
                        <span class="tikStatus">{{ticketThreadDoc.document_name}}</span>
                        <span class="clickIcon">
                          <feather type="eye"></feather>
                        </span>
                        <span class="tikStatus">{{ticketThread.message}}</span>
                      </a>
                    </div>
                    <div class="ticketThreadDoc" v-if="
                        parseInt(ticketView.ticket[0].reason) != 1 &&
                        parseInt(ticketView.ticket[0].title) != 15
                      ">
                      <p v-if="ticketThreadDoc.msg != '' && parseInt(ticketThreadDoc.status) == 1">{{ticketThreadDoc.msg}}</p>
                    </div>
                  </div>
                </div>
                <p class="mb-0">{{dateFunction(ticketThread.created)}}</p>
              </div>
            </div>
            <div class="messageBox me  " v-if="parseInt(ticketThread.ticket_updatedby) == 0">
              <div class="messageMainData">
                <div class="messageData">
                  <p class="themecolor" v-if="ticketThread.message != '' && ticketThread.docs.length == 0" v-html="ticketThread.message"></p>
                  <div class="midScale" v-for="ticketThreadDoc in ticketThread.docs" :class="parseInt(ticketThreadDoc.status) == 2? 'greenClass11': parseInt(ticketThreadDoc.status) == 1? 'redClass11': 'pendingClass11'">
                    <div class="attached_msg d-flex align-items-center justify-content-between">
                      <p class="completeStatus greenBG">Approved</p>
                      <p class="completeStatus redBG">Declined</p>
                      <p class="completeStatus yellowBG">Pending</p>
                      
                      <a href="javascript:void(0);"  @click="viewTicketDoc(envFile.VITE_APP_API_BASE_URL+envFile.VITE_docsLink1 + 'user&id=' + ticketView.ticket[0].user_id + '&doc=' + ticketThreadDoc.document)" class="contract_link"  v-if="  parseInt(ticketView.ticket[0].reason) == 1 &&  parseInt(ticketView.ticket[0].title) == 15">
                        <span class="fileText">
                          <feather type="file-text"></feather>
                        </span>
                        
                        <span class="tikStatus">{{ticketThreadDoc.document_name}}</span>
                        
                        <span class="clickIcon">
                          <feather type="eye"></feather>
                        </span>
                        <span class="tikStatus">{{ticketThread.message}}</span>
                      </a>
                      <a href="javascript:void(0);"  @click="viewTicketDoc(envFile.VITE_APP_API_BASE_URL+envFile.VITE_docsLink1 + 'ticket&id='+ticketView.ticket[0].user_id+'&doc='+ticketThreadDoc.document)" class="contract_link"  v-else>
                        <span class="fileText">
                          <feather type="file-text"></feather>
                        </span>
                        <span class="tikStatus">{{ticketThreadDoc.document_name}}</span>
                        <span class="clickIcon">
                          <feather type="eye"></feather>
                        </span>
                        <span class="tikStatus">{{ticketThread.message}}</span>
                      </a>
                    </div>
                    <div class="ticketThreadDoc" v-if="
                        parseInt(ticketView.ticket[0].reason) != 1 &&
                        parseInt(ticketView.ticket[0].title) != 15
                      ">
                      <p v-if="ticketThreadDoc.msg != '' && parseInt(ticketThreadDoc.status) == 1">{{ticketThreadDoc.msg}}</p>
                    </div>
                  </div>
                </div>
                <p class="mb-0"> {{dateFunction(ticketThread.created)}}</p>
              </div>
              <div class="messageAvatar">
                
                 <span class="profileImg text-white d-flex align-items-center secondaryBG justify-content-center rounded-circle f-12" v-if="get_user.username != '' &&  get_user.username != null">{{ usernameSplitFunc(get_user.username)}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white p-3 round-md mt-3 d-flex" v-if="ticketView.ticket && parseInt(ticketView.ticket[0].status) != 3">
          <form action="" method="post" enctype="multipart/form-data" id="TicketReplyForm" v-on:submit.prevent="submitNow()" class="w-100 position-relative">
            <div class="showOnclick gooeyMenu" v-if="setUpFxaccount">
              <div class="uploadShowMenu" :class="setUpFxaccount?'active':' '">
                <ul class="listAnimated " :class="setUpFxaccount?'setUpFxaccount':' '">
                  <li class="bt1" v-for="val in fileNames">
                    <div class="sptIcon">
                      <feather size="16px" type="upload"></feather>
                    </div>
                    <div class="upload-btn-wrapper" @click="docType = val.type; $refs.file.click()">
                      <a class="btn" href="#" @click="docType = val">{{val.value}}</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="position-relative">
              <div class="showDocument p-2 mb-4 round-sm" v-if="document != ''">
                <div class="showDocument-group">
                  <div class="ftIco">
                    <feather type="file"></feather>
                  </div>
                  <p class="m-0">{{document}}
                    <feather class="closeIt" type="x" @click="clear_doc()"></feather>
                  </p>
                  <span class="sizeSM">2.14kb</span>
                </div>
              </div>
              <div class="upload-btn-wrapper" v-else>
                <div class="input_msg_write_btn d-flex align-items-center" v-if="parseInt(ticketView.ticket[0].reason) == 1 && parseInt(ticketView.ticket[0].title) == 15">
                  <div class="uploadGooey" :class="setUpFxaccount?'active':' '" >   
                    <a @click="setUpFxaccount = !setUpFxaccount" href="#">
                      <feather class="addIB" type="plus"></feather> 
                      <feather class="closeIB" type="x"></feather> 
                    </a>
                  </div>
                </div>
                <a href="javascript:void(0);" class="d-flex align-items-center" @click="$refs.file.click()" v-else>
                  <feather type="paperclip" size="24px" class="pr-2 textcolor"></feather>
                  <p class="mb-0">Attach File</p>
                </a>
              </div>
              <div class="upload-btn-wrapper">
                <input type="file" name="document" style="display:none" id="docfile" ref="file" @change="onFileChange($event.target.name, $event.target.files)" />
              </div>
              <!-- <span class="alert alert-danger position-absolute erroMT" v-if="submitted">Please fill atleast one field</span> -->
              <input type="hidden" name="ticket_id" :value="ticketView.ticket[0].id">
              <div class="mr-2 w-100 messageArea mb-3 pl-0">
                <textarea class="form-control border-0 w-100 pt-0 pb-0 pl-0" placeholder="Write your message.." v-model="text" name="message"></textarea>
              </div>              
            </div>
            <div class="d-block mt-2 mt-md-0">
              <input type="submit" value="Send" class="d-block cap_btn small_btn">
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import {
    supportMixins
  } from "@/plugins/support";
  import moment from "moment";
  export default {
    name: "View-TICKET",
    mixins: [supportMixins],
    data() {
      return {
        //============message and loader ===========
        response_msg: "",
        msg_type: "",
        pageLoader: false,
        submitted: false,
        notification_msg: "",
        notification_type: "",
        type_ticket_detail: false,
        setUpFxaccount: false,
        submit: false,
        loaderFuncRun: "1",
        //update_id : '',
        //==========================================
        document: "",
        invidual_file: {},
        frontBackOption: false,
        config: {
          events: {
            initialized: function() {
              // console.log("initialized");
            },
          },
        },
        model: "Edit Your Content Here!",
        text: "",
        docType: "",
        fileNames: [{
          name: "incorporation_proof",
          value: "Incorporation Proof",
          type: "incorporation_proof"
        }, {
          name: "shareholder_proof",
          value: "Shareholder Proof",
          type: "shareholder_proof",
        }, {
          name: "representative_identification_proof",
          value: "Representative Identification Proof",
          type: "representative_identification_proof",
        }, {
          name: "representative_address_proof",
          value: "Representative Address Proof",
          type: "representative_address_proof",
        }, {
          name: "representative_authorisation_letter",
          value: "Representative Authorisation Letter",
          type: "representative_authorisation_letter",
        }, {
          name: "beneficial_identification_proof",
          value: "Beneficial Identification Proof",
          type: "beneficial_identification_proof",
        }, {
          name: "beneficial_address_proof",
          value: "Beneficial Address Proof",
          type: "beneficial_address_proof",
        }, {
          name: "beneficial_address_proof",
          value: "Beneficial Address Proof",
          type: "beneficial_address_proof",
        }, {
          name: "additional_doc_1",
          value: "Additional Doc",
          type: "additional_doc_1",
        } ],

        imageType: '',
        imageSrc: '',
      };
    },
    computed: {
      upateFunc() {
        if (this.$parent.ticketUpdate == true) {
          this.ticketDetail();
        }
      },
    },
    methods: {
      blobToImage(imageType, imageSrc){
            if(imageType == 'application/pdf'){         
                let byteCharacters = atob(imageSrc); // Decode Base64
                let byteNumbers = new Uint8Array(byteCharacters.length);

                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                let pdfBlob = new Blob([byteNumbers], { type: imageType });
                let pdfUrl = URL.createObjectURL(pdfBlob);
                window.open(pdfUrl); // Opens PDF in a new tab
            }else{
                var image = new Image();
                image.src = 'data:'+imageType+';base64,' + imageSrc;

                var w = window.open("");
                w.document.write(image.outerHTML);
            }
      },
      viewTicketDoc(getDocLink){
        // this.blobToImage()
        let input_json = {
          globalParams: {},
          localParams: {
            parameter: this, getDocLink: getDocLink, link: getDocLink
          },
        };
        this._runGetTicketDoc(input_json);
      },
      clear_doc() {
        this.document = "";
        document.getElementById("docfile").value = "";
      },
      clear() {
        this.document = "";
        document.getElementById("docfile").value = "";
        this.invidual_file = {};
        this.text = "";
        this.docType = "";
        this.setUpFxaccount = false;
        this.submitted = false;
      },
      dateFunction(getDate) {
        let last_seen_date = moment(getDate).fromNow();
        return last_seen_date;
      },
      ticketDetail() {
        let input_json = {
          globalParams: {
            ticket_id: this.$route.query.id,
          },
          localParams: {
            parameter: this
          },
        };
        this._runGetTicketDetail(input_json);
      },
      onFileChange(fieldName, file) {
        // console.log('fieldName, file==> ',fieldName, file)
        this.document = file[0].name ;
        this.setUpFxaccount = false ;
        if (parseInt(this.ticketView.ticket[0].reason) == 1 && parseInt(this.ticketView.ticket[0].title) == 15) {
          this.invidual_file["file"] = file[0];
          this.invidual_file["name"] = file[0].name;
          this.invidual_file["fileName"] =  this.docType ;
        }
      },
      submitNow() {
        if (this.pageLoader) {
          return;
        }
        const _that = this;
        let TicketReplyForm = document.getElementById("TicketReplyForm");
        let form_name = new FormData(TicketReplyForm);
        //&& parseInt(_that.get_user.lead_type) == 0
        // console.log('_that.invidual_file===> ',_that.invidual_file)
        if (parseInt(_that.ticketView.ticket[0].reason) == 1 && parseInt(_that.ticketView.ticket[0].title) == 15  && this.document != "") {
          form_name = new FormData();
          form_name.append("document", _that.invidual_file.file, _that.docType.fileName + "." + _that.invidual_file.name.split(".")[_that.invidual_file.name.split(".").length - 1]);
          form_name.append("documenttype", 'Registration');
          form_name.append("documentname", _that.docType);
          form_name.append("message", _that.text);
          form_name.append("ticket_id", _that.ticketView.ticket[0].id);
          form_name.append("type", "user");
        }
        let input_json = {
          globalParams: {
            form: form_name,
          },
          localParams: {
            parameter: _that,
            type: "form",
            tick_id: _that.ticketView.ticket[0].id,
          },
        };
        // console.log(input_json)
        _that._runTicketReply(input_json);
      },
    },
    created() {
      this._runGetTicketReasonList({
        globalParams: {},
        localParams: {
          parameter: this
        },
      });
      this.ticketDetail();
    },
    mounted() {
      // const _that = this;
      // $(document).on("click", function(event) {
      //   if (!$(event.target).closest(".setUpFxaccount").length) {
      //     _that.setUpFxaccount = false;
      //   }
      // });
    },
  };
</script>
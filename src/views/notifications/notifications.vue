<template>
  <div>
    <loader v-if="pageLoader"></loader>
    <!-- <div  v-html="word" >
                  
                </div> -->
    <div class="mid_scroll_content">
      <div class="pageContent">
        <div class="border round-sm bg-white" v-if="!pageLoader && notificationList.totalRecords && notificationList.totalRecords > 0">
          <div class="notificationsRow d-flex align-items-start" v-for="(list,index) in notificationList.records">
            <span class="d-flex justify-content-center align-items-center text-white">{{ usernameSplitFunc(get_user.username)}}</span> 
            <div class="ml-3" > 
                <h6 class="mb-0 themecolor regular"  >
                  <div  v-html="list.msg"  ></div>
                  <!-- <a href="javascript:void(0);" class="semibold">CW Team</a> has replied to ticket number <a href="javascript:void(0);" class="semibold">#127549336</a> -->
                </h6>
              <p class="mb-0 medium">{{ dateFunction(list.created_at) }} | {{list.type.split('_').join(' ')}}</p>
            </div>
          </div>
          <!-- <div class="notificationsRow d-flex align-items-start unreadMessage">
            <span class="d-flex justify-content-center align-items-center text-white">J</span>
            <div class="ml-3">
              <h6 class="mb-0 themecolor regular">
                <a href="javascript:void(0);" class="semibold">Congratulations!</a> Your account is being verified now
              </h6>
              <p class="mb-0 medium">1 day ago | Account Verification</p>
            </div>
          </div>
          <div class="notificationsRow d-flex align-items-start unreadMessage">
            <span class="d-flex justify-content-center align-items-center text-white">J</span>
            <div class="ml-3">
              <h6 class="mb-0 themecolor regular">You have received a payment from <a href="javascript:void(0);" class="semibold">Clarissa Sanoe</a>
              </h6>
              <p class="mb-0 medium">2 days ago | Payments</p>
            </div>
          </div>
          <div class="notificationsRow d-flex align-items-start">
            <span class="d-flex justify-content-center align-items-center text-white">J</span>
            <div class="ml-3">
              <h6 class="mb-0 themecolor regular">
                <a href="javascript:void(0);" class="semibold">Congratulations!</a> Your payout request is approved
              </h6>
              <p class="mb-0 medium">2 days ago | Payouts</p>
            </div>
          </div>
          <div class="notificationsRow d-flex align-items-start">
            <span class="d-flex justify-content-center align-items-center text-white">J</span>
            <div class="ml-3">
              <h6 class="mb-0 themecolor regular">
                <a href="javascript:void(0);" class="semibold">CW Team</a> has requested for <a href="javascript:void(0);" class="semibold">withdrawal</a> of 0.02 BTC
              </h6>
              <p class="mb-0 medium">2 days ago | Create Withdrawal</p>
            </div>
          </div>
          <div class="notificationsRow d-flex align-items-start">
            <span class="d-flex justify-content-center align-items-center text-white">J</span>
            <div class="ml-3">
              <h6 class="mb-0 themecolor regular">Request To Add Wallets/Networks : <a href="javascript:void(0);" class="semibold">BTC, Ticket ID-50</a>
              </h6>
              <p class="mb-0 medium">2 days ago | Support Ticket</p>
            </div>
          </div>
          <div class="notificationsRow d-flex align-items-start">
            <span class="d-flex justify-content-center align-items-center text-white">J</span>
            <div class="ml-3">
              <h6 class="mb-0 themecolor regular">You You updated your <a href="javascript:void(0);" class="semibold">Bank Details</a>
              </h6>
              <p class="mb-0 medium">2 days ago | Bank Account</p>
            </div>
          </div>
          <div class="notificationsRow d-flex align-items-start">
            <span class="d-flex justify-content-center align-items-center text-white">J</span>
            <div class="ml-3">
              <h6 class="mb-0 themecolor regular">
                <a href="javascript:void(0);" class="semibold">CW Team</a> has replied to ticket number <a href="javascript:void(0);" class="semibold">#1273489651</a>
              </h6>
              <p class="mb-0 medium">2 days ago | Bank Account</p>
            </div>
          </div>
          <div class="notificationsRow d-flex align-items-start">
            <span class="d-flex justify-content-center align-items-center text-white">J</span>
            <div class="ml-3">
              <h6 class="mb-0 themecolor regular">
                <a href="javascript:void(0);" class="semibold">CW Team</a> has replied to ticket number <a href="javascript:void(0);" class="semibold">#127549651</a>
              </h6>
              <p class="mb-0 medium">3 days ago | Support Ticket</p>
            </div>
          </div>
          <div class="notificationsRow d-flex align-items-start">
            <span class="d-flex justify-content-center align-items-center text-white">J</span>
            <div class="ml-3">
              <h6 class="mb-0 themecolor regular">
                <a href="javascript:void(0);" class="semibold">Congratulations!</a> Your account is being verified now
              </h6>
              <p class="mb-0 medium">3 days ago | Account Verification</p>
            </div>
          </div> -->
          <!-- <div class="pagination d-block d-sm-flex justify-content-end align-items-center m-3">
            <div class="d-flex align-items-center paginationPage">
              <p class="f-14 themecolor medium mb-0">Page 1 of 30</p>
              <div class="selectmenu tableselectmenu position-relative bg-white ml-2 ml-lg-3 my-1">
                <a @click.prevent="paginationmenu = true" href="javascript:void(0)" class="btn d-flex align-items-center p-0 border-0 textcolor">
                  <span class="mr-1 f-14">10 rows per page</span>
                  <feather type="chevron-down" size="16px"></feather>
                </a>
                <ul class="dropdown_menu pagination_menu dropdown_menu--animated dropdown_menu-6" :class="paginationmenu ? 'show' : ''">
                  <li @click="
                          paginationmenu = false;
                          $parent.pageLimit = 10;
                          $parent.listing();
                          ">
                    <a href="javascript:void(0)" class="textcolor">10 rows per page</a>
                  </li>
                  <li @click="
                          paginationmenu = false;
                          $parent.pageLimit = 50;
                          $parent.listing();
                          ">
                    <a href="javascript:void(0)" class="textcolor">50 rows per page</a>
                  </li>
                  <li @click="
                          paginationmenu = false;
                          $parent.pageLimit = 100;
                          $parent.listing();
                          ">
                    <a href="javascript:void(0)" class="textcolor">100 rows per page</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="d-flex ml-0 ml-sm-3 mt-3 mt-sm-0">
              <a href="javascript:void(0);" class="d-flex rounded paginationArrow themeBG justify-content-center align-items-center">
                <feather type="chevron-left" size="16" class="d-block text-white"></feather>
              </a>
              <a href="javascript:void(0);" class="d-flex rounded paginationArrow themeBG ml-2 justify-content-center align-items-center">
                <feather type="chevron-right" size="16" class="d-block text-white"></feather>
              </a>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { notificationsMixins } from '@/plugins/notifications'
  import svgRaw from '/assets/website/svg/google-logo.svg?raw'
  import moment from "moment";
  export default {
    name: "app-header",
    mixins: [ notificationsMixins],
    data() {
      return {
        pageLoader: false,
        pageLimit: "10",
        page: "1",
        svgRaw,
        word : '<span>test</span>'
      };
    },
    methods: {
      displayHtml(getHtml,getId){
//         alert(document.getElementById("myTable").rows[0].innerHTML;
//         const para = document.createElement("p");
// const node = document.createTextNode("This is new.");
// para.appendChild(node);

// const element = document.getElementById("one");
// const child = document.getElementById(getId);
// element.insertBefore(para, child);

        // console.log(getId, getHtml)
        // var tag_id = document.getElementById(getId);
        //  console.log('2221',tag_id)
        //  var newNode = document.createElement('p');
        // // console.log('222',tag_id.innerHTML)
        // tag_id.value = getHtml;
        // return ;
        // setTimeout(myGreeting, 5000);
        // var tag_id = document.getElementById(getId);
// var newNode = document.createElement('p');
// newNode.appendChild(document.createTextNode(getHtml));
      },
      
      listing(){
        this._runGetNotificationList({ globalParams: {}, localParams: { parameter: this } });
      },
      dateFunction(getDate) {
        let last_seen_date = moment(getDate).fromNow();
        return last_seen_date;
      },
    },
    created(){
      this.listing();
    }
  };
</script>
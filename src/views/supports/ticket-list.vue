<template>
  <div>
    <loader v-if="pageLoader"></loader>
    <div class="helpCentreScroll mt-4 pr-3 scrollbar" v-if="ticketList != '' && ticketList.totalRecords > 0">
      <div class="py-4 border-bottom" v-for="(list, index) in ticketList.records" v-show="ticketReasonList[list.reason] && ticketReasonList[list.reason] != undefined && ticketReasonList[list.reason] != NULL">
        <div class="d-flex justify-content-between align-items-lg-start align-items-stretch flex-column-reverse flex-lg-row" @click="viewTicket(list.id)" v-if="ticketReasonList[list.reason] && ticketReasonList[list.reason] != undefined && ticketReasonList[list.reason] != NULL">
          <div class="d-flex align-items-start">   
            <a href="javascript:void(0);" class="medium themecolor" >{{ ticketReasonList[list.reason].title }} 
              <span v-if="ticketReasonList[list.reason].categories && ticketReasonList[list.reason].categories[list.title]">: {{ ticketReasonList[list.reason].categories[list.title].title }}</span>
            </a>
            <!-- <a href="javascript:void(0);" class="medium themecolor" v-else>-</a> -->
          </div>
          <div class="d-flex align-items-center justify-content-end" >
            <p class="textcolor mb-0 d-block">{{ fromNow(list.created) }}</p>
          </div>
        </div>
        <div class="pt-2 d-flex align-items-center" v-if="ticketReasonList[list.reason] && ticketReasonList[list.reason] != undefined && ticketReasonList[list.reason] != NULL">
          <span href="javascript:void(0);" class="primaryBorderDouble d-flex py-1 px-3 align-items-center round-lg">
            <p class="mb-0 themecolor medium ticketListText">#{{ list.ticket }}</p>
            <a href="javascript:void(0);" class="d-block themecolor" @click="handleCopy(list.ticket, 'The ticket Number has been copied')">
              <feather type="copy" size="17px" class="ml-1 d-block"></feather>
            </a>
        </span>
        </div>
      </div>
    </div> 
    <pagination :totalRecords="ticketList.totalRecords" :limit="pageLimit" :pageNo="page" v-if="ticketList.totalRecords > 0" class="border-top-0 mt-4" />
      <div class="helpCentreNoData" v-else>
        <no-data />
      </div>
  </div>
</template>
<script>
  import {
    supportMixins
  } from "@/plugins/support";
  import moment from "moment";
  export default {
    name: "OPEN-TICKET",
    mixins: [supportMixins],
    data() {
      return {
        //===========prop in loader component=======
        col_span: 4,
        //============message and loader ===========
        response_msg: "",
        msg_type: "",
        pageLoader: false,
        notification_msg: "",
        notification_type: "",
        loaderFuncRun: "1",
        //==========================================
        page: "1",
        search: "",
        pageLimit: "10",
      };
    },
    props: ["pageLim"],
    watch: {
      "$parent.ticketsTab"(val) {
        this.listing();
      },
      "$parent.searchTicket"(val) {
        this.search = val;
        this.listing();
      },
    },
    methods: {
      viewTicket(listId) {
        this.$router.push({
          name: "view",
          query: {
            id: listId
          }
        });
      },
      fromNow(val) {
        return moment(val).fromNow();
      },

      listing() {
        let input_json = {
          globalParams: {
            filter: {},
            sort: [],
            search: this.search,
            page: this.page,
            perPage: parseInt(this.pageLimit),
            status: this.$parent.ticketsTab.toString(),
          },
          localParams: {
            parameter: this,
            loaderFuncRun: this.loaderFuncRun
          },
        };
        this._runGetTicketList(input_json);
      },
    },
    created() {
      this.listing();
    },
  };
</script>
<template>
  <div>
    <!-- <loader v-if="pageLoader"></loader> -->
    <div class="mid_scroll_content">
      <div class="pageContent">
        <div class="border round-sm bg-white">
          <div class="table-responsive scrollbar">
            <table class="table table-bordered tablecustomWidth">
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody v-if="Object.keys(activityList).length > 0 && activityList.records.length > 0 && !pageLoader">
                <tr class="activityRow "  :class="(parseInt(val.is_read) == 0) ? 'unreadActivity' : ''" v-for="(val, index) in activityList.records">
                  <td >
                    <div class="d-flex align-items-start" v-if="val.data.type == 'LOGIN'">
                      <span class="d-flex justify-content-center align-items-center text-white">{{ usernameSplitFunc(val.username)}}</span>
                      <div class="ml-3">
                        <h6 class="mb-0 themecolor regular">
                          <a href="javascript:void(0);" class="semibold">{{val.username}}</a> <label v-if="val.roles != undefined">({{$env_var.user_roles[val.roles]}})</label> logged in
                        </h6>
                        <p class="mb-0 pt-1 medium">From IP: {{val.ip}}</p>
                      </div>
                    </div>
                    <div class="d-flex align-items-start" v-else-if="val.data.type == 'ADDRESS_GENERATION'">
                      <span class="d-flex justify-content-center align-items-center text-white">{{ usernameSplitFunc(val.username)}}</span>
                      <div class="ml-3">
                        <h6 class="mb-0 themecolor regular">
                          <a href="javascript:void(0);" class="semibold">{{val.username}}</a> <label v-if="val.roles != undefined">({{$env_var.user_roles[val.roles]}})</label> has generated deposit address : {{ val.data.address.address.substring(1, 6) }}......{{ val.data.address.address.substring(val.data.address.address.length - 6)}}
                        </h6>
                        <!-- <p class="mb-0 pt-1 medium">From IP: {{val.ip}}</p> -->
                      </div>
                    </div>
                    <div class="d-flex align-items-start" v-else-if="val.data.type == 'WITHDRAWAL_REQUEST'">
                      <span class="d-flex justify-content-center align-items-center text-white">{{ usernameSplitFunc(val.username)}}</span>
                      <div class="ml-3">
                        <h6 class="mb-0 themecolor regular">
                          <a href="javascript:void(0);" class="semibold">{{val.username}}</a> <label v-if="val.roles != undefined">({{$env_var.user_roles[val.roles]}})</label> has requested for withdrawal of {{ val.data.amount}} {{ val.data.currency}}
                        </h6>
                        <!-- <p class="mb-0 pt-1 medium">From IP: {{val.ip}}</p> -->
                      </div>
                    </div>
                    <div class="d-flex align-items-start" v-else>
                      <span class="d-flex justify-content-center align-items-center text-white">CW</span>
                      <div class="ml-3">
                        <h6 class="mb-0 themecolor regular">
                          <a href="javascript:void(0);" class="semibold">{{ usernameSplitFunc(val.username)}} Team</a> 
                        </h6>
                        <p class="mb-0 pt-1 medium">From IP: {{val.ip}}</p>
                      </div>
                    </div>
                  </td>
                  <td>{{momentFunc(val.created,"DD-MM-YYYY, h:mm:ss a")}} ({{ dateFunction(val.created) }})<!--14-02-2024, 1:26:09 GMT-8--></td>
                </tr>
               <!--  <tr class="activityRow">
                  <td>
                    <div class="d-flex align-items-center">
                      <span class="d-flex justify-content-center align-items-center text-white">CW</span>
                      <div class="ml-3">
                        <h6 class="mb-0 themecolor regular">
                          <a href="javascript:void(0);" class="semibold">CW Team</a> has requested for <a href="javascript:void(0);" class="semibold">withdrawal</a> of 0.02 BTC
                        </h6>
                      </div>
                    </div>
                  </td>
                  <td>14-02-2024, 1:26:09 GMT-8</td>
                </tr>
                <tr class="activityRow">
                  <td>
                    <div class="d-flex align-items-center">
                      <span class="d-flex justify-content-center align-items-center text-white">CW</span>
                      <div class="ml-3">
                        <h6 class="mb-0 themecolor regular">
                          <a href="javascript:void(0);" class="semibold">CW Team</a> has replied to ticket number <a href="javascript:void(0);" class="semibold">#1273489651</a>
                        </h6>
                      </div>
                    </div>
                  </td>
                  <td>14-02-2024, 1:26:09 GMT-8</td>
                </tr> -->
              </tbody>
              <table-loader :pageloader_value="pageLoader" :type="'table'" :colspan="'2'" :listLength="activityList.totalRecords" v-else></table-loader>
            </table>
          </div>
          <pagination class="m-3" :totalRecords="activityList.totalRecords" :limit="pageLimit" :pageNo="page" v-if="'totalRecords' in activityList && activityList.totalRecords > 10 "></pagination>
          <!-- <div class="pagination d-block d-sm-flex justify-content-end p-4 border-top align-items-center">
            <div class="d-flex align-items-center paginationPage">
              <p class="f-14 themecolor medium mb-0">Page 1 of 20 </p>
              <div class="selectDropMenu paginationDropMenu position-relative bg-white ml-2 ml-lg-3">
                <a href="javascript:void(0)" class="btn d-flex align-items-center p-0 border-0 textcolor selectDropMenuLink" data-toggle="dropdown">
                  <span class="mr-1 f-14">10 rows per page</span>
                  <feather type="chevron-down" size="16px"></feather>
                </a>
                <ul class="dropdown-menu scrollbar">
                  <li @click="paginationmenu = false; $parent.pageLimit = 10; $parent.listing();">
                    <a href="javascript:void(0)" class="textcolor">10 rows per page</a>
                  </li>
                  <li @click="paginationmenu = false; $parent.pageLimit = 50; $parent.listing();">
                    <a href="javascript:void(0)" class="textcolor">50 rows per page</a>
                  </li>
                  <li @click="paginationmenu = false; $parent.pageLimit = 100; $parent.listing();">
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
  export default {
    name: "app-header",
    mixins: [ notificationsMixins],
    data() {
      return {
        pageLoader: false,
        pageLimit: "10",
        page: "1",
      };
    },
    methods: {
      listing(getData){
        let json = { globalParams: { "page" : this.page, "perPage" : parseInt(this.pageLimit)}, localParams: { parameter: this } }
        this._runGetActivityList(json);
        if(getData == 'calling_from_mark_as_read'){
          json.localParams.calling_from = getData
        }
      },
      markAsRead(getIdArray){
        this._runMarkActivityAsRead({ globalParams: {  "_ids" : getIdArray }, localParams: { parameter: this } });
      },
    },
    created(){
      this.listing();
    }
  };
</script>
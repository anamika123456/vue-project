<template>
  <div class="accountSetting bg-white round-sm">
    <loader v-if="pageLoader"></loader>
    <div class="d-flex align-items-center mb-3 pb-3 border-bottom">
      <h4 class="mb-0">Device Manager</h4>
      <a href="javascript:void(0);" class="ml-2 d-block">
        <feather type="info" size="16px" class="d-block textcolor" data-toggle="tooltip" data-placement="top" title="List of all devices from which you have logged in"></feather>
      </a>
    </div>

    <div class="p-3 p-sm-4 lightredbg d-block d-sm-flex mt-4 round-sm">
      <div class="pr-4">
        <feather type="alert-triangle" size="30px" class="red d-block"></feather>
      </div>
      
      <p class="mb-0 red d-block pt-2 pt-sm-0 medium">By adding one or more IP Address to the list, you will be allowed to place orders or withdraw funds from those mentioned address. If you wish to add or remove an IP Address, you need to have the Two Factor Authentication (2FA) enabled as well as providing the authenticator code before submitting for changes.</p>
    </div>
    <div class="d-block d-sm-flex justify-content-between align-items-center pt-4 pt-md-5">
      <h6 class="mb-0 pb-2 pb-md-0">Whitelisted IP Address</h6>
      
      <a href="javascript:void(0);" class="cap_btn large_btn d-inline-flex align-items-center mb-0" data-toggle="modal" data-target="#device-manager-add-ip-address" @click="addIP = true">
        <feather type="plus" size="20px"></feather>
        <span class="pl-1 pl-lg-2 medium">New IP Address</span>
      </a>
    </div>
    <div class="table-responsive mt-4 mt-lg-5">
      <table class="table table-striped border round-sm tablecustomWidth mb-0">
            <thead>
              <tr>
                <th class="themecolor semibold">IP Address</th>
                <th class="themecolor semibold">Added On</th>
                <th class="themecolor semibold">Recent Activity</th>
                <th class="themecolor semibold">Actions</th>
              </tr>
            </thead>
            <tbody v-if="Object.keys(getIPDetails).length > 0 && getIPDetails.totalRecords > 0 && !pageLoader">
              <tr v-for="(list,index) in getIPDetails.records" >
                <td>{{list.ip_address}}</td>
                <td>{{momentFunc(list.created, "DD-MM-YYYY, h:mm:ss a")}}</td>
                <td>{{momentFunc(list.recent_activity, "DD-MM-YYYY, h:mm:ss a")}}</td>
                <td>
                  <a href="javascript:void(0)" class="d-block"  @click.prevent="deleteIp = list"  data-toggle="modal" data-target="#ip-delete-confirmation">
                      <feather type="x" size="17px" class=" d-block"></feather>
                  </a>
                </td>
              </tr>
            </tbody>
            <table-loader :pageloader_value="pageLoader" :type="'table'" :colspan="'4'" :listLength="getIPDetails.totalRecords" v-else></table-loader>
      </table>
    </div>

    <div class="modal" id="ip-delete-confirmation" tabindex="-1" role="dialog" aria-labelledby="ip-delete-confirmation" aria-hidden="true" v-if="Object.keys(deleteIp).length > 0">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <delete-device :ipData="deleteIp"></delete-device>
          </div>
      </div>


      <div class="modal" tabindex="-1" id="device-manager-add-ip-address" role="dialog" aria-labelledby="device-manager-add-ip-address" aria-hidden="true" v-if="addIP">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <add-device ></add-device>
        </div>
      </div>
  </div>
</template>
<script>
  import settingsMixins from "@/plugins/settings";
  import addDevice from "./deviceManager/add-device.vue";
  import deleteDevice from "./deviceManager/delete-device.vue";
  export default {
    name: "accountprofile",
    mixins: [settingsMixins],
    data() {
      return {
        pageLoader: false,
        page : '1',
        pageLimit : '10',
        deleteIp : {},
        addIP : false
      };
    },
    components: {
        addDevice,deleteDevice
    },
    methods: {
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
          this._runGetIPDetails(json);
      }
    },
    created() {
      this.listing()
    }
  };
</script>

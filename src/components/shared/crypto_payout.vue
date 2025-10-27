<template>
  <div class="p-4 bg-white round-sm">
    <div id="tabs" class="text-center mb-0 walletTab currencyTab">
      <ul class="d-flex align-items-center m-0">
        <li>
          <a
            class="d-block"
            href="javascript:void(0)"
            :class="[{ active: cryptopayouttab == 1 }]"
            @click.prevent="cryptopayouttab = 1"
            >Manual Payout</a
          >
        </li>
        <li>
          <a
            class="d-block"
            href="javascript:void(0)"
            :class="[{ active: cryptopayouttab == 2 }]"
            @click.prevent="cryptopayouttab = 2"
            >Scheduled Payout</a
          >
        </li>
      </ul>
    </div>

    <div v-if="cryptopayouttab == 1">
      <div class="d-flex justify-content-end">
        <a
          href="javascript:void(0);"
          class="cap_btn large_btn align-items-center"
          data-toggle="modal"
          data-target="#add-new-payout-address-manual"
        >
          <feather type="plus" size="20px"></feather>
          <span class="pl-3">New Payout Address</span>
        </a>
      </div>
      <table class="table table-bordered border round-sm mt-5">
        <thead class="lightregentbluebg">
          <tr>
            <th>Currency</th>
            <th>Label</th>
            <th>Address</th>
            <th>Status</th>
            <th>Schedule</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span class="d-flex align-items-center">
                <span class="inTableIcon mr-3 w-auto">
                  <img
                    src="/assets/website/images/crypto_logos/btc.png"
                    width="35"
                    height="35"
                  />
                </span>
                <div class="iqlName">
                  <h5 class="mb-0 themecolor mb-1">BTC</h5>
                  <p class="mb-0 regular lh-normal">Bitcoin</p>
                </div>
              </span>
            </td>
            <td>Jorge Clo</td>
            <td>
              <p>33qoecVfu6Qyw4MDLzZJyDLXJBfuy7893NK</p>
            </td>
            <td>
              <div class="lightgreenbg px-3 py-2 round-lg text-center">
                <span class="lightgreentext">Active</span>
              </div>
            </td>
            <td>Weekly</td>
            <td>
              <div class="d-flex align-items-center">
                <a
                  href="javascript:void(0)"
                  class="d-block mr-3"
                  data-toggle="modal"
                  data-target="#edit-payout-address-manual"
                >
                  <feather
                    type="edit-2"
                    size="17px"
                    class="themecolor d-block"
                  ></feather>
                </a>
                <a href="javascript:void(0)" class="d-block">
                  <feather
                    type="trash-2"
                    size="17px"
                    class="themecolor d-block"
                  ></feather>
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <span class="d-flex align-items-center">
                <span class="inTableIcon mr-3 w-auto">
                  <img
                    src="/assets/website/images/crypto_logos/btc.png"
                    width="35"
                    height="35"
                  />
                </span>
                <div class="iqlName">
                  <h5 class="mb-0 themecolor mb-1">BTC</h5>
                  <p class="mb-0 regular lh-normal">Bitcoin</p>
                </div>
              </span>
            </td>
            <td>Jorge Clo</td>
            <td>
              <p>33qoecVfu6Qyw4MDLzZJyDLXJBfuy7893NK</p>
            </td>
            <td>
              <div class="lightgreenbg px-3 py-2 round-lg text-center">
                <span class="lightgreentext">Active</span>
              </div>
            </td>
            <td>Weekly</td>
            <td>
              <div class="d-flex align-items-center">
                <a
                  href="javascript:void(0)"
                  class="d-block mr-3"
                  data-toggle="modal"
                  data-target="#edit-payout-address-manual"
                >
                  <feather
                    type="edit-2"
                    size="17px"
                    class="themecolor d-block"
                  ></feather>
                </a>
                <a href="javascript:void(0)" class="d-block">
                  <feather
                    type="trash-2"
                    size="17px"
                    class="themecolor d-block"
                  ></feather>
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <span class="d-flex align-items-center">
                <span class="inTableIcon mr-3 w-auto">
                  <img
                    src="/assets/website/images/crypto_logos/btc.png"
                    width="35"
                    height="35"
                  />
                </span>
                <div class="iqlName">
                  <h5 class="mb-0 themecolor mb-1">BTC</h5>
                  <p class="mb-0 regular lh-normal">Bitcoin</p>
                </div>
              </span>
            </td>
            <td>Jorge Clo</td>
            <td>
              <p>33qoecVfu6Qyw4MDLzZJyDLXJBfuy7893NK</p>
            </td>
            <td>
              <div class="lightgreenbg px-3 py-2 round-lg text-center">
                <span class="lightgreentext">Active</span>
              </div>
            </td>
            <td>Weekly</td>
            <td>
              <div class="d-flex align-items-center">
                <a
                  href="javascript:void(0)"
                  class="d-block mr-3"
                  data-toggle="modal"
                  data-target="#edit-payout-address-manual"
                >
                  <feather
                    type="edit-2"
                    size="17px"
                    class="themecolor d-block"
                  ></feather>
                </a>
                <a href="javascript:void(0)" class="d-block">
                  <feather
                    type="trash-2"
                    size="17px"
                    class="themecolor d-block"
                  ></feather>
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="cryptopayouttab == 2">
      <div class="d-flex justify-content-end">
        <a
          href="javascript:void(0);"
          class="cap_btn large_btn align-items-center"
          data-toggle="modal"
          data-target="#add-new-payout-address-scheduled"
        >
          <feather type="plus" size="20px"></feather>
          <span class="pl-3">New Payout Address</span>
        </a>
      </div>
      <table class="table table-bordered border round-sm mt-5">
        <thead class="lightregentbluebg">
          <tr>
            <th>Currency</th>
            <th>Label</th>
            <th>Address</th>
            <th>Status</th>
            <th>Schedule</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span class="d-flex align-items-center">
                <span class="inTableIcon mr-3 w-auto">
                  <img
                    src="/assets/website/images/crypto_logos/btc.png"
                    width="35"
                    height="35"
                  />
                </span>
                <div class="iqlName">
                  <h5 class="mb-0 themecolor mb-1">BTC</h5>
                  <p class="mb-0 regular lh-normal">Bitcoin</p>
                </div>
              </span>
            </td>
            <td>Jorge Clo</td>
            <td>
              <p>33qoecVfu6Qyw4MDLzZJyDLXJBfuy7893NK</p>
            </td>
            <td>
              <div class="lightgreenbg px-3 py-2 round-lg text-center">
                <span class="lightgreentext">Active</span>
              </div>
            </td>
            <td>Weekly</td>
            <td>
              <div class="d-flex align-items-center">
                <a
                  href="javascript:void(0)"
                  class="d-block mr-3"
                  data-toggle="modal"
                  data-target="#edit-payout-address-scheduled"
                >
                  <feather
                    type="edit-2"
                    size="17px"
                    class="themecolor d-block"
                  ></feather>
                </a>
                <a href="javascript:void(0)" class="d-block">
                  <feather
                    type="trash-2"
                    size="17px"
                    class="themecolor d-block"
                  ></feather>
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <span class="d-flex align-items-center">
                <span class="inTableIcon mr-3 w-auto">
                  <img
                    src="/assets/website/images/crypto_logos/btc.png"
                    width="35"
                    height="35"
                  />
                </span>
                <div class="iqlName">
                  <h5 class="mb-0 themecolor mb-1">BTC</h5>
                  <p class="mb-0 regular lh-normal">Bitcoin</p>
                </div>
              </span>
            </td>
            <td>Jorge Clo</td>
            <td>
              <p>33qoecVfu6Qyw4MDLzZJyDLXJBfuy7893NK</p>
            </td>
            <td>
              <div class="lightgreenbg px-3 py-2 round-lg text-center">
                <span class="lightgreentext">Active</span>
              </div>
            </td>
            <td>Weekly</td>
            <td>
              <div class="d-flex align-items-center">
                <a
                  href="javascript:void(0)"
                  class="d-block mr-3"
                  data-toggle="modal"
                  data-target="#edit-payout-address-scheduled"
                >
                  <feather
                    type="edit-2"
                    size="17px"
                    class="themecolor d-block"
                  ></feather>
                </a>
                <a href="javascript:void(0)" class="d-block">
                  <feather
                    type="trash-2"
                    size="17px"
                    class="themecolor d-block"
                  ></feather>
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <span class="d-flex align-items-center">
                <span class="inTableIcon mr-3 w-auto">
                  <img
                    src="/assets/website/images/crypto_logos/btc.png"
                    width="35"
                    height="35"
                  />
                </span>
                <div class="iqlName">
                  <h5 class="mb-0 themecolor mb-1">BTC</h5>
                  <p class="mb-0 regular lh-normal">Bitcoin</p>
                </div>
              </span>
            </td>
            <td>Jorge Clo</td>
            <td>
              <p>33qoecVfu6Qyw4MDLzZJyDLXJBfuy7893NK</p>
            </td>
            <td>
              <div class="lightgreenbg px-3 py-2 round-lg text-center">
                <span class="lightgreentext">Active</span>
              </div>
            </td>
            <td>Weekly</td>
            <td>
              <div class="d-flex align-items-center">
                <a
                  href="javascript:void(0)"
                  class="d-block mr-3"
                  data-toggle="modal"
                  data-target="#edit-payout-address-scheduled"
                >
                  <feather
                    type="edit-2"
                    size="17px"
                    class="themecolor d-block"
                  ></feather>
                </a>
                <a href="javascript:void(0)" class="d-block">
                  <feather
                    type="trash-2"
                    size="17px"
                    class="themecolor d-block"
                  ></feather>
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { registerStepsMixins } from "@/plugins/registerSteps";
import { commonAllmixins } from "@/plugins/commonAll";
import store from "@/store/store.js";
// import editAddress from './edit_Address'
// import editNumber from './edit_Number'
export default {
  name: "accountprofile",
  mixins: [registerStepsMixins, commonAllmixins],
  data() {
    return {
      notification_msg: "",
      notification_type: "",
      // tab: '1',
      submitted: false,
      // editAddress: false,
      // editNumber: false,
      fname: "",
      mName: "",
      lname: "",
      pageLoader: false,
      dob: "",
      address: "",
      city: "",
      state: "",
      country: "",
      area_code: "",
      acc_type: "",
      cryptopayouttab: 1,
      OrganizationType: {
        0: "Company",
        1: "Self Managed Super Fund",
        2: "Discretionary/Unit Trust",
        3: "Others",
      },
    };
  },
  components: {
    // editAddress,
    // editNumber
  },
  methods: {
    create_image(url, name) {
      var stx = this.stxx;
      var link = document.createElement("a");
      link.download = name;
      link.href = url;
      link.click();
    },
    ChangeTab(val) {
      this.tab = val;
      // this.editAddress = false
      // this.editNumber = false
      this.pageLoader = false;
    },
    Submit() {
      const _that = this;
      _that.submitted = true;
      _that.$validator.validate().then((valid) => {
        if (valid) {
          let input_json = {
            globalParams: {
              f_name: _that.fname,
              m_name: _that.mName,
              l_name: _that.lname,
              dob: _that.dob,
              Address: _that.address,
              City: _that.city,
              State: _that.state,
              Country: _that.country,
              Areacode: _that.area_code,
              Acc_type: _that.acc_type,
            },
            localParams: {
              parameter: _that,
            },
          };
        }
      });
    },
  },
  created() {
    this.pageName("Account Profile");
    this._runGetProfileInfo({
      globalParams: {},
      localParams: {
        parameter: this,
      },
    });
  },
};
</script>

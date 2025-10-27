<template>
  <div>
    <loader v-if="pageLoader"></loader>{{ profileDetails }} 
    <div v-if="Object.keys(getUserData).length > 0">
      <div class="d-flex align-items-center">
        <div class="pr-3">
          <span
            class="d-flex align-items-center rounded-circle text-white"
            v-if="get_user.username != '' && get_user.username != null"
            >{{ usernameSplitFunc(get_user.username) }}</span
          >
          <span v-else>{{ get_user.email.charAt(0) }}</span>
        </div>
        <div class="mb-0">
          <h6 class="mb-0 mb-md-1">{{  get_user.username }}</h6>
          <p class="mb-0">{{$env_var.user_roles[get_user.roles]}} Account</p>
        </div>
      </div>

      <div class="row pt-3 pt-md-5">
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label class="labeltext">Account Type</label>
            <input
              type="text"
              placeholder=""
              class="form-control"
              v-model="lead_type"
              disabled
            />
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label class="labeltext">User Name</label>
            <input
              type="text"
              class="form-control"
              v-model="userName"
              disabled
            />
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label class="labeltext">Email</label>
            <input
              type="text"
              placeholder=""
              class="form-control"
              v-model="email"
              disabled
            />
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label class="labeltext">Country of Incorporation</label>
            <!-- <v-select class="form-control" :options="Object.values(country)" :reduce="country => country.iso2"  v-model="registered_country" label="name" placeholder="" name="Country_Name"  disabled></v-select> -->

            <select
              class="form-control"
              v-model="registered_country"
              name="registered_country"
              disabled
            >
              <option :value="list.iso2" v-for="list in Object.values(country)">
                {{ list.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <!-- <div
        class="d-block d-md-flex justify-content-between align-items-center border-top pt-3 pt-md-4 mt-0 mt-md-4"
        v-if="parseInt(get_user.is_registered) == 5"
      >
        <p class="textcolor mb-0">
          If you want to edit your information, raise a ticket
          <router-link :to="{ name: 'help_centre', query: { ticketData: 1 }}" class="highlightlink" >here</router-link>
        </p>
         <div class="d-flex mt-3 mt-md-0">
          <a href="javascript:void(0);" class="cap_btn small_btn border-btn">Cancel</a>
          <a href="javascript:void(0);" class="cap_btn small_btn ml-2 ml-md-3">Save</a>
        </div> 
      </div> -->
    </div>
  </div>
</template>
<script>
import settingsMixins from "@/plugins/settings";
export default {
  name: "accountprofile",
  mixins: [settingsMixins],
  data() {
    return {
      pageLoader: false,
      userName: "",
      registered_country: "",
      email: "",
      lead_type: "",
    };
  },
  methods: {},
  computed: {
    profileDetails() {
      if (Object.keys(this.getUserData).length > 0) {
        this.userName = this.getUserData.username;
        this.registered_country = this.get_user.country;
        this.email = this.getUserData.email;
        this.lead_type =
          Object.keys(this.get_user).length > 0
            ? this.$env_var.lead_type[parseInt(this.get_user.lead_type)]
            : 0;
      }
    },
  },
  created() {},
};
</script>

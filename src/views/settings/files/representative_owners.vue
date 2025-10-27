<template>
  <div class="accountSetting bg-white round-sm">
    <h4 class="mb-3 pb-3 border-bottom">Representative Information</h4>
    <div class="row pt-0 pt-md-4">
      <div class="col-12 col-md-6">
        <div class="form-group">
          <label class="labeltext">First Name</label>
          <input
            type="text"
            placeholder=""
            class="form-control"
            v-model="first_name"
            disabled
          />
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="form-group">
          <label class="labeltext">Last Name</label>
          <input
            type="text"
            placeholder=""
            class="form-control"
            v-model="last_name"
            disabled
          />
        </div>
      </div>

      <div class="col-12 col-md-6">
        <div class="form-group">
          <label class="labeltext">DOB</label>
          <input
            type="text"
            placeholder=""
            class="form-control"
            v-model="dob"
            disabled
          />
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="form-group">
          <label class="labeltext">Nationality</label>
          <!-- <v-select class="form-control" :options="Object.values(country)" :reduce="country => country.iso2"  v-model="nationality" label="name" placeholder="" name="nationality"  disabled></v-select> -->

          <select
            class="form-control"
            v-model="nationality"
            name="nationality"
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
      class="d-flex align-items-center border-top pt-3 pt-md-4 mt-0 mt-md-4"
      v-if="parseInt(get_user.is_registered) == 5"
    >
      <p class="textcolor mb-0">
        If you want to edit your information, raise a ticket
        <router-link :to="{ name: 'help_centre', query: { ticketData: 1 }}" class="highlightlink" >here</router-link>
      </p>
    </div> -->
  </div>
</template>
<script>
import settingsMixins from "@/plugins/settings";
export default {
  name: "accountprofile",
  mixins: [settingsMixins],
  data() {
    return {
      first_name: "",
      last_name: "",
      dob: "",
      nationality: "",
    };
  },
  methods: {},
  created() {
    this.first_name = this.getUserData.representive.first_name;
    this.last_name = this.getUserData.representive.last_name;
    this.dob = this.momentFunc(this.getUserData.representive.dob, 'DD-MM-YYYY');
    this.nationality = this.getUserData.representive.nationality;
  },
};
</script>

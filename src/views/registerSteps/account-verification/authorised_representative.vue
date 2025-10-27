<template>
  <div class="verificationContent bg-white border round-md">
    <Form @submit="addRepresentative()" ref="regform">
      <h3 class="mb-3 mb-lg-4 semibold" v-if="parseInt(get_user.lead_type) == 1">Authorised Representative</h3>
      <h3 class="mb-3 mb-lg-4 semibold" v-if="parseInt(get_user.lead_type) == 2">Beneficial Owner(s)</h3>
      <loader v-if="pageLoader"></loader>
      <p class="border-bottom pb-3 pb-lg-4 mb-4 mb-lg-5"> Please insert the personal information of the Legal or Authorized Representative / Trustee of the Legal Entity. <br /> Disclaimer: By proceeding, you confirm that you are duly authorised to represent the Legal Entity for which you intend to register an account. </p>
      <div class="row">
        <div class="col-lg-12">
          <label class="labeltext">Name <span class="required">*</span>
          </label>
          <div class="row">
            <div class="col-lg-6">
              <div class="form-group">
                <Field type="text" class="form-control" id="" name="fname" placeholder="First Name" v-model="fname" rules="required" />
                <ErrorMessage name="fname" class="text-danger" />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <Field type="text" class="form-control" id="" name="lname" placeholder="Last Name" v-model="lname" rules="required" />
                <ErrorMessage name="lname" class="text-danger" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group" :class="nationality != '' ? 'active' : ''">
            <label class="labeltext">Nationality <span class="required">*</span>
            </label>
            <Field type="hidden" name="nationality" v-model="nationality" rules="required" />
            <v-select class="form-control" v-model="nationality" :options="Object.values(country)" :reduce="country => country.iso2" label="name" placeholder=" "></v-select>
            <ErrorMessage name="nationality" class="text-danger" />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label class="labeltext">Date Of Birth <span class="required">*</span>
            </label>
            <!--  <input class="form-control datepicker" type="date" v-model="dob" name="dob" v-validate="'required'" /><span v-show="submitted && errors.has('dob')" class="text-danger">The DOB is required</span><span v-if="submitted && !is_18()" class="text-danger">Age should be greater than 18 Years</span> -->
            <Field type="date" class="form-control datepicker" id="" name="dob" placeholder=" " v-model="dob" rules="required" :max="maxDate()" @focus="dateFocus = true" @blur="dateFocus = false" />
            <ErrorMessage name="dob" class="text-danger" />
          </div>
        </div>
      </div>

      <div class="col-lg-12" v-if="parseInt(get_user.lead_type) == 2">
        <div class="form-group">
          <div class="c_checkbox">
            <label class="customCheckbox mb-0"> Please also confirm  this user is authorised representative of the account.
              <!-- <Field type="checkbox" class="form-control" id="" name="confirmAccount" value="1" v-model="confirmAccount"  /> -->
              <!-- <ErrorMessage name="subscribe_for_updates" class="text-danger" /> -->

              <Field type="checkbox" class="form-control" id="" name="confirmAccount" value="1" v-model="confirmAccount" rules="required" />
              <ErrorMessage name="confirmAccount" class="text-danger" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      <beneficial-info :getStepInfoFunc1="getStepInfoFunc" v-if="parseInt(get_user.lead_type) == 1"></beneficial-info>
      <div class="d-flex justify-content-end border-top pt-4 mt-4">
        <input type="submit" value="Save &amp; Continue" class="cap_btn px-4 large_btn" />
      </div>
    </Form>
  </div>
</template>
<script>
  import {
    registerStepsMixins
  } from "@/plugins/registerSteps";
  import beneficialInfo from "./beneficial_info.vue";
  import {
    Form,
    Field,
    ErrorMessage
  } from "vee-validate";
  export default {
    name: "step-four",
    mixins: [registerStepsMixins],
    data() {
      return {
        pageLoader: false,
        fname: "",
        lname: "",
        nationality: "",
        dob: "",
        dateFocus: false,
        confirmAccount: 0,
      };
    },
    components: {
      beneficialInfo,
      Form,
      Field,
      ErrorMessage,
    },
    methods: {
      is_18() {
        var dob = new Date(this.dob);
        let get_year = new Date().getFullYear() - 18;
        if (!this.dob) return false;
        else if (dob.getFullYear() > get_year) return false;
        else if (dob.getFullYear() < get_year) return true;
        else return false;
      },
      maxDate() {
        return this.momentFunc('', 'YYYY-MM-DD');
      },
      representFuncCall(getId){
        const _that = this;
        let input_json = {
          globalParams: {
            beneficial_id: getId.toString(),
            step: 3,
            first_name: _that.fname,
            last_name: _that.lname,
            nationality: _that.nationality,
            dob: _that.momentFunc(_that.dob, 'YYYY-MM-DD'),
          },
          localParams: {
            parameter: _that,
          },
        };
        _that._runAddRepresentative(input_json);
      },
      addRepresentative() {
        if (this.pageLoader) {
          return;
        }
        const _that = this;
        if((parseInt(_that.get_user.lead_type) == 2)){
          let input_json1 = {
            'globalParams': {
              "step": 3,
              "first_name": _that.fname,
              "last_name": _that.lname,
              "nationality": _that.nationality,
              "dob": _that.momentFunc(_that.dob, 'YYYY-MM-DD')
            },
            'localParams': {
              "parameter": _that, 'lead_type': _that.get_user.lead_type
            }
          }
          _that._runAddBeneficial(input_json1)
        }else if ((parseInt(_that.get_user.lead_type) == 1 && _that.getStepInfo.benficial.length > 0)) {
          if (_that.is_18()) {
            let input_json = {
              globalParams: {
                beneficial_id: _that.getStepInfo.benficial[0].id.toString(),
                step: 3,
                first_name: _that.fname,
                last_name: _that.lname,
                nationality: _that.nationality,
                dob: _that.momentFunc(_that.dob, 'YYYY-MM-DD'),
              },
              localParams: {
                parameter: _that,
              },
            };
            _that._runAddRepresentative(input_json);

            if(parseInt(_that.get_user.lead_type) == 2){
              
            }
          } else {
            this.$notify({
              text: "Age should be greater than 18 Years",
              duration: 10000,
              pauseOnHover: true,
              type: "error",
            });
          }
        } else {
          this.$notify({
            text: "Please Add Beneficial Information to proceed",
            duration: 10000,
            pauseOnHover: true,
            type: "error",
          });
        }
      },
      getStepInfoFunc() {
        this._runGetStepInfo({
          globalParams: {},
          localParams: {
            parameter: this,
            step: 3
          },
        });
      },
    },
    created() {
      this.getStepInfoFunc();
    },
  };
</script>
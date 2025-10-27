<template>
  <div>
    <Form @submit="addRepresentative()" ref="regform" class="mt-4">
      <loader v-if="pageLoader"></loader>
      <h3 class="mb-4 semibold">Beneficial Owner(s) <span class="red">*</span>
      </h3>
      <p class="mb-4">A Beneficial Owner refers to an individual who holds more than 25% ownership or control of the Legal Entity.</p>
      <p class="mb-4">In case that the Beneficial Owner(s) is/are different than the Director(s) of the Legal Entity, please add their details below. A separate entry for each Beneficial Owner is required.</p>
      <h3 class="mb-0">Owner List</h3>
      <div class="table-responsive scrollbar mt-3" v-for="list in getStepInfo.benficial">
        <table class="table table-bordered border round-sm">
          <thead class="lightregentbluebg">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Nationality</th>
              <th>Date Of Birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{list.first_name}}</td>
              <td>{{list.last_name}}</td>
              <td>{{getCountryName(list.nationality)}}</td>
              <td>{{momentFunc(list.dob, 'YYYY-MM-DD')}}</td>
              <td>
                <div class="d-flex">
                  <a href="javascript:void(0);" class="d-flex align-items-center yellowBG px-3 py-2 round-lg text-center text-white" data-toggle="modal" data-target="#add-business-owner" @click="modalFunc(list)">
                    <feather type="edit-2" size="16px" class="d-block text-white"></feather>
                    <span class="d-block pl-2">Edit</span>
                  </a>
                  <a href="javascript:void(0);" class="d-flex align-items-center redBG px-3 py-2 round-lg text-center text-white ml-3" @click="deleteBeneficial(list.id)">
                    <feather type="x" size="21px" class="d-block text-white"></feather>
                    <span class="d-block pl-2">Delete</span>
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <a href="javascript:void(0);" class="cap_btn border-btn mt-4" data-toggle="modal" data-target="#add-business-owner" @click="modalFunc('-1')">
        <feather type="plus" size="15px" class="mr-1 mr-md-2"></feather>Add Beneficial Owner Details
      </a>
      <div class="modal" tabindex="-1" id="add-business-owner" role="dialog" aria-labelledby="add-business-owner" aria-hidden="true" v-if="modalPopup == true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header border-0 pb-0">
              <div class="modal-title text-left">
                <h5>Add A Beneficial Owner</h5>
              </div>
              <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="modalPopup = false ; modalData = {} ; fnameBeneficial = '' ; lnameBeneficial = ''; nationalityBeneficial = ''; bene_dob = ''">
                <feather type="x" size="22px"></feather>
              </a>
            </div>
            <Form @submit="addUpdateBene()" ref="regform">
              <div class="modal-body pt-2 pt-md-4 pb-0">
                <div class="form-group">
                  <label class="labeltext">First Name <span class="required">*</span>
                  </label>
                  <Field type="text" class="form-control" id="" name="fnameBeneficial" v-model="fnameBeneficial" rules="required" />
                  <ErrorMessage name="fnameBeneficial" class="text-danger" />
                </div>
                <div class="form-group">
                  <label class="labeltext">Last Name <span class="required">*</span>
                  </label>
                  <Field type="text" class="form-control" id="" name="lnameBeneficial" v-model="lnameBeneficial" rules="required" />
                  <ErrorMessage name="lnameBeneficial" class="text-danger" />
                </div>
                <div class="form-group">
                  <label class="labeltext">Date Of Birth <span class="required">*</span>
                  </label>
                  <Field type="date" class="form-control datepicker" id="" name="bene_dob" v-model="bene_dob" rules="required" :max="maxDate()" @focus="dateFocus = true" @blur="dateFocus = false" />
                  <ErrorMessage name="bene_dob" class="text-danger" />
                </div>
                <div class="form-group" :class="(nationalityBeneficial != '')? 'active' : ''">
                  <label class="labeltext">Nationality <span class="required">*</span>
                  </label>
                  <Field type="hidden" name="nationalityBeneficial" v-model="nationalityBeneficial" rules="required" />
                  <v-select class="form-control" v-model="nationalityBeneficial" :options="Object.values(country)" :reduce="country => country.iso2" label="name" placeholder=" "></v-select>
                  <ErrorMessage name="nationalityBeneficial" class="text-danger" />
                </div>
              </div>
              <div class="modal-footer border-0 pt-0">
                <div class="w-100">
                  <input type="submit" value="Update Beneficial Owner" class="cap_btn large_btn w-100 mb-0" v-if="Object.keys(modalData).length > 0">
                  <input type="submit" value="Add Beneficial Owner" class="cap_btn large_btn w-100 mb-0" v-else>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>
<script>
  import {
    registerStepsMixins
  } from '@/plugins/registerSteps'
  import {
    Form,
    Field,
    ErrorMessage
  } from "vee-validate";
  export default {
    name: 'step-four',
    mixins: [registerStepsMixins],
    data() {
      return {
        pageLoader: false,
        modalPopup: false,
        modalData: {},
        fnameBeneficial: '',
        lnameBeneficial: '',
        nationalityBeneficial: '',
        bene_dob: '',
      }
    },
    components: {
      Form,
      Field,
      ErrorMessage
    },
    props: ['getStepInfoFunc1'],
    methods: {
      is_18_beneficciar() {
        var bene_dob = new Date(this.bene_dob);
        let get_year = new Date().getFullYear() - 18
        if (!this.bene_dob) return false;
        else if (bene_dob.getFullYear() > get_year) return false;
        else if (bene_dob.getFullYear() < get_year) return true;
        else return false;
      },
      maxDate() {
        return this.momentFunc('', 'YYYY-MM-DD');
      },
      modalFunc(getData) {
        this.modalPopup = true
        if (getData != '-1') {
          this.modalData = getData
          this.fnameBeneficial = getData.first_name
          this.lnameBeneficial = getData.last_name
          this.nationalityBeneficial = getData.nationality
          this.bene_dob = this.momentFunc(getData.dob, 'YYYY-MM-DD')
        }
      },
      addUpdateBene() {
        if (this.pageLoader) {
          return;
        }
        const _that = this
        if (Object.keys(_that.modalData).length > 0) {
          if (_that.is_18_beneficciar()) {
            let input_json = {
              'globalParams': {
                "beneficial_id": _that.modalData.id,
                "first_name": _that.fnameBeneficial,
                "last_name": _that.lnameBeneficial,
                "nationality": _that.nationalityBeneficial,
                "dob": _that.momentFunc(_that.bene_dob, "YYYY-MM-DD") 
              },
              'localParams': {
                "parameter": _that
              }
            }
            _that._runUpdateBeneficial(input_json)
          } else {
            this.$notify({
              text: "Age should be greater than 18 Years",
              duration: 10000,
              pauseOnHover: true,
              type: "error",
            });
          }
        } else {
          if (_that.is_18_beneficciar()) {
            let input_json = {
              'globalParams': {
                "step": 3,
                "first_name": _that.fnameBeneficial,
                "last_name": _that.lnameBeneficial,
                "nationality": _that.nationalityBeneficial,
                "dob": _that.momentFunc(_that.bene_dob, 'YYYY-MM-DD')
              },
              'localParams': {
                "parameter": _that
              }
            }
            _that._runAddBeneficial(input_json)
          } else {
            this.$notify({
              text: "Age should be greater than 18 Years",
              duration: 10000,
              pauseOnHover: true,
              type: "error",
            });
          }
        }
      },
      deleteBeneficial(getId) {
        let input_json = {
          'globalParams': {
            "beneficial_id": getId
          },
          'localParams': {
            "parameter": this
          }
        }
        this._runDeleteBeneficial(input_json)
      },
      reset(getData) {
        this.getStepInfoFunc1()
        if (getData != '') {
          this.modalPopup = false
          this.modalData = {}
          this.fnameBeneficial = ''
          this.lnameBeneficial = ''
          this.nationalityBeneficial = ''
          this.bene_dob = ''
        }
      }
    }
  }
</script>
<template>
    <div>
        <!-- <alert-notification v-if="notification_msg != ''" /> -->
        <loader v-if="pageLoader" />
        <Form  id="formRequest" @submit="addBankDetails()" ref="regform">
            <div class="row">
                <div class="col-12 col-lg-6">
                    <h5 class="mb-4 semibold themecolor">Bank Details</h5>
                    <!-- <input type="text" placeholder="Description" class="form-control mb-2">
                    <span class="f-12 textcolor">In case you add multiple accounts, please add a description for identifying your bank account</span> -->
                    <div class="form-group">
                        <label class="mb-2 labeltext">International Bank Account Number (IBAN)</label>
                        <Field type="text" class="form-control mb-2" id="" name="account_no" placeholder="International Bank Account Number (IBAN)" v-model="account_no" rules="required|min:8|max:25"  />
                       <ErrorMessage name="account_no" class="text-danger" />
                    </div>
                    <div class="form-group">
                        <label class="mb-2 labeltext">Bank Name</label>
                        <Field type="text" class="form-control mb-2" id="" name="bank_name" placeholder="Bank Name" v-model="bank_name" rules="required|min:2|max:100" />
                       <ErrorMessage name="bank_name" class="text-danger" />
                    </div>
                    <div class="form-group">
                        <label class="mb-2 labeltext">BIC/SWIFT Code/Sort Code/ IFSC</label>
                        <Field type="text" class="form-control mb-2" id="" name="ifsc" placeholder="BIC/SWIFT Code/Sort Code/ IFSC" v-model="ifsc" rules="required" />
                       <ErrorMessage name="ifsc" class="text-danger" />
                    </div>
                   <!--  <div class="form-group">
                        <label class="mb-2">IFSC Code</label>
                        <input type="text" placeholder="IFSC Code" class="form-control mb-2" v-model="ifsc"  name="ifsc"   v-validate="{ required: true }">
                        <span v-if="bankSubmitted && errors.has('ifsc')" class="text-danger">{{ errors.first("ifsc") }}</span> 
                    </div> -->
                    <div class="form-group">
                        <label class="mb-2 labeltext">Bank Address</label>
                        <Field type="text" class="form-control mb-2" id="" name="bank_address" placeholder="Bank Address" v-model="bank_address" rules="required|min:3|max:150" />
                       <ErrorMessage name="bank_address" class="text-danger" />
                    </div>
                </div>
                <div class="col-12 col-lg-6">
                    <h5 class="mb-4 semibold labeltext">Beneficiary Details</h5>
                    <div class="form-group">
                        <label class="mb-2 labeltext">Beneficiary Name</label>
                        <Field type="text" class="form-control mb-2" id="" name="beneficiary_name" placeholder="Beneficiary Name" v-model="beneficiary_name" rules="required" />
                       <ErrorMessage name="beneficiary_name" class="text-danger" />
                    </div>
                    <div class="form-group">
                        <label class="mb-2 labeltext">Beneficiary Country</label>
                        <select class="form-control scrollbar" v-model="country1" name="country1" placeholder="Beneficiary Country"  rules="required">
                            <option :value="list.iso2" v-for="list in Object.values(country)" class="textcolor">{{list.name}}</option>
                      </select>
                      <ErrorMessage name="country1" class="text-danger" />
                        <!-- <span v-if="bankSubmitted && errors.has('country1')" class="text-danger">{{ errors.first("country1") }}</span> -->
                    </div>
                    <div class="form-group">
                        <label class="mb-2 labeltext">Beneficiary City</label>
                        <Field type="text" class="form-control mb-2" id="" name="city" placeholder="Beneficiary City" v-model="city" rules="required" />
                       <ErrorMessage name="city" class="text-danger" />
                    </div>
                    <div class="form-group">
                        <label class="mb-2 labeltext">Beneficiary Address</label>
                        <Field type="text" class="form-control mb-2" id="" name="address" placeholder="Beneficiary Address" v-model="address" rules="required" />
                       <ErrorMessage name="address" class="text-danger" />
                    </div>
                </div>
                <div class="col-12 col-lg-6">
                    <div class="form-group">
                        <label class="mb-2 labeltext">Upload Bank Document</label>
                        <a href="javascript:void(0);" class="addFileBtn d-flex"  v-if="document_proof_array.bank.length == 0">
                            <div class="d-flex cap_btn border-btn pl-2 pr-3 px-lg-4 min-w-auto">
                                <feather type="plus" size="15px" class="mr-2"></feather>
                                <span>Upload Bank Document</span>
                            </div>
                            <!-- <input type="file" name="bank" id="bank" @change="onFileChange('bank', $event.target.files[0])" /> -->
                            <Field type="file" name="bank" id="bank"  rules="required" @change="onFileChange('bank', $event.target.files[0])" />
                        </a>
                        <ErrorMessage name="bank" class="text-danger"  v-if="document_proof_array.bank.length == 0" />
                        <div class="linerUpload d-flex align-items-center mb-2" v-if="document_proof_array.bank.length > 0">
                          <span class="nameIco">
                            <feather class="mr-2" type="file"></feather>
                            <span>{{document_proof_array.bank[0].name}}</span>
                          </span>
                          <a href="#" class="closeBtn" @click="clearDoc('bank')"><feather type="x"></feather></a>
                        </div>
                    </div> 
                </div>
            </div>
            <div class="d-flex align-items-center justify-content-center">
                <button class="cap_btn large_btn w-100 border-0"  :class="(pageLoader)?'disabled':''">Add Bank Account</button> 
            </div>
        </Form>
    </div>
</template>
<script>
  import settingsMixins from "@/plugins/settings";
  import { Form, Field, ErrorMessage } from "vee-validate";
  export default {
    name: "deposit-section",
    mixins: [settingsMixins],
    data() {
      return {
        pageLoader: false,

        bankSubmitted : false,
        account_no : '',
        bank_name : '',
        micr : '',
        bank_address : '',
        beneficiary_name : '',
        country1 : '',
        city : '',
        ifsc : '',
        address : '',
        document_proof_array : {
            'bank' : []
        },
      };
    },
    components: {Form, Field, ErrorMessage 
     },
    computed: {},
    props : ['pageNameData'],
    methods: {
        onFileChange(getdocType , file) {
            // this.document_proof_array[getdocType] = file[0].name
            this.document_proof_array[getdocType].push({
                'file':file,
                'name':file.name
            })
            //document.getElementById(getdocType).value = ''
        },
        clearDoc(getdocType){
            this.document_proof_array[getdocType] = []
        },
        reset(){
            this.bankSubmitted = false
            this.account_no = ''
            this.bank_name = ''
            this.micr = ''
            this.bank_address = ''
            this.beneficiary_name = ''
            this.country1 = ''
            this.ifsc = ''
            this.city = ''
            this.address = ''
            this.document_proof_array = {
                'bank' : []
            }
        },
        addBankDetails() {
        //console.log('this.document_proof_array==',this.document_proof_array)
            const _that = this;
            let form_name = new FormData();
            form_name.append('account_no', _that.account_no);
            form_name.append('bank_name', _that.bank_name);
            form_name.append('ifsc', _that.ifsc);
            form_name.append('bank_address', _that.bank_address);
            form_name.append('beneficiary_name', _that.beneficiary_name);
            form_name.append('country', _that.country1);
            form_name.append('city', _that.city);
            form_name.append('address', _that.address);
            form_name.append('document', this.document_proof_array.bank[0].file );

            let json = {
                globalParams: {
                    'form' : form_name
                },
                localParams: { parameter: _that, pagename :  _that.pageNameData,  'type' :'form'},
            }
            _that._runAddBankDetails(json);
        }
    },
    created() {
        this.reset()
    }
  };
</script>
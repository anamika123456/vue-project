<template>
  <div>
    <loader v-if="pageLoader"></loader>
    <div class="modal" tabindex="-1" id="invite-member" role="dialog" aria-labelledby="invite-member" aria-hidden="true" v-if="modalPopup == true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <Form @submit="sendInvites()" ref="regform" >
            <div class="modal-header border-0">
              <div class="modal-title">
                <h4 class="mb-0">Invite New Member</h4>
              </div>
              <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="modalPopup = false">
                <feather type="x" size="22px"></feather>
              </a>
            </div>
            <div class="modal-body pt-0 pb-0">
              <div class="row">
                <div class="col-12 col-md-6">
                  <div class="form-group">
                    <div class="d-flex align-items-start">
                      <label class="labeltext">First Name <span class="required">*</span>
                      </label>
                    </div>
                    <Field type="text" class="form-control" id="" name="fname" placeholder="Enter your first name" v-model="fname" rules="required" />
                    <ErrorMessage name="fname" class="text-danger" />
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="form-group">
                    <div class="d-flex align-items-start">
                      <label class="labeltext">Last Name <span class="required">*</span>
                      </label>
                    </div>
                    <Field type="text" class="form-control" id="" name="lname" placeholder="Enter your last name" v-model="lname" rules="required" />
                    <ErrorMessage name="lname" class="text-danger" />
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <div class="d-flex align-items-start">
                      <label class="labeltext">Email Address <span class="required">*</span>
                      </label>
                    </div>
                    <Field type="email" class="form-control" id="" name="email" placeholder="Enter your email address" v-model="email" rules="required|email" />
                    <ErrorMessage name="email" class="text-danger" />
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <div class="d-flex align-items-start">
                      <label class="labeltext">User Role <span class="required">*</span></label>
                    </div>
                    <div class="d-flex justify-content-between">
                      <div class="position-relative dropdown selectDropMenu roleselectmenu w-100"> 
                        <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between round-sm selectDropMenuLink" data-toggle="dropdown">
                          <p class="mb-0 themecolor medium" >{{(role != '') ? getRolesFunc1(role) : 'Choose a Role'}}</p>
                          <feather type="chevron-down" class="ml-2 themecolor" size="20px"></feather>
                        </a>
                        <ul class="dropdown-menu scrollbar">
                          <li v-for="list in getRolesFunc1('')">
                            <a href="javascript:void(0)" class="form-group mb-0 px-3">
                              <label class="customRadioButton d-flex">
                                <div class="mb-0 destinationRadio">
                                  <input type="radio" :value="list.role" name="role" v-model="role" >
                                  <span class="checkmark"></span>
                                </div>
                                <div class="mb-0">
                                  <h6 class="mb-0">{{list.department}}</h6>
                                  <p class="textcolor mb-0">{{list.description}}</p>
                                </div>
                              </label>
                            </a>
                          </li>
                          
                        </ul>
                        <!-- <span v-show="submitted && errors.has('role')" class="text-danger">The Role is required</span> -->
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <div class="d-flex align-items-center justify-content-between">
                      <label class="labeltext">Custom Message</label>
                      <p class="mb-0">Optional</p>
                    </div>
                    <textarea class="form-control" placeholder="Optionally, provide additional custom message.." name="message" v-model="message" ></textarea>
                    <!-- <span v-show="submitted && errors.has('message')" class="text-danger">The message is required</span> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer justify-content-end pt-0 border-0">
              <input type="submit" class="cap_btn px-4 large_btn mb-0" value="Invite" >
            </div>
          </Form>
        </div>
      </div>
    </div>

    <!-- <div class="modal" tabindex="-1" id="user-delete-confirmation" role="dialog" aria-labelledby="user-delete-confirmation" aria-hidden="true" v-if="modalDeleteUser != ''">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <h3 class="text-center medium d-block lh-normal mb-0 pt-3 pb-2">Are you sure to remove this user?</h3>
          </div>
          <div class="modal-footer border-0 pt-0">
            <div class="d-flex justify-content-center w-100 pb-2">
              <a href="javascript:void(0);" class="cap_btn large_btn border-btn mb-0" data-dismiss="modal" aria-label="Close" @click="modalDeleteUser = ''">Cancel</a>
              <a href="javascript:void(0);" class="cap_btn large_btn mb-0 ml-3" data-toggle="modal" data-target="#user-successful-remove-message" @click="deleteSubUsers(modalDeleteUser)">Remove</a>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div class="modal" tabindex="-1" id="user-delete-confirmation" role="dialog" aria-labelledby="user-delete-confirmation" aria-hidden="true" v-if="modalDeleteUser != ''"> 
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <Form @submit="deleteSubUsers(modalDeleteUser)" ref="regform">
            <div class="modal-header border-0 d-block text-right">
              <a href="javascript:void(0);" class="close" data-dismiss="modal" aria-label="Close" @click="modalDeleteUser = ''; otp = ''">
                <feather type="x" size="22px"></feather>
              </a>
            </div>
            <div class="modal-body pt-0 pb-0">
              <div class="mb-4">
                <img src="/assets/website/images/google-authenticator.png" alt="Google Authentication" class="d-block m-auto" width="96" height="96" />
                <h6 class="themecolor mt-4 mb-0 text-center">Google Authentication Code</h6>
              </div>
              <div class="form-group">
                    <Field type="text" class="form-control" id="" name="otp" placeholder="Enter 2FA Code" v-model="otp" rules="required|min:6|numeric" />
                    <ErrorMessage name="otp" class="text-danger" />
              </div>
            </div>
            <div class="modal-footer justify-content-center pt-4 border-0">
              <input type="submit" class="cap_btn px-4 large_btn mb-0" value="Submit" data-toggle="modal" :class="pageLoader ? 'disabled' : ''" data-target="#fa-update-keys" />
            </div>
          </Form>
        </div>
      </div>
    </div>




    <div class="mb-3 mb-md-5 pb-3 pb-md-5 border-bottom">
        <div class="row">
          <div class="col-12 col-lg-3">
            <h5 class="mb-2 mb-lg-3">Users</h5>
            <p class="mb-2 mb-lg-3">Manage your team members and their account permissions here</p>
            <a href="javascript:void(0);" class="cap_btn inviteMemeberBtn border-btn d-inline-flex align-items-center" data-toggle="modal" data-target="#invite-member"   @click="userRolePermission($env_var.permissions.inviteUser , {path : '/settings'})">
              <span class="pl-2" @click.prevent="modalPopup = true">Invite Member</span>
            </a>
          </div>

          <div class="col-12 col-lg-9 mt-4 mt-lg-0">
            <div class="table-responsive scrollbar">
              <table class="table table-bordered border round-sm">
                <thead class="lightregentbluebg">
                  <tr>
                    <!-- <th>
                      <div class="form-group mb-0 mr-3">
                        <label class="customCheckbox mb-0 pl-0">
                          <input type="checkbox" name="date" value="1" />
                          <span class="checkmark position-relative d-inline-block"></span>
                        </label>
                      </div>
                    </th> -->
                    <th>Name</th>
                    <th>Role</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody v-if="getSubUsers.length > 0 && !pageLoader">
                  <!--v-if="parseInt(list.active) == 1"-->
                  <tr v-for="list in getSubUsersFun()" >
                    <!-- <td>
                      <div class="form-group mb-0 mr-3">
                        <label class="customCheckbox mb-0 pl-0">
                          <input type="checkbox" name="date" value="1" />
                          <span class="checkmark position-relative d-inline-block"></span>
                        </label>
                      </div>
                    </td> -->
                    <td>
                      <div class="d-flex align-items-center">
                        <div class="mb-0">
                          <span class="d-flex userrolesImg rounded-circle text-white align-items-center" width="59" height="59">{{ usernameSplitFunc(list.username)}} </span>
                          <!-- <img src="../../../../../../static/website/images/kate-spade.svg" alt="kate spade"  /> -->
                        </div>
                        <div class="pl-3">
                          <h5 class="mb-1">{{list.username}}</h5>
                          <p class="mb-0">{{list.email}}</p>
                        </div>
                      </div>
                    </td>
                    <td>{{roleFuncData(list.role_ids,list.email)}}
                      <!-- <div class="selectmenu position-relative w-100">
                        <a @click.prevent="roleOne ^= true" href="javascript:void(0)" class="btn d-flex justify-content-between align-items-center">
                          <span class="mx-2 textcolor regular">Administrator</span>
                          <feather type="chevron-down" class="ml-2"></feather>
                        </a>
                        <ul class="dropdown_menu dropdown_menu--animated dropdown_menu-6 dropdown_menu_left w-100" :class="{'show':roleOne}">
                          <li>
                            <a href="javascript:void(0)" class="textcolor regular">Administrator</a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" class="textcolor regular">Developer</a>
                          </li>
                        </ul>
                      </div> -->
                    </td>
                    <td>
                      <a href="javascript:void(0);" @click="modalDeleteUser =  list.id" v-if="parseInt(list.role_id) != 1" data-toggle="modal" data-target="#user-delete-confirmation">
                        <feather type="trash-2" size="18px" class="textcolor d-block"></feather>
                      </a>
                    </td>
                  </tr>
                  
                </tbody>
                <table-loader :pageloader_value="pageLoader" :type="'table'" :colspan="'3'" :listLength="getSubUsers.length" v-else></table-loader>
              </table>
            </div>
          </div>
        </div>
      </div>




      <div class="row">
        <div class="col-12 col-lg-3">
          <h5 class="mb-2 mb-lg-">Pending Invitation</h5>
          <p class="mb-2 mb-lg-3">Until the user accepts the invitation, the user’s status will display as pending </p>
        </div>
        <div class="col-12 col-lg-9 mt-4 mt-lg-0">
          <div class="table-responsive">
            <table class="table table-bordered border round-sm">
              <thead class="lightregentbluebg">
                <tr >
                  <!-- <th>
                    <div class="form-group mb-0 mr-3">
                      <label class="customCheckbox mb-0 pl-0">
                        <input type="checkbox" name="date" value="1" />
                        <span class="checkmark position-relative d-inline-block"></span>
                      </label>
                    </div>
                  </th> -->
                  <th>Name</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody v-if="getPendingInvites.length > 0 && !pageLoader">
                <tr v-for="list in getPendingInvites">
                  <!-- <td>
                    <div class="form-group mb-0 mr-3">
                      <label class="customCheckbox mb-0 pl-0">
                        <input type="checkbox" name="date" value="1" />
                        <span class="checkmark position-relative d-inline-block"></span>
                      </label>
                    </div>
                  </td> -->
                  <td>
                    <div class="d-flex align-items-center">
                      <div class="mb-0">
                        <span class="d-flex userrolesImg rounded-circle text-white align-items-center" width="59" height="59">{{ usernameSplitFunc(list.first_name+' '+list.last_name)}} </span>
                        <!-- <img src="../../../../../../static/website/images/kate-spade.svg" alt="kate spade" class="d-block" width="59" height="59" /> -->
                      </div>
                      <div class="pl-3">
                        <h5 class="mb-1">{{list.first_name}} {{list.last_name}}</h5>
                         <p class="mb-0">{{list.email}}</p>
                      </div>
                    </div>
                  </td>
                  <td>{{roleFunc(list.role,'name')}}</td>
                  <td>
                    <div class="d-flex">
                      <a href="javascript:void(0);" class="greenBG px-3 py-2 round-lg text-center text-white" @click="ResendInvites(list.id)">Resend Invite</a>
                      <a href="javascript:void(0);" class="redBG px-3 py-2 round-lg text-center ml-3 text-white" @click="cancelInvites(list.id)">Cancel Invite</a>
                    </div>
                  </td>
                </tr>
              </tbody>
              <table-loader :pageloader_value="pageLoader" :type="'table'" :colspan="'3'" :listLength="getPendingInvites.length" v-else></table-loader>
            </table>
          </div>
        </div>
      </div>
      <!-- <div class="d-flex justify-content-start justify-content-md-end align-items-center border-top pt-3 pt-md-4 mt-3 mt-md-4">
        <a href="javascript:void(0);" class="cap_btn small_btn border-btn">Cancel</a>
        <a href="javascript:void(0);" class="cap_btn small_btn ml-3">Save</a>
      </div> -->
  </div>
</template>
<script>
  import settingsMixins from "@/plugins/settings";
  import { Form, Field, ErrorMessage } from "vee-validate";
  export default {
    name: "accountprofile",
    mixins: [settingsMixins],
    data() {
      return {
        pageLoader: false,
        page : '1',
        pageLimit : '10',

        roleOne : false,

        userrole : false,
        modalPopup : false,
        modalDeleteUser : '',
        fname : '',
    lname : '',
    email : '',
    role : 'D',
    message : '',
    submitted : false,
    otp : ''
      };
    },
    watch: {
      role: function (val) {
        this.userrole = false
      },
    },
    components: {
            Form, Field, ErrorMessage 
         },
    methods: {
      roleFuncData(getRoleData,getEmail){
        console.log(getRoleData)
        let roleString = ' ';
        let arrayData = (getRoleData.includes(",")) ? getRoleData.split(',') :  [getRoleData] ;
        if(getEmail == this.get_user.email){
          return 'Administrator';
        }else{
          for(let i = 0 ; i<=arrayData.length-1 ; i++){
            if(arrayData[i] != 1 && arrayData[i] != 2 ){
              for(let j=0 ; j<=this.getRoles.length-1 ; j++){
                if(this.getRoles[j].id == arrayData[i]){
                  roleString = this.getRoles[j].department+', '+roleString
                }
              }
            }
            if(i == arrayData.length-1){
              return roleString.replace(/,\s*$/, ""); 
            }
          }
        }
      },
      getRolesFunc1(getData){
        let arradyData = [], returnData = '';
        for(let i=0 ; i<=this.getRoles.length-1 ;  i++){
          if(getData != ''){
            if(this.getRoles[i].role == getData){
              returnData = this.getRoles[i].department
            }
          }else{
            if(parseInt(this.getRoles[i].id) != 1 && parseInt(this.getRoles[i].id) != 2 && parseInt(this.getRoles[i].id) != 7 && parseInt(this.getRoles[i].id) != 8 && parseInt(this.getRoles[i].id) != 11){
              arradyData.push(this.getRoles[i])
            }
          }
          
          if(i == this.getRoles.length-1){
            return (getData != '') ? returnData : arradyData ;
          }
        }
      },
      getSubUsersFun(){
        let arradyData = []
        for(let i=0 ; i<=this.getSubUsers.length-1 ;  i++){
          if(parseInt(this.getSubUsers[i].active) == 1){
            arradyData.push(this.getSubUsers[i])
          }
          if(i == this.getSubUsers.length-1){
            return arradyData ;
          }
        }
      },
      roleFunc(getId,getRoleType){
        for(let i=0; i<=this.getRoles.length-1 ;i++){
          // console.log(getId,getRoleType, this.getRoles[i].id)
          if(parseInt(this.getRoles[i].id) == parseInt(getId) && getRoleType == 'id'){
            return this.getRoles[i].department
          }

          if(this.getRoles[i].role == getId && getRoleType == 'name'){
            return this.getRoles[i].department
          }
        }
      },
      getSubUserFunc(){
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
          this._runGetSubUsers(json);
       },
       deleteSubUsers(getId){
        let json = {
                globalParams: {
                    "id" : getId,
                    "otp" : this.otp
                },
                localParams: { parameter: this },
          }
          this._runDeleteSubUsers(json);
       },

       getPendingInvitesFunc(){
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
          this._runGetPendingInvites(json);
      },
      ResendInvites(getId){
        let json = {
                globalParams: {
                    "id" : getId
                },
                localParams: { parameter: this },
          }
          this._runResendInvites(json);
       },
       cancelInvites(getId){
        let json = {
                globalParams: {
                    "id" : getId
                },
                localParams: { parameter: this },
          }
          this._runCancelInvites(json);
       },

      getRolesFunc(){
        let json = {
              globalParams: {},
              localParams: { parameter: this },
          }
          this._runGetRoles(json);
      },

      sendInvites(){
          const _that = this
          let input_json = {
           'globalParams': {
              "first_name": _that.fname ,
    
              "last_name": _that.lname ,
              "email": _that.email ,
              "role" : _that.role ,
              "custom_msg": _that.message ,
              "type": "user"
           },
           'localParams': {
              "parameter": _that
           }
          }
          _that._runSendInvites(input_json)
      },
      reset(){
      this.modalPopup  =  false
      this.modalDeleteUser = ''
          this.fname  =  ''
      this.lname  =  ''
      this.email  =  ''
      this.role  =  ''
      this.message  =  ''
      this.submitted  =  false
      this.getPendingInvitesFunc()
      }
    },
    created() {
      this.getSubUserFunc()
    this.getPendingInvitesFunc()
    this.getRolesFunc()
    }
  };
</script>
<template>
  <div class="accountSetting bg-white round-sm">
    <div class="d-flex align-items-center mb-3 pb-3 border-bottom">
      <h4 class="mb-0">Beneficial Owners</h4>
      <a href="javascript:void(0);" class="ml-2 d-block">
        <feather type="info" size="16px" class="d-block textcolor" data-toggle="tooltip" data-placement="bottom" title="Any UBO's with equal to or more than 25% of shares have to be disclosed/ listed"></feather>
      </a>
    </div>
    <h6 class="pb-2 pt-3">Owner List</h6>
    <div class="table-responsive scrollbar" v-for="list in getUserData.benficial">
      <table class="table table-bordered border round-sm">
         <thead class="lightregentbluebg">
         <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date Of Birth</th>
            <th>Nationality</th>
         </tr>
         </thead>
         <tbody>
         <tr>
            <td>{{list.first_name}}</td>
            <td>{{list.last_name}}</td>
            <td>{{momentFunc(list.dob, 'DD-MM-YYYY')}}</td>
            <td>{{getCountryName(list.nationality)}}</td>
         </tr>
         </tbody>
      </table>
    </div>
   <!--  <div class="d-block d-md-flex justify-content-between align-items-center border-top pt-3 pt-md-4 mt-3 mt-md-4" v-if="parseInt(get_user.is_registered) == 5">
      <p class="textcolor mb-0">If you want to edit your information, raise a ticket <router-link :to="{ name: 'help_centre', query: { ticketData: 1 }}" class="highlightlink" >here</router-link>
      </p>
    </div> -->
  </div>
</template>
<script>
  import settingsMixins from "@/plugins/settings";
  export default {
    name: 'step-four',
    mixins: [settingsMixins],
    data() {
      return {
        pageLoader: false
      }
    },
    methods: { }
  }
</script>
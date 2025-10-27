<template>
  <div class="accountSetting bg-white round-sm">
    <div id="tabs" class="text-center mb-0 walletTab currencyTab">
      <ul class="d-flex align-items-center m-0">
        <li>
          <a class="d-block" href="javascript:void(0)" :class="[{ active: accounttab == 1 }]" @click.prevent="accounttab = 1">Profile</a>
        </li>
        <li :class="(parseInt(get_user.is_registered) < 2) ? 'disabled' : ''">
          <a class="d-block" href="javascript:void(0)" :class="[{ active: accounttab == 2 }]" @click.prevent="accounttab = 2">User Roles</a>
        </li>
      </ul>
    </div>
    <div v-if="accounttab == 1" class="pt-3 pt-md-5">
      <profile></profile>
    </div>
    <div v-if="accounttab == 2" class="pt-3 pt-md-5">
      <user-roles></user-roles>
    </div>
  </div>
</template>
<script>
  import profile from "./account/profile.vue";
  import userRoles from "./account/user_roles.vue";
  export default {
    name: "accountprofile",
    data() {
      return {
        accounttab: 1,
      };
    },
    components: {
      profile,
      userRoles,
    },
    methods: {},
    created() {
      this.accounttab = this.$parent.accountTab
    },
  };
</script>
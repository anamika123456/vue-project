<template>
  <div class="selectmenu position-relative">
    <a
      @click.prevent="currencies = !currencies"
      href="javascript:void(0)"
      class="btn d-flex align-items-center account-change"
    >
      <span class="mx-2">{{ accTypeList[accountSelected] }}</span
      ><feather type="chevron-down" class="ml-2" />
    </a>
    <ul
      class="dropdown_menu dropdown_menu--animated dropdown_menu-6"
      :class="currencies ? 'show' : ''"
    >
      <li
        v-for="(value, key) in accTypeList"
        :class="[{ active: accountSelected == key }]"
        v-if="key == 1 ? get_user.social_type == 1 : true"
      >
        <a href="javascript:void(0)" @click="change(key)">{{ value }}</a>
      </li>
    </ul>
  </div>
</template>
<script>
import tradingMixins from "@/plugins/trading";
import { commonAllmixins } from "@/plugins/commonAll";
export default {
  name: "Account-List",
  mixins: [tradingMixins, commonAllmixins],
  data() {
    return {
      currencies: false,
      accTypeList: {
        0: "Main Account",
        1: "Social Trading Account",
      },
    };
  },
  methods: {
    change(val) {
      if (parseInt(val) == this.accountSelected) {
        return;
      } else {
        let input_json = {
          globalParams: { is_social: parseInt(val) },
          localParams: { parameter: this.$parent, from: "change-account" },
        };
        this._runTradingAccount(input_json);
      }
    },
  },
  mounted() {
    const _that = this;
    $(document).on("click", function (event) {
      if (!$(event.target).closest(".account-change").length) {
        _that.currencies = false;
      }
    });
  },
};
</script>

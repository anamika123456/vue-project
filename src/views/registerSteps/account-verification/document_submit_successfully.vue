<template>
  <div class="verificationContent p-0">
    <loader v-if="pageLoader"></loader>
    <div class="secondaryBG p-4 round-md complete-verification">
      <div class="d-flex align-items-center">
        <h6 class="mb-0 text-white semibold"> Documents Submitted Successfully! </h6>
      </div>
      <p class="text-white mt-3 mb-0"> We are currently reviewing your submitted documents and we will come back to you with an update shortly. </p>
      <div class="d-block d-lg-flex align-items-center mt-3">
        <router-link class="cap_btn border-btn-secondary mr-2" to="/dashboard">Return To Dashboard</router-link>
        <p class="mb-0 mr-2 text-white">or</p>
        <router-link :to="{
            name: 'view',
            query: { id: getStepInfo.documents[0].ticket_id },
          }" class="text-left lh-normal cap_btn border-btn-secondary" v-if="
            Object.keys(getStepInfo).length > 0 &&
            getStepInfo.documents &&
            getStepInfo.documents.length > 0
          ">Return To Document Verification Ticket</router-link>
      </div>
    </div>
    <div class="mt-3 mt-md-5">
      <h5 class="mb-3 mb-md-4">Resources:</h5>
      <div class="d-block d-lg-flex">
        <div class="resourcesBox border round-md p-4 text-center bg-white">
          <div class="greyBgIcon d-flex align-items-center justify-content-center lightgrayBG rounded-circle m-auto">
            <img src="/assets/website/images/pricingLimits.svg" />
          </div>
          <h6 class="mt-3">Pricing and Limits</h6>
          <p class="mt-2 mb-3">Transparent and competitive pricing plan</p>
          <a href="javascript:void(0);" class="cap_btn border-btn medium mb-0">Find Out More</a>
        </div>
        <div class="resourcesBox border round-md p-4 text-center bg-white">
          <div class="greyBgIcon d-flex align-items-center justify-content-center lightgrayBG rounded-circle m-auto">
            <img src="/assets/website/images/apiDocumentation.svg" />
          </div>
          <h6 class="mt-3">API Documentation</h6>
          <p class="mt-2 mb-3"> API Integration <br /> is simple and quick </p>
          <a href="javascript:void(0);" class="cap_btn border-btn medium mb-0">Read More</a>
        </div>
        <div class="resourcesBox border round-md p-4 text-center bg-white">
          <div class="greyBgIcon d-flex align-items-center justify-content-center lightgrayBG rounded-circle m-auto">
            <img src="/assets/website/images/dedicatedAssistance.svg" />
          </div>
          <h6 class="mt-3">Dedicated Assistance</h6>
          <p class="mt-2 mb-3"> Talk to our team about <br /> your needs </p>
          <a href="javascript:void(0);" class="cap_btn border-btn medium mb-0">Contact Us</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    registerStepsMixins
  } from "@/plugins/registerSteps";
  export default {
    name: "step-four",
    mixins: [registerStepsMixins],
    data() {
      return {
        pageLoader: false
      };
    },
    methods: {
      viewTicket(listId) {
        this.$router.push({
          name: "view",
          query: {
            id: listId
          }
        });
      },
    },
    created() {
      this._runGetStepInfo({
        globalParams: {},
        localParams: {
          parameter: this
        },
      });
    },
  };
</script>
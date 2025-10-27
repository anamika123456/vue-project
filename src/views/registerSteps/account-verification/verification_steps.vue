<template>
  <div class="mid_scroll_content">
    <loader v-if="pageLoader"></loader>
    <div class="pageContent border-0">
      <div class="verificationBox">
        <div class="verificationSteps">
          <ul>
            <li :class="activeClass(1)">
              <span>
                <feather type="check"></feather>
              </span>
              <p>Account Creation</p>
            </li>
            <li :class="activeClass(2)" @click="getBacktoStep(1)">
              <span>
                <strong v-if="tillCompletedTask(2)">2</strong>
                <feather type="check" v-else></feather>
              </span>
              <p>Legal Entity Information</p>
            </li>
            <li :class="activeClass(3)" @click="getBacktoStep(2)">
              <span>
                <strong v-if="tillCompletedTask(3)">3</strong>
                <feather type="check" v-else></feather>
              </span>
              <p>Business Representative</p>
            </li>
            <li :class="activeClass(4)" @click="getBacktoStep(3)">
              <span>
                <strong v-if="tillCompletedTask(4)">4</strong>
                <feather type="check" v-else></feather>
              </span>
              <p>Documents Verification</p>
            </li>
            <li :class="activeClass(5)">
              <span>
                <feather v-if="tillCompletedTask(5)" type="shopping-cart" class="shoppingCart"></feather>
                <feather type="check" v-else></feather>
              </span>
              <p>Account all set!</p>
            </li>
          </ul>
        </div>
        <div class="verificationStepsMobile pb-3">
          <h4 class="mb-0">Step: {{parseInt(get_user.step)+1}} out of 4</h4>
        </div>
        <!-----------legal-entity---------->
        <legal-entity-information v-if="parseInt(get_user.step) == 1"></legal-entity-information>
        <!----------authorization-representative--->
        <authorised-representative v-if="parseInt(get_user.step) == 2"></authorised-representative>
        <!----------verification-documents--->
        <verification-documents v-if="parseInt(get_user.step) == 3 || parseInt(get_user.step) == 4"></verification-documents>
        <!----------verification-documents--->
        <document_submit_successfully v-if="parseInt(get_user.step) == 5"></document_submit_successfully>
      </div>
    </div>
  </div>
</template>
<script>
  import legalEntityInformation from "./legal_entity_information.vue";
  import authorisedRepresentative from "./authorised_representative.vue";
  import verificationDocuments from "./verification_documents.vue";
  import document_submit_successfully from "./document_submit_successfully.vue";
  import { SET_STATE } from "@/types";
  export default {
    name: "step-four",
    data() {
      return {
        pageLoader: false,
      };
    },
    components: { legalEntityInformation, authorisedRepresentative, verificationDocuments, document_submit_successfully },
    methods: {
      activeClass(getStep) {
        if (parseInt(getStep) <= parseInt(this.get_user.step)) {
          return 'active';
        } else {
          return '';
        }
      },
      getBacktoStep(backto) {
        let currentStep = this.get_user.step
        if ('tempStep' in this.get_user && currentStep < this.get_user.tempStep) {
          currentStep = this.get_user.tempStep
        }
        if (backto <= currentStep) {
          this.get_user.tempStep = currentStep
          this.get_user.step = backto
          let user_json = this.get_user
          this.$store.commit(SET_STATE, user_json)
        }
      },
      tillCompletedTask(getStep) {
        if (parseInt(getStep) <= parseInt(this.get_user.step)) {
          return false
        } else {
          return true
        }
      }
    }
  };
</script>
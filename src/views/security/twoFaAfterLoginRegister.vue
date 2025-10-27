<template>
  <!-- <div class="w-100">
    
  </div> -->
  <two-fa :mode="'register'" class="withdrawalAllow"></two-fa>
</template>
<script>
  import twoFa from "./security.vue";
  export default {
    name: "step-four",
    data() {
      return { }
    },
    components: {twoFa}
  };
</script>
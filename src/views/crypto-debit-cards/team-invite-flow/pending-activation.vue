<template>
    <div>
        <div class="mid_scroll_content">
            <div class="pageContent border-0">
                <div class="img-wrap">
                    <img class="img-fluid d-block w-100" src="/assets/website/images/dashboard-blur.png">
                </div>

                <div class="pending-activation-popup">
                    <img width="70" class="img-fluid mb-3" src="/assets/website/images/greencheck.svg">
                    <h3 class="text-center medium d-block lh-normal mb-0">Pending card activation</h3>
                    <p class="mt-2 mb-3 regular textcolor">Your virtual card requires to be activated by the account administrator</p>
                    <RouterLink to="/card-activation" class="cap_btn large_btn mb-0 m-auto">Go Back</RouterLink>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
  export default {
    name: "pending-activation",
   
    data() {
      return {
        pageLoader: false,
      };
    },
  };
</script>
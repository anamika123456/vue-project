<template>
    <div>
        <div class="mid_scroll_content">
            <div class="pageContent border-0">
                <div class="bg-white border round-sm p-3 p-md-4 p-xl-5 no-cards position-relative mh-calc d-flex align-items-center justify-content-center">
                    <img class="img-fluid bottom-shape z-index-0" src="/assets/website/images/bottomshape.png">
                    <div class="row justify-content-center align-items-center mh-100 z-index-1">
                        <div class="col-lg-8 col-xl-6">
                            <div class="content-sec">
                                <h1 class="mb-2 lh-1">No Card Available</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis ultricies metus sit amet tristique. Vestibulum et eros in libero rhoncus elementum in eu libero. In hac habitasse platea dictumst. Aliquam vulputate quam leo, sit amet suscipit sem porttitor a. Vestibulum vehicula leo accumsan libero laoreet pretium. </p>

                                <RouterLink class="cap_btn large_btn mt-4 helpTopicsBtn" to="/card-features"> <feather class="mr-1" type="plus-circle"></feather>Add Card</RouterLink>
                            </div>
                        </div>
                        <div class="col-lg-4 col-xl-4">
                            <div class="img-wrap">
                                <img class="img-fluid" src="/assets/website/images/cardsimg.png">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import { RouterLink } from 'vue-router';

  export default {
    name: "no-cards",
   
    data() {
      return {
        pageLoader: false,
      };
    },
  };
</script>
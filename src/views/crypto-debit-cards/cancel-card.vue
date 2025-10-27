<template>
    <div>
        <div class="mid_scroll_content">
            <div class="pageContent border-0">
                <div class="add-card-main">
                    <div class="addCards activation topup bg-white border round-sm">
                        <h4 class="mb-4 pb-3 border-bottom">Cancel Card</h4>
                        <div class="row justify-content-between flex-column-reverse flex-lg-row">

                            <div class="col-lg-6 col-xxxl-5 position-static">
                                <div class="content-sec">
                                    <p class="mb-4 mt-3">What is the reason for cancelling the card?</p>

                                    <form>
                                        <div class="form-group">
                                            <select class="form-control" name="reason">
                                                <option value="" selected disabled>Select Reason</option>
                                                <option value="I have lost it">I have lost it</option>
                                                <option value="It’s stolen">It’s stolen</option>
                                                <option value="There has been fradulent transactions">There has been
                                                    fradulent transactions</option>
                                                <option value="Other reason">Other reason</option>
                                            </select>
                                        </div>

                                        <div class="form-group">
                                            <input type="text" placeholder="Enter Other Reason" class="form-control" />
                                        </div>

                                        <button type="submit" class="cap_btn large_btn mb-0">Submit</button>
                                    </form>
                                </div>

                            </div>

                            <div class="col-lg-5 col-xxl-5">
                                <div class="sliderSec text-center mb-4 mb-lg-0">
                                    <div id="carouselExampleIndicators" class="carousel slide card-slider mt-3"
                                        data-ride="carousel">
                                        <ol class="carousel-indicators">
                                            <li data-target="#carouselExampleIndicators" data-slide-to="0"
                                                class="active"></li>
                                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                        </ol>
                                        <div class="carousel-inner blur">
                                            <div class="carousel-item active ">
                                                <img class="d-block w-100"
                                                    src="/assets/website/images/slidercard-front.png" alt="First slide">
                                            </div>
                                            <div class="carousel-item">
                                                <img class="d-block w-100"
                                                    src="/assets/website/images/slidercard-back.png" alt="Second slide">
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        class="cap_btn border-btn-secondary extra_small_btn f-16 text-nowrap mx-auto">Show
                                        Card Details</button>

                                    <h2 class="green text-center semibold mb-1 mt-4 pt-2">156,854.69 USD</h2>
                                    <h6 class="semibold textcolor mb-3">Available Balance</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="modal" tabindex="-1" id="cancelInvoice" role="dialog" aria-hidden="true" >
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body text-center">
                        <div class="img-wrap mt-4">
                            <img width="65" height="65" class="img-fluid" src="/assets/website/images/checkIcon.svg" alt="check icon">
                        </div>
                        <h3 class="text-center medium d-block lh-normal mb-4 pb-2 mt-4">Your Debit Card is cancelled now.</h3>
                        <RouterLink to="/card-dashboard-cancelled" class="cap_btn large_btn mb-4 mx-auto">Okay</RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    import { RouterLink } from 'vue-router';

    export default {
        name: "cancel-card",

        data() {
            return {
                pageLoader: false,
            };
        },
    };
</script>
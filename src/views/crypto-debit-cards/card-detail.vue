<template>
    <div>
        <!-- Loading Modal -->
      <div id="loading-modal" class="modal">
        <div class="modal-content">
          <div class="loader"></div>
        </div>
      </div>

      <!-- Success Modal -->
      <div id="success-modal" class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <p>Card details loaded</p>
        </div>
      </div>

      <!-- Error Modal -->
      <div id="error-modal" class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <p>Sorry, there was an error displaying card details. Please try again later.</p>
        </div>
      </div>

      <!-- <div id="myModal" class="modal">
        <div class="modal-content">
          <span class="close" onclick="closeModal()">&times;</span>
          <h6 class="themecolor mt-4 mb-0 text-center">Please enter your 6-digit PIN:(Eg: 123456)</h6>
          <form id="myForm">
            <div class="otp-container">
              <input type="number" id="digit1" maxlength="1" pattern="[0-9]" onkeyup="moveToNext(this, 'digit2')"
                oninput="checkInputs()" required value="1">
              <input type="number" id="digit2" maxlength="1" pattern="[0-9]" onkeyup="moveToNext(this, 'digit3')"
                oninput="checkInputs()" required value="2">
              <input type="number" id="digit3" maxlength="1" pattern="[0-9]" onkeyup="moveToNext(this, 'digit4')"
                oninput="checkInputs()" required value="3">
              <input type="number" id="digit4" maxlength="1" pattern="[0-9]" onkeyup="moveToNext(this, 'digit5')"
                oninput="checkInputs()" required value="4">
              <input type="number" id="digit5" maxlength="1" pattern="[0-9]" onkeyup="moveToNext(this, 'digit6')"
                oninput="checkInputs()" required value="5">
              <input type="number" id="digit6" maxlength="1" pattern="[0-9]" oninput="checkInputs()" required value="6">
            </div>
            <div class="text-center">
              <button class="cap_btn large_btn mt-1 mx-auto" type="submit" id="submitButton">Submit</button>
            </div>
          </form>
        </div>
      </div> -->

      <div class="modal" tabindex="-1" id="myModal" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header border-0 d-block text-right p-3">
                    <span class="close" onclick="closeModal()"><feather type="x" size="22px"></feather></span>
                </div>
                <div class="modal-body text-center">
                  <h5 class="themecolor mb-1 text-center">Please enter your 6-digit PIN:(Eg: 123456)</h5>
                  <form id="myForm">
                    <div class="otp-container">
                      <input type="number" id="digit1" maxlength="1" pattern="[0-9]" onkeyup="moveToNext(this, 'digit2')"
                        oninput="checkInputs()" required value="1">
                      <input type="number" id="digit2" maxlength="1" pattern="[0-9]" onkeyup="moveToNext(this, 'digit3')"
                        oninput="checkInputs()" required value="2">
                      <input type="number" id="digit3" maxlength="1" pattern="[0-9]" onkeyup="moveToNext(this, 'digit4')"
                        oninput="checkInputs()" required value="3">
                      <input type="number" id="digit4" maxlength="1" pattern="[0-9]" onkeyup="moveToNext(this, 'digit5')"
                        oninput="checkInputs()" required value="4">
                      <input type="number" id="digit5" maxlength="1" pattern="[0-9]" onkeyup="moveToNext(this, 'digit6')"
                        oninput="checkInputs()" required value="5">
                      <input type="number" id="digit6" maxlength="1" pattern="[0-9]" oninput="checkInputs()" required value="6">
                    </div>
                    <div class="text-center">
                      <button class="cap_btn large_btn mt-3 mx-auto" type="submit" id="submitButton">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
          </div>
      </div>
      
      <div class="customCard">
        <div class="card" :class="$parent.burn ? 'cancelled' : ($parent.freeze ? 'blocked' : '')">
          <div class="card__front card__part ">

            <img class="cancelled-img" src="/assets/website/images/cancelled-img.svg">

            <button id="show_btn" class="show_card_details" > 
              <div id="eye_open" class="eye_open">
                <svg width="16" height="12" viewBox="0 0 16 12" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.6854 5.69539C15.6627 5.6442 15.1149 4.42908 13.9054 3.21939C12.2897 1.60351 10.2476 0.74939 8.00001 0.74939C5.75239 0.74939 3.71032 1.60351 2.0947 3.21939C0.885073 4.42908 0.337323 5.6442 0.314698 5.69539C0.272081 5.79128 0.250061 5.89505 0.250061 5.99998C0.250061 6.10492 0.272081 6.20869 0.314698 6.30458C0.337385 6.3557 0.885135 7.57058 2.0947 8.78001C3.71039 10.3956 5.75239 11.2494 8.00001 11.2494C10.2476 11.2494 12.2896 10.3956 13.9053 8.78001C15.1149 7.57064 15.6626 6.3557 15.6854 6.30458C15.728 6.20869 15.75 6.10492 15.75 5.99998C15.75 5.89505 15.728 5.79128 15.6854 5.69539ZM12.8071 7.75664C11.4666 9.07895 9.84926 9.74945 8.00001 9.74945C6.15076 9.74945 4.53339 9.07895 3.19289 7.75664C2.66575 7.23508 2.21219 6.64407 1.84476 5.99995C2.21216 5.35562 2.66572 4.76441 3.19289 4.24264C4.53357 2.92001 6.15082 2.24945 8.00001 2.24945C9.8492 2.24945 11.4666 2.92008 12.8071 4.24264C13.3342 4.76437 13.7878 5.35555 14.1552 5.99983C13.7878 6.644 13.3343 7.23505 12.8071 7.75664ZM8.00001 3.24995C7.45611 3.24995 6.92443 3.41124 6.47219 3.71341C6.01996 4.01558 5.66748 4.44508 5.45934 4.94757C5.2512 5.45007 5.19674 6.003 5.30285 6.53645C5.40896 7.0699 5.67087 7.5599 6.05547 7.9445C6.44006 8.32909 6.93006 8.591 7.46351 8.69711C7.99696 8.80322 8.54989 8.74876 9.05239 8.54062C9.55489 8.33248 9.98438 7.98001 10.2866 7.52777C10.5887 7.07553 10.75 6.54385 10.75 5.99995C10.7492 5.27086 10.4592 4.57187 9.94364 4.05632C9.42809 3.54078 8.7291 3.25078 8.00001 3.24995ZM8.00001 7.24995C7.75278 7.24995 7.51111 7.17664 7.30555 7.03929C7.09999 6.90194 6.93977 6.70671 6.84516 6.47831C6.75055 6.2499 6.7258 5.99857 6.77403 5.75609C6.82226 5.51361 6.94131 5.29088 7.11613 5.11607C7.29094 4.94125 7.51367 4.8222 7.75615 4.77397C7.99862 4.72574 8.24996 4.75049 8.47836 4.8451C8.70677 4.93971 8.902 5.09993 9.03935 5.30549C9.1767 5.51105 9.25001 5.75273 9.25001 5.99995C9.24965 6.33136 9.11783 6.64909 8.88349 6.88343C8.64915 7.11778 8.33142 7.24959 8.00001 7.24995Z"
                    fill="#FFFFFF" />
                </svg>
              </div>
              <div id="eye_close" class="eye_close">
                <svg width="14" height="7" viewBox="0 0 14 7" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.404 4.25093C13.5035 4.4232 13.5304 4.62793 13.479 4.82007C13.4275 5.01222 13.3018 5.17603 13.1295 5.27549C12.9572 5.37495 12.7525 5.40189 12.5603 5.3504C12.3682 5.29891 12.2044 5.1732 12.1049 5.00093L11.0876 3.23887C10.5141 3.59648 9.89732 3.87939 9.25217 4.08074L9.57654 5.92018C9.59477 6.01763 9.5935 6.11774 9.5728 6.21469C9.55209 6.31165 9.51237 6.40355 9.45593 6.48506C9.39948 6.56657 9.32744 6.63608 9.24396 6.68957C9.16048 6.74306 9.06723 6.77946 8.96959 6.79668C8.87195 6.8139 8.77186 6.81159 8.67513 6.78988C8.57839 6.76818 8.48691 6.72751 8.40599 6.67022C8.32507 6.61294 8.25631 6.54017 8.20369 6.45615C8.15106 6.37212 8.11563 6.27849 8.09942 6.18068L7.78361 4.3898C7.09967 4.47037 6.40862 4.47016 5.72473 4.38918L5.40904 6.17993C5.37363 6.375 5.26242 6.54811 5.09973 6.66142C4.93704 6.77472 4.7361 6.819 4.54085 6.78457C4.34561 6.75014 4.17194 6.6398 4.05781 6.47768C3.94369 6.31556 3.89841 6.11485 3.93186 5.91943L4.25629 4.07912C3.61206 3.87751 2.99618 3.59456 2.42354 3.23712L1.39954 5.01074C1.30009 5.18301 1.13627 5.30871 0.944135 5.36019C0.751998 5.41168 0.547279 5.38473 0.375012 5.28527C0.202746 5.18582 0.0770441 5.022 0.0255595 4.82986C-0.0259251 4.63773 0.00102502 4.43301 0.100481 4.26074L1.21642 2.32787C0.840194 1.98876 0.491474 1.62033 0.173544 1.22605C0.0504833 1.07114 -0.00638302 0.87388 0.0153302 0.677232C0.0370435 0.480585 0.135577 0.300482 0.289471 0.17615C0.443365 0.0518182 0.640152 -0.00667018 0.836971 0.0134232C1.03379 0.0335165 1.2147 0.130564 1.34029 0.283429C2.32317 1.49999 4.06061 2.95012 6.75698 2.95012C9.45323 2.95012 11.1907 1.49999 12.1736 0.283491C12.2352 0.205965 12.3115 0.1414 12.3982 0.0935213C12.4848 0.0456425 12.5801 0.0153971 12.6785 0.00453062C12.777 -0.00633587 12.8766 0.00239143 12.9716 0.0302088C13.0666 0.0580261 13.1552 0.104383 13.2322 0.166605C13.3092 0.228827 13.3731 0.305684 13.4203 0.39274C13.4675 0.479796 13.4969 0.575329 13.507 0.673828C13.517 0.772327 13.5075 0.871843 13.4789 0.966634C13.4503 1.06142 13.4032 1.14961 13.3404 1.22612C13.0218 1.62126 12.6722 1.99043 12.295 2.33012L13.404 4.25093Z"
                    fill="#FFFFFF" />
                </svg>
              </div>
            </button>
            
             <div class="inner-box w-100">
               <!-- <img class="card__front-square card__square" src="/assets/website/images/white-logo.svg"> -->
               <p id="striga" class="card_numer" />
               <div class="card__space-50">
                 <span class="card__label">Card holder {{cardFu}} </span>
                 <p class="card__info">{{card_account_details.name}}</p>
               </div>
               <div class="card__space-25">
                 <span class="card__label">Cvv</span>
                 <p id="cvv" class="cvv__info" />
               </div>
               <div class="card__space-25">
                 <span class="card__label">Expires</span>
                 <p class="card__info">{{ momentFunc(card_account_details.expiryData,"MM/YYYY","")}}</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
    var card_account_details1 = {};
    import { cardsMixins } from "@/plugins/cards";
    export default {
        name: "card-dashboard",
        mixins: [cardsMixins],
        data() {
          return {
            pageLoader: false,
          };
        },
        props:['card_account_details', 'page'],
        computed:{
          cardFu(){
            card_account_details1 = this.card_account_details
          }
        },
        mounted: function() {
          console.log('this.envFile===',this.envFile)
          var btn = document.getElementsByTagName("button")[0];
          var span = document.getElementsByClassName("close")[0];
          

          // !! NOTE !! - API VARs should be added in server side
          const STRIGA_API_SECRET =  this.envFile.VITE_STRIGA_API_SECRET;
          const STRIGA_API_KEY = this.envFile.VITE_STRIGA_API_KEY;
          let AUTH_TOKEN = "";

          // iframe VARs
          const STRIGA_UI_SECRET = this.envFile.VITE_STRIGA_UI_SECRET;
          const STRIGA_APPLICATION_ID = this.envFile.VITE_STRIGA_APPLICATION_ID;
          const USER_ID = this.$parent.getCardDetails.userId;
          const CARD_ID = this.$route.query.cardId;

          let CHALLENGE_ID = "";
          const fontStyle = {
            "word-spacing": "4px",
            "font-size": "16px",
            "letter-spacing": "2px",
            color: "#fff",
            "text-align": "center",
            "font-weight": "bold",
            fontUrl:
              "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;400;500;600&display=swap",
            "font-family": "Source Code Pro"
          };

          // When the user clicks on <span> (x), close the modal
          function closeModal() {
            var modal = document.getElementById("myModal");
            modal.style.display = "none";
          }

          // When the user clicks the button, open the modal
          function openModal() {
            var modal = document.getElementById("myModal");
            modal.style.display = "block";
          }

          function checkInputs() {
            var allFilled = true;
            var inputs = document.querySelectorAll("#myModal input[type='number']");

            inputs.forEach(function (input) {
              if (input.value.length === 0) {
                allFilled = false;
              }
            });
            if (allFilled) {
              var submitButton = document.querySelector("#submitButton");
              submitButton.disabled = false;
            } else {
              var submitButton = document.querySelector("#submitButton");
              submitButton.disabled = true;
            }
          }

          // Move to the next input field
          function moveToNext(current, next) {
            if (current.value.length === 1) {
              document.getElementById(next)?.focus();
            } else {
              current.value = current.value.slice(0, 1); // remove any extra characters
            }
          }

          // Submit the PIN
          function submitPin() {
            var pin = "";
            var inputs = document.querySelectorAll("#myModal input[type='number']");

            for (var i = 0; i < inputs.length; i++) {
              pin += inputs[i].value;
            }

            alert("PIN submitted: " + pin);
            closeModal();
          }

          /*
            !! NOTE !!
            "submitPinAPI" - This is just added to call the Striga SERVER API for DEMO purpose, to Implement in your product NEVER call it from frontend it should be Implemented on SERVER side.

            NEVER STORE STRIGA KEYS IN THE FRONTEND.
          */
          async function submitPinAPI(onSuccess = () => { }) {
            var pin = "";
            var inputs = document.querySelectorAll("#myModal input[type='number']");

            for (var i = 0; i < inputs.length; i++) {
              pin += inputs[i].value;
            }

            // show loading modal
            var loadingModal = document.getElementById("loading-modal");
            loadingModal.style.display = "block";

            // prepare API request
            const body = {
              userId: USER_ID,
              challengeId: CHALLENGE_ID,
              verificationCode: pin
            };

            const endpoint = "card/confirm-consent";
            const bodyString = JSON.stringify(body);
            const time = Date.now().toString();

            var requestContentHexString = CryptoJS.MD5(bodyString)
              .toString(CryptoJS.enc.Hex)
              ?.toLowerCase();

            const signatureRawData = `${time}POST/${endpoint}${requestContentHexString}`;
            var secretByteArray = STRIGA_API_SECRET;

            var requestSignaturHexString = CryptoJS.HmacSHA256(
              signatureRawData,
              secretByteArray
            ).toString(CryptoJS.enc.Hex);
            var authorizationHeader = `HMAC ${time}:${requestSignaturHexString}`;

            fetch(`https://www.sandbox.striga.com/api/v1/${endpoint}`, {
              method: "POST",
              headers: {
                Authorization: authorizationHeader,
                "api-key": STRIGA_API_KEY,
                "Content-Type": "application/json"
              },
              body: JSON.stringify(body)
            })
              .then((response) => response.json())
              .then((data) => {
                // hide loading modal
                loadingModal.style.display = "none";

                // display success message
                var successModal = document.getElementById("success-modal");
                successModal.style.display = "block";

                // hide success message after 3 seconds
                setTimeout(function () {
                  successModal.style.display = "none";
                }, 3000);

                AUTH_TOKEN = data.cardAuthToken;
                onSuccess();
              })
              .catch((error) => {
                // hide loading modal
                loadingModal.style.display = "none";

                // display error message
                var errorModal = document.getElementById("error-modal");
                errorModal.style.display = "block";

                // hide error message after 3 seconds
                setTimeout(function () {
                  errorModal.style.display = "none";
                }, 3000);
              });
          }

          
            StrigaUXPlugin.create(STRIGA_UI_SECRET, {
              applicationId: STRIGA_APPLICATION_ID
            });
            const handleViewBtn = (isHidden = false,isCardNumber = true,isCvv = true) => {
              var showBtn = document.getElementById("show_btn");
              var cardNumber = document.getElementById("striga");
              var cvvInfo = document.getElementById("cvv");
              var iframeCvv = document.getElementById("iframecvv");

              if (isHidden) {
                iframeCvv.style.display = "none";
                showBtn.style.display = "none";
                if (isCardNumber)
                  cardNumber.style =
                    "animation: loader 3s infinite ease-in-out; -webkit-animation: loader 3s infinite ease-in-out";
                if (isCvv)
                  cvvInfo.style =
                    "animation: loader 3s infinite ease-in-out; -webkit-animation: loader 3s infinite ease-in-out";
              } else {
                showBtn.style.display = "block";
                if (iframeCvv) iframeCvv.style.display = "block";
                if (isCardNumber)
                  cardNumber.style = "animation: none; -webkit-animation: none";
                if (isCvv) cvvInfo.style = "animation: none; -webkit-animation: none";
              }
            };

            const handleEyeClick = async (isOpenModal = true) => {
              if (!AUTH_TOKEN && isOpenModal) {
                try {
                  var loadingModal = document.getElementById("loading-modal");
                  loadingModal.style.display = "block";
                  const response = await StrigaUXPlugin.requestConsent({
                    userId: USER_ID
                  });

                  if (response?.challengeId) {
                    loadingModal.style.display = "none";
                    CHALLENGE_ID = response.challengeId;
                    openModal();
                  }
                } catch (error) {
                  console.log("ERROR", error?.message);
                }
                return;
              }

              if (!AUTH_TOKEN) return;
              var showBtn = document.getElementById("show_btn");
              showBtn.disabled = true;
              var eyeOpen = document.getElementById("eye_open");
              var eyeClose = document.getElementById("eye_close");

              if (!isCardHidden) {
                handleViewBtn(false);
                eyeOpen.style.opacity = 0;
                eyeOpen.style.height = 0;
                eyeClose.style.opacity = 1;
                eyeClose.style.height = "19px";
                isCardHidden = true;
                handleShowCardDetails(true);
              } else {
                handleViewBtn(true);
                eyeOpen.style.opacity = 1;
                eyeOpen.style.height = "16px";
                eyeClose.style.opacity = 0;
                eyeClose.style.height = 0;
                isCardHidden = false;
                handleShowCardDetails(false);
              }
            };

            const handleShowCardDetails = async (isHidden = true) => {
              const _that = this;
              console.log('card_account_details1===',card_account_details1)
              /*
                    --------- STEP 3 ---------
                   Call "render" once you have the "AUTH_TOKEN" data from the "card/confirm-consent" API call then you can render the Striga UI details.

                   Currently you can render these data cardNumber, cvv, pin, 3ds
              */
              await StrigaUXPlugin.render(
                "cardNumber",
                {
                  cardId: CARD_ID,
                  hideData: isHidden,
                  authToken: AUTH_TOKEN,
                  maskedCardNumber:   ((Object.keys(card_account_details1).length > 0) ? "**** **** **** "+card_account_details1.maskedCardNumber.substr(card_account_details1.maskedCardNumber.length - 4) : ''),
                  enableCardNumberCopy: true,
                  style: {
                      "margin-bottom": "0px",
                      "margin-right": "16px",
                    ...fontStyle
                  },
                  copyButtonSvgIcon:`<svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5859 22H7.125C5.40182 22 4 20.5982 4 18.875V8.28906C4 6.56589 5.40182 5.16406 7.125 5.16406H14.5859C16.3091 5.16406 17.7109 6.56589 17.7109 8.28906V18.875C17.7109 20.5982 16.3091 22 14.5859 22ZM7.125 6.72656C6.26349 6.72656 5.5625 7.42755 5.5625 8.28906V18.875C5.5625 19.7365 6.26349 20.4375 7.125 20.4375H14.5859C15.4474 20.4375 16.1484 19.7365 16.1484 18.875V8.28906C16.1484 7.42755 15.4474 6.72656 14.5859 6.72656H7.125ZM20.8359 16.9219V5.125C20.8359 3.40182 19.4341 2 17.7109 2H9.03906C8.60754 2 8.25781 2.34973 8.25781 2.78125C8.25781 3.21277 8.60754 3.5625 9.03906 3.5625H17.7109C18.5724 3.5625 19.2734 4.26349 19.2734 5.125V16.9219C19.2734 17.3534 19.6232 17.7031 20.0547 17.7031C20.4862 17.7031 20.8359 17.3534 20.8359 16.9219Z" fill="#fff"/>
                  </svg>`
                },
                (data) => {
                  console.log("UX CardNumber status", data);
                  if (data?.error) {
                    var showBtn = document.getElementById("show_btn");
                    showBtn.disabled = true;
                    handleEyeClick(true);
                  }
                  if (!data?.error) {
                    handleViewBtn(false, true, false);
                  }
                }
              );
              await StrigaUXPlugin.render(
                "cvv",
                {
                  id: "cvv",
                  cardId: CARD_ID,
                  authToken: AUTH_TOKEN,
                  hideData: isHidden,
                  style: {
                    ...fontStyle,
                    width: "100%",
                    display: "flex",
                    "justify-content": "end",
                    "margin-bottom": "0",
                    "font-size": "16px",
                    "letter-spacing": "1px",
                    "text-transform": "uppercase",
                    "font-weight": "normal"
                  }
                },
                (data) => {
                  var showBtn = document.getElementById("show_btn");
                  showBtn.disabled = false;
                  console.log("UX CVV status", data);
                  if (!data?.error) {
                    handleViewBtn(false, false, true);
                  }
                }
              );
            };

            let isCardHidden = true;
           
            // showBtn.disabled = true;
            // handleShowCardDetails();

             setTimeout(function() { 
                // Get the close button element
                var closeButton = document.querySelector("#myModal .close");

                // Add a click event listener to the close button
                closeButton?.addEventListener("click", function () {
                  handleEyeClick(false);
                  closeModal();
                });

                var showBtn = document.getElementById("show_btn");
                showBtn.disabled = true;
                handleShowCardDetails();

                showBtn?.addEventListener("click", handleEyeClick, false);

                var submitButton = document.querySelector("#submitButton");
                submitButton?.addEventListener("click", async () => {
                  event.preventDefault();
                  closeModal();
                  if (CHALLENGE_ID) submitPinAPI(() => handleEyeClick(false));
                });
            }, 3000);

      
    
        }
    };

    
 </script>

<style  scoped>
    .card {
      width: 320px;
      height: 190px;
      -webkit-perspective: 600px;
      -moz-perspective: 600px;
      perspective: 600px;

    }

    .card__part {
      /* box-shadow: 1px 1px #aaa3a3; */
      top: 0;
      position: absolute;
      z-index: 1000;
      left: 0;
      display: inline-block;
      width: 320px;
      height: 190px;
      background-image: linear-gradient(90deg, #1f1c37 , #292654);
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      border-radius: 8px;

      -webkit-transition: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      -moz-transition: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      -ms-transition: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      -o-transition: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      transition: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      -webkit-transform-style: preserve-3d;
      -moz-transform-style: preserve-3d;
      -webkit-backface-visibility: hidden;
      -moz-backface-visibility: hidden;
    }
    .cancelled .card__part, .blocked .card__part{
      background-image: linear-gradient(90deg, #818181 , #373737);
      position: relative;
    }
    .cancelled-img{
      position: absolute;
      width: 100%;
      top: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      z-index: 9;
      display: none;
    }
    .cancelled .cancelled-img{
      display: block;
    }

    .card__front {
      padding: 18px;
      -webkit-transform: rotateY(0);
      -moz-transform: rotateY(0);
    }

    .card__back {
      padding: 18px 0;
      -webkit-transform: rotateY(-180deg);
      -moz-transform: rotateY(-180deg);
    }

    .card__black-line {
      margin-top: 5px;
      height: 38px;
      background-color: #303030;
    }

    .card__logo {
      height: 16px;
    }

    .card__front-logo {
      position: absolute;
      top: 18px;
      right: 18px;
    }

    .card__square {
      border-radius: 5px;
      height: 30px;
    }

    .card_numer {
      margin-top: 20px;
      height: 29px;
    }

    .card__space-50 {
      width: 50%;
      float: left;
      display: flex;
      align-items: start;
      flex-direction: column;
      justify-content: center;
    }

    .card__space-25 {
      width: 25%;
      float: right;
      display: flex;
      align-items: end;
      flex-direction: column;
      justify-content: center;
    }

    .card__label {
      font-size: 10px;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.8);
      letter-spacing: 1px;
    }

    .card__info {
      margin-bottom: 0;
      margin-top: 5px;
      font-size: 14px;
      line-height: 18px;
      color: #fff;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .cvv__info {
      margin-bottom: 0;
      margin-top: 5px;
      height: 29px;
      width: 80%;
    }

    .show_card_details {
      position: absolute;
      z-index: 1000;
      right: -16px;
      top: -12px;
      border: 0;
      box-shadow: 0px 4px 8px -4px rgba(16, 26, 33, 0.2);
      width: 32px;
      height: 32px;
      background: var(--secondarycolor);
      border-radius: 16px;
      justify-content: center;
      align-items: center;
    }

    .eye_open {
      opacity: 0;
      height: 0;
    }

    .eye_close {
      opacity: 1
    }

    /* Modal */
    .modal {
      display: none;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0, 0, 0, 0.4);
    }

    /* Modal Content */
    .modal-content {
      position: relative;
      background-color: #fefefe;
      margin: 15% auto;
      padding: 20px;
      border: 1px solid #888;
      width: 90%;
      max-width: 500px;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
    }

    /* Close Button */
    .close {
      color: #aaaaaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
      padding: 10px;
      line-height: 1;
    }

    .close:hover,
    .close:focus {
      color: #000;
      text-decoration: none;
      cursor: pointer;
    }

    /* OTP Container */
    .otp-container {
      display: flex;
      justify-content: space-between;
      margin: 20px 0px;
    }

    .otp-container input[type="number"] {
      width: 40px;
      height: 40px;
      font-size: 28px;
      text-align: center;
      border: none;
      border-bottom: 2px solid #ddd;
      margin-right: 10px;
      outline: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      margin: 0;
    }

    .otp-container input[type="number"]:focus {
      border-bottom: 2px solid var(--secondarycolor);
    }

    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    @media (max-width: 767px) {
      .modal-content {
        margin: 25% auto;
      }

      .otp-container {
        flex-wrap: wrap;
      }

      .otp-container input[type="number"] {
        width: 50px;
        height: 50px;
        font-size: 36px;
        margin-right: 0px;
        margin-bottom: 10px;
      }
    }

    

    @keyframes loader {
      0% {
        background-color: rgba(165, 165, 165, 0.1);
      }

      50% {
        background-color: rgba(165, 165, 165, 0.3);
      }

      100% {
        background-color: rgba(165, 165, 165, 0.1);
      }
    }

    @-webkit-keyframes loader {
      0% {
        background-color: rgba(165, 165, 165, 0.1);
      }

      50% {
        background-color: rgba(165, 165, 165, 0.3);
      }

      100% {
        background-color: rgba(165, 165, 165, 0.1);
      }
    }

    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 28px;
      font-weight: bold;
      color: #aaa;
      cursor: pointer;
    }

    .close:hover,
    .close:focus {
      color: #000;
      text-decoration: none;
      cursor: pointer;
    }

    /* Loading modal styles */
    .loader {
      border: 5px solid #f3f3f3;
      border-top: 5px solid #3498db;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      animation: spin 2s linear infinite;
      margin: 0 auto;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }

    /* Success modal styles */
    .success-modal {
      color: #4CAF50 !important;
    }

    .success-modal .modal-content {
      background-color: #f2f2f2;
      color: #4CAF50 !important;
      text-align: center;
    }

    /* Error modal styles */
    .error-modal {
      color: #f44336 !important;
    }

    .error-modal .modal-content {
      background-color: #f2f2f2;
      color: #f44336;
      text-align: center !important;
    }

    .error-modal p {
      margin: 0;
      padding: 10px;
    }

</style>
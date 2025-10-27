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

      <div id="myModal" class="modal">
        <div class="modal-content">
          <span class="close" onclick="closeModal()">&times;</span>
          <h2>Please enter your 6-digit PIN:(Eg: 123456)</h2>
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
            <button class="otp-button" type="submit" id="submitButton">Submit</button>
          </form>
        </div>
      </div>
      
      <div class="card " >
        <div class="card__front card__part ">
         
          <!-- <img class="card__front-square card__square" src="/assets/website/images/white-logo.svg"> -->
          <p  class="card_numer card__info" id="striga" >**** **** **** ****</p>
          <div class="card__space-50">
            <span class="card__label">Card holder </span>
            <p class="card__info">XX</p>
          </div>
          <div class="card__space-25">
            <span class="card__label">Cvv</span>
            <p  class="cvv__info card__info" id="cvv">***</p>
          </div>
          <div class="card__space-25">
            <span class="card__label">Expires</span>
            <p class="card__info">**/****</p>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
    import { cardsMixins } from "@/plugins/cards";
    export default {
        name: "card-dashboard",
        mixins: [cardsMixins],
        data() {
          return {
            pageLoader: false,
          };
        },
        computed:{
          
        },
       
    };

    
 </script>

<style  scoped>
    * {
      box-sizing: border-box;
      font-family: 'Space Mono', monospace;
    }

    body,
    html {
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
    }

    body {
      display: flex;
      justify-content: center;
      align-items: center;
      display: -webkit-flex;
      -webkit-align-items: center;
      -webkit-justify-content: center;
      background-image: linear-gradient(to right top, #a2beeb, #8ecfee, #8edde5, #a4e7d5, #c7eec7);
      flex-direction: column;
      -webkit-flex-direction: column;
    }

    .card {
      width: 320px;
      height: 190px;
      -webkit-perspective: 600px;
      -moz-perspective: 600px;
      perspective: 600px;

    }

    .card__part {
      box-shadow: 1px 1px #aaa3a3;
      top: 0;
      position: absolute;
      z-index: 1000;
      left: 0;
      display: inline-block;
      width: 320px;
      height: 190px;
      background-image: linear-gradient(90deg, #18C0C0 0%, #0564A7 100%);
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
      font-size: 16px;
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
      background: #3F3F3E;
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
      border-bottom: 2px solid #007bff;
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

    /* Submit Button */
    .otp-button {
      background-color: #007bff;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .otp-button:hover {
      background-color: #0062cc;
    }

    .otp-button:focus {
      outline: none;
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
      color: #4CAF50;
    }

    .success-modal .modal-content {
      background-color: #f2f2f2;
      color: #4CAF50;
      text-align: center;
    }

    /* Error modal styles */
    .error-modal {
      color: #f44336;
    }

    .error-modal .modal-content {
      background-color: #f2f2f2;
      color: #f44336;
      text-align: center;
    }

    .error-modal p {
      margin: 0;
      padding: 10px;
    }

</style>
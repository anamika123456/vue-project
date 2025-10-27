import Vue from "vue";
import { createRouter, createWebHistory } from "vue-router";
import store from "../store/store.js";
import website from "@/views/index.vue";

import card_steps from "@/views/cards/card_steps.vue";
import all_user_card_list from "@/views/cards/all_user_card_list.vue";
//=================================reg_step=============================
import email_step from "@/views/registerSteps/email_step.vue";
import otp_step from "@/views/registerSteps/otp_step.vue";
import password_step from "@/views/registerSteps/password_step.vue";
import getting_started_landing from "@/views/registerSteps/account-verification/getting_started_landing.vue";
import verification_steps from "@/views/registerSteps/account-verification/verification_steps.vue";
//=================================security=============================
import enforce2faRegister from "@/views/security/twoFaAfterLoginRegister.vue";
//=================================user=================================
import login from "@/views/user/login.vue";
// import dashboard from "@/views/user/home.vue";
import dashboard from "@/views/user/home1.vue";
import invitation from "@/views/user/invitation.vue";

import roleInvitation from "@/views/user/role-invitation.vue";
import reset_password from "@/views/user/reset-password.vue";
import change_password from "@/views/user/change-password.vue";
import forgot_password from "@/views/user/forgot_password.vue";
import security from "@/views/user/security.vue";
import unSubscribe from "@/views/user/Unsubscribe.vue";
//=================================payout===============================
import payouts from "@/views/payouts/payouts.vue";
//=================================payment==============================
import deposits from "@/views/deposits/deposits.vue"; 
//=================================support==============================
import view from "@/views/supports/view.vue";
import help_centre from "@/views/supports/help-centre.vue";
//=================================wallet================================
import wallets from "@/views/wallet/wallets.vue";
//=================================conversion============================
import conversions from "@/views/conversion/conversions.vue";
//=================================transaction_history===================
import transaction_history from "@/views/transaction-history/transaction-history.vue";
//=================================settings==============================
import settings from "@/views/settings/settings.vue";
//=================================developer api=========================
import developers_api from "@/views/api-developer/developers_api.vue";
//=================================invoice===============================
import invoice from "@/views/invoice/invoice.vue";
import create_invoice from "@/views/invoice/create-invoice.vue";
//=================================pos===================================
import pos from "@/views/pos/pos.vue";
//=================================notifications===================================
import notifications from "@/views/notifications/notifications.vue";
//=================================notifications===================================
import user_activity from "@/views/user-activity/user-activity.vue";
import chartsPage from "@/views/chart/chartsPage.vue";

import cards from "@/views/crypto-debit-cards/cards.vue";
import card_steps1 from "@/views/crypto-debit-cards/card_steps.vue";
import noCards from "@/views/crypto-debit-cards/no-cards.vue";

import applyOwnCard from "@/views/crypto-debit-cards/apply-own-card.vue";
import verifyAddress from "@/views/crypto-debit-cards/verify-address.vue";
import kycVerification from "@/views/crypto-debit-cards/upgrade-limit-kyc.vue";
import cardActivation from "@/views/crypto-debit-cards/card-activation.vue";
import confirmExistingUser from "@/views/crypto-debit-cards/confirm-existing-user.vue";
import cardDashboard from "@/views/crypto-debit-cards/card-dashboard.vue";
import cardTopUp from "@/views/crypto-debit-cards/card-top-up.vue";
import manageCard from "@/views/crypto-debit-cards/manage-card.vue";
import cancelCard from "@/views/crypto-debit-cards/cancel-card.vue";
import cardLimits from "@/views/crypto-debit-cards/card-limits.vue";
import cardDashboardCancelled from "@/views/crypto-debit-cards/card-dashboard-cancelled.vue";
import upgradeLimit from "@/views/crypto-debit-cards/upgrade-limit.vue";
import cardWithdraw from "@/views/crypto-debit-cards/card-withdraw.vue";
import pendingActivation from "@/views/crypto-debit-cards/team-invite-flow/pending-activation.vue";
import welcome from "@/views/welcome.vue";


const routes = [
  { path: "/", name: "login", component: login },
  { path: "/forgot-password", name: "forgot_password", component: forgot_password },
  { path: "/register", name: "email_step", component: email_step },
  { path: "/otp-step", name: "otp_step", component: otp_step },
  { path: "/password-step", name: "password_step", component: password_step },
  { path: "/invitation", name: "invitation", component: invitation, props: true },
  { path: "/crypto-debit-cards/invitation", name: "roleInvitation", component: roleInvitation, props: true },
  { path: "/forgot/password/:hash?", name: "reset_password", component: reset_password },  
  { path: "/welcome", name: "welcome", component: welcome },  

  {
    path: "/", 
    component: website,
    children: [
    
      { path: "/card-steps", name: "card_steps", component: card_steps },
      { path: "/card-steps1", name: "card_steps1", component: card_steps1 },
      
      { path: "/card-list", name: "all_user_card_list", component: all_user_card_list },
      { path: "/charts", name: "chartsPage", component: chartsPage },
      { path: "/unsubscribe", name: "unSubscribe", component: unSubscribe }, 
      { path: "/2fa-screen", name: "enforce2faRegister", component: enforce2faRegister },
      { path: "/getting-started-landing-page", name: "getting_started_landing", component: getting_started_landing },
      { path: "/verification-steps", name: "verification_steps", component: verification_steps },
      // { path: "/dashboard", name: "dashboard", component: dashboard },
       { path: "/dashboard", name: "dashboard", component: dashboard },
      { path: "/change-password", name: "change_password", component: change_password },
      { path: "/wallets", name: "wallets", component: wallets },
      { path: "/help-centre", name: "help_centre", component: help_centre },
      { path: "/view", name: "view", component: view, props: true },
      { path: "/deposits", name: "deposits", component: deposits },
      { path: "/transaction-history", name: "transaction-history", component: transaction_history },
      { path: "/settings", name: "settings", component: settings },
      { path: "/payouts", name: "payouts", component: payouts },
      { path: "/security", name: "security", component: security },
      { path: "/conversions", name: "conversions", component: conversions },
      { path: "/developers-api", name: "developers_api", component: developers_api },
      { path: "/invoice", name: "invoice", component: invoice },
      { path: "/create-invoice", name: "create_invoice", component: create_invoice },
      { path: "/pos", name: "pos", component: pos },
      { path: "/notifications", name: "notifications", component: notifications },
      { path: "/user-activity", name: "user_activity", component: user_activity },

      { path: "/crypto-debit-cards", name: "cards", component: cards },
      { path: "/no-cards", name: "no-cards", component: noCards },
      
      { path: "/apply-own-card", name: "apply-own-card", component: applyOwnCard },
      { path: "/verify-address", name: "verify-address", component: verifyAddress },
      { path: "/kyc-verification", name: "kyc-verification", component: kycVerification },
      { path: "/card-activation", name: "card-activation", component: cardActivation },
      { path: "/confirm-existing-user", name: "confirm-existing-user", component: confirmExistingUser },
      { path: "/card-dashboard", name: "card-dashboard", component: cardDashboard },
      { path: "/card-top-up", name: "card-top-up", component: cardTopUp },
      { path: "/manage-card", name: "manage-card", component: manageCard },
      { path: "/cancel-card", name: "cancel-card", component: cancelCard },
      { path: "/card-limits", name: "card-limits", component: cardLimits },
      { path: "/card-dashboard-cancelled", name: "card-dashboard-cancelled", component: cardDashboardCancelled },
      { path: "/upgrade-limit", name: "upgrade-limit", component: upgradeLimit },
      { path: "/card-withdraw", name: "card-withdraw", component: cardWithdraw },
      { path: "/pending-activation", name: "pending-activation", component: pendingActivation },


      

    ],
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), routes, scrollBehavior(to, from, savedPosition) {
    if (to.name != from.name) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      return savedPosition;
    }
  },
});

router.beforeEach((to, from, next) => {
  let userStateVariable = store.state.user;
  if (from.query.transfer || to.query.transfer) {
    let transfer = from.query.transfer
      ? from.query.transfer
      : to.query.transfer;
    localStorage.setItem("transfer_token", transfer);
  }
  window.scrollTo(0, 0);
  if (userStateVariable == "") {
    userStateVariable = {};
  }

  if ( to.name !== "login" && to.name !== "forgot_password" && to.name !== "reset_password" && to.name !== "email_step" && to.name !== "otp_step" && to.name !== "password_step" && to.name !== "invitation" && to.name !== "roleInvitation" && (userStateVariable == null || !userStateVariable.loggedIn) ) {
    next({ name: "login" });
  } else if ( to.name != "enforce2faRegister" && to.name != "enforce2faRegister" && userStateVariable && userStateVariable.loggedIn && parseInt(userStateVariable.profile.gAuthenticatorEnabled) == 0 ) {
    next({ name: "enforce2faRegister" });
  } else if (to.name == "verification_steps" && (userStateVariable != null || userStateVariable.loggedIn) && parseInt(userStateVariable.step) >= 5) {
    next({ name: "dashboard" });
  } else if ( userStateVariable !== null && userStateVariable["loggedIn"] && userStateVariable.loggedIn && (to.name == "login" || to.name == "forgot_password" || to.name == "reset_password" || to.name == "email_step" || to.name == "otp_step" || to.name == "password_step")) {
    next({ name: "dashboard" });
  } else next();
});
export default router;

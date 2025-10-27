<template>
    <section class="mid_scroll_content">
        <loader v-show="pageLoader"></loader>
        <div class="pageContent border-0">
            <div class="settingPage d-flex align-items-start justify-content-between">
                    <div class="customMax border-right">
                        <ul class="settingTabs">
                            <li>
                                <a @click.prevent="settingTab = 'Account'"
                                    :class="settingTab == 'Account' ? 'active' : ''"
                                    href="javascript:void(0)">Account</a>
                            </li>
                            <li :class="(parseInt(get_user.is_registered) == 0) ? 'disabled' : ''">
                                <a @click.prevent="settingTab = 'legaldetails'"
                                    :class="settingTab == 'legaldetails' ? 'active' : ''"
                                    href="javascript:void(0)">Legal Entity Details</a>
                            </li>
                            <li :class="(parseInt(get_user.is_registered) == 0) ? 'disabled' : ''">
                                <a @click.prevent="settingTab = 'representative'"
                                    :class="settingTab == 'representative' ? 'active' : ''"
                                    href="javascript:void(0)">Representative</a>
                            </li>
                            <li :class="(parseInt(get_user.is_registered) == 0) ? 'disabled' : ''">
                                <a @click.prevent="settingTab = 'beneficialowners'"
                                    :class="settingTab == 'beneficialowners' ? 'active' : ''"
                                    href="javascript:void(0)">Beneficial Owners</a>
                            </li>

                            <li :class="(parseInt(get_user.is_registered) == 0) ? 'disabled' : ''">
                                <a @click.prevent="settingTab = 'documents'"
                                    :class="settingTab == 'documents' ? 'active' : ''"
                                    href="javascript:void(0)">Documents</a>
                            </li>
                            
                            <li :class="(parseInt(get_user.settings.fiat_payout) == 0) ? 'disabled' : ''">
                                <a @click.prevent="settingTab = 'fiatpayout'"
                                    :class="settingTab == 'fiatpayout' ? 'active' : ''"
                                    href="javascript:void(0)">Fiat Payout</a>
                            </li>
                            
                            
                            <li>
                                <a @click.prevent="settingTab = 'Security'"
                                    :class="settingTab == 'Security' ? 'active' : ''"
                                    href="javascript:void(0)">Security</a>
                            </li>
                            <li>
                                <a @click.prevent="settingTab = 'devicemanager'"
                                    :class="settingTab == 'devicemanager' ? 'active' : ''"
                                    href="javascript:void(0)" >Device Manager</a>
                            </li>
                            <li v-if="parseInt(get_user.lead_type) == 1">
                                <a @click.prevent="settingTab = 'developersapi'"
                                    :class="settingTab == 'developersapi' ? 'active' : ''"
                                    href="javascript:void(0)" data-toggle="modal" data-target="#developer-api" >Developers API</a>
                            </li>
                            <!-- <li>
                                <a @click.prevent="settingTab = 'notifications'"
                                    :class="settingTab == 'notifications' ? 'active' : ''"
                                    href="javascript:void(0)" data-toggle="modal" data-target="#notifications" >Notifications</a>
                            </li> -->
                            

                        </ul>
                    </div>
                    <div class="calcWidth">
                        <app-account v-if="settingTab == 'Account'"></app-account>
                        <app-legaldetails v-if="settingTab == 'legaldetails'"></app-legaldetails>
                         <app-representative v-if="settingTab == 'representative'"></app-representative>
                        <app-beneficialowners v-if="settingTab == 'beneficialowners'"></app-beneficialowners>
                        <app-documents v-if="settingTab == 'documents'"></app-documents>
                       
                        <app-fiatpayout v-if="settingTab == 'fiatpayout'"></app-fiatpayout>
                        <app-security v-if="settingTab == 'Security'"></app-security>
                        <app-devicemanager v-if="settingTab == 'devicemanager'"></app-devicemanager>
                        <app-developersapi v-if="settingTab == 'developersapi'"></app-developersapi>
                        <app-notifications v-if="settingTab == 'notifications'"></app-notifications>
                        
                    </div>
                </div>
        </div>
    </section>
</template>

<script>
import appaccount from "./files/account.vue";
import legaldetails from "./files/legal_details.vue";
import representativeowners from "./files/representative_owners.vue";
import beneficialowners from "./files/beneficial_owners.vue";
import documents from "./files/documents.vue";
import fiatpayout from "./files/fiat_payout.vue";
import appsecurity from "./files/security.vue";
import devicemanager from "./files/device_manager.vue";
import developersapi from "./files/developers_api.vue";
import notifications from "./files/notifications.vue";

// import tradingMixins from '@/plugins/trading';
import settingsMixins from "@/plugins/settings";
export default {
    name: "Settings",
    mixins: [settingsMixins],
    data() {
        return {
            settingTab: "Account",
            pageLoader: false,
            accountTab : 1
        };
    },
    components: {
        appAccount: appaccount,
        appLegaldetails: legaldetails,
        appRepresentative: representativeowners,
        appBeneficialowners: beneficialowners,
        appDocuments: documents,
        
        appFiatpayout: fiatpayout,
       
        appSecurity: appsecurity,
        appDevicemanager: devicemanager,
        appDevelopersapi: developersapi,
        appNotifications: notifications,
    },
    methods:{
        getData(){
            this._runGetUserData({ globalParams: {}, localParams: { parameter: this } });
        }
    },
    created() {
      this.getData()
      console.log('this.$route.query===',this.$route.query)
      if (this.$route.query.settingTab) {
        this.settingTab = this.$route.query.settingTab;
        this.$router.replace({ query: "" });
      }

      if (this.$route.query.accountTab) {
        this.accountTab = this.$route.query.accountTab;
        this.$router.replace({ query: "" });
      }
    },
};
</script>

<template>
  <section class="mid_scroll_content">
    <loader v-if="pageLoader"></loader>
    <div class="pageContent border-0">
      <a href="javascript:void(0);" class="redBG round-lg text-white px-3 f-11 mr-1 py-1"  @click="applyCard('')">Apply New Card</a>
      <div class="mt-4 bg-white border round-sm">
        <div class="table-responsive scrollbar">
          <table class="table table-bordered tablecustomWidth">
            <thead>
              <tr>
                <th>Date/Time {{card_users_by_id}}</th>
                <th>Name</th>
                <th>Email</th>
                <th>Steps</th>
                <th>Currency</th>
              </tr>
            </thead>
            <tbody v-if="Object.keys(card_user).length > 0 && card_user.records.length > 0 && !pageLoader">
              <tr v-for="(val, index) in card_user.records" @click="applyCard(val.str_user_id)">
                <td>{{ momentFunc(val.created_at,"DD MMM YYYY, h:mm:ss a","deposit_list") }}</td>
                <td>{{ val.name_on_card }}</td>
                <td>{{ val.email }}</td>
                <td>{{ val.steps }}</td>
                <td>{{ val.currency }}</td>
              </tr>
            </tbody>
            <table-loader :pageloader_value="pageLoader" :type="'table'" :colspan="'8'" :listLength="card_user.count" v-else></table-loader>
          </table>
        </div>
        <pagination :totalRecords="card_user.count" :limit="pageLimit" :pageNo="page" v-if=" 'count' in card_user && card_user.count > 10"></pagination>
      </div>
    </div>
  </section>
</template>
<script>
  import { cardsMixins } from "@/plugins/cards";
  import moment from "moment";
  export default {
    name: "card-list",
    mixins: [cardsMixins],
    data() {
      return {
        pageLoader: false,
      };
    },
    methods: {
      listing() {
        let input_json = {
          'globalParams': {
            //"userId": "a19bd628-9540-4350-bc2f-4ce0356592b5"
          },
          'localParams': { "parameter": this }
        }
        this._runGetCardUser(input_json)
      },
      applyCard(getId){
        if(getId != ''){
          this.$router.push({path : '/card-steps', query:{userId: getId}})
        }else{
          this.$router.push({path : '/card-steps'})
        }
      }
    },
    created() {
      this.listing();
    },
  };
</script>
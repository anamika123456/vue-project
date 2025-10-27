<template>
    <div class="pagination d-block d-sm-flex justify-content-end border-top align-items-center rounded-0" v-if="totalRecords > 0">
      <div class="d-flex align-items-center paginationPage mr-2">      
        <p class="f-14 themecolor medium mb-0">Page {{ pageNo }} of {{ Math.ceil(totalRecords / limit) }}</p>
        <div class="selectDropMenu paginationDropMenu position-relative bg-white ml-2 ml-lg-3">
            <a href="javascript:void(0)" class="btn d-flex align-items-center border-0 textcolor selectDropMenuLink" data-toggle="dropdown">
                <span class="mr-1 f-14">{{rows}} rows per page</span>
                <feather type="chevron-down" size="16px"></feather>
            </a>
            <ul class="dropdown-menu scrollbar">
                <li @click="paginationmenu = false; $parent.page = 1; $parent.pageLimit = 10; $parent.listing(); rows = 10" >
                    <a href="javascript:void(0)" class="textcolor lh-normal">{{rows}} rows per page</a>
                </li>
                <li @click="paginationmenu = false; $parent.page = 1; $parent.pageLimit = 50; $parent.listing(); rows = 50" >
                    <a href="javascript:void(0)" class="textcolor lh-normal">50 rows per page</a>
                </li>
                <li @click="paginationmenu = false; $parent.page = 1; $parent.pageLimit = 100; $parent.listing(); rows = 100" >
                    <a href="javascript:void(0)" class="textcolor lh-normal">100 rows per page</a>
                </li>
            </ul>
        </div>
      </div>
      <paginate :page-count="Math.ceil(totalRecords/limit)" :page-range="1" :container-class="pagination" :click-handler="fetchData" :prev-text="'<'" :next-text="'>'">
      </paginate>
      <!-- <div class="d-flex ml-0 ml-sm-3 mt-2 mt-sm-0">
        <a href="javascript:void(0);" class="d-flex rounded paginationArrow themeBG justify-content-center align-items-center">
          <feather type="chevron-left" size="16" class="d-block text-white"></feather>
        </a>
        <a href="javascript:void(0);" class="d-flex rounded paginationArrow themeBG ml-2 justify-content-center align-items-center">
          <feather type="chevron-right" size="16" class="d-block text-white"></feather>
        </a>
      </div> -->
    </div>
    <!-- <div class="d-flex align-items-center justify-content-between border-top totalR p-3" v-if="totalRecords > 0">
        <p class="m-0">
            Total Records <span class="totalRecords">{{totalRecords}}</span>
        </p>
    </div> -->
  </template>
  <script>
    export default {
      name: "PAGINATION",
      data() {
        return {
          paginationmenu: false,
          rows : 10
        };
      },
      props: ["totalRecords", "limit", "pageNo"],
      methods: {
        fetchData(pageNum) {
          this.$parent.page = pageNum;
          try {
            if(this.$parent.pageName != undefined && this.$parent.pageName == 'card-dashboard'){
              this.$parent.cardTransactions('');
            }else{
              this.$parent.listing();
            }
            
          } catch (e) {}
        },
      },
    };
  </script>
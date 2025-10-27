<template>
  <div class="accountSetting bg-white round-sm">
    <loader v-if="pageLoader "></loader>
    <h4 class="mb-0 mb-0 mb-md-3 pb-3 border-bottom">Documents</h4>
    <div class="row">
      <div class="col-12 col-md-6 pt-4" v-for="list in doc_list">
        <p class="mb-2">{{ joinFunc(list.document_name) }}</p>
        <div class="d-flex justify-content-between align-items-center p-2 border rounded">
          <div class="d-flex align-items-center">
            <img src="/assets/website/images/pdfIcon.svg" class="d-block" width="40" height="40" v-if="list.extension ==  'application/pdf'" />
            <img src="/assets/website/images/document.png" class="d-block" width="40" height="40" v-else />


            <!-- <img :src="viewTicketDoc(envFile.VITE_APP_API_BASE_URL+envFile.VITE_docsLink1 + 'user&id=' + get_user.profile.user_id + '&doc=' + list.document, 'imgShow')" alt="Documents" title="View Documents" class="d-block" width="40" height="40" v-else /> -->


             <!-- <a :href="'data:'+imageType+';base64,'+imageSrc" target="_blank()" v-if="imageType != ''"> <img :src="'data:'+imageType+';base64,'+imageSrc"> </a> -->
            <div class="lightskybluebg px-3 py-1 round-lg text-center ml-3">
              <span class="d-block medium f-15" :class="
                  list.status == 0
                    ? 'blue'
                    : list.status == 1
                    ? 'blue'
                    : 'themecolor'
                ">{{ $env_var.userDocumentStatus[parseInt(list.status)] }}</span>
            </div>
          </div>
          <a href="javascript:void(0);"  @click="viewTicketDoc(envFile.VITE_APP_API_BASE_URL+envFile.VITE_docsLink1 + 'user&id=' + get_user.profile.user_id + '&doc=' + list.document)"  class="d-block" >
            <feather type="eye" size="18px" class="d-block themecolor"></feather>
          </a>
        </div>
      </div>
      <!--  <div class="col-12 col-md-6 pt-4"><p class="mb-2">Memorandum and Articles of Association</p><div class="d-flex justify-content-between align-items-center p-2 border rounded"><div class="d-flex align-items-center"><img src="/assets/website/images/documentImage.png" alt="Documents" title="View Documents" class="d-block"><div class="lightskybluebg px-3 py-1 round-lg text-center ml-3"><span class="themecolor d-block medium f-15">Submitted</span></div></div><a href="javascript:void(0);" class="d-block"><feather type="eye" size="18px" class="d-block themecolor"></feather></a></div></div><div class="col-12 col-md-6 pt-4"><p class="mb-2">Register of Shareholders</p><div class="d-flex justify-content-between align-items-center p-2 border rounded"><div class="d-flex align-items-center"><img src="/assets/website/images/documentImage.png" alt="Documents" title="View Documents" class="d-block"><div class="lightskybluebg px-3 py-1 round-lg text-center ml-3"><span class="themecolor d-block medium f-15">Submitted</span></div></div><a href="javascript:void(0);" class="d-block"><feather type="eye" size="18px" class="d-block themecolor"></feather></a></div></div> -->
      <!-- <div class="col-12 col-md-6 pt-4"><p class="mb-2">Company Bank Statement</p><div class="d-flex justify-content-between align-items-center p-2 border rounded"><div class="d-flex align-items-center"><img src="/assets/website/images/documentImage.png" alt="Documents" title="View Documents" class="d-block"><div class="d-flex justify-content-center align-items-center lightredbg px-3 py-1 round-lg text-center ml-3"><a href="javascript:void(0);" class="d-block"><feather size="18px" type="info" data-toggle="tooltip" data-placement="top" class="red pr-2 d-block" title="Insufficient Funds"></feather></a><span class="red d-block medium f-15">Rejected</span></div></div><a href="javascript:void(0);" class="d-block"><feather type="eye" size="18px" class="d-block themecolor"></feather></a></div></div> -->
    </div>
  </div>
</template>
<script>
  import settingsMixins from "@/plugins/settings";
  import {
    supportMixins
  } from "@/plugins/support";
  import moment from "moment";
  export default {
    name: "accountprofile",
    mixins: [settingsMixins, supportMixins],
    data() {
      return {
        doc_list: [],
        pageLoader: false,
      };
    },
    methods: {
     blobToImage(imageType, imageSrc){
        if(imageType == 'application/pdf'){         
            let byteCharacters = atob(imageSrc); // Decode Base64
            let byteNumbers = new Uint8Array(byteCharacters.length);

            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            let pdfBlob = new Blob([byteNumbers], { type: imageType });
            let pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl); // Opens PDF in a new tab
        }else{
            var image = new Image();
            image.src = 'data:'+imageType+';base64,' + imageSrc;

            var w = window.open("");
            w.document.write(image.outerHTML);
        }
      },
      blobToImage1(imageType, imageSrc){
        console.log('imageType, imageSrc===',imageType, imageSrc)
        this.imageType = imageType 
        this.imageSrc = imageSrc
         var image = 'data:'+imageType+';base64,' + imageSrc;
        return image;

        // var w = window.open("");
        // w.document.write(image.outerHTML);
      },
      viewTicketDoc(getDocLink,getData){
        // this.blobToImage()
        let input_json = {
          globalParams: {},
          localParams: {
            parameter: this, getDocLink: getDocLink, link: getDocLink, getData: getData
          },
        };
        this._runGetTicketDoc(input_json);
      },
      joinFunc(document_name) {
        let docName = document_name.split("_");
        return docName.join(" ");
      },
    },
    created() {
      this.doc_list = this.getUserData.documents;
    },
  };
</script>
<style>
  .documentsList label {
    color: var(--themecolor);
    text-transform: none;
  }

  .document-img-pdf img {
    width: 150px;
    height: 80px;
    object-fit: cover;
    border: 1px solid #ddd;
    padding: 5px;
    margin: 10px 0;
  }

  .document-img-pdf .pdfimg {
    width: 150px;
    object-fit: cover;
    border: 1px solid #ddd;
    padding: 5px;
    margin: 10px 0;
    overflow: hidden;
    height: 80px;
  }
</style>
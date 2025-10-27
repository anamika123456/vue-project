<template>
	<div class="verificationContent bg-white border round-md">
		<div class="modal" tabindex="-1" id="user-delete-confirmation" role="dialog" aria-labelledby="user-delete-confirmation" aria-hidden="true" v-if="modalDeletedocument != ''">
	      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
	        <div class="modal-content">
	          <div class="modal-body">
	            <h3 class="text-center medium d-block lh-normal mb-0 pt-3 pb-2">Are you sure to remove this document?</h3>
	          </div>
	          <div class="modal-footer border-0 pt-0">
	            <div class="d-flex justify-content-center w-100 pb-2">
	              <a href="javascript:void(0);" class="cap_btn large_btn border-btn mb-0" data-dismiss="modal" aria-label="Close" @click="modalDeletedocument = ''">Cancel</a>
	              <a href="javascript:void(0);" class="cap_btn large_btn mb-0 ml-3" data-toggle="modal" data-target="#user-successful-remove-message" @click="delDoc(modalDeletedocument)">Remove</a>
	            </div>
	          </div>
	        </div>
	      </div>
	    </div>
		<h3 class="mb-4 semibold">Documents Verification</h3>
		<loader v-if="pageLoader"></loader>
		<p class="mb-3">To complete the verification process, you need to upload the necessary documents below.</p>
		<p class="mb-4 mb-lg-5 pt-3 border-top">Disclaimer: When a company is older than one year from the establishment, the certificate of incumbency or good standing should not be older than 12 months.</p>
		<p class="mb-0 themecolor medium">Note: The maximum file size is 2MB (PDF, JPEG, PNG).</p>
		<div class="pt-4">
			<h3 class="mb-3 mb-sm-4 semibold">{{(parseInt(get_user.lead_type) == 1) ? 'Merchant' : 'Corporate'}} Documents</h3>

			<div class="row align-items-center">
				<div class="col-12 col-sm-5 col-md-12 col-lg-6 pb-3 pb-sm-0">
					<h6 class="themecolor mb-0">Incorporation Document <span class="red">*</span>
						<a href="javascript:void(0);" class="d-inline-block ml-1">
							<feather size="18px" type="info" data-toggle="tooltip" data-placement="top" class="textcolor" data-html="true" title="Documents like Certificate of Incorporation or Memorandum and Articles of Association will be accepted test"></feather>
						</a>
					</h6>
				</div>
				<div class="col-12 col-sm-2 col-md-4 col-lg-2 text-left text-lg-center pb-2 pb-sm-0">
					<h6 class="green mb-0" v-if="docFun('incorporation_proof')">Uploaded</h6>
					<h6 class="red mb-0" v-else>Pending</h6>
				</div>
				<div class="col-12 col-sm-5 col-md-8 col-lg-4 text-left text-sm-right" v-if="docFun('incorporation_proof')">
					<p v-for="list in getStepInfo.documents" class="mb-0">
						<p class="d-inline-flex align-items-center mb-0" v-if="list.document_name == 'incorporation_proof'">
							<a href="javascript:void(0);"  @click="viewTicketDoc(envFile.VITE_APP_API_BASE_URL+envFile.VITE_docsLink1 + 'user&id=' + get_user.profile.user_id + '&doc=' + list.document)"    class="textcolor">{{list.document_name.split('_').join(' ')}}</a>
							<a href="javascript:void(0)">
								<feather type="x-circle" size="20px" @click="modalDeletedocument =  list.id" data-toggle="modal" data-target="#user-delete-confirmation" class="ml-2 red d-block"></feather>
							</a>
						</p>
					</p>
				</div>
				<div class="col-12 col-sm-5 col-md-8 col-lg-4 text-left text-sm-right" v-else>
					<a href="javascript:void(0);" class="addFileBtn d-inline-flex">
						<div class="d-flex cap_btn border-btn pl-2 pr-3 px-lg-4 min-w-auto">
							<feather type="plus" size="15px" class="mr-2"></feather>
							<span>Add File</span>
						</div>
						<input type="file" name="incorporation_proof" id="incorporation_proof" @change="addMoreFileChange( $event.target.files[0], 'incorporation_proof' )" />
					</a>
				</div>
			</div>

			<div class="row align-items-center pt-3 pt-sm-4" v-if="parseInt(get_user.lead_type) == 1">
				<div class="col-12 col-sm-5 col-md-12 col-lg-6 pb-3 pb-sm-0">
					<h6 class="pt-3 pt-sm-0 themecolor mb-0 verifyDocsTitle">Register of Shareholders</h6>
				</div>
				<div class="col-12 col-sm-2 col-md-4 col-lg-2 text-left text-lg-center pb-2 pb-sm-0">
					<h6 class="green mb-0" v-if="docFun('shareholder_proof')">Uploaded</h6>
					<h6 class="red mb-0" v-else>Pending</h6>
				</div>
				<div class="col-12 col-sm-5 col-md-8 col-lg-4 text-left text-sm-right" v-if="docFun('shareholder_proof')">
					<p v-for="list in getStepInfo.documents" class="mb-0">
						<p class="d-inline-flex align-items-center mb-0"  v-if="list.document_name == 'shareholder_proof'">
							<a href="javascript:void(0);"  @click="viewTicketDoc(envFile.VITE_APP_API_BASE_URL+envFile.VITE_docsLink1 + 'user&id=' + get_user.profile.user_id + '&doc=' + list.document)"    class="textcolor"  >{{list.document_name.split('_').join(' ')}}</a>
							<a href="javascript:void(0)">
							    <feather type="x-circle" size="20px" @click="modalDeletedocument =  list.id" data-toggle="modal" data-target="#user-delete-confirmation" class="ml-2 red d-block"></feather>
						    </a>
						</p>
					</p>
				</div>
				<div class="col-12 col-sm-5 col-md-8 col-lg-4 text-left text-sm-right" v-else>
					<a href="javascript:void(0);" class="addFileBtn d-inline-flex">
						<div class="d-flex cap_btn border-btn pl-2 pr-3 px-lg-4 min-w-auto">
							<feather type="plus" size="15px" class="mr-2"></feather>
							<span>Add File</span>
						</div>
						<input type="file" name="shareholder_proof" id="shareholder_proof" @change="addMoreFileChange( $event.target.files[0], 'shareholder_proof' )" />	
					</a>
					
				</div>
			</div>
		</div>

		<div class="mt-4 mt-lg-5 pt-4 pt-lg-5 border-top">
			<h3 class="mb-3 mb-sm-4 semibold">Legal / Authorized Representative or Trustee’s Documents</h3>
			<div class="row align-items-center">
				<div class="col-12 col-sm-5 col-md-12 col-lg-6 pb-3 pb-sm-0">
					<h6 class="themecolor mb-0">Proof of Identification <span class="red">*</span>
						<a href="javascript:void(0);" class="d-inline-block ml-1">
							<feather size="18px" type="info" data-toggle="tooltip" data-placement="top" class="textcolor" data-html="true" title="A clear copy of one of the following documents of the Legal / Authorized Representative or Trustee: <br> 1. Passport <br> 2. Drivers License <br> 3. National Identity Card."></feather>
						</a>
					</h6>
				</div>
				<div class="col-12 col-sm-2 col-md-4 col-lg-2 text-left text-lg-center pb-2 pb-sm-0">
					<h6 class="green mb-0" v-if="docFun('representative_identification_proof')">Uploaded</h6>
					<h6 class="red mb-0" v-else>Pending</h6>
				</div>
				<div class="col-12 col-sm-5 col-md-8 col-lg-4 text-left text-sm-right" v-if="docFun('representative_identification_proof')">
					<p v-for="list in getStepInfo.documents" class="mb-0">
						<p class="d-inline-flex align-items-center mb-0" v-if="list.document_name == 'representative_identification_proof'">
							<a href="javascript:void(0);"  @click="viewTicketDoc(envFile.VITE_APP_API_BASE_URL+envFile.VITE_docsLink1 + 'user&id=' + get_user.profile.user_id + '&doc=' + list.document)"    class="textcolor">{{list.document_name.split('_').join(' ')}}</a>
							<a href="javascript:void(0)">
							    <feather type="x-circle" size="20px" @click="modalDeletedocument =  list.id" data-toggle="modal" data-target="#user-delete-confirmation" class="ml-2 red d-block"></feather>
						    </a>
						</p>
					</p>
				</div>
				<div class="col-12 col-sm-5 col-md-8 col-lg-4 text-left text-sm-right" v-else>
					<a href="javascript:void(0);" class="addFileBtn d-inline-flex">
						<div class="d-flex cap_btn border-btn pl-2 pr-3 px-lg-4 min-w-auto">
							<feather type="plus" size="15px" class="mr-2"></feather>
							<span>Add File</span>
						</div>
						<input type="file" name="representative_identification_proof" id="representative_identification_proof" @change="addMoreFileChange( $event.target.files[0], 'representative_identification_proof' )" />
					</a>
				</div>
			</div>
			<div class="row align-items-center pt-3 pt-sm-4">
				<div class="col-12 col-sm-5 col-md-12 col-lg-6 pb-3 pb-sm-0">
					<h6 class="pt-3 pt-sm-0 themecolor mb-0 verifyDocsTitle">Proof of Address <span class="red" v-if="parseInt(get_user.lead_type) == 2">*</span><a href="javascript:void(0);" class="d-inline-block ml-1">
							<feather size="18px" type="info" data-toggle="tooltip" data-placement="top" class="textcolor" data-html="true" title="Accepted Documents are: <br> <br>
								1. Utility Bill <br>
								2. Bank statement <br>
								3. Rental Agreement  <br>
								4. Certificate of Residence <br>
								5. Credit Card Statement <br><br>
								The document must be issued within the last 3 months and should contain the full name and address of the individual.">
							</feather>
						</a>
					</h6>
				</div>
				<div class="col-12 col-sm-2 col-md-4 col-lg-2 text-left text-lg-center pb-2 pb-sm-0">
					<h6 class="green mb-0" v-if="docFun('representative_address_proof')">Uploaded</h6>
					<h6 class="red mb-0" v-else>Pending</h6>
				</div>
				<div class="col-12 col-sm-5 col-md-8 col-lg-4 text-left text-sm-right" v-if="docFun('representative_address_proof')">
					<p v-for="list in getStepInfo.documents" class="mb-0">
						<p class="d-inline-flex align-items-center mb-0"  v-if="list.document_name == 'representative_address_proof'">
							<a href="javascript:void(0);"  @click="viewTicketDoc(envFile.VITE_APP_API_BASE_URL+envFile.VITE_docsLink1 + 'user&id=' + get_user.profile.user_id + '&doc=' + list.document)"    class="textcolor" >{{list.document_name.split('_').join(' ')}}</a>
							<a href="javascript:void(0)">
							   <feather type="x-circle" size="20px" @click="modalDeletedocument =  list.id" data-toggle="modal" data-target="#user-delete-confirmation" class="ml-2 red d-block"></feather>
						    </a>
						</p>
					</p>
				</div>
				<div class="col-12 col-sm-5 col-md-8 col-lg-4 text-left text-sm-right" v-else>
					<a href="javascript:void(0);" class="addFileBtn d-inline-flex">
						<div class="d-flex cap_btn border-btn pl-2 pr-3 px-lg-4 min-w-auto">
							<feather type="plus" size="15px" class="mr-2"></feather>
							<span>Add File</span>
					    </div>
						<input type="file" name="representative_address_proof" id="representative_address_proof" @change="addMoreFileChange( $event.target.files[0], 'representative_address_proof' )" />
					</a>
				</div>
			</div>
			<div class="row align-items-center pt-3 pt-sm-4" v-if="parseInt(get_user.lead_type) == 1">
				<div class="col-12 col-sm-5 col-md-12 col-lg-6 pb-3 pb-sm-0">
					<h6 class="pt-3 pt-sm-0 themecolor mb-0 verifyDocsTitle">Trust Deed / Authorisation Letter <span class="red">*</span>
						<a href="javascript:void(0);" class="d-inline-block ml-1">
							<feather size="18px" type="info" data-toggle="tooltip" data-placement="top" class="textcolor" data-html="true" title="A legal document that grants permission to a person or entity to act as a trustee on behalf of another person or entity. The authorization letter should be signed by the person or entity that has the legal authority to make such an appointment. <br> Template can be found here: <br>
							<a href='javascript:void(0);'>https://www.google.com/linktopdf</a>">
							</feather>
						</a>
					</h6>
				</div>
				<div class="col-12 col-sm-2 col-md-4 col-lg-2 text-left text-lg-center pb-2 pb-sm-0">
					<h6 class="green mb-0" v-if="docFun('representative_authorisation_letter')">Uploaded</h6>
					<h6 class="red mb-0" v-else>Pending</h6>
				</div>
				<div class="col-12 col-sm-5 col-md-8 col-lg-4 text-left text-sm-right" v-if="docFun('representative_authorisation_letter')">
					<p v-for="list in getStepInfo.documents" class="mb-0">
						<p class="d-inline-flex align-items-center mb-0" v-if="list.document_name == 'representative_authorisation_letter'">
							<a href="javascript:void(0);"  @click="viewTicketDoc(envFile.VITE_APP_API_BASE_URL+envFile.VITE_docsLink1 + 'user&id=' + get_user.profile.user_id + '&doc=' + list.document)"    class="textcolor" >{{list.document_name.split('_').join(' ')}}</a>
							<a href="javascript:void(0)">
							   <feather type="x-circle" size="20px" @click="modalDeletedocument =  list.id" data-toggle="modal" data-target="#user-delete-confirmation" class="ml-2 red d-block"></feather>
						    </a>
						</p>
					</p>
				</div>
				<div class="col-12 col-sm-5 col-md-8 col-lg-4 text-left text-sm-right" v-else>
					<a href="javascript:void(0);" class="addFileBtn d-inline-flex">
						<div class="d-flex cap_btn border-btn pl-2 pr-3 px-lg-4 min-w-auto">
							<feather type="plus" size="15px" class="mr-2"></feather>
							<span>Add File</span>
					    </div>
						<input type="file" name="representative_authorisation_letter" id="representative_authorisation_letter" @change="addMoreFileChange( $event.target.files[0], 'representative_authorisation_letter' )" />
					</a>
				</div>
			</div>
		</div>

		<div class="mt-4 mt-lg-5 pt-4 pt-lg-5 border-top" v-if="parseInt(get_user.lead_type) == 1">
			<div class="d-flex align-items-center mb-3 mb-sm-4">
				<h3 class="mb-0 semibold">Beneficial Owners Documents </h3>
				<a href="javascript:void(0);" class="d-block ml-2">
					<feather size="20px" type="info" data-toggle="tooltip" data-placement="top" class="textcolor" data-html="true" title="Please submit a document for any beneficial owners with 25% and more shareholding">
					</feather>
				</a>
			</div>
			<div class="row align-items-center">
				<div class="col-12 col-sm-5 col-md-12 col-lg-6 pb-3 pb-sm-0">
					<h6 class="themecolor mb-0">Proof of Identification <span class="red">*</span>
						<a href="javascript:void(0);" class="d-inline-block ml-1">
							<feather size="18px" type="info" data-toggle="tooltip" data-placement="top" class="textcolor" data-html="true" title="A clear copy of one of the following documents of the Director(s) and the Beneficial Owner(s): <br> 1. Passport <br> 2. Drivers License <br> 3. National Identity Card.">
							</feather>
						</a>
					</h6>
				</div>
				<div class="col-12 col-sm-2 col-md-4 col-lg-2 text-left text-lg-center pb-2 pb-sm-0">
					<h6 class="green mb-0" v-if="docFun('beneficial_identification_proof')">Uploaded</h6>
					<h6 class="red mb-0" v-else>Pending</h6>
				</div>
				<div class="col-12 col-sm-5 col-md-8 col-lg-4 text-left text-sm-right" v-if="docFun('beneficial_identification_proof')">
					<p v-for="list in getStepInfo.documents" class="mb-0">
						<p class="d-inline-flex align-items-center mb-0" v-if="list.document_name == 'beneficial_identification_proof'">
							<a href="javascript:void(0);"  @click="viewTicketDoc(envFile.VITE_APP_API_BASE_URL+envFile.VITE_docsLink1 + 'user&id=' + get_user.profile.user_id + '&doc=' + list.document)"    class="textcolor" >{{list.document_name.split('_').join(' ')}}</a>
							<a href="javascript:void(0)">
							    <feather type="x-circle" size="20px" @click="modalDeletedocument =  list.id" data-toggle="modal" data-target="#user-delete-confirmation" class="ml-2 red d-block"></feather>
						    </a>
						</p>
					</p>
				</div>
				<div class="col-12 col-sm-5 col-md-8 col-lg-4 text-left text-sm-right" v-else>
					<a href="javascript:void(0);" class="addFileBtn d-inline-flex">
						<div class="d-flex cap_btn border-btn pl-2 pr-3 px-lg-4 min-w-auto">
							<feather type="plus" size="15px" class="mr-2"></feather>
							<span>Add File</span>
						</div>
						<input type="file" name="beneficial_identification_proof" id="beneficial_identification_proof" @change="addMoreFileChange( $event.target.files[0], 'beneficial_identification_proof' )" />
					</a>
					
				</div>
			</div>
			<div class="row align-items-center pt-3 pt-sm-4">
				<div class="col-12 col-sm-5 col-md-12 col-lg-6 pb-3 pb-sm-0">
					<h6 class="pt-3 pt-sm-0 themecolor mb-0 verifyDocsTitle">Proof of Address <span class="red">*</span>
						<a href="javascript:void(0);" class="d-inline-block ml-1">
							<feather size="18px" type="info" data-toggle="tooltip" data-placement="top" class="textcolor" data-html="true" title="Accepted Documents are: <br> 1. Utility Bill <br> 2. Bank statement <br> 3. Rental Agreement  <br> 4. Certificate of Residence <br> 5. Credit Card Statement <br><br> The document must be issued within the last 3 months and should contain the full name and address of the individual."></feather>
						</a>
					</h6>
				</div>
				<div class="col-12 col-sm-2 col-md-4 col-lg-2 text-left text-lg-center pb-2 pb-sm-0">
					<h6 class="green mb-0" v-if="docFun('beneficial_address_proof')">Uploaded</h6>
					<h6 class="red mb-0" v-else>Pending</h6>
				</div>
				<div class="col-12 col-sm-5 col-md-8 col-lg-4 text-left text-sm-right" v-if="docFun('beneficial_address_proof')">
					<p v-for="list in getStepInfo.documents" class="mb-0">
						<p class="d-inline-flex align-items-center mb-0" v-if="list.document_name == 'beneficial_address_proof'">
							<a href="javascript:void(0);"  @click="viewTicketDoc(envFile.VITE_APP_API_BASE_URL+envFile.VITE_docsLink1 + 'user&id=' + get_user.profile.user_id + '&doc=' + list.document)"    class="textcolor" >{{list.document_name.split('_').join(' ')}}</a>
							<a href="javascript:void(0);">
								<feather type="x-circle" size="20px" @click="modalDeletedocument =  list.id" data-toggle="modal" data-target="#user-delete-confirmation" class="ml-2 red d-block"></feather>
						    </a>
						</p>
					</p>
				</div>
				<div class="col-12 col-sm-5 col-md-8 col-lg-4 text-left text-sm-right" v-else>
					<a href="javascript:void(0);" class="addFileBtn d-inline-flex">
						<div class="d-flex cap_btn border-btn pl-2 pr-3 px-lg-4 min-w-auto">
						  <feather type="plus" size="15px" class="mr-2"></feather>
						  <span>Add File</span>
					    </div>
						<input type="file" name="beneficial_address_proof" id="beneficial_address_proof" @change="addMoreFileChange( $event.target.files[0], 'beneficial_address_proof' )" />
					</a>
					
				</div>
			</div>
		</div>

		<div class="mt-4 mt-lg-5 pt-4 pt-lg-5 border-top">
			<h3 class="mb-3 mb-sm-4 semibold">Additional Documents</h3>
			<p class="mb-3 mb-sm-4 themecolor medium">Note: You can upload maximum 5 files.</p>
			
				<div class="row align-items-center mb-4" v-for="list in getStepInfo.documents" v-show="list.document_name.includes('additional_doc')">
					<div class="col-12 col-sm-5 col-md-12 col-lg-6 pb-3 pb-sm-0">
						<h6 class="pt-3 pt-sm-0 themecolor mb-0 verifyDocsTitle">Document {{list.document_name.split('_')[2]}} </h6>
					</div>
					<div class="col-12 col-sm-2 col-md-4 col-lg-2 text-left text-lg-center pb-2 pb-sm-0">
						<h6 class="green mb-0" >Uploaded</h6>
					</div>
					<div class="col-12 col-sm-5 col-md-8 col-lg-4 text-left text-sm-right">
						<p class="mb-0">
							<p class="d-inline-flex align-items-center mb-0">
								<a href="javascript:void(0);"  @click="viewTicketDoc(envFile.VITE_APP_API_BASE_URL+envFile.VITE_docsLink1 + 'user&id=' + get_user.profile.user_id + '&doc=' + list.document)"    class="textcolor" >{{list.document_name.split('_').join(' ')}}</a>
								<a href="javascript:void(0);">
								  <feather type="x-circle" size="20px" class="ml-2 red d-block" @click="modalDeletedocument =  list.id" data-toggle="modal" data-target="#user-delete-confirmation"></feather>
							    </a>
							</p>
						</p>
					</div>
				</div>
			
			
			<div class="pt-3 pt-sm-4" v-if="docFun('additional_doc')">
				<a href="javascript:void(0);" class="addFileBtn d-inline-flex">
					<div class="d-flex cap_btn border-btn pl-2 pr-3 px-lg-4 min-w-auto">
					  <feather type="plus" size="15px" class="mr-2"></feather>
					  <span>Add File</span>
				    </div>
					<input type="file" name="additional_doc" id="additional_doc" @change="addMoreFileChange( $event.target.files[0], 'additional_doc' )" />
				</a>
			</div>
		</div>




		<div class="mt-4 mt-lg-5 pt-4 pt-lg-5 border-top">
			<h5 class="mb-2">Additional Information:</h5>
			<div class="form-group">
				<textarea class="form-control" v-model="additional_info" name="additional_info" maxlength="500"></textarea>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<div class="text-right pt-0 pt-lg-2">
					<input type="button" value="Submit" class="cap_btn px-4 large_btn" @click="submit()">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {registerStepsMixins} from '@/plugins/registerSteps'
	import {
    supportMixins
  } from "@/plugins/support";
	export default {
		name: 'step-four',
		mixins: [registerStepsMixins, supportMixins],
		data() {
			return {
				pageLoader: false,
				modalDeletedocument : '',
				documentsByName:{
					'incorporation_proof' : {description : '', data:[]},
					'shareholder_proof' : {description : '', data:[]},
					'representative_identification_proof' : {description : '', data:[]},
					'representative_address_proof' : {description : '', data:[]},
					'representative_authorisation_letter' : {description : '', data:[]},
					'beneficial_identification_proof' : {description : '', data:[]},
					'beneficial_address_proof' : {description : '', data:[]},
					'additional_doc_1' : {description : '', data:[]},
					'additional_doc_2' : {description : '', data:[]},
					'additional_doc_3' : {description : '', data:[]},
					'additional_doc_4' : {description : '', data:[]},
					'additional_doc_5' : {description : '', data:[]},
				},
				mandatoryDocs : ['incorporation_proof', 'representative_identification_proof','representative_authorisation_letter','beneficial_identification_proof','beneficial_address_proof'],
				mandatoryDocsIndividual : ['incorporation_proof', 'representative_identification_proof','representative_address_proof'],
				additional_info : ''
			}
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
		      viewTicketDoc(getDocLink){
		        // this.blobToImage()
		        let input_json = {
		          globalParams: {},
		          localParams: {
		            parameter: this, getDocLink: getDocLink, link: getDocLink
		          },
		        };
		        this._runGetTicketDoc(input_json);
		      },
			docFun(getdocType){
				if(getdocType == 'additional_doc'){
					let j = [] ;
					if(Object.keys(this.getStepInfo).length > 0 && this.getStepInfo.documents && this.getStepInfo.documents.length > 0){
						for(let i=0 ; i<=this.getStepInfo.documents.length-1 ; i++){
							if(this.getStepInfo.documents[i].document_name.includes('additional_doc')){
								j.push(parseInt(this.getStepInfo.documents[i].document_name.split('_')[2]))
							}
							if(i==this.getStepInfo.documents.length-1){
								let docLength = j.length
								return (docLength >= 5) ? false : true ;
							}
						}
					}else{
						return true ;
					}
					
				}else{
					if(Object.keys(this.getStepInfo).length > 0 && this.getStepInfo.documents && this.getStepInfo.documents.length > 0){
						let j = 0 ;
						for(let i=0 ; i<=this.getStepInfo.documents.length-1 ; i++){
							if(this.getStepInfo.documents[i].document_name == getdocType){
								j = 1;
							}
							if(i==this.getStepInfo.documents.length-1){
								if(j == 1){
									return true;
								}else{
									return false;
								}
							}
						}
					}else{
						return false;
					}
				}
			},
			addMoreFileChange(file,docType){
				if(Object.keys(this.getStepInfo).length > 0 && this.getStepInfo.documents && this.getStepInfo.documents.length > 0 && docType == 'additional_doc'){
					let j = [] ;
					for(let i=0 ; i<=this.getStepInfo.documents.length-1 ; i++){
						if(this.getStepInfo.documents[i].document_name.includes('additional_doc')){
							j.push(parseInt(this.getStepInfo.documents[i].document_name.split('_')[2]))
						}
						if(i==this.getStepInfo.documents.length-1){
							let docLength = j.length + 1
							let docType1 = docType+'_'+docLength
							this.documentsByName[docType1].data.push({
								'file':file,
								'name':file.name,
								'fileName' : docType1
							})
							this.submitDoc(docType1)
							document.getElementById(docType).value = ''
						}
					}
				}else{
					let docType1 = '' ;
					if(docType == 'additional_doc'){
						docType1 = docType+'_1'
					}else{
						docType1 = docType
					}
					this.documentsByName[docType1].data.push({
						'file':file,
						'name':file.name,
						'fileName' : docType1
					})
					this.submitDoc(docType1)
					document.getElementById(docType).value = ''
				}
        	},
        	submitDoc(getDocType){
        		const _that = this
        		if(_that.pageLoader){return;}				
				let form_name = new FormData();
				_that.documentsByName[getDocType].data.forEach( item => {
					if(item.name != ''){
						form_name.append('document', item.file, item.fileName + '.'+ item.name.split('.')[item.name.split('.').length -1] );
					}
				});
				form_name.append('documenttype', 'Registration');
				form_name.append('documentname', getDocType);
				form_name.append('type', 'user');
				form_name.append('step', 4);
				form_name.append('additional_info', _that.additional_info);
				let input_json={
					'globalParams' :{
						'form' : form_name,
						'step' : 4
					},
					'localParams' :{ "parameter" : _that , type : 'form', "step" : 4}
				}

				_that._runAddDoc(input_json)
        	},
        	submit() {
        		const _that = this
        		let dummyDocArray = [], docValidation = [];
        		if(parseInt(this.get_user.lead_type) == 1){
        			docValidation = this.mandatoryDocs
        		}else{
        			docValidation = this.mandatoryDocsIndividual
        		}
        		for(let j=0 ; j<=this.getStepInfo.documents.length-1 ;j++){
					if(docValidation.includes(this.getStepInfo.documents[j].document_name)){
						dummyDocArray.push(this.getStepInfo.documents[j].document_name)
					}
					
					if(j==this.getStepInfo.documents.length-1){
						dummyDocArray = dummyDocArray.filter((item,index) => dummyDocArray.indexOf(item) === index);
						if(dummyDocArray.length == docValidation.length){
			        		let input_json = {
				               'globalParams': {
									"step" : 5,
									"is_registered" : 1,
									"ticket_id" : this.getStepInfo.documents[0].ticket_id.toString(),
									"lead_type" : this.get_user.lead_type.toString(),
									"additional_info": _that.additional_info,
									// "incorporation_proof" : "1",
									// "representative_identification_proof" : "1",
									// "representative_authorisation_letter":"1",
									// "beneficial_identification_proof":"1",
									// "beneficial_address_proof":"1"
				               },
				               'localParams': {
				                  "parameter": _that
				               }
				            }
				            if(parseInt(this.get_user.lead_type) == 2){
				            	input_json.globalParams.incorporation_proof = "1"
				            	input_json.globalParams.representative_identification_proof = "1"
				            	input_json.globalParams.representative_address_proof = "1"
				            }else{
				            	input_json.globalParams.incorporation_proof = "1"
				            	input_json.globalParams.representative_identification_proof = "1"
				            	input_json.globalParams.representative_authorisation_letter = "1"
				            	input_json.globalParams.beneficial_identification_proof = "1"
				            	input_json.globalParams.beneficial_address_proof = "1"
				            }
				            _that._runFinishReg(input_json)
						}else{
							this.$notify({
			                  text:  "Please Add All Mandatory Documents Before Submitting",
			                  duration: 10000,
			                  pauseOnHover : true,
			                  type: 'error'
			               	});
						}
					}
				}
	        },
	        delDoc(getDocId){
	        	let input_json = {
	               'globalParams': {
	                  "id": getDocId
	               },
	               'localParams': {
	                  "parameter": this
	               }
	            }
	            this._runDelDoc(input_json)
	        },
	        reset(){
	        	this.modalDeletedocument = ''
	        	this.documentsByName = {
					'incorporation_proof' : {description : '', data:[]},
					'shareholder_proof' : {description : '', data:[]},
					'representative_identification_proof' : {description : '', data:[]},
					'representative_address_proof' : {description : '', data:[]},
					'representative_authorisation_letter' : {description : '', data:[]},
					'beneficial_identification_proof' : {description : '', data:[]},
					'beneficial_address_proof' : {description : '', data:[]},
					'additional_doc_1' : {description : '', data:[]},
					'additional_doc_2' : {description : '', data:[]},
					'additional_doc_3' : {description : '', data:[]},
					'additional_doc_4' : {description : '', data:[]},
					'additional_doc_5' : {description : '', data:[]},
				}
	        },
	        getStepInfoFunc(){
	        	this._runGetStepInfo({  'globalParams': {}, 'localParams': { "parameter": this }  })
	        }
		},
		created() {
			this.getStepInfoFunc()
		}
	}
</script>
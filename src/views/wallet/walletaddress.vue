<template>
	<div class="mid_scroll_content">
		<section class="depoist_fund  pb-5">

			<div class="row justify-content-center">
				<div class="col-10">
					<form>
						<div class="row justify-content-center">
							<div class="col-12">
								<div class="form-group generate_bitcoin">
									<input type="text" class="form-control" name="walletadr" v-validate="'required'">
									<label class="labeltext">Wallet Address</label>
									<span v-show="submitted && errors.has('walletadr')" class="text-danger">This is required</span>
									<input type="submit" value="Verify Address" class="cap_btn" @click="verify()" >
									
								</div>
							</div>

						</div>
					</form>
				</div>

			</div>
		</section>
		<section class="depoist_fund add_ipaddress pb-5 mb-4">
			<div class="section_title">
				<h5>Filter Wallet Address</h5>
			</div>
			<div class="row justify-content-center">
				<div class="col-4">
					<div class="form-group">
						<input type="text" class="form-control" name="btcamount" v-validate="'required'">
						<label class="labeltext">BTC Amount(0.00000 BTC)</label>
						<span v-show="submitted && errors.has('btcamount')" class="text-danger">This is required</span>
					</div>
				</div>
				<div class="col-4">
					<div class="form-group">
						<input type="text" class="form-control" name="BTCamount" v-validate="'required'">
						<label class="labeltext">BTC Amount(0.00000 BTC)</label>
						<span v-show="submitted && errors.has('BTCamount')" class="text-danger">This is required</span>
					</div>
				</div>
				<div class="col-2">
					<div class="form-group">
						<input type="submit" class="cap_btn large_btn" value="Filter" name="" @click="filteramount()">
					</div>
				</div>
			</div>
		</section>
		<section class="depoist_fund add_ipaddress pb-5 border-bottom-0">
			<div class="section_title">
				<h5>Filter Wallet Address</h5>
			</div>
			<div class="row justify-content-center">
				<div class="col-12 text-center">
					<div class="dataTable table-responsive">
						<table id="dtBasicExample" class="table table-striped table-bordered" width="100%">
							<thead>
								<tr>
									<th>Address</th>
									<th>Wallet</th>
									<th>Created On</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>75dfs4rwERFswfs45w</td>
									<td>Bitcoin</td>
									<td>12:13:14 08.08.2019</td>
									<td>
										<a class="t_ic" href="#"><feather type="x-circle"></feather></a>
										<a class="t_ic" href="#"><feather type="more-vertical"></feather></a>
									</td>
								</tr>
								<tr>
									<td>5rst3YtussRFs86sjh4tr</td>
									<td>Litecoin</td>
									<td>12:13:14 08.08.2019</td>
									<td>
										<a class="t_ic" href="#"><feather type="x-circle"></feather></a>
										<a class="t_ic" href="#"><feather type="more-vertical"></feather></a>
									</td>
								</tr>
								<tr>
									<td>gfhj4rdhY6rDR57FDylop</td>
									<td>Bitcoin</td>
									<td>12:13:14 08.08.2019</td>
									<td>
										<a class="t_ic" href="#"><feather type="x-circle"></feather></a>
										<a class="t_ic" href="#"><feather type="more-vertical"></feather></a>
									</td>
								</tr>
								<tr>
									<td>75dfs4rwERFswfs45w</td>
									<td>Bitcoin</td>
									<td>12:13:14 08.08.2019</td>
									<td>
										<a class="t_ic" href="#"><feather type="x-circle"></feather></a>
										<a class="t_ic" href="#"><feather type="more-vertical"></feather></a>
									</td>
								</tr>
								<tr>
									<td>5rst3YtussRFs86sjh4tr</td>
									<td>Litecoin</td>
									<td>12:13:14 08.08.2019</td>
									<td>
										<a class="t_ic" href="#"><feather type="x-circle"></feather></a>
										<a class="t_ic" href="#"><feather type="more-vertical"></feather></a>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</section>

	</div>

   
</template>

<script>
export default {
    name: 'walletaddress',
    data() {
        return {
			submitted: false
		
        }
    },
	
	methods: {
		verify(){
			const _that = this
			_that.submitted = true;
			_that.$validator.validate().then(valid => {
				if (valid) {
					let input_json={
						'globalParams' :{

						},
						'localParams' :{ "parameter" : _that }
					}
					_that.apiFunc(input_json)
				}
			});
		},
		filteramount(){
			const _that = this
			_that.submitted = true;
			_that.$validator.validate().then(valid => {
				if (valid) {
					let input_json={
						'globalParams' :{

						},
						'localParams' :{ "parameter" : _that }
					}
					_that.apiFunc(input_json)
				}
			});
		}
	},
	
	
	created(){
	
		this.pageName('Account Profile')
	}
}
</script>

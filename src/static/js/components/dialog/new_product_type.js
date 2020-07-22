export default {
	props: [
		"visible",
	],
	data: () => {
		return {
			name: "",
			icon: "tag"
		}
	},
	methods: {
		closeDialog: function(){
			this.name = "";
			this.type = "tag";
			this.$emit("close-dialog");
		},

		saveProductType: function(){
			if(this.visible && this.name != "" && this.type != -1){
				// TODO: Maybe do this using async/await?
				fetch("/product/types", {
					method: "POST",
					cache: "no-cache",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						name: this.name,
						icon: this.icon
					})
				}).then(response => {
					// TODO: Error handling and user feedback
					this.closeDialog();
					return response.json();
				}).then(product => {
					this.$emit("response", product);
				});
			} else {
				// TODO: Basic error handling
			}
		}
	},
	template: `
		<dialog class="card" :open="visible">
			<h4>New product type</h4>
			<div class="content">
				<input type="text" v-model="name" placeholder="Type name..."/><br/>
				<input type="text" v-model="icon" placeholder="Enter Font Awesome ligature"/><br/>

				<button @click="closeDialog">Cancel</button>
				<button @click="saveProductType">Create</button>
			</div>
		</dialog>
	`
}
export default {
	props: [
		"visible",
		"types"
	],
	data: () => {
		return {
			name: "",
			type: 1
		}
	},
	methods: {
		closeDialog: function(){
			this.name = "";
			this.type = 1;
			this.$emit("close-dialog");
		},

		saveProduct: function(){
			if(this.visible && this.name != "" && this.type != -1){
				// TODO: Maybe do this using async/await?
				fetch("/product", {
					method: "POST",
					cache: "no-cache",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						name: this.name,
						type: this.type
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
			<h4>New product</h4>
			<div class="content">
				<input type="text" v-model="name" placeholder="Product name..."/><br/>
				<select v-model="type">
					<option v-for="type in types" :value="type.id">
						{{ type.name }}
					</option>
				</select><br/>
				<button @click="closeDialog">Cancel</button>
				<button @click="saveProduct">Create</button>
			</div>
		</dialog>
	`
}
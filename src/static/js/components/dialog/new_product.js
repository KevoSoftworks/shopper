export default {
	props: [
		"visible"
	],
	data: () => {
		return {
			name: "",
			type: -1
		}
	},
	methods: {
		closeDialog: function(){
			this.name = "";
			this.type = -1;
			this.$emit("close-dialog");
		},

		saveProduct: function(){
			if(this.visible && this.name != "" && this.type != -1){
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
					this.$emit("update", "products");
				});
			} else {
				// TODO: Basic error handling
			}
		}
	},
	template: `
		<dialog :open="visible">
			<input type="text" v-model="name" /><br/>
			<input type="number" v-model="type" /><br/>
			<button @click="closeDialog">Cancel</button>
			<button @click="saveProduct">Create</button>
		</dialog>
	`
}
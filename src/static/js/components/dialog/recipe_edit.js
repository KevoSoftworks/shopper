export default {
	props: {
		"visible": {
			type: Boolean,
			default: false
		},
		"recipe": {
			type: Object,
			default: () => {return {
				"id": -1,
				"name": "New Recipe",
				"content": "",
				"products": []
			} }
		}
	},
	methods: {
		closeDialog: function(){
			this.$emit("close-dialog");
		},

		saveRecipe: function(){
			return;
			if(this.visible){
				// TODO: Maybe do this using async/await?
				fetch("/recipe", {
					method: "POST",
					cache: "no-cache",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(...recipe)
				}).then(response => {
					// TODO: Error handling and user feedback
					this.closeDialog();
					return response.json();
				}).then(recipe => {
					this.$emit("response", recipe);
				});
			} else {
				// TODO: Basic error handling
			}
		}
	},
	template: `
		<dialog class="card" :open="visible">
			<h4>Edit recipe</h4>
			<div class="content">
				<input type="text" v-model="recipe.name" placeholder="Recipe name"/><br/>
				<!-- TODO: Add products -->
				<textarea v-model="recipe.content" placeholder="Recipe content"></textarea><br/>
				<button @click="closeDialog">Cancel</button>
				<button @click="saveRecipe">Save</button>
			</div>
		</dialog>
	`
}
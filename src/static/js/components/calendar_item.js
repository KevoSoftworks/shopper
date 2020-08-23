export default {
	props: ["entry", "recipes"],
	data: function(){
		return {
			editing: false
		}
	},
	methods: {
		viewRecipe: function(){
			if(this.entry.recipe_id === null)
				return;

			const recipe = this.recipes.find(el => el.id == this.entry.recipe_id);
			if(recipe === undefined)
				return;

			location.hash = `#recipe`;
			globalThis.vm.pendingSearch = recipe.name;
		},

		edit: function(){
			if(this.editing){
				// TODO: Maybe do this using async/await?
				fetch(`/calendar/add/${this.entry.entry}`, {
					method: "POST",
					body: JSON.stringify({
						text: this.entry.content
					}),
					cache: "no-cache",
				}).then(response => {
					// TODO: Error handling and user feedback
				})
			}
			this.editing = !this.editing;
		},

		remove: function(){
			let id = this.entry.id;
			// TODO: Maybe do this using async/await?
			fetch(`/calendar/remove/${id}`, {
				method: "POST",
				cache: "no-cache",
			}).then(response => {
				// TODO: Error handling and user feedback
				const entry = this.entries.find(el => el.id == id);
				entry.recipe_id = null;
				entry.content = null;
			})
		},
	},
	computed: {
		displayed_title: function(){
			if(this.entry.recipe_id == null)
				return this.entry.content;
		
			const recipe = globalThis.vm.recipes.find(el => el.id == this.entry.recipe_id);
			// It might be that the recipe list isn't populated, so prevent an error from being thrown.
			if(recipe === undefined)
				return this.entry.content;

			return recipe.name;
		},

		edit_icon: function(){
			if(this.editing)
				return "done";

			return "create";
		}
	},
	created: function(){
		this.days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
	},
	template: `
		<tr>
			<td>
				{{ days[entry.entry] }}
			</td>

			<td v-if="entry.content === null && entry.recipe_id === null && !editing" class="expand">
				<span class="subtext">Empty</span>
			</td>
			<td v-else-if="!editing" :class="{clickable: entry.recipe_id !== null, expand: true}" @click="viewRecipe()">
				{{ displayed_title }}
			</td>
			<td v-else class="expand">
				<input type="text" v-model="entry.content" />
			</td>

			<td>
				<button v-if="entry.recipe_id === null" class="circle small" @click="edit()">
					<i class="material-icons">{{ edit_icon }}</i>
				</button>
				<button v-if="(entry.content !== null || entry.recipe_id !== null) && !editing" class="circle small" @click="remove()">
					<i class="material-icons">delete</i>
				</button>
			</td>
		</tr>
	`
}
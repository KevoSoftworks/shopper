export default {
	props: ["entries"],
	methods: {
		goto: function(recipe_id){

		},

		edit: function(id){

		},

		delete: function(id){

		}
	},
	created: function(){
		this.days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
	},
	template: `
		<table class="calendar">
			<tr>
				<th>Day</th>
				<th>What's on the menu?</th>
			<tr>
			<tr v-for="item in entries">
				<td>
					{{ days[item.entry] }}
				</td>

				<td v-if="item.content == null && item.recipe_id == null">
					<span class="subtext">Empty</span>
				</td>
				<td v-else>
					<h5 @click="goto(item.recipe_id)">
						{{ item.content }}
					</h5>
					<div class="flex right nostretch">
						<button class="circle small" @click="edit(item.id)">
							<i class="material-icons">create</i>
						</button>
						<button class="circle small" @click="delete(item.id)">
							<i class="material-icons">delete</i>
						</button>
					</div>
				</td>
			</tr>
		</table>
	`
}
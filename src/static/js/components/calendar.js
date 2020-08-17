export default {
	props: ["entries"],
	data: {
		/*
			Because we are not defining the data of this component as a function, Vue will
			warn us about the properties within being shared across all `calendar` compontents.
			This is a non-issue, since we (currently) have only one calendar instance, and this
			data is static and should not be mutable.
		*/
		days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
	},
	methods: {
		goto: function(recipe_id){

		},

		edit: function(id){

		},

		delete: function(id){

		}
	},
	computed: {

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
import item from "./calendar_item.js";

export default {
	props: ["entries", "recipes"],
	components: {
		"calendar-item": item
	},
	template: `
		<table class="calendar">
			<thead>
				<tr>
					<th>Day</th>
					<th>What's on the menu?</th>
					<th>&nbsp;</th>
				</tr>
			</thead>
			<tbody>
				<calendar-item
					v-for="item in entries"
					:key="item.id"
					:entry="item"
					:recipes="recipes"
				></calendar-item>
			</tbody>
		</table>
	`
}
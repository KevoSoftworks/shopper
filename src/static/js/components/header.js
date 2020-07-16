import header_buttons from "./header_buttons.js";

export default {
	props: ["buttons"],
	components: {
		"header-button": header_buttons
	},
	template: `
		<div id="header">
			<header-button
				v-for="button in buttons"
				:key="button.id"
				:button="button"
				v-on="$listeners"
			></header-button>
		</div>
	`
}
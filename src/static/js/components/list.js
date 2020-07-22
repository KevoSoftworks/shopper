import item from "./list_item.js";

export default {
	props: {
		"items": null,
		"query": {
			type: String,
			default: ""
		},
	},
	components: {
		"item-card": item
	},
	computed: {
		cur_items: function(){
			if(typeof this.query === "undefined")
				return this.items;

			const search = this.query.toLowerCase();

			return this.items.filter(el => {
				const name = el.name.toLowerCase();
				return name.includes(search);
			})
		},
	},
	template: `
		<ul class="list">
			<item-card
				v-for="item in cur_items"
				:key="item.id"
				:item="item"
			></item-card>
		</ul>
	`
}
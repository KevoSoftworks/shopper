import product from "./product.js";

export default {
	props: {
		"products": null,
		"query": {
			type: String,
			default: ""
		},
		"isType": {
			type: Boolean,
			default: false
		}
	},
	components: {
		"product-card": product
	},
	computed: {
		cur_products: function(){
			if(typeof this.query === "undefined")
				return this.products;

			const search = this.query.toLowerCase();

			return this.products.filter(el => {
				const name = el.name.toLowerCase();
				return name.includes(search);
			})
		},

		type_class: function(){
			return this.isType ? "product_types" : "products";
		}
	},
	template: `
		<ul :class="type_class">
			<product-card
				v-for="product in cur_products"
				:key="product.id"
				:product="product"
			></product-card>
		</ul>
	`
}
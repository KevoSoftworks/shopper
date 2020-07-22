import product_list from "./product_list.js";
import product from "./product.js";

export default{
	props: [
		"item"
	],
	components:{
		"product-list": product_list
	},
	data: () => {
		return {
			contentVisible: false
		}
	},
	methods: {
		toggleVisible: function(){
			this.contentVisible = !this.contentVisible;
		}
	},
	computed: {
		hasContent: function(){
			return (typeof this.item.content !== "undefined");
		},

		hasProducts: function(){
			return (typeof this.item.products !== "undefined");
		},

		expandChevron: function(){
			if(!this.hasContent)
				return "";
			if(this.contentVisible){
				return "collapse";
			} else {
				return "expand";
			}
		},

		productList: function(){
			if(!this.hasProducts)
				return [];

			let result = [];
			for(let p of this.item.products){
				let product = globalThis.vm.products.find(el => el.id == p.product_id);
				result.push(
					{
						id: product.id,
						name: `${p.amount}${product.unit} ${product.name}`,
						icon: product.icon
					}
				);
			}
			return result;
		}
	},
	template: `
		<li class="card">
			<h5 :class="expandChevron" @click="toggleVisible">{{ item.name }}</h5>
			<p v-if="hasContent && contentVisible">
				<product-list
					:products="productList"
				></product-list>
				<br/>
				{{ item.content }}
			</p>
		</li>
	`
}
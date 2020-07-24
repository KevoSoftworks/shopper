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
		},

		edit: function(){
			if(this.hasContent){
				// Assume recipe
			} else {
				// Assume product in cart
			}
		},

		remove: function(){
			if(this.hasContent){
				// Assume recipe
				// TODO: Maybe do this using async/await?
				fetch(`/recipe/${this.item.id}`, {
					method: "DELETE",
					cache: "no-cache",
				}).then(response => {
					// TODO: Error handling and user feedback
					// TODO: not using location.reload() as an easy way out
					location.reload();
				})
			} else {
				// Assume product in cart
			}
		},

		vote: function(diff){
			let url;
			if(diff > 0){
				this.item.upvotes++;
				url = "upvote";
			} else {
				this.item.downvotes++;
				url = "downvote";
			}

			fetch(`/recipe/${this.item.id}/${url}`, {
				method: "POST",
				cache: "no-cache",
			}).then(response => {
				// TODO: Error handling and user feedback
			})
		},

		addToCart: function(id){
			let product = this.item.products.find(el => el.product_id == id);

			this.$emit("add-to-cart", {
				"id": id,
				"amount": product.amount
			});
		}
	},
	computed: {
		hasContent: function(){
			return (typeof this.item.content !== "undefined");
		},

		hasProducts: function(){
			return (typeof this.item.products !== "undefined");
		},

		rating: function(){
			if(!this.hasContent) // Assume product
				return "This shouldn't be visible.";

			if(this.item.upvotes == 0 && this.item.downvotes == 0)
				return "none";
			
			if(this.item.downvotes == 0)
				return "100%";

			const rating = Math.round(100 * this.item.upvotes / (this.item.upvotes + this.item.downvotes));
			return `${rating}%`;
		},

		ratingString: function(){
			if(!this.hasContent)
				return "";

			return `Rating: ${this.rating} ${this.ratingStringSmall}`;
		},

		ratingStringSmall: function(){
			return `(${this.item.upvotes} / ${this.item.downvotes})`;
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
			<template v-if="hasContent">
				<h5 :class="expandChevron" @click="toggleVisible">{{ item.name }} <span class="subtext">{{ ratingStringSmall }}</span></h5>
				<div v-show="contentVisible" class="flex right nostretch">
					<span style="margin-right: 8px">{{ ratingString }}</span>
					<button class="circle small" @click="vote(1)"><i class="material-icons">thumb_up</i></button>
					<button class="circle small" @click="vote(-1)"><i class="material-icons">thumb_down</i></button>
					<button class="circle small" @click="edit"><i class="material-icons">create</i></button>
					<button class="circle small" @click="remove"><i class="material-icons">delete</i></button>
				</div>
			</template>
			<template v-else>
				<h5>
					{{ item.name }}
					<div class="flex right">
						<button class="circle small" @click="edit"><i class="material-icons">create</i></button>
						<button class="circle small" @click="remove"><i class="material-icons">delete</i></button>
					</div>
				</h5>
			</template>
			
			<div v-if="hasContent && contentVisible">
				<product-list
					:products="productList"
					@add-product="addToCart"
				></product-list>
				<br/>
				<p>{{ item.content }}</p>
			</div>
		</li>
	`
}
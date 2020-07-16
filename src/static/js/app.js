import header from "./components/header.js";
import buttons from "./data/buttons.js";

import new_product_dialog from "./components/dialog/new_product.js";

async function getResponse(url){
	const response = await fetch(url);
	const data = await response.json();

	return data;
}

document.addEventListener("DOMContentLoaded", () => {
	// Initialise VueJS
	let vm = new Vue({
		el: "#wrapper",
		components: {
			"header-wrapper": header,
			"new-product-dialog": new_product_dialog
		},
		data: {
			activePage: "home",
			activeSection: "products",
			products: [],
			product_types: [],
			buttons: buttons,

			dialogVisible: false
		},
		computed: {

		},
		methods: {
			setPage: function(id){
				const cur = this.buttons.find(el => el._class == this.activePage);
				cur.active = false;

				this.buttons[id].active = true;
				this.activePage = this.buttons[id]._class;
			},

			newProductDialog: function(){
				this.dialogVisible = "new-product-dialog";
			},

			newProductTypeDialog: function(){

			},

			closeDialog: function(){
				this.dialogVisible = false;
			},

			update: function(item){
				if(item == "products"){
					getResponse("/product").then(function(data){
						/*
						*	Using vm here is a little dirty, since we are already referencing it when the
						*	object hasn't been created yet. It shouldn't be an issue, since this function
						*	cannot be called before the vm object exists in the global scope anyway. Still,
						*	it isn't very nice.
						*/
						vm.products = data;
					});
				}
			}
		}
	});

	// Load data from API
	getResponse("/product").then(data => {
		vm.products = data;
	});
	getResponse("/product/types").then(data => {
		vm.product_types = data;
	});

	globalThis.vm = vm;
});
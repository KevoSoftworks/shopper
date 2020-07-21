import header from "./components/header.js";
import buttons from "./data/buttons.js";
import product_list from "./components/product_list.js";

import new_product_dialog from "./components/dialog/new_product.js";

async function getResponse(url){
	const response = await fetch(url);
	const data = await response.json();

	return data;
}

function handleHashChange(){
	const vm = globalThis.vm;

	const page_id = location.hash.substring(1);
	const hit = vm.buttons.find(el => el._class == page_id);
	if(hit !== undefined){
		vm.setPage(hit.id);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	// Initialise VueJS
	let vm = new Vue({
		el: "#wrapper",
		components: {
			"header-wrapper": header,
			"new-product-dialog": new_product_dialog,
			"product-list": product_list
		},
		data: {
			activePage: "home",
			activeSection: "products",
			products: [],
			product_types: [],
			buttons: buttons,

			dialogVisible: false,

			search: ""
		},
		computed: {

		},
		methods: {
			setPage: function(id){
				const cur = this.buttons.find(el => el._class == this.activePage);
				cur.active = false;

				this.buttons[id].active = true;
				this.activePage = this.buttons[id]._class;

				history.pushState(null, null, `#${this.activePage}`);
			},

			newProductDialog: function(){
				this.dialogVisible = "new-product-dialog";
			},

			newProductTypeDialog: function(){

			},

			closeDialog: function(){
				this.dialogVisible = false;
			},

			addProduct: function(product){
				console.log(product);
				this.products.unshift(product);
			}
		}
	});

	globalThis.vm = vm;

	window.addEventListener("hashchange", _ => {
		handleHashChange();
	});

	handleHashChange();

	// Load data from API
	getResponse("/product").then(data => {
		vm.products = data;
	});
	getResponse("/product/types").then(data => {
		vm.product_types = data;
	});
});
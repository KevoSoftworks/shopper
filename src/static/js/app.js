import header from "./components/header.js";
import buttons from "./data/buttons.js";
import product_list from "./components/product_list.js";
import list from "./components/list.js";
import calendar from "./components/calendar.js";

import new_product_dialog from "./components/dialog/new_product.js";
import new_product_type_dialog from "./components/dialog/new_product_type.js";
import edit_recipe_dialog from "./components/dialog/recipe_edit.js";

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
			"new-product-type-dialog": new_product_type_dialog,
			"edit-recipe-dialog": edit_recipe_dialog,
			"product-list": product_list,
			"list": list,
			"calendar": calendar
		},
		data: {
			activePage: "home",
			activeSection: "products",
			calendar: [],
			products: [],
			product_types: [],
			recipes: [],
			buttons: buttons,

			dialogVisible: false,

			search: "",
			pendingSearch: "",
			recipeEdit: -1
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

				this.search = this.pendingSearch;
				this.pendingSearch = "";
			},

			showDialog: function(dialog){
				this.dialogVisible = dialog;
			},

			closeDialog: function(){
				this.dialogVisible = false;
			},

			addProduct: function(product){
				this.products.unshift(product);
			},

			addProductType: function(type){
				this.product_types.push(type);
			},

			addToCart: function(list){
				for(let i of list){
					console.log(`Item ${i.id} needs to be in cart ${i.amount} times`);
				}
			},

			createCalendar: function(){
				fetch("/calendar/new", {
					method: "POST",
					cache: "no-cache",
				}).then(response => {
					return response.json();
				}).then(calendar => {
					this.calendar = calendar;
				});
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
	getResponse("/recipe").then(data => {
		vm.recipes = data;
	})
	getResponse("/calendar/content").then(data => {
		vm.calendar = data;
	})
});
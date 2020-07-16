import header from "./components/header.js";
import buttons from "./data/buttons.js";

async function getResponse(url){
	const response = await fetch(url);
	const data = await response.json();

	return data;
}

document.addEventListener("DOMContentLoaded", () => {
	// Initialise VueJS
	let vm = new Vue({
		el: "#wrapper",
		components:{
			"header-wrapper": header
		},
		data: {
			activePage: "home",
			activeSection: "products",
			products: [],
			product_types: [],
			buttons: buttons
		},
		computed: {

		},
		methods: {
			setPage: function(id){
				const cur = this.buttons.find(el => el._class == this.activePage);
				cur.active = false;
				
				this.buttons[id].active = true;
				this.activePage = this.buttons[id]._class;
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
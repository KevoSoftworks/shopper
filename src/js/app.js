import header from "./components/header.js";

let vm;

document.addEventListener("DOMContentLoaded", () => {
	vm = new Vue({
		el: "#wrapper",
		components:{
			"header-wrapper": header
		},
		data: {
			buttons: [
				{
					id: 0,
					class: "home",
					name: false,
					icon: "home",
					click: () => {alert('a')}
				},
				{
					id: 1,
					class: "shopping",
					name: "Shopping Cart",
					icon: "shopping_cart",
					click: () => {alert('b')}
				},
			]
		},
		computed: {

		},
		methods: {

		}
	});
});
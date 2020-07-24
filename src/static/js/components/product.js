export default{
	props: [
		"product"
	],
	methods: {
		add: function(){
			this.$emit("add-product", this.product.id);
		}
	},
	template: `
		<li class="card" @click="add">
			<span>{{ product.name }}</span> <i class="font-awesome">{{ product.icon }}</i>
		</li>
	`
}
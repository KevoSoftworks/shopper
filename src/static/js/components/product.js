export default{
	props: [
		"product"
	],
	template: `
		<li class="card">
			<span>{{ product.name }}</span> <i class="font-awesome">{{ product.icon }}</i>
		</li>
	`
}
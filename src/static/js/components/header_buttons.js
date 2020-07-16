export default {
	props: ["button"],
	template: `
		<div class="button" :class="button.class" @click="$emit('press', button.class)">
			<i class="material-icons">{{ button.icon }}</i>
			<span v-if="button.name">
				{{ button.name }}
			</span>
		</div>
	`
}
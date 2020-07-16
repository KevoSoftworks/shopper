export default {
	props: ["button"],
	template: `
		<div class="button" :class="[button._class, {'active': button.active}]" @click="$emit('press', button.id)">
			<i class="material-icons">{{ button.icon }}</i>
			<span v-if="button.name">
				{{ button.name }}
			</span>
		</div>
	`
}
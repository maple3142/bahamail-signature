<template>
	<div>
		<div>
			<button @click="create">新增簽名檔</button>
		</div>
		<div>
			<signature v-for="sig in signatures" :key="sig.id" :signature="sig"/>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex'
import Signature from './signature.vue'

export default {
	components: {
		Signature
	},
	computed: mapState(['signatures']),
	methods: {
		create() {
			const name = prompt('新簽名檔名稱?')
			if (!name) return
			this.$store.commit('create', {
				name
			})
		}
	}
}
</script>

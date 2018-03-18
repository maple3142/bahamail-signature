<template>
	<div>
		<div class="bms-btn-wrap">
			<button @click="create">新增簽名檔</button>
		</div>
		<div>
			<div ref="list">
				<signature v-for="sig in signatures" :key="sig.id" :signature="sig" />
			</div>
		</div>
	</div>
</template>
<script>
//vuedraggable doesn't export anything to window
import Sortable from 'sortablejs'
import Signature from './signature.vue'

export default {
	components: {
		Signature
	},
	computed: {
		signatures: {
			get() {
				return this.$store.state.signatures
			},
			set(value) {
				this.$store.commit('updateSignatures', value)
			}
		}
	},
	methods: {
		create() {
			const name = prompt('新簽名檔名稱?')
			if (!name) return
			this.$store.commit('create', {
				name
			})
		}
	},
	mounted() {
		Sortable.create(this.$refs.list, {
			handle: '.sig-drag',
			onUpdate: e => {
				const s = this.signatures
				const { oldIndex, newIndex } = e
				;[s[oldIndex], s[newIndex]] = [s[newIndex], s[oldIndex]]
				this.signatures = s
			}
		})
	}
}
</script>
<style scoped>
.bms-btn-wrap {
	margin-bottom: 1em;
}
</style>

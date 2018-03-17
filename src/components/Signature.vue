<template>
	<div class="fw BH-rbox">
		<h5 class="sig-header">{{signature.name}}</h5>
		<textarea class="fw" rows="5" v-model="text"></textarea>
		<div>
			<button @click="apply(signature.content)">插入簽名檔</button>
			<button @click="rename">重新命名</button>
			<button @click="del">刪除</button>
		</div>
	</div>
</template>
<script>
import $ from 'jquery'

export default {
	props: {
		signature: {
			type: Object,
			required: true
		}
	},
	computed: {
		text: {
			get() {
				return this.signature.content
			},
			set(content) {
				this.$store.commit('edit', {
					...this.signature,
					content
				})
			}
		}
	},
	methods: {
		apply(text) {
			const $tx = $('textarea[name=content]')
			const val = $tx.val()
			$tx.val(val + text)
		},
		rename() {
			const name = prompt(`把簽名檔 "${this.signature.name}" 改成?`)
			if (!name) return
			this.$store.commit('rename', {
				...this.signature,
				name
			})
		},
		del() {
			const result = confirm(`確認刪除簽名檔 "${this.signature.name}"?`)
			if (result) this.$store.commit('del', this.signature)
		}
	}
}
</script>
<style scoped>
.fw {
	width: 100%;
}
</style>

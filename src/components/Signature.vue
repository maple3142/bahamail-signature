<template>
	<div style="width: 100%;">
		<h6>{{signature.name}} :</h6>
		<textarea rows="5" @keyup="edit(text)" v-model="text" style="width: 100%;"></textarea>
		<div>
			<button @click="apply">插入簽名檔</button>
			<button @click="rename">重新命名</button>
			<button @click="del(signature)">刪除</button>
		</div>
	</div>
</template>
<script>
import $ from 'jquery'
import { mapMutations } from 'vuex'

export default {
	props: {
		signature: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			text: this.signature.content
		}
	},
	methods: {
		edit(content) {
			this.$store.commit('edit', {
				...this.signature,
				content
			})
		},
		apply() {
			const $tx = $('textarea[name=content]')
			const val = $tx.val()
			$tx.val(val + this.signature.content)
		},
		rename() {
			const name = prompt(`把簽名檔 "${this.signature.name}" 改成?`)
			if (!name) return
			this.$store.commit('rename', {
				...this.signature,
				name
			})
		},
		...mapMutations(['del'])
	}
}
</script>

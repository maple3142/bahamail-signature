import Vue from 'vue'
import Vuex from 'vuex'
import vjss from 'vuejs-storage'

Vue.use(Vuex)

export class Signature {
	constructor(name) {
		this.name = name
		this.content = ''
		this.id = Date.now().toString() + Math.random()
	}
}

export default new Vuex.Store({
	state: {
		signatures: []
	},
	mutations: {
		create(state, { name, content }) {
			state.signatures.push(new Signature(name, content))
		},
		edit(state, { id, content }) {
			state.signatures = state.signatures.map(s => {
				if (s.id !== id) return s
				s.content = content
				return s
			})
		},
		rename(state, { id, name }) {
			state.signatures = state.signatures.map(s => {
				if (s.id !== id) return s
				s.name = name
				return s
			})
		},
		del(state, { id }) {
			state.signatures = state.signatures.filter(s => s.id !== id)
		},
		updateSignatures(state, sigs) {
			state.signatures = sigs
		}
	},
	plugins: [
		vjss({
			namespace: 'bahamail-signature',
			keys: ['signatures']
		})
	]
})

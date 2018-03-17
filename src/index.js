import Vue from 'vue'
import $ from 'jquery'

import store from './store'
import App from './components/App.vue'

window.store = store

const app = new Vue({
	render: h => h(App),
	store
})

const div = document.createElement('div')
$('#BH-slave').append(div)
app.$mount(div)

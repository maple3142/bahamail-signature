const { version } = require('./package.json')

module.exports = {
	input: 'src/index.js',
	format: ['iife'],
	plugins: [
		require('rollup-plugin-vue')({
			css: true
		})
	],
	global: {
		vue: 'Vue',
		vuex: 'Vuex',
		jquery: 'jQuery',
		'vuejs-storage': 'vuejsStorage',
		sortablejs: 'Sortable'
	},
	banner: `
// ==UserScript==
// @name         巴哈姆特站內信簽名檔
// @namespace    https://blog.maple3142.net/
// @version      ${version}
// @description  幫巴哈姆特站內信的站內信加上簽名檔功能
// @author       maple3142
// @match        https://mailbox.gamer.com.tw/*
// @require      https://unpkg.com/vue@2.5.16/dist/vue.runtime.min.js
// @require      https://unpkg.com/vuex@3.0.1/dist/vuex.min.js
// @require      https://unpkg.com/vuejs-storage@2.1.1/dist/vuejs-storage.js
// @require      https://unpkg.com/sortablejs@1.7.0/Sortable.min.js
// @grant        none
// ==/UserScript==
`
}

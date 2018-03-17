module.exports = {
	input: 'src/index.js',
	format: ['iife'],
	plugins: ['vue'],
	global: {
		vue: 'Vue',
		vuex: 'Vuex',
		jquery: 'jQuery',
		'vuejs-storage': 'vuejsStorage'
	},
	banner: `
// ==UserScript==
// @name         巴哈姆特郵件簽名檔
// @namespace    https://blog.maple3142.net/
// @version      0.1
// @description  try to take over the world!
// @author       maple3142
// @match        https://mailbox.gamer.com.tw/send.php*
// @require      https://unpkg.com/vue
// @require      https://unpkg.com/vuex
// @require      https://unpkg.com/vuejs-storage
// @grant        none
// ==/UserScript==	
`
}

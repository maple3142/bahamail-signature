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
// @name         巴哈姆特站內信簽名檔
// @namespace    https://blog.maple3142.net/
// @version      0.2
// @description  幫巴哈姆特站內信的站內信加上簽名檔功能
// @author       maple3142
// @match        https://mailbox.gamer.com.tw/send.php*
// @match        https://mailbox.gamer.com.tw/reply.php*
// @require      https://unpkg.com/vue
// @require      https://unpkg.com/vuex
// @require      https://unpkg.com/vuejs-storage
// @grant        none
// ==/UserScript==	
`
}

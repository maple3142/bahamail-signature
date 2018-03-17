
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

(function (Vue,$,Vuex,vjss) {
'use strict';

Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;
$ = $ && $.hasOwnProperty('default') ? $['default'] : $;
var Vuex__default = 'default' in Vuex ? Vuex['default'] : Vuex;
vjss = vjss && vjss.hasOwnProperty('default') ? vjss['default'] : vjss;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

Vue.use(Vuex__default);
var Signature = function Signature(name) {
  _classCallCheck(this, Signature);

  this.name = name;
  this.content = '';
  this.id = Date.now().toString() + Math.random();
};
var store = new Vuex__default.Store({
  state: {
    signatures: []
  },
  mutations: {
    create: function create(state, _ref) {
      var name = _ref.name,
          content = _ref.content;
      state.signatures.push(new Signature(name, content));
    },
    edit: function edit(state, _ref2) {
      var id = _ref2.id,
          content = _ref2.content;
      state.signatures = state.signatures.map(function (s) {
        if (s.id !== id) return s;
        s.content = content;
        return s;
      });
    },
    rename: function rename(state, _ref3) {
      var id = _ref3.id,
          name = _ref3.name;
      state.signatures = state.signatures.map(function (s) {
        if (s.id !== id) return s;
        s.name = name;
        return s;
      });
    },
    del: function del(state, _ref4) {
      var id = _ref4.id;
      state.signatures = state.signatures.filter(function (s) {
        return s.id !== id;
      });
    }
  },
  plugins: [vjss({
    namespace: 'bahamail-signature',
    keys: ['signatures']
  })]
});

var Signature$1 = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticStyle: {
        "width": "100%"
      }
    }, [_c('h6', [_vm._v(_vm._s(_vm.signature.name) + " :")]), _vm._v(" "), _c('textarea', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.text,
        expression: "text"
      }],
      staticStyle: {
        "width": "100%"
      },
      attrs: {
        "rows": "5"
      },
      domProps: {
        "value": _vm.text
      },
      on: {
        "keyup": function keyup($event) {
          _vm.edit(_vm.text);
        },
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.text = $event.target.value;
        }
      }
    }), _vm._v(" "), _c('div', [_c('button', {
      on: {
        "click": _vm.apply
      }
    }, [_vm._v("插入簽名檔")]), _vm._v(" "), _c('button', {
      on: {
        "click": _vm.rename
      }
    }, [_vm._v("重新命名")]), _vm._v(" "), _c('button', {
      on: {
        "click": function click($event) {
          _vm.del(_vm.signature);
        }
      }
    }, [_vm._v("刪除")])])]);
  },
  staticRenderFns: [],
  props: {
    signature: {
      type: Object,
      required: true
    }
  },
  data: function data() {
    return {
      text: this.signature.content
    };
  },
  methods: _objectSpread({
    edit: function edit(content) {
      this.$store.commit('edit', _objectSpread({}, this.signature, {
        content: content
      }));
    },
    apply: function apply() {
      var $tx = $('textarea[name=content]');
      var val = $tx.val();
      $tx.val(val + this.signature.content);
    },
    rename: function rename() {
      var name = prompt("\u628A\u7C3D\u540D\u6A94 \"".concat(this.signature.name, "\" \u6539\u6210?"));
      if (!name) return;
      this.$store.commit('rename', _objectSpread({}, this.signature, {
        name: name
      }));
    }
  }, Vuex.mapMutations(['del']))
};

var App = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_c('div', [_c('button', {
      on: {
        "click": _vm.create
      }
    }, [_vm._v("新增簽名檔")])]), _vm._v(" "), _c('div', _vm._l(_vm.signatures, function (sig) {
      return _c('signature', {
        key: sig.id,
        attrs: {
          "signature": sig
        }
      });
    }))]);
  },
  staticRenderFns: [],
  components: {
    Signature: Signature$1
  },
  computed: Vuex.mapState(['signatures']),
  methods: {
    create: function create() {
      var name = prompt('新簽名檔名稱?');
      if (!name) return;
      this.$store.commit('create', {
        name: name
      });
    }
  }
};

window.store = store;
var app = new Vue({
  render: function render(h) {
    return h(App);
  },
  store: store
});
var div = document.createElement('div');
$('#BH-slave').append(div);
app.$mount(div);

}(Vue,jQuery,Vuex,vuejsStorage));

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = recheckWhileDelayed;
/* unused harmony export singleElement */
/* unused harmony export withAttribute */
/* unused harmony export withInnerHTML */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return appendResource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return appendResourceRaw; });
String.prototype.isEmpty = () => this.length == 0;
class MostRecentCallTo {
    constructor(op, delay_ms) {
        this.op = op;
        this.timer = null;
        this.delay_ms = delay_ms;
    }
    invoke(arg1) {
        if (this.timer)
            clearTimeout(this.timer);
        return new Promise(resolve => setTimeout(() => resolve(this.op(arg1)), this.delay_ms));
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = MostRecentCallTo;

class HTTPc {
    constructor() {
        this._defaultHeaders = { 'content-type': 'application/json' };
        this._defaultOnSend = (self) => { this.xhr.withCredentials = true; };
    }
    cancel() { var _a; (_a = this.xhr) === null || _a === void 0 ? void 0 : _a.abort(); }
    send(method, url, data, headers = this._defaultHeaders, onSend = this._defaultOnSend) {
        this.cancel();
        this.xhr = new XMLHttpRequest();
        this.xhr.open(method, url);
        for (let [key, content] of Object.entries(headers))
            this.xhr.setRequestHeader(key, content);
        onSend(this);
        this.xhr.send(data);
        return new Promise((resolve, reject) => {
            this.xhr.onload = () => resolve(this.xhr.responseText);
            this.xhr.onerror = reject;
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HTTPc;

function recheckWhileDelayed(predicate, delay_ms, action) {
    if (predicate())
        action();
    else
        setTimeout(recheckWhileDelayed.bind(null, predicate, delay_ms, action), delay_ms);
}
//// HTML DSL

function singleElement(tagName, ...configs) {
    let e = document.createElement(tagName);
    configs.forEach(runOn => runOn(e));
    return e;
}
function withAttribute(name, value) {
    return e => { e.setAttribute(name, value); };
}
function withInnerHTML(innerHTML) {
    return e => { e.innerHTML = innerHTML; };
}

function appendResource(tagName, src) {
    let e = document.body.appendChild(singleElement(tagName, withAttribute("src", src)));
    return new Promise(resolve => { e.onload = resolve; });
}
;
function appendResourceRaw(tagName, innerHTML) {
    let e = singleElement(tagName, withInnerHTML(innerHTML));
    document.body.appendChild(e);
    return e;
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["guess"] = guess;
/* harmony export (immutable) */ __webpack_exports__["submitTrans"] = submitTrans;
/* harmony export (immutable) */ __webpack_exports__["getSelectionText"] = getSelectionText;
/* harmony export (immutable) */ __webpack_exports__["nbnhhsh"] = nbnhhsh;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__res_nbnhhsh_css__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__res_ui_nbnhhsh_html__ = __webpack_require__(3);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const API_URL = 'https://lab.magiconch.com/api/nbnhhsh/';
const cachedWords = {};
const httpc = new __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* HTTPc */]();
let app;
function guess(text) {
    return __awaiter(this, void 0, void 0, function* () {
        if (cachedWords[text])
            return cachedWords[text];
        app.loading = true;
        const resp = yield httpc.send('POST', `${API_URL}/guess`, JSON.stringify({ text }));
        app.loading = false;
        let data = JSON.parse(resp);
        cachedWords[text] = data;
        return data;
    });
}
;
function submitTrans(name, trans = prompt('输入缩写对应文字', '')) {
    var _a;
    if ((_a = trans === null || trans === void 0 ? void 0 : trans.trim().isEmpty()) !== null && _a !== void 0 ? _a : true)
        return;
    let httpc = new __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* HTTPc */]();
    httpc.send('POST', `${API_URL}/translation/${name}`, JSON.stringify({ text: trans })).then(_ => {
        alert('感谢对好好说话项目的支持！审核通过后这条对应将会生效');
    });
}
;
function getSelectionText() {
    let selection = window.getSelection();
    return selection.toString().trim();
}
function nbnhhsh() {
    return __awaiter(this, void 0, void 0, function* () {
        let text = getSelectionText();
        app.show = !!(text);
        if (!app.show)
            return;
        positWordsDialog();
        guess(text).then(data => {
            app.error = null;
            app.tags = data;
            if (data.length == 0)
                app.show = false;
        }).catch(it => {
            app.error = it;
        });
        recheckSelectionForHide();
    });
}
;
function positWordsDialog() {
    let rect = getSelection().getRangeAt(0).getBoundingClientRect();
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let top = Math.floor(scrollTop + rect.top + rect.height);
    let left = Math.floor(rect.left);
    app.top = top;
    app.left = left;
}
const RECHECK_DELAY = 300;
function recheckSelectionForHide() {
    Object(__WEBPACK_IMPORTED_MODULE_0__helper__["e" /* recheckWhileDelayed */])(() => !getSelectionText().isEmpty(), RECHECK_DELAY, () => { app.show = false; });
}
const handler = () => setTimeout(nbnhhsh, 1);
document.body.addEventListener('mouseup', handler);
document.body.addEventListener('keyup', handler);
// front-end matters


Object(__WEBPACK_IMPORTED_MODULE_0__helper__["d" /* appendResourceRaw */])('style', __WEBPACK_IMPORTED_MODULE_1__res_nbnhhsh_css__["a" /* default */]);
const word_ui = Object(__WEBPACK_IMPORTED_MODULE_0__helper__["d" /* appendResourceRaw */])('div', __WEBPACK_IMPORTED_MODULE_2__res_ui_nbnhhsh_html__["a" /* default */]);
Object(__WEBPACK_IMPORTED_MODULE_0__helper__["c" /* appendResource */])('script', 'https://cdn.bootcss.com/vue/2.6.11/vue.min.js').then(() => {
    app = new window['Vue']({
        el: word_ui,
        data: {
            tags: [],
            loading: false,
            show: false,
            top: 0,
            left: 0
        },
        methods: {
            submitTrans
        }
    });
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (".nbnhhsh-box {\n\tposition:absolute;\n\tz-index:99999999999;\n\twidth:210px;\n\tbackground:#FFF;\n\tbox-shadow: 0 3px 30px -4px rgba(0,0,0,.3);\n\tmargin: 10px 0 100px 0;\n\tfont:400 14px/1.4 sans-serif;\n}\n.nbnhhsh-box::before {\n\tcontent:'';\n\tposition:absolute;\n\ttop:-7px;\n\tleft:8px;\n\twidth:0;\n\theight:0;\n\tborder:7px solid transparent;\n\n\tborder-top:1px;\n\tborder-bottom-color:#FFF;\n}\n.nbnhhsh-tag-list {\n\t/*padding:4px 0;*/\n}\n.nbnhhsh-tag-item {\n\tpadding: 4px 14px;\n\tposition: relative;\n}\n.nbnhhsh-tag-item:nth-child(even) {\n\tbackground: rgba(0, 99, 255, 0.06);\n}\n.nbnhhsh-tag-item h4 {\n\tfont-weight:bold;\n\tfont-size:18px;\n}\n.nbnhhsh-tran-list {\n\tcolor:#222;\n\tpadding:4px 0;\n}\n.nbnhhsh-tran-item {\n\tmargin-right:4px;\n}\n\n.nbnhhsh-inputting-list {\n\tcolor:#222;\n\tpadding:4px 0;\n}\n.nbnhhsh-inputting-list h5 {\n\tfont-size:12px;\n\tline-height:24px;\n\tcolor:#999;\n}\n.nbnhhsh-inputting-item {\n\tmargin-right:4px;\n}\n.nbnhhsh-notran-box {\n\tpadding:4px 0;\n\tcolor:#999;\n\tcursor: pointer;\n}\n.nbnhhsh-add-btn {\n\tposition: absolute;\n\ttop:0;\n\tright:0;\n\twidth: 30px;\n\tline-height: 30px;\n\ttext-align: center;\n\tcolor: #0059ff;\n\tfont-size: 16px;\n\tfont-weight: bold;\n\tcursor: pointer;\n}\n.nbnhhsh-add-btn:after {\n\tcontent: '+';\n}\n.nbnhhsh-loading {\n\ttext-align: center;\n\tcolor:#999;\n\tpadding:20px 0;\n}");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("<div class=\"nbnhhsh-box\" v-if=\"show\" :style=\"{top:top+'px',left:left+'px'}\" @mousedown.prevent>\n  <div class=\"nbnhhsh-loading\" v-if=\"loading\">加载中…</div>\n  <div class=\"nbnhhsh-tag-list\" v-else-if=\"tags.length\">\n    <div class=\"nbnhhsh-tag-item\" v-for=\"tag in tags\">\n      <h4>{{tag.name}}</h4>\n      <div class=\"nbnhhsh-tran-list\" v-if=\"tag.trans\">\n        <span class=\"nbnhhsh-tran-item\" v-for=\"tran in tag.trans\">{{tran}}</span>\n      </div>\n      <div v-else-if=\"tag.inputting && tag.inputting.length !==0\">\n        <div class=\"nbnhhsh-inputting-list\">\n          <h5>有可能是</h5>\n          <span class=\"nbnhhsh-inputting-item\" v-for=\"input in tag.inputting\">{{input}}</span>\n        </div>\n      </div>\n      <div class=\"nbnhhsh-notran-box\" v-else @click.prevent=\"submitTrans(tag.name)\">\n        尚未录入，我来提交对应文字\n      </div>\n      <a @click.prevent=\"submitTrans(tag.name)\" class=\"nbnhhsh-add-btn\" title=\"我来提交对应文字\"></a>\n    </div>\n  </div>\n</div>");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nbnhhsh__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);


let app;
const _guess = new __WEBPACK_IMPORTED_MODULE_1__helper__["b" /* MostRecentCallTo */](__WEBPACK_IMPORTED_MODULE_0__nbnhhsh__["guess"], 300);
const data = {
    text: '',
    tags: [],
    loading: false,
    show: false
};
const methods = {
    submitTrans: __WEBPACK_IMPORTED_MODULE_0__nbnhhsh__["submitTrans"],
    nbnhhsh() {
        let text = this.text;
        app.show = !!text;
        if (!text)
            return;
        _guess.invoke(text).then(data => {
            app.error = null;
            app.tags = data;
        }).catch(it => {
            app.error = it;
        });
    }
};
const editor = window['editor'];
app = new window['Vue']({ el: editor, data, methods });


/***/ })
/******/ ]);
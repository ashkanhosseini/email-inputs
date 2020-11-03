parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"aiJW":[function(require,module,exports) {

},{}],"pKJ9":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.EMAIL_STATUSES=void 0,require("./emails-input.scss");var e=document.createEvent("CustomEvent");e.initEvent("emailsInput.change",!0,!1);var t=function(e){return/^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/.test(e)},a={VALID:"valid",INVALID:"invalid"};exports.EMAIL_STATUSES=a;var n=!1,i=function(){var e=document.createElement("input");return e.className="emails-input__input",e.setAttribute("type","text"),e.setAttribute("placeholder","add more people..."),e.onblur=o,e},r=function(e){return e.className.indexOf("emails-input__input")>-1},s=function(e){return{value:e,status:t(e)?a.VALID:a.INVALID,id:Date.now()}},l=function(e){if(e.value.trim().replace(/,/g,"")){var t=e.parentElement;m(t,[s(e.value)]),e.value=""}},u=function(e){var t=e.target;!r(t)||44!==e.charCode&&13!==e.charCode||(e.preventDefault(),l(t))},o=function(e){var t=e.target;r(t)&&l(t)},c=function(e){var t=e.target;if(r(t)){var a=t.parentElement,n=(e.clipboardData||window.clipboardData).getData("text");if(n){e.preventDefault();var i=n.split(",").map(function(e){return s(e.trim())});m(a,i)}}},d=function(e){var t=document.createElement("div");t.className="emails-input",t.state={emails:[]},t.addEventListener("click",function(e){var a=e.target;if(a.className.indexOf("emails-input__remove-tag")>-1){var n=a.getAttribute("data-email-id");t.state.emails=t.state.emails.filter(function(e){var t=e.id;return n!=t}),a.parentElement.parentElement.removeChild(a.parentElement)}});var a=i();return t.appendChild(a),e.appendChild(t),t},m=function(t,a){t.state.emails=t.state.emails.concat(a),t.dispatchEvent(e),a.forEach(function(e){var a=document.createElement("div");a.className="emails-input__tag emails-input__tag--".concat(e.status),a.innerHTML='\n      <span class="emails-input__email">'.concat(e.value,'</span>\n      <button class="emails-input__remove-tag" data-email-id="').concat(e.id,'" aria-label="remove ').concat(e.value,'">\n        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">\n          <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z" fill="#050038"/>\n        </svg>\n      </span>\n    '),t.insertBefore(a,t.getElementsByClassName("emails-input__input")[0])})};function p(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=d(e);return t.onChange&&a.addEventListener("emailsInput.change",function(e){t.onChange(e,a.state.emails)}),n||(document.addEventListener("keypress",u),document.addEventListener("blur",o),document.addEventListener("paste",c),n=!0),{replaceAll:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];a.state.emails=[];var t=a.getElementsByClassName("emails-input__input")[0];a.innerHTML="",a.appendChild(t),e=e.map(s),m(a,e)},getState:function(){return a.state.emails},addEmails:function(e){m(a,e.map(s))}}}var v=p;exports.default=v;
},{"./emails-input.scss":"aiJW"}],"H99C":[function(require,module,exports) {
"use strict";require("./styles.scss");var e=n(require("./emails-input"));function t(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return t=function(){return e},e}function n(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=t();if(n&&n.has(e))return n.get(e);var r={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=a?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}return r.default=e,n&&n.set(e,r),r}var r=(0,e.default)(document.getElementById("emails"));document.getElementById("btnAddEmail").addEventListener("click",function(){r.addEmails(["ran".concat(Math.floor(Math.random()*Math.floor(999)),"@dom.com")])}),document.getElementById("btnEmailCount").addEventListener("click",function(){var t=r.getState().reduce(function(t,n){return n.status===e.EMAIL_STATUSES.VALID&&t++,t},0);window.alert("The number of valid emails is: ".concat(t))});
},{"./styles.scss":"aiJW","./emails-input":"pKJ9"}]},{},["H99C"], null)
//# sourceMappingURL=/src.a8aec7bf.js.map
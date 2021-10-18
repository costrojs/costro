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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./example/src/scripts/demo.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./example/src/scripts/demo.js":
/*!*************************************!*\
  !*** ./example/src/scripts/demo.js ***!
  \*************************************/
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../src/index */ "./src/index.js");
/* harmony import */ var _home_assets_scripts_home_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home/assets/scripts/home.js */ "./example/src/scripts/home/assets/scripts/home.js");
/* harmony import */ var _sign_in_assets_scripts_sign_in_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sign-in/assets/scripts/sign-in.js */ "./example/src/scripts/sign-in/assets/scripts/sign-in.js");
/* harmony import */ var _sign_up_assets_scripts_sign_up_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sign-up/assets/scripts/sign-up.js */ "./example/src/scripts/sign-up/assets/scripts/sign-up.js");




const tunnel = new _src_index__WEBPACK_IMPORTED_MODULE_0__["Tunnel"]({
  target: document.querySelector('#app'),
  routes: [{
    name: 'home',
    path: '/prisma-connect',
    component: _home_assets_scripts_home_js__WEBPACK_IMPORTED_MODULE_1__["default"]
  }, {
    name: 'signIn',
    path: '/connexion',
    component: _sign_in_assets_scripts_sign_in_js__WEBPACK_IMPORTED_MODULE_2__["default"]
  }, {
    name: 'signUp',
    path: '/inscription',
    component: _sign_up_assets_scripts_sign_up_js__WEBPACK_IMPORTED_MODULE_3__["default"]
  }]
});
tunnel.navigate('home');

/***/ }),

/***/ "./example/src/scripts/home/assets/scripts/home.js":
/*!*********************************************************!*\
  !*** ./example/src/scripts/home/assets/scripts/home.js ***!
  \*********************************************************/
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Home; });
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../src/index */ "./src/index.js");
/* harmony import */ var _templates_home_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./templates/home.js */ "./example/src/scripts/home/assets/scripts/templates/home.js");
/* harmony import */ var jsx_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsx-dom */ "./node_modules/jsx-dom/lib/index.js");
/* harmony import */ var validate_target__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! validate-target */ "./node_modules/validate-target/src/index.js");
/* harmony import */ var validate_target__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(validate_target__WEBPACK_IMPORTED_MODULE_3__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




 // The step needs to extend the UserLoginStep

class Home extends _src_index__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "element", '.userLoginTunnel-home');
  }

  /**
   * Required function
   * Automatically called by UserLoginTunnel.createStep
   * @param {Object} props Data exposed by the UserLoginTunnel
   * @returns {HTMLElement}
   */
  render(props) {
    return Object(jsx_dom__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_templates_home_js__WEBPACK_IMPORTED_MODULE_1__["default"], null);
  }
  /**
   * Required function
   * Automatically called by UserLoginTunnel.hashChanged
   * @returns {Object} Step data, useful for next steps if necessary
   */
  // setState() {
  // 	return () => ({
  // 		email: document.querySelector(this.element).querySelector('#pmc-email').value
  // 	});
  // }

  /**
   * Optional function
   * Automatically called by UserLoginTunnel.createStep
   */


  afterRender() {
    this.addEvents();
  }
  /**
   * Custom step function
   * Used to simlulate PMC in-site client interaction
   * and navigate to 2 differents steps
   */


  addEvents() {
    document.querySelector(this.element).addEventListener('click', e => {
      const validateSubmit = validate_target__WEBPACK_IMPORTED_MODULE_3___default()({
        target: e.target,
        selectorString: '.pmc-submit',
        nodeName: ['button']
      });

      if (validateSubmit) {
        this.setState({
          email: document.querySelector(this.element).querySelector('#pmc-email').value
        });
        const mockPmcResponse = 'user-ok';

        if (mockPmcResponse === 'user-unknown') {
          this.navigate('signUp');
        } else if (mockPmcResponse === 'user-ok') {
          this.navigate('signIn');
        }
      }
    });
  }

}

/***/ }),

/***/ "./example/src/scripts/home/assets/scripts/templates/home.js":
/*!*******************************************************************!*\
  !*** ./example/src/scripts/home/assets/scripts/templates/home.js ***!
  \*******************************************************************/
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return templateHome; });
/* harmony import */ var jsx_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsx-dom */ "./node_modules/jsx-dom/lib/index.js");

/**
 * Template step
 * @param {Object} props Data from dependent steps
 * @returns {HTMLElement} Template step
 */

function templateHome(props) {
  return Object(jsx_dom__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "userLoginTunnel-home"
  }, "HOME", Object(jsx_dom__WEBPACK_IMPORTED_MODULE_0__["createElement"])("br", null), Object(jsx_dom__WEBPACK_IMPORTED_MODULE_0__["createElement"])("br", null), Object(jsx_dom__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
    type: "text",
    id: "pmc-email",
    placeholder: "monemail@email.com"
  }), Object(jsx_dom__WEBPACK_IMPORTED_MODULE_0__["createElement"])("button", {
    className: "pmc-submit"
  }, "Continuer"));
}

/***/ }),

/***/ "./example/src/scripts/sign-in/assets/scripts/sign-in.js":
/*!***************************************************************!*\
  !*** ./example/src/scripts/sign-in/assets/scripts/sign-in.js ***!
  \***************************************************************/
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SignIn; });
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../src/index */ "./src/index.js");
/* harmony import */ var _templates_sign_in_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./templates/sign-in.js */ "./example/src/scripts/sign-in/assets/scripts/templates/sign-in.js");
/* harmony import */ var jsx_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsx-dom */ "./node_modules/jsx-dom/lib/index.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



 // The step needs to extend the UserLoginStep

class SignIn extends _src_index__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "element", '.userLoginTunnel-signIn');
  }

  // Set the routes which the step depends
  // dependsOn = ['home'];

  /**
   * Required function
   * Automatically called by UserLoginTunnel.createStep
   * @param {Object} props Data exposed by the UserLoginTunnel
   * @returns {HTMLElement}
   */
  render(props) {
    const email = this.getStore('home').get('email');
    return Object(jsx_dom__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_templates_sign_in_js__WEBPACK_IMPORTED_MODULE_1__["default"], {
      email: email
    });
  }

}

/***/ }),

/***/ "./example/src/scripts/sign-in/assets/scripts/templates/sign-in.js":
/*!*************************************************************************!*\
  !*** ./example/src/scripts/sign-in/assets/scripts/templates/sign-in.js ***!
  \*************************************************************************/
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return templateSignIn; });
/* harmony import */ var jsx_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsx-dom */ "./node_modules/jsx-dom/lib/index.js");

/**
 * Template step
 * @param {Object} props Data from dependent steps
 * @returns {HTMLElement} Template step
 */

function templateSignIn({
  email
}) {
  return Object(jsx_dom__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "userLoginTunnel-signIn"
  }, "Ravis de vous revoir, connectez-vous avec votre email", Object(jsx_dom__WEBPACK_IMPORTED_MODULE_0__["createElement"])("br", null), Object(jsx_dom__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
    type: "text",
    id: "pmc-email",
    placeholder: "email",
    value: email
  }), Object(jsx_dom__WEBPACK_IMPORTED_MODULE_0__["createElement"])("br", null), Object(jsx_dom__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
    type: "password",
    id: "pmc-password",
    placeholder: "password"
  }), Object(jsx_dom__WEBPACK_IMPORTED_MODULE_0__["createElement"])("br", null), Object(jsx_dom__WEBPACK_IMPORTED_MODULE_0__["createElement"])("button", {
    className: "pmc-submit"
  }, "Me connecter avec mon mot de passe"));
}

/***/ }),

/***/ "./example/src/scripts/sign-up/assets/scripts/sign-up.js":
/*!***************************************************************!*\
  !*** ./example/src/scripts/sign-up/assets/scripts/sign-up.js ***!
  \***************************************************************/
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SignUp; });
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../src/index */ "./src/index.js");
/* harmony import */ var _templates_sign_up_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./templates/sign-up.js */ "./example/src/scripts/sign-up/assets/scripts/templates/sign-up.js");
/* harmony import */ var jsx_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsx-dom */ "./node_modules/jsx-dom/lib/index.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



 // The step needs to extend the UserLoginStep

class SignUp extends _src_index__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "element", '.userLoginTunnel-signUp');
  }

  /**
   * Required function
   * Automatically called by UserLoginTunnel.createStep
   * @param {Object} props Data exposed by the UserLoginTunnel
   * @returns {HTMLElement}
   */
  render() {
    return Object(jsx_dom__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_templates_sign_up_js__WEBPACK_IMPORTED_MODULE_1__["default"], null);
  }

}

/***/ }),

/***/ "./example/src/scripts/sign-up/assets/scripts/templates/sign-up.js":
/*!*************************************************************************!*\
  !*** ./example/src/scripts/sign-up/assets/scripts/templates/sign-up.js ***!
  \*************************************************************************/
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TemplateSignUp; });
/* harmony import */ var jsx_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsx-dom */ "./node_modules/jsx-dom/lib/index.js");

/**
 * Template step
 * @param {Object} props Data from dependent steps
 * @returns {HTMLElement} Template step
 */

function TemplateSignUp(props) {
  return Object(jsx_dom__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "userLoginTunnel-signUp"
  }, Object(jsx_dom__WEBPACK_IMPORTED_MODULE_0__["createElement"])("a", {
    href: "#/prisma-connect"
  }, "Go to home"), Object(jsx_dom__WEBPACK_IMPORTED_MODULE_0__["createElement"])("br", null), "Bienvenue, inscrivez-vous en un clic", Object(jsx_dom__WEBPACK_IMPORTED_MODULE_0__["createElement"])("br", null), Object(jsx_dom__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
    type: "password",
    id: "pmc-password",
    placeholder: "password"
  }));
}

/***/ }),

/***/ "./node_modules/jsx-dom/lib/index.js":
/*!*******************************************!*\
  !*** ./node_modules/jsx-dom/lib/index.js ***!
  \*******************************************/
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fragment", function() { return Fragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SVGNamespace", function() { return SVGNamespace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "className", function() { return className; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFactory", function() { return createFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRef", function() { return createRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRef", function() { return isRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsx", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsxs", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "memo", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "preventDefault", function() { return preventDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stopPropagation", function() { return stopPropagation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useCallback", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useClassList", function() { return useClassList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useMemo", function() { return useMemo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useRef", function() { return createRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useText", function() { return useText; });
const keys = Object.keys
function identity(value) {
  return value
}
function isBoolean(val) {
  return typeof val === "boolean"
}
function isElement(val) {
  return val && typeof val.nodeType === "number"
}
function isString(val) {
  return typeof val === "string"
}
function isNumber(val) {
  return typeof val === "number"
}
function isObject(val) {
  return typeof val === "object" ? val !== null : isFunction(val)
}
function isFunction(val) {
  return typeof val === "function"
}
function isArrayLike(obj) {
  return isObject(obj) && typeof obj.length === "number" && typeof obj.nodeType !== "number"
}
function forEach(value, fn) {
  if (!value) return

  for (const key of keys(value)) {
    fn(value[key], key)
  }
}

function createRef() {
  return Object.seal({
    current: null,
  })
}
function isRef(maybeRef) {
  return isObject(maybeRef) && "current" in maybeRef
}
function useMemo(factory) {
  return factory()
}

const isUnitlessNumber = {
  animationIterationCount: 0,
  borderImageOutset: 0,
  borderImageSlice: 0,
  borderImageWidth: 0,
  boxFlex: 0,
  boxFlexGroup: 0,
  boxOrdinalGroup: 0,
  columnCount: 0,
  columns: 0,
  flex: 0,
  flexGrow: 0,
  flexPositive: 0,
  flexShrink: 0,
  flexNegative: 0,
  flexOrder: 0,
  gridArea: 0,
  gridRow: 0,
  gridRowEnd: 0,
  gridRowSpan: 0,
  gridRowStart: 0,
  gridColumn: 0,
  gridColumnEnd: 0,
  gridColumnSpan: 0,
  gridColumnStart: 0,
  fontWeight: 0,
  lineClamp: 0,
  lineHeight: 0,
  opacity: 0,
  order: 0,
  orphans: 0,
  tabSize: 0,
  widows: 0,
  zIndex: 0,
  zoom: 0,
  fillOpacity: 0,
  floodOpacity: 0,
  stopOpacity: 0,
  strokeDasharray: 0,
  strokeDashoffset: 0,
  strokeMiterlimit: 0,
  strokeOpacity: 0,
  strokeWidth: 0,
}

function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1)
}

const prefixes = ["Webkit", "ms", "Moz", "O"]
keys(isUnitlessNumber).forEach((prop) => {
  prefixes.forEach((prefix) => {
    isUnitlessNumber[prefixKey(prefix, prop)] = 0
  })
})

const SVGNamespace = "http://www.w3.org/2000/svg"
const XLinkNamespace = "http://www.w3.org/1999/xlink"
const XMLNamespace = "http://www.w3.org/XML/1998/namespace"

function isVisibleChild(value) {
  return !isBoolean(value) && value != null
}

function className(value) {
  if (Array.isArray(value)) {
    return value.map(className).filter(Boolean).join(" ")
  } else if (isObject(value)) {
    return keys(value)
      .filter((k) => value[k])
      .join(" ")
  } else if (isVisibleChild(value)) {
    return "" + value
  } else {
    return ""
  }
}
const svg = {
  animate: 0,
  circle: 0,
  clipPath: 0,
  defs: 0,
  desc: 0,
  ellipse: 0,
  feBlend: 0,
  feColorMatrix: 0,
  feComponentTransfer: 0,
  feComposite: 0,
  feConvolveMatrix: 0,
  feDiffuseLighting: 0,
  feDisplacementMap: 0,
  feDistantLight: 0,
  feFlood: 0,
  feFuncA: 0,
  feFuncB: 0,
  feFuncG: 0,
  feFuncR: 0,
  feGaussianBlur: 0,
  feImage: 0,
  feMerge: 0,
  feMergeNode: 0,
  feMorphology: 0,
  feOffset: 0,
  fePointLight: 0,
  feSpecularLighting: 0,
  feSpotLight: 0,
  feTile: 0,
  feTurbulence: 0,
  filter: 0,
  foreignObject: 0,
  g: 0,
  image: 0,
  line: 0,
  linearGradient: 0,
  marker: 0,
  mask: 0,
  metadata: 0,
  path: 0,
  pattern: 0,
  polygon: 0,
  polyline: 0,
  radialGradient: 0,
  rect: 0,
  stop: 0,
  svg: 0,
  switch: 0,
  symbol: 0,
  text: 0,
  textPath: 0,
  tspan: 0,
  use: 0,
  view: 0,
}
function createFactory(tag) {
  return createElement.bind(null, tag)
}
function Fragment(attr) {
  const fragment = document.createDocumentFragment()
  appendChildren(attr.children, fragment)
  return fragment
}
function createElement(tag, attr, ...children) {
  if (isString(attr) || Array.isArray(attr)) {
    children.unshift(attr)
    attr = {}
  }

  attr = attr || {}

  if (!attr.namespaceURI && svg[tag] === 0) {
    attr = { ...attr, namespaceURI: SVGNamespace }
  }

  if (attr.children != null && !children.length) {
    ;({ children, ...attr } = attr)
  }

  let node

  if (isString(tag)) {
    node = attr.namespaceURI
      ? document.createElementNS(attr.namespaceURI, tag)
      : document.createElement(tag)
    attributes(attr, node)
    appendChild(children, node)
  } else if (isFunction(tag)) {
    if (isObject(tag.defaultProps)) {
      attr = { ...tag.defaultProps, ...attr }
    }

    node = tag({ ...attr, children })
  }

  if (isRef(attr.ref)) {
    attr.ref.current = node
  } else if (isFunction(attr.ref)) {
    attr.ref(node)
  }

  return node
}

function appendChild(child, node) {
  if (isArrayLike(child)) {
    appendChildren(child, node)
  } else if (isString(child) || isNumber(child)) {
    appendChildToNode(document.createTextNode(child), node)
  } else if (child === null) {
    appendChildToNode(document.createComment(""), node)
  } else if (isElement(child)) {
    appendChildToNode(child, node)
  }
}

function appendChildren(children, node) {
  for (const child of children) {
    appendChild(child, node)
  }

  return node
}

function appendChildToNode(child, node) {
  if (node instanceof window.HTMLTemplateElement) {
    node.content.appendChild(child)
  } else {
    node.appendChild(child)
  }
}

function normalizeAttribute(s) {
  return s.replace(/[A-Z\d]/g, (match) => ":" + match.toLowerCase())
}

function attribute(key, value, node) {
  switch (key) {
    case "xlinkActuate":
    case "xlinkArcrole":
    case "xlinkHref":
    case "xlinkRole":
    case "xlinkShow":
    case "xlinkTitle":
    case "xlinkType":
      attrNS(node, XLinkNamespace, normalizeAttribute(key), value)
      return

    case "xmlnsXlink":
      attr(node, normalizeAttribute(key), value)
      return

    case "xmlBase":
    case "xmlLang":
    case "xmlSpace":
      attrNS(node, XMLNamespace, normalizeAttribute(key), value)
      return
  }

  switch (key) {
    case "htmlFor":
      attr(node, "for", value)
      return

    case "dataset":
      forEach(value, (dataValue, dataKey) => {
        if (dataValue != null) {
          node.dataset[dataKey] = dataValue
        }
      })
      return

    case "innerHTML":
    case "innerText":
    case "textContent":
      node[key] = value
      return

    case "spellCheck":
      node.spellcheck = value
      return

    case "class":
    case "className":
      if (isFunction(value)) {
        value(node)
      } else {
        attr(node, "class", className(value))
      }

      return

    case "ref":
    case "namespaceURI":
      return

    case "style":
      if (isObject(value)) {
        forEach(value, (val, key) => {
          if (isNumber(val) && isUnitlessNumber[key] !== 0) {
            node.style[key] = val + "px"
          } else {
            node.style[key] = val
          }
        })
        return
      }
  }

  if (isFunction(value)) {
    if (key[0] === "o" && key[1] === "n") {
      const attribute = key.toLowerCase()

      if (node[attribute] == null) {
        node[attribute] = value
      } else {
        node.addEventListener(key, value)
      }
    }
  } else if (value === true) {
    attr(node, key, "")
  } else if (value !== false && value != null) {
    attr(node, key, value)
  }
}

function attr(node, key, value) {
  node.setAttribute(key, value)
}

function attrNS(node, namespace, key, value) {
  node.setAttributeNS(namespace, key, value)
}

function attributes(attr, node) {
  for (const key of keys(attr)) {
    attribute(key, attr[key], node)
  }

  return node
}

function useText(initialValue) {
  const text = new Text()
  Object.defineProperty(text, "toString", {
    value() {
      return this.textContent
    },
  })

  function setText(value) {
    text.textContent = value
  }

  if (initialValue != null) {
    setText(initialValue)
  }

  return [text, setText]
}
function useClassList(initialValue) {
  const div = document.createElement("div")

  if (initialValue != null) {
    div.className = className(initialValue)
  }

  let list = div.classList

  function ClassList(value) {
    value.className = list.value
    list = value.classList
  }

  Object.defineProperties(
    ClassList,
    Object.getOwnPropertyDescriptors({
      get size() {
        return list.length
      },

      get value() {
        return list.value
      },

      add(...tokens) {
        list.add(...tokens)
      },

      remove(...tokens) {
        list.remove(...tokens)
      },

      toggle(token, force) {
        list.toggle(token, force)
      },

      contains(token) {
        return list.contains(token)
      },
    })
  )
  return ClassList
}

var module = {
  createElement,
  Fragment,
}
function preventDefault(event) {
  event.preventDefault()
  return event
}
function stopPropagation(event) {
  event.stopPropagation()
  return event
}

/* harmony default export */ __webpack_exports__["default"] = (module);



/***/ }),

/***/ "./node_modules/validate-target/src/index.js":
/*!***************************************************!*\
  !*** ./node_modules/validate-target/src/index.js ***!
  \***************************************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

/**
 * @license MIT
 * @name validateTarget
 * @version 2.0.0
 * @author: Yoriiis aka Joris DANIEL <joris.daniel@gmail.com>
 * @description: Easily validate target of an HTML element especially during event delegation
 * {@link https://github.com/yoriiis/validate-target}
 * @copyright 2020 Joris DANIEL
 **/

/**
 * @param {HTMLElement} target Target element
 * @param {String} selectorString Any valid CSS selector string (class, id, attribute) with Element.matches()
 * @param {String || Array} nodeName List of possible nodes name
 *
 * @returns {Boolean} Is the target valid
 */
module.exports = function validateTarget ({ target, selectorString, nodeName }) {
	// If nodeName is a string, transform it in array to reuse the same function
	if (typeof nodeName === 'string') {
		nodeName = [nodeName];
	}

	// Check if at least one of the nodeName is valid
	if (Array.isArray(nodeName) && nodeName.length) {
		return nodeName
			.map(item => target.nodeName.toLowerCase() === item && target.matches(selectorString))
			.includes(true);
	}
};


/***/ }),

/***/ "./src/component.js":
/*!**************************!*\
  !*** ./src/component.js ***!
  \**************************/
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Component; });
class Component {
	constructor() {
		this.state = new Map();
	}

	/**
	 * Optional function
	 */
	afterRender() {}

	/**
	 * Required function in the child class
	 */
	render() {
		throw new Error('You have to implement the function "render" for the component.');
	}

	/**
	 * Required function in the child class
	 */
	setState(data) {
		Object.keys(data).forEach((key) => this.state.set(key, data[key]));
	}

	getState(key) {
		return key ? this.state.get(key) : this.state;
	}
}


/***/ }),

/***/ "./src/extend.js":
/*!***********************!*\
  !*** ./src/extend.js ***!
  \***********************/
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return extend; });
// https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
// Pass in the objects to merge as arguments.
// For a deep extend, set the first argument to `true`.
function extend() {
	const extended = {};
	let deep = false;
	let i = 0;
	const { length } = arguments;

	// Check if a deep merge
	if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
		deep = arguments[0];
		i++;
	}

	// Merge the object into the extended object
	const merge = (obj) => {
		for (const prop in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, prop)) {
				// If deep merge and property is an object, merge properties
				if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
					extended[prop] = extend(true, extended[prop], obj[prop]);
				} else {
					extended[prop] = obj[prop];
				}
			}
		}
	};

	// Loop through each object and conduct a merge
	for (; i < length; i++) {
		const obj = arguments[i];
		merge(obj);
	}

	return extended;
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tunnel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tunnel */ "./src/tunnel.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tunnel", function() { return _tunnel__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component */ "./src/component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return _component__WEBPACK_IMPORTED_MODULE_2__["default"]; });





/***/ }),

/***/ "./src/location/hash.js":
/*!******************************!*\
  !*** ./src/location/hash.js ***!
  \******************************/
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Hash; });
class Hash {
	constructor({ onRouteChange }) {
		this.onRouteChange = onRouteChange;
		this.hashChanged = this.hashChanged.bind(this);
	}

	setPath(path) {
		window.location.hash = path;
	}

	getPath() {
		return window.location.hash.substr(1);
	}

	addEvents() {
		window.addEventListener('hashchange', this.hashChanged);
	}

	hashChanged(e) {
		this.onRouteChange({
			currentPath: this.getPath(),
			previousPath: this.getPreviousPath(e)
		});
	}

	/**
	 * Get the previous route
	 * @param {Event} e Event data
	 * @returns {(String|null)} Previous route or null
	 */
	getPreviousPath(e) {
		return e && e.oldURL ? e.oldURL.split('#')[1] : null;
	}
}


/***/ }),

/***/ "./src/tunnel.js":
/*!***********************!*\
  !*** ./src/tunnel.js ***!
  \***********************/
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tunnel; });
/* harmony import */ var _extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extend */ "./src/extend.js");
/* harmony import */ var _location_hash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./location/hash */ "./src/location/hash.js");



class Tunnel {
	constructor({ target, routes }) {
		this.mode = 'hash';

		this.components = new Map(
			routes.map((route) => {
				const component = new route.component(); // eslint-disable-line new-cap

				// Push new function inside step context to change the route
				component.navigate = (route) => this.navigate(route);
				component.getStore = (route) => {
					return this.components.get(route).component.getState();
				};

				return [
					route.name,
					{
						path: route.path,
						component
					}
				];
			})
		);
		// this.state = new Map(routes.map((route) => [route, {}]));

		this.target = target;
		this.previousRoute = null;
		this.currentPath = null;

		this.location = new {
			hash: _location_hash__WEBPACK_IMPORTED_MODULE_1__["default"]
		}[this.mode]({
			onRouteChange: this.onRouteChange.bind(this)
		});

		this.location.addEvents instanceof Function && this.location.addEvents();

		const path = this.location.getPath();
		if (path !== '') {
			this.onRouteChange({
				currentPath: path
			});
		}
	}

	navigate(route) {
		this.location.setPath(this.components.get(route).path);
	}

	/**
	 * Event listener for the hash change
	 * @param {Event} e Event data
	 */
	onRouteChange({ currentPath, previousPath = null }) {
		this.currentRoute = this.getRouteFromPath(currentPath);
		this.previousRoute = this.getRouteFromPath(previousPath);

		const currentComponent = this.components.get(this.currentRoute);

		// Check if route exist
		if (currentComponent) {
			const dependsOn = currentComponent.component.dependsOn;

			// Check if previous route exist
			if (this.previousRoute) {
				// Set the state with the data from the previous step
				// this.setState({
				// 	route: this.previousRoute,
				// 	data: this.components.get(this.previousRoute).component.getState()
				// });

				// Destroy the previous step
				this.destroyComponent(this.previousRoute);
			}

			// Create the new step
			this.createComponent({
				route: this.currentRoute
				// data: dependsOn && dependsOn.length ? this.getDataFromDependentSteps(dependsOn) : {}
			});
		} else {
			console.warn('Unknown route');
		}

		this.displayDebug();
	}

	/**
	 * Get route name from route path
	 * @param {String} path Route path
	 * @returns {String} Route name
	 */
	getRouteFromPath(path) {
		let route = null;
		for (const step of this.components.entries()) {
			if (step[1].path === path) {
				route = step[0];
				break;
			}
		}
		return route;
	}

	/**
	 * Get data from dependent steps
	 * @param {Array} dependentSteps
	 * @returns {Object} Aggregated data
	 */
	// getDataFromDependentSteps(dependentSteps) {
	// 	const data = {};
	// 	dependentSteps.forEach((route) => (data[route] = this.state.get(route)));
	// 	return data;
	// }

	/**
	 * Set the state for a specific route
	 * Current data is merged with the actual
	 * @param {Object} options
	 * @param {String} route Route
	 * @param {String} data Data from the step associated to the route
	 */
	// setState({ route, data }) {
	// 	this.state.set(route, extend(true, this.state.get(route), data));
	// }

	/**
	 * Destroy the step
	 * @param {String} route Route to destroy
	 */
	destroyComponent(route) {
		this.target.replaceChildren();
	}

	/**
	 * Create the step
	 * @param {Object} options
	 * @param {String} route Route
	 * @param {String} data Data from the step associated to the route
	 */
	createComponent({ route, data }) {
		const Step = this.components.get(route).component;

		this.render(Step.render(data));
		Step.afterRender();
	}

	/**
	 * Render the step template
	 * @param {HTMLElement} template Step template
	 */
	render(template) {
		this.target.appendChild(template);
	}

	/**
	 * Enable debug infos
	 */
	displayDebug() {
		console.groupCollapsed('Tunnel::routes');
		console.log({ currentRoute: this.currentRoute, previousRoute: this.previousRoute });
		console.groupEnd();
		console.groupCollapsed('Tunnel::steps');
		for (const step of this.components.entries()) {
			console.log({
				name: step[0],
				path: step[1].path,
				component: step[1].component,
				state: step[1].component.getState()
			});
		}
		console.groupEnd();
	}
}


/***/ })

/******/ });
//# sourceMappingURL=demo.js.map
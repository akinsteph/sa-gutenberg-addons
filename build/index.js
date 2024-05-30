/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/container/container.js":
/*!*******************************************!*\
  !*** ./src/blocks/container/container.js ***!
  \*******************************************/
/***/ (() => {

/**
 * WordPress dependencies
 */
var __ = wp.i18n.__;
var registerBlockType = wp.blocks.registerBlockType;
var InnerBlocks = wp.blockEditor.InnerBlocks;
registerBlockType('sa-gutenberg-addons/container', {
  title: __('Custom Container', 'sa-gutenberg-addons'),
  description: __('Provide custom container.', 'sa-gutenberg-addons'),
  keywords: [__('container'), __('wrapper'), __('section')],
  supports: {
    align: ['wide', 'full'],
    anchor: true,
    html: false
  },
  category: 'common',
  icon: 'editor-kitchensink',
  attributes: {
    content: {
      type: 'string'
    }
  },
  edit: function edit(props) {
    var className = props.className;
    return /*#__PURE__*/React.createElement("div", {
      className: className
    }, /*#__PURE__*/React.createElement(InnerBlocks, {
      renderAppender: InnerBlocks.ButtonBlockAppender
    }));
  },
  save: function save(props) {
    var className = props.className;
    return /*#__PURE__*/React.createElement("div", {
      className: className
    }, /*#__PURE__*/React.createElement(InnerBlocks.Content, null));
  }
});

/***/ }),

/***/ "./src/formats/tooltip/tooltip.js":
/*!****************************************!*\
  !*** ./src/formats/tooltip/tooltip.js ***!
  \****************************************/
/***/ (() => {

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * WordPress dependencies
 */
var __ = wp.i18n.__;
var _wp$blockEditor = wp.blockEditor,
  RichTextToolbarButton = _wp$blockEditor.RichTextToolbarButton,
  RichTextShortcut = _wp$blockEditor.RichTextShortcut;
var _wp$richText = wp.richText,
  registerFormatType = _wp$richText.registerFormatType,
  toggleFormat = _wp$richText.toggleFormat,
  applyFormat = _wp$richText.applyFormat,
  removeFormat = _wp$richText.removeFormat,
  getActiveFormat = _wp$richText.getActiveFormat;
var _wp$element = wp.element,
  useState = _wp$element.useState,
  useEffect = _wp$element.useEffect;
var _wp$components = wp.components,
  Tooltip = _wp$components.Tooltip,
  TextControl = _wp$components.TextControl;
var _wp$data = wp.data,
  useSelect = _wp$data.useSelect,
  useDispatch = _wp$data.useDispatch;
var TooltipButton = function TooltipButton(_ref) {
  var isActive = _ref.isActive,
    value = _ref.value,
    onChange = _ref.onChange;
  var _useState = useState(''),
    _useState2 = _slicedToArray(_useState, 2),
    tooltipText = _useState2[0],
    setTooltipText = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isOpen = _useState4[0],
    setIsOpen = _useState4[1];
  var activeTooltip = getActiveFormat(value, 'sa-gutenberg-addons/tooltip');
  var addOrRemoveTooltip = function addOrRemoveTooltip() {
    if (activeTooltip) {
      onChange(toggleFormat(value, {
        type: 'sa-gutenberg-addons/tooltip'
      }));
    } else if (tooltipText) {
      onChange(toggleFormat(value, {
        type: 'sa-gutenberg-addons/tooltip',
        attributes: {
          'data-tooltip': tooltipText
        }
      }));
      setTooltipText('');
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };
  useEffect(function () {
    if (isOpen) {
      var selection = window.getSelection();
      if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);
        var rect = range.getBoundingClientRect();
        var tooltipInput = document.getElementById('tooltip-input');
        if (tooltipInput) {
          tooltipInput.style.top = "".concat(rect.top - tooltipInput.offsetHeight, "px");
          tooltipInput.style.left = "".concat(rect.left + rect.width / 2 - tooltipInput.offsetWidth / 2, "px");
        }
      }
    }
  }, [isOpen]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(RichTextToolbarButton, {
    icon: "admin-comments",
    title: __('Inline Tooltip', 'sa-gutenberg-addons'),
    onClick: addOrRemoveTooltip,
    isActive: isActive || !!activeTooltip
  }), isOpen && !activeTooltip && /*#__PURE__*/React.createElement(Tooltip, {
    text: __('Enter tooltip text', 'sa-gutenberg-addons')
  }, /*#__PURE__*/React.createElement("div", {
    id: "tooltip-input",
    style: {
      position: 'absolute',
      zIndex: 1000,
      backgroundColor: 'white',
      border: '1px solid #000000',
      borderRadius: '0px',
      padding: '8px',
      boxShadow: 'none'
    }
  }, /*#__PURE__*/React.createElement(TextControl, {
    label: __('Tooltip Text', 'sa-gutenberg-addons'),
    value: tooltipText,
    onChange: setTooltipText
  }), /*#__PURE__*/React.createElement("button", {
    onClick: addOrRemoveTooltip,
    style: {
      marginTop: '8px',
      padding: '10px 15px',
      backgroundColor: 'black',
      border: '1px solid black',
      borderRadius: '0px',
      color: 'white',
      fontSize: '12px'
    }
  }, __('Apply', 'sa-gutenberg-addons')))));
};
registerFormatType('sa-gutenberg-addons/tooltip', {
  title: __('Inline Tooltip', 'sa-gutenberg-addons'),
  tagName: 'span',
  className: 'has-tooltip',
  attributes: {
    'data-tooltip': 'tooltipText'
  },
  edit: TooltipButton
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _formats_tooltip_tooltip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formats/tooltip/tooltip */ "./src/formats/tooltip/tooltip.js");
/* harmony import */ var _formats_tooltip_tooltip__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_formats_tooltip_tooltip__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _blocks_container_container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blocks/container/container */ "./src/blocks/container/container.js");
/* harmony import */ var _blocks_container_container__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_blocks_container_container__WEBPACK_IMPORTED_MODULE_1__);


})();

/******/ })()
;
//# sourceMappingURL=index.js.map
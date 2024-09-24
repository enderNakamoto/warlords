"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/clone-response";
exports.ids = ["vendor-chunks/clone-response"];
exports.modules = {

/***/ "(ssr)/./node_modules/clone-response/src/index.js":
/*!**************************************************!*\
  !*** ./node_modules/clone-response/src/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nconst PassThrough = (__webpack_require__(/*! stream */ \"stream\").PassThrough);\nconst mimicResponse = __webpack_require__(/*! mimic-response */ \"(ssr)/./node_modules/mimic-response/index.js\");\n\nconst cloneResponse = response => {\n\tif (!(response && response.pipe)) {\n\t\tthrow new TypeError('Parameter `response` must be a response stream.');\n\t}\n\n\tconst clone = new PassThrough();\n\tmimicResponse(response, clone);\n\n\treturn response.pipe(clone);\n};\n\nmodule.exports = cloneResponse;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvY2xvbmUtcmVzcG9uc2Uvc3JjL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLG9CQUFvQix5REFBNkI7QUFDakQsc0JBQXNCLG1CQUFPLENBQUMsb0VBQWdCOztBQUU5QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0anMtYm9pbGVycGxhdGUtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvY2xvbmUtcmVzcG9uc2Uvc3JjL2luZGV4LmpzPzU4YWEiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBQYXNzVGhyb3VnaCA9IHJlcXVpcmUoJ3N0cmVhbScpLlBhc3NUaHJvdWdoO1xuY29uc3QgbWltaWNSZXNwb25zZSA9IHJlcXVpcmUoJ21pbWljLXJlc3BvbnNlJyk7XG5cbmNvbnN0IGNsb25lUmVzcG9uc2UgPSByZXNwb25zZSA9PiB7XG5cdGlmICghKHJlc3BvbnNlICYmIHJlc3BvbnNlLnBpcGUpKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignUGFyYW1ldGVyIGByZXNwb25zZWAgbXVzdCBiZSBhIHJlc3BvbnNlIHN0cmVhbS4nKTtcblx0fVxuXG5cdGNvbnN0IGNsb25lID0gbmV3IFBhc3NUaHJvdWdoKCk7XG5cdG1pbWljUmVzcG9uc2UocmVzcG9uc2UsIGNsb25lKTtcblxuXHRyZXR1cm4gcmVzcG9uc2UucGlwZShjbG9uZSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsb25lUmVzcG9uc2U7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/clone-response/src/index.js\n");

/***/ })

};
;
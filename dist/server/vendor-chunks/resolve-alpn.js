"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/resolve-alpn";
exports.ids = ["vendor-chunks/resolve-alpn"];
exports.modules = {

/***/ "(ssr)/./node_modules/resolve-alpn/index.js":
/*!********************************************!*\
  !*** ./node_modules/resolve-alpn/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst tls = __webpack_require__(/*! tls */ \"tls\");\n\nmodule.exports = (options = {}, connect = tls.connect) => new Promise((resolve, reject) => {\n\tlet timeout = false;\n\n\tlet socket;\n\n\tconst callback = async () => {\n\t\tawait socketPromise;\n\n\t\tsocket.off('timeout', onTimeout);\n\t\tsocket.off('error', reject);\n\n\t\tif (options.resolveSocket) {\n\t\t\tresolve({alpnProtocol: socket.alpnProtocol, socket, timeout});\n\n\t\t\tif (timeout) {\n\t\t\t\tawait Promise.resolve();\n\t\t\t\tsocket.emit('timeout');\n\t\t\t}\n\t\t} else {\n\t\t\tsocket.destroy();\n\t\t\tresolve({alpnProtocol: socket.alpnProtocol, timeout});\n\t\t}\n\t};\n\n\tconst onTimeout = async () => {\n\t\ttimeout = true;\n\t\tcallback();\n\t};\n\n\tconst socketPromise = (async () => {\n\t\ttry {\n\t\t\tsocket = await connect(options, callback);\n\n\t\t\tsocket.on('error', reject);\n\t\t\tsocket.once('timeout', onTimeout);\n\t\t} catch (error) {\n\t\t\treject(error);\n\t\t}\n\t})();\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS1hbHBuL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2IsWUFBWSxtQkFBTyxDQUFDLGdCQUFLOztBQUV6Qiw4QkFBOEI7QUFDOUI7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsWUFBWSxtREFBbUQ7O0FBRS9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsWUFBWSwyQ0FBMkM7QUFDdkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsRUFBRTtBQUNGLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0anMtYm9pbGVycGxhdGUtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS1hbHBuL2luZGV4LmpzPzJmMzAiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuY29uc3QgdGxzID0gcmVxdWlyZSgndGxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKG9wdGlvbnMgPSB7fSwgY29ubmVjdCA9IHRscy5jb25uZWN0KSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdGxldCB0aW1lb3V0ID0gZmFsc2U7XG5cblx0bGV0IHNvY2tldDtcblxuXHRjb25zdCBjYWxsYmFjayA9IGFzeW5jICgpID0+IHtcblx0XHRhd2FpdCBzb2NrZXRQcm9taXNlO1xuXG5cdFx0c29ja2V0Lm9mZigndGltZW91dCcsIG9uVGltZW91dCk7XG5cdFx0c29ja2V0Lm9mZignZXJyb3InLCByZWplY3QpO1xuXG5cdFx0aWYgKG9wdGlvbnMucmVzb2x2ZVNvY2tldCkge1xuXHRcdFx0cmVzb2x2ZSh7YWxwblByb3RvY29sOiBzb2NrZXQuYWxwblByb3RvY29sLCBzb2NrZXQsIHRpbWVvdXR9KTtcblxuXHRcdFx0aWYgKHRpbWVvdXQpIHtcblx0XHRcdFx0YXdhaXQgUHJvbWlzZS5yZXNvbHZlKCk7XG5cdFx0XHRcdHNvY2tldC5lbWl0KCd0aW1lb3V0Jyk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNvY2tldC5kZXN0cm95KCk7XG5cdFx0XHRyZXNvbHZlKHthbHBuUHJvdG9jb2w6IHNvY2tldC5hbHBuUHJvdG9jb2wsIHRpbWVvdXR9KTtcblx0XHR9XG5cdH07XG5cblx0Y29uc3Qgb25UaW1lb3V0ID0gYXN5bmMgKCkgPT4ge1xuXHRcdHRpbWVvdXQgPSB0cnVlO1xuXHRcdGNhbGxiYWNrKCk7XG5cdH07XG5cblx0Y29uc3Qgc29ja2V0UHJvbWlzZSA9IChhc3luYyAoKSA9PiB7XG5cdFx0dHJ5IHtcblx0XHRcdHNvY2tldCA9IGF3YWl0IGNvbm5lY3Qob3B0aW9ucywgY2FsbGJhY2spO1xuXG5cdFx0XHRzb2NrZXQub24oJ2Vycm9yJywgcmVqZWN0KTtcblx0XHRcdHNvY2tldC5vbmNlKCd0aW1lb3V0Jywgb25UaW1lb3V0KTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHR9XG5cdH0pKCk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/resolve-alpn/index.js\n");

/***/ })

};
;
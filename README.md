
# Webpack code spitting

Compare code splitting using `dynamic import` and using `bundle loader`.

# Code spitting strategy

- [x] Split by using dynamic import
- [x] Split by using bundle loader

# Notes 

CommonChunksPlugin is an optimization and can be used with any mentioned code splitting strategy.

# If "code spitting does not work"

- if you are using typescript, you may want to set ```{ "module": "esnext", "moduleResolution": "commonjs"``` (see this [issue](https://github.com/Microsoft/TypeScript/issues/16820))
- if you are using `AggressiveMergingPlugin`, you want to check the build without it. It may merge otherwise splitted bundles (e.g. merge several dynamic imports in one chunk)
- if a `chunkFilename`/`webpackChunkName` is same for different chunks, they will be merged together


# Bundle Diffs

```bash
$ diff dist/use-bundle-loader/common.bundle.js dist/use-dynamic-import/common.bundle.js
```
```bash

```

```bash
$ diff dist/use-bundle-loader/index.bundle.js dist/use-dynamic-import/index.bundle.js
```
```bash
3,17c3
< /***/ (function(module, __webpack_exports__, __webpack_require__) {
< 
< "use strict";
< Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
< /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__screens_skills__ = __webpack_require__(1);
< /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__screens_skills___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__screens_skills__);
< /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__screens_character__ = __webpack_require__(2);
< /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__screens_character___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__screens_character__);
< /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__screens_inventory__ = __webpack_require__(3);
< /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__screens_inventory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__screens_inventory__);
< 
< 
< 
< 
< const asPromise = bundle => new Promise((rs, rj) => bundle(m => rs(m)));
---
> /***/ (function(module, exports, __webpack_require__) {
20,22c6,16
<   { name: 'skills', bundle: () => asPromise(__WEBPACK_IMPORTED_MODULE_0__screens_skills___default.a) },
<   { name: 'character', bundle: () => asPromise(__WEBPACK_IMPORTED_MODULE_1__screens_character___default.a) },
<   { name: 'inventory', bundle: () => asPromise(__WEBPACK_IMPORTED_MODULE_2__screens_inventory___default.a) },
---
>   {
>     name: 'skills',
>     bundle: () => __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 2))},
>   {
>     name: 'character',
>     bundle: () => __webpack_require__.e/* import() */(2).then(__webpack_require__.bind(null, 3))
>   },
>   {
>     name: 'inventory',
>     bundle: () => __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 4))
>   },
25,39c19
< document.addEventListener('DOMContentLoaded', () => __webpack_require__(4)(screens));
< 
< /***/ }),
< /* 1 */
< /***/ (function(module, exports, __webpack_require__) {
< 
< module.exports = function(cb) {
< 	__webpack_require__.e/* require.ensure */(0).then((function(require) {
< 		cb(__webpack_require__(5));
< 	}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
< }
< 
< /***/ }),
< /* 2 */
< /***/ (function(module, exports, __webpack_require__) {
---
> document.addEventListener('DOMContentLoaded', () => __webpack_require__(1)(screens));
41,45d20
< module.exports = function(cb) {
< 	__webpack_require__.e/* require.ensure */(2).then((function(require) {
< 		cb(__webpack_require__(6));
< 	}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
< }
48,58c23
< /* 3 */
< /***/ (function(module, exports, __webpack_require__) {
< 
< module.exports = function(cb) {
< 	__webpack_require__.e/* require.ensure */(1).then((function(require) {
< 		cb(__webpack_require__(7));
< 	}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
< }
< 
< /***/ }),
< /* 4 */
---
> /* 1 */

```

```bash
$ diff dist/use-bundle-loader/character.bundle.js dist/use-dynamic-import/character.bundle.js
```
```bash
3c3
< /***/ 6:
---
> /***/ 3:
6c6
< const shared = __webpack_require__(8);
---
> const shared = __webpack_require__(5);
15c15
< /***/ 8:
---
> /***/ 5:

```

```bash
$ diff dist/use-bundle-loader/skills.bundle.js dist/use-dynamic-import/skills.bundle.js
```
```bash
3c3
< /***/ 5:
---
> /***/ 2:
6c6
< const shared = __webpack_require__(8);
---
> const shared = __webpack_require__(5);
15c15
< /***/ 8:
---
> /***/ 5:

```

```bash
$ diff dist/use-bundle-loader/inventory.bundle.js dist/use-dynamic-import/inventory.bundle.js
```
```bash
3c3
< /***/ 7:
---
> /***/ 4:
6c6
< const shared = __webpack_require__(8);
---
> const shared = __webpack_require__(5);
15c15
< /***/ 8:
---
> /***/ 5:

```

```bash
$ diff dist/use-bundle-loader/index.html dist/use-dynamic-import/index.html
```
```bash
5c5
<     <title>Code Splitting | Bundle loader</title>
---
>     <title>Code Splitting | Dynamic import</title>

```

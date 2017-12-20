
# Webpack code spitting

Compare code splitting using `dynamic import` and using `bundle loader`.

# Code spitting strategy

- [x] Split by using dynamic import
- [x] Split by using bundle loader

# Notes 

CommonChunksPlugin is an optimization and can be used with any mentioned code splitting strategy.

# If "code spitting does not work"

- if you are using typescript, you may want to set ```{ "module": "esnext", "moduleResolution": "commonjs" }``` in your ts config (see this [issue](https://github.com/Microsoft/TypeScript/issues/16820))
- if you are using `AggressiveMergingPlugin`, you want to check the build without it. It may merge otherwise splitted bundles (e.g. merge several dynamic imports in one chunk)
- if a `chunkFilename`/`webpackChunkName` is same for different chunks, they will be merged together

# Build output

```bash
> rm -rf dist/use-bundle-loader && webpack --verbose --config webpack.config.bundle-loader.js

Hash: e202e828d02a24a77e5e
Version: webpack 3.10.0
Time: 336ms
              Asset       Size  Chunks             Chunk Names
   skills.bundle.js  443 bytes       0  [emitted]  skills
inventory.bundle.js  446 bytes       1  [emitted]  inventory
character.bundle.js  446 bytes       2  [emitted]  character
    index.bundle.js    3.64 kB       3  [emitted]  index
   common.bundle.js    5.85 kB       4  [emitted]  common
         index.html  270 bytes          [emitted]
Entrypoint index = common.bundle.js index.bundle.js
chunk    {0} skills.bundle.js (skills) 282 bytes {3} [rendered]
    > skills [1] ./src/screens/skills.js 2:1-4:13
    [5] ./src/screens/skills.js 114 bytes {0} [depth 2] [built]
        cjs require !!./skills.js [1] ./src/screens/skills.js 3:5-29
    [8] ./src/shared.js 168 bytes {0} {1} {2} [depth 3] [built]
        cjs require ../shared [5] ./src/screens/skills.js 1:15-35
        cjs require ../shared [6] ./src/screens/character.js 1:15-35
        cjs require ../shared [7] ./src/screens/inventory.js 1:15-35
chunk    {1} inventory.bundle.js (inventory) 285 bytes {3} [rendered]
    > inventory [3] ./src/screens/inventory.js 2:1-4:16
    [7] ./src/screens/inventory.js 117 bytes {1} [depth 2] [built]
        cjs require !!./inventory.js [3] ./src/screens/inventory.js 3:5-32
    [8] ./src/shared.js 168 bytes {0} {1} {2} [depth 3] [built]
        cjs require ../shared [5] ./src/screens/skills.js 1:15-35
        cjs require ../shared [6] ./src/screens/character.js 1:15-35
        cjs require ../shared [7] ./src/screens/inventory.js 1:15-35
chunk    {2} character.bundle.js (character) 285 bytes {3} [rendered]
    > character [2] ./src/screens/character.js 2:1-4:16
    [6] ./src/screens/character.js 117 bytes {2} [depth 2] [built]
        cjs require !!./character.js [2] ./src/screens/character.js 3:5-32
    [8] ./src/shared.js 168 bytes {0} {1} {2} [depth 3] [built]
        cjs require ../shared [5] ./src/screens/skills.js 1:15-35
        cjs require ../shared [6] ./src/screens/character.js 1:15-35
        cjs require ../shared [7] ./src/screens/inventory.js 1:15-35
chunk    {3} index.bundle.js (index) 2.16 kB {4} [initial] [rendered]
    > index [0] ./src/index.bundle-loader.js
    [0] ./src/index.bundle-loader.js 518 bytes {3} [depth 0] [built]
        [no exports]
    [1] ./src/screens/skills.js 120 bytes {3} [depth 1] [built]
        [only some exports used: default]
        harmony import ./screens/skills [0] ./src/index.bundle-loader.js 1:0-44
    [2] ./src/screens/character.js 126 bytes {3} [depth 1] [built]
        [only some exports used: default]
        harmony import ./screens/character [0] ./src/index.bundle-loader.js 2:0-50
    [3] ./src/screens/inventory.js 126 bytes {3} [depth 1] [built]
        [only some exports used: default]
        harmony import ./screens/inventory [0] ./src/index.bundle-loader.js 3:0-50
    [4] ./src/app.js 1.27 kB {3} [depth 1] [built]
        cjs require ./app [0] ./src/index.bundle-loader.js 13:52-68
chunk    {4} common.bundle.js (common) 0 bytes [entry] [rendered]
Child html-webpack-plugin for "index.html":
     1 asset
    Entrypoint undefined = index.html
    chunk    {0} index.html 541 kB [entry] [rendered]
        > [0] ./node_modules/html-webpack-plugin/lib/loader.js!./node_modules/html-webpack-plugin/default_index.ejs
        [0] ./node_modules/html-webpack-plugin/lib/loader.js!./node_modules/html-webpack-plugin/default_index.ejs 538 bytes {0} [depth 0] [built]
        [1] ./node_modules/lodash/lodash.js 540 kB {0} [depth 1] [built]
            cjs require ../lodash/lodash.js [0] ./node_modules/html-webpack-plugin/lib/loader.js!./node_modules/html-webpack-plugin/default_index.ejs 1:8-38
        [2] (webpack)/buildin/global.js 509 bytes {0} [depth 2] [built]
            cjs require global [1] ./node_modules/lodash/lodash.js 1:0-41
        [3] (webpack)/buildin/module.js 517 bytes {0} [depth 2] [built]
            cjs require module [1] ./node_modules/lodash/lodash.js 1:0-41
```

```bash
> rm -rf dist/use-dynamic-import && webpack --verbose --config webpack.config.dynamic-import.js

Hash: bb21f8ec33041a0d7059
Version: webpack 3.10.0
Time: 321ms
              Asset       Size  Chunks             Chunk Names
   skills.bundle.js  443 bytes       0  [emitted]  skills
inventory.bundle.js  446 bytes       1  [emitted]  inventory
character.bundle.js  446 bytes       2  [emitted]  character
    index.bundle.js    1.91 kB       3  [emitted]  index
   common.bundle.js    5.85 kB       4  [emitted]  common
         index.html  271 bytes          [emitted]
Entrypoint index = common.bundle.js index.bundle.js
chunk    {0} skills.bundle.js (skills) 282 bytes {3} [rendered]
    > skills [0] ./src/index.dynamic-import.js 4:18-77
    [2] ./src/screens/skills.js 114 bytes {0} [depth 1] [built]
        import() ./screens/skills [0] ./src/index.dynamic-import.js 4:18-77
    [5] ./src/shared.js 168 bytes {0} {1} {2} [depth 2] [built]
        cjs require ../shared [2] ./src/screens/skills.js 1:15-35
        cjs require ../shared [3] ./src/screens/character.js 1:15-35
        cjs require ../shared [4] ./src/screens/inventory.js 1:15-35
chunk    {1} inventory.bundle.js (inventory) 285 bytes {3} [rendered]
    > inventory [0] ./src/index.dynamic-import.js 11:18-83
    [4] ./src/screens/inventory.js 117 bytes {1} [depth 1] [built]
        import() ./screens/inventory [0] ./src/index.dynamic-import.js 11:18-83
    [5] ./src/shared.js 168 bytes {0} {1} {2} [depth 2] [built]
        cjs require ../shared [2] ./src/screens/skills.js 1:15-35
        cjs require ../shared [3] ./src/screens/character.js 1:15-35
        cjs require ../shared [4] ./src/screens/inventory.js 1:15-35
chunk    {2} character.bundle.js (character) 285 bytes {3} [rendered]
    > character [0] ./src/index.dynamic-import.js 7:18-83
    [3] ./src/screens/character.js 117 bytes {2} [depth 1] [built]
        import() ./screens/character [0] ./src/index.dynamic-import.js 7:18-83
    [5] ./src/shared.js 168 bytes {0} {1} {2} [depth 2] [built]
        cjs require ../shared [2] ./src/screens/skills.js 1:15-35
        cjs require ../shared [3] ./src/screens/character.js 1:15-35
        cjs require ../shared [4] ./src/screens/inventory.js 1:15-35
chunk    {3} index.bundle.js (index) 1.7 kB {4} [initial] [rendered]
    > index [0] ./src/index.dynamic-import.js
    [0] ./src/index.dynamic-import.js 438 bytes {3} [depth 0] [built]
    [1] ./src/app.js 1.27 kB {3} [depth 1] [built]
        cjs require ./app [0] ./src/index.dynamic-import.js 15:52-68
chunk    {4} common.bundle.js (common) 0 bytes [entry] [rendered]
Child html-webpack-plugin for "index.html":
     1 asset
    Entrypoint undefined = index.html
    chunk    {0} index.html 541 kB [entry] [rendered]
        > [0] ./node_modules/html-webpack-plugin/lib/loader.js!./node_modules/html-webpack-plugin/default_index.ejs
        [0] ./node_modules/html-webpack-plugin/lib/loader.js!./node_modules/html-webpack-plugin/default_index.ejs 538 bytes {0} [depth 0] [built]
        [1] ./node_modules/lodash/lodash.js 540 kB {0} [depth 1] [built]
            cjs require ../lodash/lodash.js [0] ./node_modules/html-webpack-plugin/lib/loader.js!./node_modules/html-webpack-plugin/default_index.ejs 1:8-38
        [2] (webpack)/buildin/global.js 509 bytes {0} [depth 2] [built]
            cjs require global [1] ./node_modules/lodash/lodash.js 1:0-41
        [3] (webpack)/buildin/module.js 517 bytes {0} [depth 2] [built]
            cjs require module [1] ./node_modules/lodash/lodash.js 1:0-41
```

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

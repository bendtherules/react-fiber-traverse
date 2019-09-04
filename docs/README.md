> **[react-fiber-traverse](README.md)**

[Globals](globals.md) /

# react-fiber-traverse

[![npm version][npmv-image]][npmv-url]
[![build status][travis-image]][travis-url]
[![coverage status][codecov-image]][codecov-url]
[![npm downloads][npmd-image]][npmd-url]

> Traverse and other utils on top of React fiber tree

## Basic Usage

```ts
import React from "react";
import { render } from "react-dom";

import { findNodeByComponentName, Utils } from "react-fiber-traverse";

// Sample component
// Say, if SomeComponentName looks like this -
function SomeComponentName() {
  return <div>Some text</div>;
}

// Render component
const rootElement = document.getElementById("root");
render(<SomeComponentName />, rootElement);

// Get root node
const rootFiberNode = Utils.getRootFiberNodeFromDOM(rootElement);

// Get component node
const someFiberNode = findNodeByComponentName(
  rootFiberNode,
  "SomeComponentName"
); // <- returns FiberNode for first usage of 'SomeComponentName'

console.log(someFiberNode.child.stateNode); // <- returns reference to the div
console.log(someFiberNode.child.stateNode.innerText); // <- returns 'Some text'

```

## Live Examples

- [Basic Usage](https://codesandbox.io/s/react-example-x82zk?expanddevtools=1&fontsize=14)
<!-- 
## API

**Props**

- `foo` - Something something.
- `bar` - _Optional_ Something something. Defaults to `null`.

**Example**

```jsx
``` -->

## Installation

```
$ npm install react-fiber-traverse --save
```

There are also UMD builds available via [unpkg](https://unpkg.com/):

- https://unpkg.com/react-fiber-traverse/dist/react-fiber-traverse.umd.development.js
- https://unpkg.com/react-fiber-traverse/dist/react-fiber-traverse.umd.production.js

For the non-minified development version, make sure you have already included:

- [`React`](https://unpkg.com/react/umd/react.development.js)
- [`ReactDOM`](https://unpkg.com/react-dom/umd/react-dom.development.js)

For the minified production version, make sure you have already included:

- [`React`](https://unpkg.com/react/umd/react.production.min.js)
- [`ReactDOM`](https://unpkg.com/react-dom/umd/react-dom.production.min.js)

## License

MIT

[travis-image]: https://img.shields.io/travis/bendtherules/react-fiber-traverse/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/bendtherules/react-fiber-traverse
[codecov-image]: https://img.shields.io/codecov/c/github/bendtherules/react-fiber-traverse.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/bendtherules/react-fiber-traverse
[npmv-image]: https://img.shields.io/npm/v/react-fiber-traverse.svg?style=flat-square
[npmv-url]: https://www.npmjs.com/package/react-fiber-traverse
[npmd-image]: https://img.shields.io/npm/dm/react-fiber-traverse.svg?style=flat-square
[npmd-url]: https://www.npmjs.com/package/react-fiber-traverse
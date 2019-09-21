> **[react-fiber-traverse](../README.md)**

[Globals](../globals.md) / ["traverse"](_traverse_.md) /

# External module: "traverse"

## Index

### Interfaces

* [TTraverseConfig](../interfaces/_traverse_.ttraverseconfig.md)

### Functions

* [traverse](_traverse_.md#traverse)
* [traverseGenerator](_traverse_.md#traversegenerator)

## Functions

###  traverse

▸ **traverse**(`node`: [FiberNode](_mocked_types_index_.md#fibernode), `fn`: function, `traverseConfig?`: [TTraverseConfig](../interfaces/_traverse_.ttraverseconfig.md)): *void*

*Defined in [traverse.ts:146](https://github.com/bendtherules/react-fiber-traverse/blob/c92c64b/src/traverse.ts#L146)*

Traverse nodes recursively in depth-first manner, starting from a start node.

This is the default and basic traversal function, which covers basic use cases.
You can't do advanced things like change the order of traversal, skip or cancel traversal after any node, etc.
For more advanced usecases, see [traverseGenerator](_traverse_.md#traversegenerator)

**`example`** 
```js
// calls fn for each node inside startNode
traverse(startNode, fn);
```

**Parameters:**

▪ **node**: *[FiberNode](_mocked_types_index_.md#fibernode)*

▪ **fn**: *function*

▸ (`node`: [FiberNode](_mocked_types_index_.md#fibernode)): *any*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [FiberNode](_mocked_types_index_.md#fibernode) |

▪`Optional`  **traverseConfig**: *[TTraverseConfig](../interfaces/_traverse_.ttraverseconfig.md)*

**Returns:** *void*

___

###  traverseGenerator

▸ **traverseGenerator**(`node`: [FiberNode](_mocked_types_index_.md#fibernode), `__namedParameters`: object): *`IterableIterator<FiberNode>`*

*Defined in [traverse.ts:69](https://github.com/bendtherules/react-fiber-traverse/blob/c92c64b/src/traverse.ts#L69)*

Traverse nodes recursively using generators.

This is the advanced traverse function, which can be used used
to write other variants of traversal and find.

Type signature for generator.next first argument is `{ skipChild?: boolean; skipSibling?: boolean } | void `
Throw any error into the generator to finish the generator and let it cleanup its internals.

It allows inversion of control -
so, application code can decide to
1. change order of traversal,
2. skip some elements,
3. cancel traversal mid-way.

**`example`** 
```js
// Basic use (for-of)

const nodeIterator = traverseGenerator(rootNode);
for (const node of nodeIterator) {
 // do something with each node here
}
```
------

**`example`** 
```js
// Breadth-first

// note the order below
const nodeIterator = traverseGenerator(rootNode, ["self", "sibling", "child"]);
// rest - same as above
```
-----

**`example`** 
```js
// Get first 3 nodes and then stop the generator

const nodeIterator = traverseGenerator(rootNode);

var count = 0;
var next;
while (
   count < 3 &&
   !(next = nodeIterator.next()).done
) {
   count++;
   const node = next.value;
   // do something with each node here
}

// Finish generator, to prevent memory leak
nodeIterator.throw(new Error());
```
-----

**Parameters:**

▪ **node**: *[FiberNode](_mocked_types_index_.md#fibernode)*

▪`Default value`  **__namedParameters**: *object*=  {}

Name | Type | Default |
------ | ------ | ------ |
`order` | "self" \| "child" \| "sibling"[] |  ["self", "child", "sibling"] |
`skipSelfForStartNode` | boolean | false |
`skipSiblingForStartNode` | boolean | true |

**Returns:** *`IterableIterator<FiberNode>`*
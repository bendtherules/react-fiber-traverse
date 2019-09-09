> **[react-fiber-traverse](../README.md)**

[Globals](../globals.md) / ["traverse"](_traverse_.md) /

# External module: "traverse"

## Index

### Functions

* [traverse](_traverse_.md#traverse)
* [traverseGenerator](_traverse_.md#traversegenerator)

## Functions

###  traverse

▸ **traverse**(`node`: [FiberNode](_mocked_types_index_.md#fibernode), `fn`: function): *void*

*Defined in [traverse.ts:19](https://github.com/bendtherules/react-fiber-traverse/blob/fd6dad2/src/traverse.ts#L19)*

Traverse nodes recursively in depth-first manner, starting from a start node.

This is the default and basic traversal method, which covers basic use cases.
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

**Returns:** *void*

___

###  traverseGenerator

▸ **traverseGenerator**(`node`: [FiberNode](_mocked_types_index_.md#fibernode), `__namedParameters`: object): *`IterableIterator<FiberNode>`*

*Defined in [traverse.ts:30](https://github.com/bendtherules/react-fiber-traverse/blob/fd6dad2/src/traverse.ts#L30)*

**Parameters:**

▪ **node**: *[FiberNode](_mocked_types_index_.md#fibernode)*

▪`Default value`  **__namedParameters**: *object*=  {}

Name | Type | Default |
------ | ------ | ------ |
`order` | "self" \| "child" \| "sibling"[] |  ["self", "child", "sibling"] |

**Returns:** *`IterableIterator<FiberNode>`*
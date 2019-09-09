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

*Defined in [traverse.ts:4](https://github.com/bendtherules/react-fiber-traverse/blob/5a2e7f1/src/traverse.ts#L4)*

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

*Defined in [traverse.ts:15](https://github.com/bendtherules/react-fiber-traverse/blob/5a2e7f1/src/traverse.ts#L15)*

**Parameters:**

▪ **node**: *[FiberNode](_mocked_types_index_.md#fibernode)*

▪`Default value`  **__namedParameters**: *object*=  {}

Name | Type | Default |
------ | ------ | ------ |
`order` | "self" \| "child" \| "sibling"[] |  ["self", "child", "sibling"] |

**Returns:** *`IterableIterator<FiberNode>`*
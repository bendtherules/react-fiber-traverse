> **[react-fiber-traverse](../README.md)**

[Globals](../globals.md) / ["findNode"](_findnode_.md) /

# External module: "findNode"

## Index

### Functions

* [findNodeByComponent](_findnode_.md#findnodebycomponent)
* [findNodeByComponentName](_findnode_.md#findnodebycomponentname)
* [findNodeByComponentRef](_findnode_.md#findnodebycomponentref)

## Functions

###  findNodeByComponent

▸ **findNodeByComponent**(`node`: [FiberNode](_mocked_types_index_.md#fibernode) | null, `expectedClassOrFunction`: `React.ComponentType`): *[FiberNode](_mocked_types_index_.md#fibernode) | null*

*Defined in [findNode.ts:32](https://github.com/bendtherules/react-fiber-traverse/blob/c9d7fd7/src/findNode.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [FiberNode](_mocked_types_index_.md#fibernode) \| null |
`expectedClassOrFunction` | `React.ComponentType` |

**Returns:** *[FiberNode](_mocked_types_index_.md#fibernode) | null*

___

###  findNodeByComponentName

▸ **findNodeByComponentName**(`node`: [FiberNode](_mocked_types_index_.md#fibernode) | null, `expectedName`: string): *[FiberNode](_mocked_types_index_.md#fibernode) | null*

*Defined in [findNode.ts:4](https://github.com/bendtherules/react-fiber-traverse/blob/c9d7fd7/src/findNode.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [FiberNode](_mocked_types_index_.md#fibernode) \| null |
`expectedName` | string |

**Returns:** *[FiberNode](_mocked_types_index_.md#fibernode) | null*

___

###  findNodeByComponentRef

▸ **findNodeByComponentRef**(`node`: [FiberNode](_mocked_types_index_.md#fibernode) | null, `expectedClassInstance`: `Component`): *[FiberNode](_mocked_types_index_.md#fibernode) | null*

*Defined in [findNode.ts:63](https://github.com/bendtherules/react-fiber-traverse/blob/c9d7fd7/src/findNode.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [FiberNode](_mocked_types_index_.md#fibernode) \| null |
`expectedClassInstance` | `Component` |

**Returns:** *[FiberNode](_mocked_types_index_.md#fibernode) | null*
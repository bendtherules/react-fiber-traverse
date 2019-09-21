> **[react-fiber-traverse](../README.md)**

[Globals](../globals.md) / ["findNode"](_findnode_.md) /

# External module: "findNode"

## Index

### Functions

* [findAllNodesByComponentName](_findnode_.md#findallnodesbycomponentname)
* [findNodeByComponent](_findnode_.md#findnodebycomponent)
* [findNodeByComponentName](_findnode_.md#findnodebycomponentname)
* [findNodeByComponentRef](_findnode_.md#findnodebycomponentref)
* [findNodesByComponentName](_findnode_.md#findnodesbycomponentname)

## Functions

###  findAllNodesByComponentName

▸ **findAllNodesByComponentName**(`node`: [FiberNode](_mocked_types_index_.md#fibernode) | null, `expectedName`: string, `traverseConfig?`: [TTraverseConfig](../interfaces/_traverse_.ttraverseconfig.md)): *`Array<FiberNode>`*

*Defined in [findNode.ts:58](https://github.com/bendtherules/react-fiber-traverse/blob/c92c64b/src/findNode.ts#L58)*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [FiberNode](_mocked_types_index_.md#fibernode) \| null |
`expectedName` | string |
`traverseConfig?` | [TTraverseConfig](../interfaces/_traverse_.ttraverseconfig.md) |

**Returns:** *`Array<FiberNode>`*

___

###  findNodeByComponent

▸ **findNodeByComponent**(`node`: [FiberNode](_mocked_types_index_.md#fibernode) | null, `expectedClassOrFunction`: `React.ComponentType`, `traverseConfig?`: [TTraverseConfig](../interfaces/_traverse_.ttraverseconfig.md)): *[FiberNode](_mocked_types_index_.md#fibernode) | null*

*Defined in [findNode.ts:84](https://github.com/bendtherules/react-fiber-traverse/blob/c92c64b/src/findNode.ts#L84)*

Find node by component (i.e. class or function by reference), till first match.

Matches against class and function by reference.
Returns null if no match is found.

**`example`** 
```js
// returns FiberNode for first usage of AccordionMenu
findNodeByComponent(startNode, AccordionMenu);
```

**`note`** Medium chance of collision, medium data access needed.
This is safer than findNodeByComponentName, as different components with the same name won't collide.
But, two instances of the same component will still collide.
Needs access to component class or function.

**Parameters:**

Name | Type |
------ | ------ |
`node` | [FiberNode](_mocked_types_index_.md#fibernode) \| null |
`expectedClassOrFunction` | `React.ComponentType` |
`traverseConfig?` | [TTraverseConfig](../interfaces/_traverse_.ttraverseconfig.md) |

**Returns:** *[FiberNode](_mocked_types_index_.md#fibernode) | null*

___

###  findNodeByComponentName

▸ **findNodeByComponentName**(`node`: [FiberNode](_mocked_types_index_.md#fibernode) | null, `expectedName`: string, `traverseConfig?`: [TTraverseConfig](../interfaces/_traverse_.ttraverseconfig.md)): *[FiberNode](_mocked_types_index_.md#fibernode) | null*

*Defined in [findNode.ts:22](https://github.com/bendtherules/react-fiber-traverse/blob/c92c64b/src/findNode.ts#L22)*

Find node by component name, till first match.

Matches against class and function name, doesn't match html-like nodes.
Returns null if no match is found.

**`example`** 
```js
// returns FiberNode for first usage of 'AccordionMenu'
findNodeByComponentName(startNode, "AccordionMenu");
```

**`note`** Highest chance of collision, least data access needed.
Different components with same name will collide.
Needs access to component name.

**Parameters:**

Name | Type |
------ | ------ |
`node` | [FiberNode](_mocked_types_index_.md#fibernode) \| null |
`expectedName` | string |
`traverseConfig?` | [TTraverseConfig](../interfaces/_traverse_.ttraverseconfig.md) |

**Returns:** *[FiberNode](_mocked_types_index_.md#fibernode) | null*

___

###  findNodeByComponentRef

▸ **findNodeByComponentRef**(`node`: [FiberNode](_mocked_types_index_.md#fibernode) | null, `expectedClassInstance`: `Component`, `traverseConfig?`: [TTraverseConfig](../interfaces/_traverse_.ttraverseconfig.md)): *[FiberNode](_mocked_types_index_.md#fibernode) | null*

*Defined in [findNode.ts:122](https://github.com/bendtherules/react-fiber-traverse/blob/c92c64b/src/findNode.ts#L122)*

Find node by component instance ref, till first match.

Matches against class instances by reference.
Returns null if no match is found.

**`example`** 
```js
// menuRef=createRef(); <AccordionMenu ref={menuRef}>
findNodeByComponentRef(startNode, menuRef.current);
```

**`note`** Least chance of collision, maximum data access needed.
Needs access to component instance (through React ref usually).

**Parameters:**

Name | Type |
------ | ------ |
`node` | [FiberNode](_mocked_types_index_.md#fibernode) \| null |
`expectedClassInstance` | `Component` |
`traverseConfig?` | [TTraverseConfig](../interfaces/_traverse_.ttraverseconfig.md) |

**Returns:** *[FiberNode](_mocked_types_index_.md#fibernode) | null*

___

###  findNodesByComponentName

▸ **findNodesByComponentName**(`node`: [FiberNode](_mocked_types_index_.md#fibernode) | null, `expectedName`: string, `traverseConfig?`: [TTraverseConfig](../interfaces/_traverse_.ttraverseconfig.md)): *`IterableIterator<FiberNode>`*

*Defined in [findNode.ts:41](https://github.com/bendtherules/react-fiber-traverse/blob/c92c64b/src/findNode.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [FiberNode](_mocked_types_index_.md#fibernode) \| null |
`expectedName` | string |
`traverseConfig?` | [TTraverseConfig](../interfaces/_traverse_.ttraverseconfig.md) |

**Returns:** *`IterableIterator<FiberNode>`*
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

*Defined in [findNode.ts:63](https://github.com/bendtherules/react-fiber-traverse/blob/21231fc/src/findNode.ts#L63)*

Find node by component (i.e. class or function by reference), till first match.

Matches against class and function by reference.
Returns null if no match is found.

**`note`** Medium chance of collision, medium data access needed.
This is safer than findNodeByComponentName, as different components with the same name won't collide.
But, two instances of the same component will still collide.
Needs access to component class or function.

**`example`** 
// returns FiberNode for first usage of AccordionMenu
findNodeByComponent(startNode, AccordionMenu);

**Parameters:**

Name | Type |
------ | ------ |
`node` | [FiberNode](_mocked_types_index_.md#fibernode) \| null |
`expectedClassOrFunction` | `React.ComponentType` |

**Returns:** *[FiberNode](_mocked_types_index_.md#fibernode) | null*

___

###  findNodeByComponentName

▸ **findNodeByComponentName**(`node`: [FiberNode](_mocked_types_index_.md#fibernode) | null, `expectedName`: string): *[FiberNode](_mocked_types_index_.md#fibernode) | null*

*Defined in [findNode.ts:19](https://github.com/bendtherules/react-fiber-traverse/blob/21231fc/src/findNode.ts#L19)*

Find node by component name, till first match.

Matches against class and function name, doesn't match html-like nodes.
Returns null if no match is found.

**`note`** Highest chance of collision, least data access needed.
Different components with same name will collide.
Needs access to component name.

**`example`** 
// returns FiberNode for first usage of 'AccordionMenu'
findNodeByComponentName(startNode, "AccordionMenu");

**Parameters:**

Name | Type |
------ | ------ |
`node` | [FiberNode](_mocked_types_index_.md#fibernode) \| null |
`expectedName` | string |

**Returns:** *[FiberNode](_mocked_types_index_.md#fibernode) | null*

___

###  findNodeByComponentRef

▸ **findNodeByComponentRef**(`node`: [FiberNode](_mocked_types_index_.md#fibernode) | null, `expectedClassInstance`: `Component`): *[FiberNode](_mocked_types_index_.md#fibernode) | null*

*Defined in [findNode.ts:108](https://github.com/bendtherules/react-fiber-traverse/blob/21231fc/src/findNode.ts#L108)*

Find node by component instance ref, till first match.

Matches against class instances by reference.
Returns null if no match is found.

**`note`** Least chance of collision, maximum data access needed.
Needs access to component instance (through React ref usually).

**`example`** 
// menuRef=createRef(); <AccordionMenu ref={menuRef}>
findNodeByComponentRef(startNode, menuRef.current);

**Parameters:**

Name | Type |
------ | ------ |
`node` | [FiberNode](_mocked_types_index_.md#fibernode) \| null |
`expectedClassInstance` | `Component` |

**Returns:** *[FiberNode](_mocked_types_index_.md#fibernode) | null*
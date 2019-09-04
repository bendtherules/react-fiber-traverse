> **[react-fiber-traverse](../README.md)**

[Globals](../globals.md) / ["utils"](_utils_.md) /

# External module: "utils"

## Index

### Functions

* [doesElementContainRootFiberNode](_utils_.md#doeselementcontainrootfibernode)
* [getRootFiberNodeFromDOM](_utils_.md#getrootfibernodefromdom)
* [isConstructorComponentClass](_utils_.md#isconstructorcomponentclass)
* [isConstructorFunctionComponent](_utils_.md#isconstructorfunctioncomponent)
* [isConstructorHtmlLike](_utils_.md#isconstructorhtmllike)
* [isNodeComponentClass](_utils_.md#isnodecomponentclass)
* [isNodeFunctionComponent](_utils_.md#isnodefunctioncomponent)
* [isNodeHtmlLike](_utils_.md#isnodehtmllike)
* [isNodeNotHtmlLike](_utils_.md#isnodenothtmllike)

## Functions

###  doesElementContainRootFiberNode

▸ **doesElementContainRootFiberNode**(`element`: `Element`): *boolean*

*Defined in [utils.ts:65](https://github.com/bendtherules/react-fiber-traverse/blob/18ea2e7/src/utils.ts#L65)*

**Parameters:**

Name | Type |
------ | ------ |
`element` | `Element` |

**Returns:** *boolean*

___

###  getRootFiberNodeFromDOM

▸ **getRootFiberNodeFromDOM**(`startElement?`: [Element](../interfaces/_mocked_types_index_.fibernodedomcontainer.md#element)): *[FiberNode](_mocked_types_index_.md#fibernode) | null*

*Defined in [utils.ts:82](https://github.com/bendtherules/react-fiber-traverse/blob/18ea2e7/src/utils.ts#L82)*

Util to find root React Fiber node from html DOM tree.
Returns null, if not found.SHould be called after ReactDOM.render is finished.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`startElement?` | [Element](../interfaces/_mocked_types_index_.fibernodedomcontainer.md#element) | Starting DOM element to seach from. If not found, it checks inside its child nodes. Defaults to document.body  |

**Returns:** *[FiberNode](_mocked_types_index_.md#fibernode) | null*

___

###  isConstructorComponentClass

▸ **isConstructorComponentClass**(`ctr`: `React.ElementType` | null): *boolean*

*Defined in [utils.ts:42](https://github.com/bendtherules/react-fiber-traverse/blob/18ea2e7/src/utils.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`ctr` | `React.ElementType` \| null |

**Returns:** *boolean*

___

###  isConstructorFunctionComponent

▸ **isConstructorFunctionComponent**(`ctr`: `React.ElementType` | null): *boolean*

*Defined in [utils.ts:59](https://github.com/bendtherules/react-fiber-traverse/blob/18ea2e7/src/utils.ts#L59)*

**Parameters:**

Name | Type |
------ | ------ |
`ctr` | `React.ElementType` \| null |

**Returns:** *boolean*

___

###  isConstructorHtmlLike

▸ **isConstructorHtmlLike**(`ctr`: `React.ElementType` | null): *boolean*

*Defined in [utils.ts:33](https://github.com/bendtherules/react-fiber-traverse/blob/18ea2e7/src/utils.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`ctr` | `React.ElementType` \| null |

**Returns:** *boolean*

___

###  isNodeComponentClass

▸ **isNodeComponentClass**(`node`: [FiberNode](_mocked_types_index_.md#fibernode)): *boolean*

*Defined in [utils.ts:27](https://github.com/bendtherules/react-fiber-traverse/blob/18ea2e7/src/utils.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [FiberNode](_mocked_types_index_.md#fibernode) |

**Returns:** *boolean*

___

###  isNodeFunctionComponent

▸ **isNodeFunctionComponent**(`node`: [FiberNode](_mocked_types_index_.md#fibernode)): *boolean*

*Defined in [utils.ts:21](https://github.com/bendtherules/react-fiber-traverse/blob/18ea2e7/src/utils.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [FiberNode](_mocked_types_index_.md#fibernode) |

**Returns:** *boolean*

___

###  isNodeHtmlLike

▸ **isNodeHtmlLike**(`node`: [FiberNode](_mocked_types_index_.md#fibernode)): *boolean*

*Defined in [utils.ts:11](https://github.com/bendtherules/react-fiber-traverse/blob/18ea2e7/src/utils.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [FiberNode](_mocked_types_index_.md#fibernode) |

**Returns:** *boolean*

___

###  isNodeNotHtmlLike

▸ **isNodeNotHtmlLike**(`node`: [FiberNode](_mocked_types_index_.md#fibernode)): *boolean*

*Defined in [utils.ts:15](https://github.com/bendtherules/react-fiber-traverse/blob/18ea2e7/src/utils.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [FiberNode](_mocked_types_index_.md#fibernode) |

**Returns:** *boolean*
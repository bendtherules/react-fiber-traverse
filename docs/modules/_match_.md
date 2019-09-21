> **[react-fiber-traverse](../README.md)**

[Globals](../globals.md) / ["match"](_match_.md) /

# External module: "match"

## Index

### Functions

* [matchAll](_match_.md#matchall)
* [matchFirst](_match_.md#matchfirst)
* [matchGenerator](_match_.md#matchgenerator)

## Functions

###  matchAll

▸ **matchAll**(`node`: [FiberNode](_mocked_types_index_.md#fibernode), `match`: string | `CSSWhat.Selector`[][]): *`Array<FiberNode>`*

*Defined in [match.ts:115](https://github.com/bendtherules/react-fiber-traverse/blob/c92c64b/src/match.ts#L115)*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [FiberNode](_mocked_types_index_.md#fibernode) |
`match` | string \| `CSSWhat.Selector`[][] |

**Returns:** *`Array<FiberNode>`*

___

###  matchFirst

▸ **matchFirst**(`node`: [FiberNode](_mocked_types_index_.md#fibernode), `match`: string | `CSSWhat.Selector`[][]): *[FiberNode](_mocked_types_index_.md#fibernode) | null*

*Defined in [match.ts:122](https://github.com/bendtherules/react-fiber-traverse/blob/c92c64b/src/match.ts#L122)*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [FiberNode](_mocked_types_index_.md#fibernode) |
`match` | string \| `CSSWhat.Selector`[][] |

**Returns:** *[FiberNode](_mocked_types_index_.md#fibernode) | null*

___

###  matchGenerator

▸ **matchGenerator**(`node`: [FiberNode](_mocked_types_index_.md#fibernode), `match`: string | `CSSWhat.Selector`[][]): *`IterableIterator<FiberNode>`*

*Defined in [match.ts:6](https://github.com/bendtherules/react-fiber-traverse/blob/c92c64b/src/match.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [FiberNode](_mocked_types_index_.md#fibernode) |
`match` | string \| `CSSWhat.Selector`[][] |

**Returns:** *`IterableIterator<FiberNode>`*
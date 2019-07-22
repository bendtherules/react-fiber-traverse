import { FiberNode, FiberNodeisHTMLLike } from './mocked-types';

function isHtmlLike(node: FiberNode): node is FiberNodeisHTMLLike {
    return (typeof node.type === "string") || node.type === null;
}

function isNotHtmlLike(node: FiberNode): node is Exclude<FiberNode, FiberNodeisHTMLLike> {
    return (typeof node.type === "string") || node.type === null;
}

export { isHtmlLike, isNotHtmlLike };
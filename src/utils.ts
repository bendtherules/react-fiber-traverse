import { FiberNode, FiberNodeisHTMLLike } from './mocked-types';

function isNodeHtmlLike(node: FiberNode): node is FiberNodeisHTMLLike {
    return (typeof node.type === "string") || node.type === null;
}

function isNodeNotHtmlLike(node: FiberNode): node is Exclude<FiberNode, FiberNodeisHTMLLike> {
    return !isNodeHtmlLike(node);
}

export { isNodeHtmlLike, isNodeNotHtmlLike };
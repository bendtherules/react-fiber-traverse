function isNodeSimple(node) {
    return (typeof node.type === "string") || node.type === null;
}

export { isNodeSimple };
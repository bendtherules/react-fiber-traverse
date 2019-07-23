// import { isNodeSimple } from './utils';
import {FiberNode} from './mocked-types';

function traverse(node: FiberNode, fn: (node: FiberNode) => any) {
  fn.call(null, node);

  if (node.child !== null) {
    traverse(node.child, fn);
  }
  if (node.sibling !== null) {
    traverse(node.sibling, fn);
  }
};

export default traverse;
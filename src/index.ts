// import { isNodeSimple } from './utils';
import {FiberNode} from './mocked-types';

function traverse(node: FiberNode, fn: (node: FiberNode) => any) {
  // if (node.child) {
  //   if (!isNodeSimple(node) && typeof node.child.type === "string") {
  //     node.child.stateNode.addEventListener('click', (ev) => {
  //       console.log('Clicked inside component: ' + node.type.name);
  //       ev.stopPropagation();
  //     });
  //     /* console.log('Set event listener for '+ node.type.name) */;
  //   }
  // }

  fn.call(null, node);

  if (node.child !== null) {
    traverse(node.child, fn);
  }
  if (node.sibling !== null) {
    traverse(node.sibling, fn);
  }
};


// findComponent = (node, name) => {
//   console.log(node)
//   if (!isNodeSimple(node) && node.type.name === name) {
//     console.log('Found node with name ' + node.type.name);

//     /* if (node.child) {
//       let innerNode = node.child;
//       console.log('Highlighting its inner nodes in yellow');

//       highlightNode(node, true);

//     } */
//     return node;
//   }

//   let returnVal = undefined;
//   returnVal = node.child && findComponent(node.child, name);
//   if (returnVal) { return returnVal }
//   returnVal = node.sibling && findComponent(node.sibling, name);
//   if (returnVal) { return returnVal }
// };

// highlightNode = (node, ignoreSibling = false) => {
//   if (isNodeSimple(node)) {
//     node.stateNode.style.backgroundColor = "yellow";
//   } else {
//     node.child && highlightNode(node.child);
//   }
//   !ignoreSibling && node.sibling && highlightNode(node.sibling);
// }

export { traverse };
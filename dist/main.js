(self["webpackChunkcs101"] = self["webpackChunkcs101"] || []).push([["main"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module) => {

// import './style.css';
// import { mergeSort } from './mergeSort';

function merge(left, right) {
  let newArray = [];
  const k = left.length + right.length;
  for (let i = 0; i < k; i++) {
    if (left.length === 0) {
      newArray.push(right.shift());
      continue;
    }
    if (right.length === 0) {
      newArray.push(left.shift());
      continue;
    }
    if (right[0] < left[0]) {
      newArray.push(right.shift());
    } else {
      newArray.push(left.shift());
    }
  }
  // console.log('newArray', newArray);
  return newArray;
}

function mergeSort(array) {
  if (array.length <= 1) return array;

  const mid = Math.floor(array.length / 2);
  const left = array.slice(0, mid);
  // console.log('🚀 ~ file: index.js:60 ~ mergeSort ~ left:', left);
  const right = array.slice(mid);
  // console.log('🚀 ~ file: index.js:62 ~ mergeSort ~ right:', right);

  return merge(mergeSort(left), mergeSort(right));
}

const Node = (data = null, left = null, right = null) => ({
  data,
  left,
  right,
});

const Tree = (root = null) => {
  // Function for building a tree from a random array
  const buildTree = (array) => {
    // Function for building a tree from a sorted array
    const buildTreeRecursion = (sortedArray) => {
      if (!sortedArray.length) return null;
      
      const mid = Math.floor(sortedArray.length / 2);
      const node = Node(sortedArray[mid]);
      console.log("🚀 ~ file: index.js:51 ~ buildTreeRecursion ~ mid:", mid)
      console.log("🚀 ~ file: index.js:51 ~ buildTreeRecursion ~ sortedArray[mid]:", sortedArray[mid])

      if (sortedArray.length <= 1) return node;

      const leftArray = sortedArray.slice(0, mid);
      node.left = buildTreeRecursion(leftArray);

      const rightArray = sortedArray.slice(mid + 1);
      node.right = buildTreeRecursion(rightArray);

      return node;
    };

    // Remove duplicates, then sort the array
    const sortedArray = mergeSort([...new Set(array)]);
    console.log("🚀 ~ file: index.js:66 ~ buildTree ~ sortedArray:", sortedArray)
    // The root of the tree is what's returned by the top level recursion
    root = buildTreeRecursion(sortedArray);
  };

  // Function for inserting a value into a tree
  const insert = (value) => {
    // Function to recursively insert a value
    const insertRecursion = (current, value) => {
      // If empty, insert the node as the root
      if (current === null) {
        return Node(value);
      }

      // Do nothing if the value exists in the tree.
      if (value == current.data) {
        console.log(`${value} already exists in the tree.`);
        return current;
      }

      // Decide left or right side to insert the leaf
      if (value < current.data) {
        current.left = insertRecursion(current.left, value);
      } else {
        current.right = insertRecursion(current.right, value);
      }
      return current;
    };

    root = insertRecursion(root, value);
  };

  const remove = (value) => {
    // Function to find the node with minimum value in tree
    const findMinValueNode = (base) => {
      let current = base;
      while (current.left) {
        current = current.left;
      }
      return current;
    };

    // Function to recursively remove a node with a given value
    const removeRecusion = (current, value) => {
      if (!current) {
        return current;
      }

      if (value < current.data) {
        current.left = removeRecusion(current.left, value);
      } else if (value > current.data) {
        current.right = removeRecusion(current.right, value);
      } else {
        // Match found
        if (!current.left) {
          // Only 1 right branch
          return current.right;
        }
        if (!current.right) {
          // Only 1 left branch
          return current.left;
        } else {
          // node had 2 branches
          // Find the minimum value in the right branch
          const min = findMinValueNode(current.right);

          // Assign this value to current node
          current.data = min.data;

          // Remove the node with that minimum value
          current.right = removeRecusion(current.right, min.data);
        }
      }
      return current;
    };

    root = removeRecusion(root, value);
  };

  // Function which accepts a value and returns the node with the given value
  const find = (value) => {
    const findRecursive = (current, value) => {
      // Nothing found
      if (!current) {
        return current;
      }

      if (value < current.data) {
        return findRecursive(current.left, value);
      } else if (value > current.data) {
        return findRecursive(current.right, value);
      } else {
        // Found!
        return current;
      }
    };
    return findRecursive(root, value);
  };

  // Write a levelOrder function which accepts another function as a parameter.
  // levelOrder should traverse the tree in breadth-first level order and
  // provide each node as the argument to the provided function.
  const levelOrder = (fn) => {
    if (!root) return [];
    const queue = [];
    const output = [];

    queue.push(root);
    while (queue.length) {
      if (queue[0]) {
        if (fn) fn(queue[0].data);
        output.push(queue[0].data);
        queue.push(queue[0].left);
        queue.push(queue[0].right);
      }
      queue.shift();
    }
    return output;
  };

  // Refer to https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/
  const inOrder = (fn) => {
    const inOrderRecursive = (current, fn) => {
      if (!current) return;

      inOrderRecursive(current.left, fn);
      fn(current.data);
      output.push(current.data);
      inOrderRecursive(current.right, fn);
    };
    const output = [];
    inOrderRecursive(root, fn);
    console.log('🚀 ~ file: index.js:196 ~ inOrder ~ output:', output);
    return output;
  };

  // Refer to https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/
  const preOrder = (fn) => {
    const inOrderRecursive = (current, fn) => {
      if (!current) return;

      fn(current.data);
      output.push(current.data);
      inOrderRecursive(current.left, fn);
      inOrderRecursive(current.right, fn);
    };
    const output = [];
    inOrderRecursive(root, fn);
    return output;
  };

  // Refer to https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/
  const postOrder = (fn) => {
    const inOrderRecursive = (current, fn) => {
      if (!current) return;

      inOrderRecursive(current.left, fn);
      inOrderRecursive(current.right, fn);
      fn(current.data);
      output.push(current.data);
    };
    const output = [];
    inOrderRecursive(root, fn);
    return output;
  };

  // Write a height function which accepts a node and returns its height.
  // Height is defined as the number of edges in longest path from a given node to a leaf node.
  const height = (node) => {
    if (!node) return 0;
    let countLeft = height(node.left) + 1;
    let countRight = height(node.right) + 1;
    return Math.max(countLeft, countRight);
  };

  // Write a depth function which accepts a node and returns its depth.
  // Depth is defined as the number of edges in path from a given node to the tree’s root node.
  const depth = (node) => {
    const depthRecursive = (base, node) => {
      if (base.data === node.data) return 0;
      if (node.data < base.data) {
        return depthRecursive(base.left, node) + 1;
      } else {
        return depthRecursive(base.right, node) + 1;
      }
    };
    if (node) return depthRecursive(root, node);
  };

  // Write a isBalanced function which checks if the tree is balanced.
  // A balanced tree is one where the difference between heights of left subtree and right subtree
  // of every node is not more than 1.
  const isBalanced = () => {
    const isBalancedRecursive = (base) => {
      const leftHeight = base.left ? height(base.left) : 0;
      const rightHeight = base.right ? height(base.right) : 0;
      if (Math.abs(leftHeight - rightHeight) > 1) {
        return false;
      } else {
        const leftIsBalanced = base.left
          ? isBalancedRecursive(base.left)
          : true;
        if (!leftIsBalanced) {
          return false;
        }
        const rightIsBalanced = base.right
          ? isBalancedRecursive(base.right)
          : true;
        if (!rightIsBalanced) {
          return false;
        } else return true;
      }
    };
    return isBalancedRecursive(root);
  };

  // Write a rebalance function which rebalances an unbalanced tree.
  // Tip: You’ll want to use a traversal method to provide a new array to the buildTree function.
  const rebalance = () => {
    const array = inOrder(fn);
    buildTree(array);
  };

  return {
    set root(node) {
      root = node;
    },
    get root() {
      return root;
    },
    buildTree,
    insert,
    remove,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
};

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

function fn(value) {
  console.log('🚀 ~ file: index.js:222 ~ fn ~ value:', value);
}

const tree = Tree();
tree.buildTree([4, 10, 12, 15, 18, 22, 24, 25, 31, 44, 35, 50, 70, 66, 90, 99]);
prettyPrint(tree.root);
// tree.remove(15);
// prettyPrint(tree.root);
// tree.remove(16);
// prettyPrint(tree.root);
// console.log(tree.find(10));
// console.log(tree.find(7));
// console.log(tree.find(4));
// console.log(tree.find(1));

// console.log(tree.levelOrder());
// console.log(tree.levelOrder(fn));
// console.log(tree.inOrder(fn));
// console.log(tree.preOrder(fn));
// console.log(tree.postOrder(fn));
// console.log(tree.height(tree.find(25)));
// console.log(tree.height(tree.find(15)));
// console.log(tree.depth(tree.find(25)));
// console.log(tree.depth(tree.find(15)));
// console.log(tree.depth(tree.find(10)));
// console.log(tree.depth(tree.find(12)));
// console.log(tree.depth(tree.find(1)));
console.log(tree.isBalanced());
// tree.remove(18);
// prettyPrint(tree.root);
// console.log(tree.isBalanced());
tree.remove(18);
prettyPrint(tree.root);
console.log(tree.isBalanced());
tree.remove(22);
prettyPrint(tree.root);
console.log(tree.isBalanced());
tree.remove(24);
prettyPrint(tree.root);
console.log(tree.isBalanced());
tree.rebalance();
prettyPrint(tree.root);

module.exports = Tree;


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NzMTAxLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCAnLi9zdHlsZS5jc3MnO1xuLy8gaW1wb3J0IHsgbWVyZ2VTb3J0IH0gZnJvbSAnLi9tZXJnZVNvcnQnO1xuXG5mdW5jdGlvbiBtZXJnZShsZWZ0LCByaWdodCkge1xuICBsZXQgbmV3QXJyYXkgPSBbXTtcbiAgY29uc3QgayA9IGxlZnQubGVuZ3RoICsgcmlnaHQubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGs7IGkrKykge1xuICAgIGlmIChsZWZ0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgbmV3QXJyYXkucHVzaChyaWdodC5zaGlmdCgpKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAocmlnaHQubGVuZ3RoID09PSAwKSB7XG4gICAgICBuZXdBcnJheS5wdXNoKGxlZnQuc2hpZnQoKSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKHJpZ2h0WzBdIDwgbGVmdFswXSkge1xuICAgICAgbmV3QXJyYXkucHVzaChyaWdodC5zaGlmdCgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3QXJyYXkucHVzaChsZWZ0LnNoaWZ0KCkpO1xuICAgIH1cbiAgfVxuICAvLyBjb25zb2xlLmxvZygnbmV3QXJyYXknLCBuZXdBcnJheSk7XG4gIHJldHVybiBuZXdBcnJheTtcbn1cblxuZnVuY3Rpb24gbWVyZ2VTb3J0KGFycmF5KSB7XG4gIGlmIChhcnJheS5sZW5ndGggPD0gMSkgcmV0dXJuIGFycmF5O1xuXG4gIGNvbnN0IG1pZCA9IE1hdGguZmxvb3IoYXJyYXkubGVuZ3RoIC8gMik7XG4gIGNvbnN0IGxlZnQgPSBhcnJheS5zbGljZSgwLCBtaWQpO1xuICAvLyBjb25zb2xlLmxvZygn8J+agCB+IGZpbGU6IGluZGV4LmpzOjYwIH4gbWVyZ2VTb3J0IH4gbGVmdDonLCBsZWZ0KTtcbiAgY29uc3QgcmlnaHQgPSBhcnJheS5zbGljZShtaWQpO1xuICAvLyBjb25zb2xlLmxvZygn8J+agCB+IGZpbGU6IGluZGV4LmpzOjYyIH4gbWVyZ2VTb3J0IH4gcmlnaHQ6JywgcmlnaHQpO1xuXG4gIHJldHVybiBtZXJnZShtZXJnZVNvcnQobGVmdCksIG1lcmdlU29ydChyaWdodCkpO1xufVxuXG5jb25zdCBOb2RlID0gKGRhdGEgPSBudWxsLCBsZWZ0ID0gbnVsbCwgcmlnaHQgPSBudWxsKSA9PiAoe1xuICBkYXRhLFxuICBsZWZ0LFxuICByaWdodCxcbn0pO1xuXG5jb25zdCBUcmVlID0gKHJvb3QgPSBudWxsKSA9PiB7XG4gIC8vIEZ1bmN0aW9uIGZvciBidWlsZGluZyBhIHRyZWUgZnJvbSBhIHJhbmRvbSBhcnJheVxuICBjb25zdCBidWlsZFRyZWUgPSAoYXJyYXkpID0+IHtcbiAgICAvLyBGdW5jdGlvbiBmb3IgYnVpbGRpbmcgYSB0cmVlIGZyb20gYSBzb3J0ZWQgYXJyYXlcbiAgICBjb25zdCBidWlsZFRyZWVSZWN1cnNpb24gPSAoc29ydGVkQXJyYXkpID0+IHtcbiAgICAgIGlmICghc29ydGVkQXJyYXkubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICAgIFxuICAgICAgY29uc3QgbWlkID0gTWF0aC5mbG9vcihzb3J0ZWRBcnJheS5sZW5ndGggLyAyKTtcbiAgICAgIGNvbnN0IG5vZGUgPSBOb2RlKHNvcnRlZEFycmF5W21pZF0pO1xuICAgICAgY29uc29sZS5sb2coXCLwn5qAIH4gZmlsZTogaW5kZXguanM6NTEgfiBidWlsZFRyZWVSZWN1cnNpb24gfiBtaWQ6XCIsIG1pZClcbiAgICAgIGNvbnNvbGUubG9nKFwi8J+agCB+IGZpbGU6IGluZGV4LmpzOjUxIH4gYnVpbGRUcmVlUmVjdXJzaW9uIH4gc29ydGVkQXJyYXlbbWlkXTpcIiwgc29ydGVkQXJyYXlbbWlkXSlcblxuICAgICAgaWYgKHNvcnRlZEFycmF5Lmxlbmd0aCA8PSAxKSByZXR1cm4gbm9kZTtcblxuICAgICAgY29uc3QgbGVmdEFycmF5ID0gc29ydGVkQXJyYXkuc2xpY2UoMCwgbWlkKTtcbiAgICAgIG5vZGUubGVmdCA9IGJ1aWxkVHJlZVJlY3Vyc2lvbihsZWZ0QXJyYXkpO1xuXG4gICAgICBjb25zdCByaWdodEFycmF5ID0gc29ydGVkQXJyYXkuc2xpY2UobWlkICsgMSk7XG4gICAgICBub2RlLnJpZ2h0ID0gYnVpbGRUcmVlUmVjdXJzaW9uKHJpZ2h0QXJyYXkpO1xuXG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9O1xuXG4gICAgLy8gUmVtb3ZlIGR1cGxpY2F0ZXMsIHRoZW4gc29ydCB0aGUgYXJyYXlcbiAgICBjb25zdCBzb3J0ZWRBcnJheSA9IG1lcmdlU29ydChbLi4ubmV3IFNldChhcnJheSldKTtcbiAgICBjb25zb2xlLmxvZyhcIvCfmoAgfiBmaWxlOiBpbmRleC5qczo2NiB+IGJ1aWxkVHJlZSB+IHNvcnRlZEFycmF5OlwiLCBzb3J0ZWRBcnJheSlcbiAgICAvLyBUaGUgcm9vdCBvZiB0aGUgdHJlZSBpcyB3aGF0J3MgcmV0dXJuZWQgYnkgdGhlIHRvcCBsZXZlbCByZWN1cnNpb25cbiAgICByb290ID0gYnVpbGRUcmVlUmVjdXJzaW9uKHNvcnRlZEFycmF5KTtcbiAgfTtcblxuICAvLyBGdW5jdGlvbiBmb3IgaW5zZXJ0aW5nIGEgdmFsdWUgaW50byBhIHRyZWVcbiAgY29uc3QgaW5zZXJ0ID0gKHZhbHVlKSA9PiB7XG4gICAgLy8gRnVuY3Rpb24gdG8gcmVjdXJzaXZlbHkgaW5zZXJ0IGEgdmFsdWVcbiAgICBjb25zdCBpbnNlcnRSZWN1cnNpb24gPSAoY3VycmVudCwgdmFsdWUpID0+IHtcbiAgICAgIC8vIElmIGVtcHR5LCBpbnNlcnQgdGhlIG5vZGUgYXMgdGhlIHJvb3RcbiAgICAgIGlmIChjdXJyZW50ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBOb2RlKHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgLy8gRG8gbm90aGluZyBpZiB0aGUgdmFsdWUgZXhpc3RzIGluIHRoZSB0cmVlLlxuICAgICAgaWYgKHZhbHVlID09IGN1cnJlbnQuZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgJHt2YWx1ZX0gYWxyZWFkeSBleGlzdHMgaW4gdGhlIHRyZWUuYCk7XG4gICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgICAgfVxuXG4gICAgICAvLyBEZWNpZGUgbGVmdCBvciByaWdodCBzaWRlIHRvIGluc2VydCB0aGUgbGVhZlxuICAgICAgaWYgKHZhbHVlIDwgY3VycmVudC5kYXRhKSB7XG4gICAgICAgIGN1cnJlbnQubGVmdCA9IGluc2VydFJlY3Vyc2lvbihjdXJyZW50LmxlZnQsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnQucmlnaHQgPSBpbnNlcnRSZWN1cnNpb24oY3VycmVudC5yaWdodCwgdmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgfTtcblxuICAgIHJvb3QgPSBpbnNlcnRSZWN1cnNpb24ocm9vdCwgdmFsdWUpO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZSA9ICh2YWx1ZSkgPT4ge1xuICAgIC8vIEZ1bmN0aW9uIHRvIGZpbmQgdGhlIG5vZGUgd2l0aCBtaW5pbXVtIHZhbHVlIGluIHRyZWVcbiAgICBjb25zdCBmaW5kTWluVmFsdWVOb2RlID0gKGJhc2UpID0+IHtcbiAgICAgIGxldCBjdXJyZW50ID0gYmFzZTtcbiAgICAgIHdoaWxlIChjdXJyZW50LmxlZnQpIHtcbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubGVmdDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjdXJyZW50O1xuICAgIH07XG5cbiAgICAvLyBGdW5jdGlvbiB0byByZWN1cnNpdmVseSByZW1vdmUgYSBub2RlIHdpdGggYSBnaXZlbiB2YWx1ZVxuICAgIGNvbnN0IHJlbW92ZVJlY3VzaW9uID0gKGN1cnJlbnQsIHZhbHVlKSA9PiB7XG4gICAgICBpZiAoIWN1cnJlbnQpIHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgICB9XG5cbiAgICAgIGlmICh2YWx1ZSA8IGN1cnJlbnQuZGF0YSkge1xuICAgICAgICBjdXJyZW50LmxlZnQgPSByZW1vdmVSZWN1c2lvbihjdXJyZW50LmxlZnQsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgPiBjdXJyZW50LmRhdGEpIHtcbiAgICAgICAgY3VycmVudC5yaWdodCA9IHJlbW92ZVJlY3VzaW9uKGN1cnJlbnQucmlnaHQsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE1hdGNoIGZvdW5kXG4gICAgICAgIGlmICghY3VycmVudC5sZWZ0KSB7XG4gICAgICAgICAgLy8gT25seSAxIHJpZ2h0IGJyYW5jaFxuICAgICAgICAgIHJldHVybiBjdXJyZW50LnJpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmICghY3VycmVudC5yaWdodCkge1xuICAgICAgICAgIC8vIE9ubHkgMSBsZWZ0IGJyYW5jaFxuICAgICAgICAgIHJldHVybiBjdXJyZW50LmxlZnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gbm9kZSBoYWQgMiBicmFuY2hlc1xuICAgICAgICAgIC8vIEZpbmQgdGhlIG1pbmltdW0gdmFsdWUgaW4gdGhlIHJpZ2h0IGJyYW5jaFxuICAgICAgICAgIGNvbnN0IG1pbiA9IGZpbmRNaW5WYWx1ZU5vZGUoY3VycmVudC5yaWdodCk7XG5cbiAgICAgICAgICAvLyBBc3NpZ24gdGhpcyB2YWx1ZSB0byBjdXJyZW50IG5vZGVcbiAgICAgICAgICBjdXJyZW50LmRhdGEgPSBtaW4uZGF0YTtcblxuICAgICAgICAgIC8vIFJlbW92ZSB0aGUgbm9kZSB3aXRoIHRoYXQgbWluaW11bSB2YWx1ZVxuICAgICAgICAgIGN1cnJlbnQucmlnaHQgPSByZW1vdmVSZWN1c2lvbihjdXJyZW50LnJpZ2h0LCBtaW4uZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjdXJyZW50O1xuICAgIH07XG5cbiAgICByb290ID0gcmVtb3ZlUmVjdXNpb24ocm9vdCwgdmFsdWUpO1xuICB9O1xuXG4gIC8vIEZ1bmN0aW9uIHdoaWNoIGFjY2VwdHMgYSB2YWx1ZSBhbmQgcmV0dXJucyB0aGUgbm9kZSB3aXRoIHRoZSBnaXZlbiB2YWx1ZVxuICBjb25zdCBmaW5kID0gKHZhbHVlKSA9PiB7XG4gICAgY29uc3QgZmluZFJlY3Vyc2l2ZSA9IChjdXJyZW50LCB2YWx1ZSkgPT4ge1xuICAgICAgLy8gTm90aGluZyBmb3VuZFxuICAgICAgaWYgKCFjdXJyZW50KSB7XG4gICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgICAgfVxuXG4gICAgICBpZiAodmFsdWUgPCBjdXJyZW50LmRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGZpbmRSZWN1cnNpdmUoY3VycmVudC5sZWZ0LCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlID4gY3VycmVudC5kYXRhKSB7XG4gICAgICAgIHJldHVybiBmaW5kUmVjdXJzaXZlKGN1cnJlbnQucmlnaHQsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZvdW5kIVxuICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBmaW5kUmVjdXJzaXZlKHJvb3QsIHZhbHVlKTtcbiAgfTtcblxuICAvLyBXcml0ZSBhIGxldmVsT3JkZXIgZnVuY3Rpb24gd2hpY2ggYWNjZXB0cyBhbm90aGVyIGZ1bmN0aW9uIGFzIGEgcGFyYW1ldGVyLlxuICAvLyBsZXZlbE9yZGVyIHNob3VsZCB0cmF2ZXJzZSB0aGUgdHJlZSBpbiBicmVhZHRoLWZpcnN0IGxldmVsIG9yZGVyIGFuZFxuICAvLyBwcm92aWRlIGVhY2ggbm9kZSBhcyB0aGUgYXJndW1lbnQgdG8gdGhlIHByb3ZpZGVkIGZ1bmN0aW9uLlxuICBjb25zdCBsZXZlbE9yZGVyID0gKGZuKSA9PiB7XG4gICAgaWYgKCFyb290KSByZXR1cm4gW107XG4gICAgY29uc3QgcXVldWUgPSBbXTtcbiAgICBjb25zdCBvdXRwdXQgPSBbXTtcblxuICAgIHF1ZXVlLnB1c2gocm9vdCk7XG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgaWYgKHF1ZXVlWzBdKSB7XG4gICAgICAgIGlmIChmbikgZm4ocXVldWVbMF0uZGF0YSk7XG4gICAgICAgIG91dHB1dC5wdXNoKHF1ZXVlWzBdLmRhdGEpO1xuICAgICAgICBxdWV1ZS5wdXNoKHF1ZXVlWzBdLmxlZnQpO1xuICAgICAgICBxdWV1ZS5wdXNoKHF1ZXVlWzBdLnJpZ2h0KTtcbiAgICAgIH1cbiAgICAgIHF1ZXVlLnNoaWZ0KCk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH07XG5cbiAgLy8gUmVmZXIgdG8gaHR0cHM6Ly93d3cuZ2Vla3Nmb3JnZWVrcy5vcmcvdHJlZS10cmF2ZXJzYWxzLWlub3JkZXItcHJlb3JkZXItYW5kLXBvc3RvcmRlci9cbiAgY29uc3QgaW5PcmRlciA9IChmbikgPT4ge1xuICAgIGNvbnN0IGluT3JkZXJSZWN1cnNpdmUgPSAoY3VycmVudCwgZm4pID0+IHtcbiAgICAgIGlmICghY3VycmVudCkgcmV0dXJuO1xuXG4gICAgICBpbk9yZGVyUmVjdXJzaXZlKGN1cnJlbnQubGVmdCwgZm4pO1xuICAgICAgZm4oY3VycmVudC5kYXRhKTtcbiAgICAgIG91dHB1dC5wdXNoKGN1cnJlbnQuZGF0YSk7XG4gICAgICBpbk9yZGVyUmVjdXJzaXZlKGN1cnJlbnQucmlnaHQsIGZuKTtcbiAgICB9O1xuICAgIGNvbnN0IG91dHB1dCA9IFtdO1xuICAgIGluT3JkZXJSZWN1cnNpdmUocm9vdCwgZm4pO1xuICAgIGNvbnNvbGUubG9nKCfwn5qAIH4gZmlsZTogaW5kZXguanM6MTk2IH4gaW5PcmRlciB+IG91dHB1dDonLCBvdXRwdXQpO1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH07XG5cbiAgLy8gUmVmZXIgdG8gaHR0cHM6Ly93d3cuZ2Vla3Nmb3JnZWVrcy5vcmcvdHJlZS10cmF2ZXJzYWxzLWlub3JkZXItcHJlb3JkZXItYW5kLXBvc3RvcmRlci9cbiAgY29uc3QgcHJlT3JkZXIgPSAoZm4pID0+IHtcbiAgICBjb25zdCBpbk9yZGVyUmVjdXJzaXZlID0gKGN1cnJlbnQsIGZuKSA9PiB7XG4gICAgICBpZiAoIWN1cnJlbnQpIHJldHVybjtcblxuICAgICAgZm4oY3VycmVudC5kYXRhKTtcbiAgICAgIG91dHB1dC5wdXNoKGN1cnJlbnQuZGF0YSk7XG4gICAgICBpbk9yZGVyUmVjdXJzaXZlKGN1cnJlbnQubGVmdCwgZm4pO1xuICAgICAgaW5PcmRlclJlY3Vyc2l2ZShjdXJyZW50LnJpZ2h0LCBmbik7XG4gICAgfTtcbiAgICBjb25zdCBvdXRwdXQgPSBbXTtcbiAgICBpbk9yZGVyUmVjdXJzaXZlKHJvb3QsIGZuKTtcbiAgICByZXR1cm4gb3V0cHV0O1xuICB9O1xuXG4gIC8vIFJlZmVyIHRvIGh0dHBzOi8vd3d3LmdlZWtzZm9yZ2Vla3Mub3JnL3RyZWUtdHJhdmVyc2Fscy1pbm9yZGVyLXByZW9yZGVyLWFuZC1wb3N0b3JkZXIvXG4gIGNvbnN0IHBvc3RPcmRlciA9IChmbikgPT4ge1xuICAgIGNvbnN0IGluT3JkZXJSZWN1cnNpdmUgPSAoY3VycmVudCwgZm4pID0+IHtcbiAgICAgIGlmICghY3VycmVudCkgcmV0dXJuO1xuXG4gICAgICBpbk9yZGVyUmVjdXJzaXZlKGN1cnJlbnQubGVmdCwgZm4pO1xuICAgICAgaW5PcmRlclJlY3Vyc2l2ZShjdXJyZW50LnJpZ2h0LCBmbik7XG4gICAgICBmbihjdXJyZW50LmRhdGEpO1xuICAgICAgb3V0cHV0LnB1c2goY3VycmVudC5kYXRhKTtcbiAgICB9O1xuICAgIGNvbnN0IG91dHB1dCA9IFtdO1xuICAgIGluT3JkZXJSZWN1cnNpdmUocm9vdCwgZm4pO1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH07XG5cbiAgLy8gV3JpdGUgYSBoZWlnaHQgZnVuY3Rpb24gd2hpY2ggYWNjZXB0cyBhIG5vZGUgYW5kIHJldHVybnMgaXRzIGhlaWdodC5cbiAgLy8gSGVpZ2h0IGlzIGRlZmluZWQgYXMgdGhlIG51bWJlciBvZiBlZGdlcyBpbiBsb25nZXN0IHBhdGggZnJvbSBhIGdpdmVuIG5vZGUgdG8gYSBsZWFmIG5vZGUuXG4gIGNvbnN0IGhlaWdodCA9IChub2RlKSA9PiB7XG4gICAgaWYgKCFub2RlKSByZXR1cm4gMDtcbiAgICBsZXQgY291bnRMZWZ0ID0gaGVpZ2h0KG5vZGUubGVmdCkgKyAxO1xuICAgIGxldCBjb3VudFJpZ2h0ID0gaGVpZ2h0KG5vZGUucmlnaHQpICsgMTtcbiAgICByZXR1cm4gTWF0aC5tYXgoY291bnRMZWZ0LCBjb3VudFJpZ2h0KTtcbiAgfTtcblxuICAvLyBXcml0ZSBhIGRlcHRoIGZ1bmN0aW9uIHdoaWNoIGFjY2VwdHMgYSBub2RlIGFuZCByZXR1cm5zIGl0cyBkZXB0aC5cbiAgLy8gRGVwdGggaXMgZGVmaW5lZCBhcyB0aGUgbnVtYmVyIG9mIGVkZ2VzIGluIHBhdGggZnJvbSBhIGdpdmVuIG5vZGUgdG8gdGhlIHRyZWXigJlzIHJvb3Qgbm9kZS5cbiAgY29uc3QgZGVwdGggPSAobm9kZSkgPT4ge1xuICAgIGNvbnN0IGRlcHRoUmVjdXJzaXZlID0gKGJhc2UsIG5vZGUpID0+IHtcbiAgICAgIGlmIChiYXNlLmRhdGEgPT09IG5vZGUuZGF0YSkgcmV0dXJuIDA7XG4gICAgICBpZiAobm9kZS5kYXRhIDwgYmFzZS5kYXRhKSB7XG4gICAgICAgIHJldHVybiBkZXB0aFJlY3Vyc2l2ZShiYXNlLmxlZnQsIG5vZGUpICsgMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBkZXB0aFJlY3Vyc2l2ZShiYXNlLnJpZ2h0LCBub2RlKSArIDE7XG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAobm9kZSkgcmV0dXJuIGRlcHRoUmVjdXJzaXZlKHJvb3QsIG5vZGUpO1xuICB9O1xuXG4gIC8vIFdyaXRlIGEgaXNCYWxhbmNlZCBmdW5jdGlvbiB3aGljaCBjaGVja3MgaWYgdGhlIHRyZWUgaXMgYmFsYW5jZWQuXG4gIC8vIEEgYmFsYW5jZWQgdHJlZSBpcyBvbmUgd2hlcmUgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiBoZWlnaHRzIG9mIGxlZnQgc3VidHJlZSBhbmQgcmlnaHQgc3VidHJlZVxuICAvLyBvZiBldmVyeSBub2RlIGlzIG5vdCBtb3JlIHRoYW4gMS5cbiAgY29uc3QgaXNCYWxhbmNlZCA9ICgpID0+IHtcbiAgICBjb25zdCBpc0JhbGFuY2VkUmVjdXJzaXZlID0gKGJhc2UpID0+IHtcbiAgICAgIGNvbnN0IGxlZnRIZWlnaHQgPSBiYXNlLmxlZnQgPyBoZWlnaHQoYmFzZS5sZWZ0KSA6IDA7XG4gICAgICBjb25zdCByaWdodEhlaWdodCA9IGJhc2UucmlnaHQgPyBoZWlnaHQoYmFzZS5yaWdodCkgOiAwO1xuICAgICAgaWYgKE1hdGguYWJzKGxlZnRIZWlnaHQgLSByaWdodEhlaWdodCkgPiAxKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGxlZnRJc0JhbGFuY2VkID0gYmFzZS5sZWZ0XG4gICAgICAgICAgPyBpc0JhbGFuY2VkUmVjdXJzaXZlKGJhc2UubGVmdClcbiAgICAgICAgICA6IHRydWU7XG4gICAgICAgIGlmICghbGVmdElzQmFsYW5jZWQpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmlnaHRJc0JhbGFuY2VkID0gYmFzZS5yaWdodFxuICAgICAgICAgID8gaXNCYWxhbmNlZFJlY3Vyc2l2ZShiYXNlLnJpZ2h0KVxuICAgICAgICAgIDogdHJ1ZTtcbiAgICAgICAgaWYgKCFyaWdodElzQmFsYW5jZWQpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBpc0JhbGFuY2VkUmVjdXJzaXZlKHJvb3QpO1xuICB9O1xuXG4gIC8vIFdyaXRlIGEgcmViYWxhbmNlIGZ1bmN0aW9uIHdoaWNoIHJlYmFsYW5jZXMgYW4gdW5iYWxhbmNlZCB0cmVlLlxuICAvLyBUaXA6IFlvdeKAmWxsIHdhbnQgdG8gdXNlIGEgdHJhdmVyc2FsIG1ldGhvZCB0byBwcm92aWRlIGEgbmV3IGFycmF5IHRvIHRoZSBidWlsZFRyZWUgZnVuY3Rpb24uXG4gIGNvbnN0IHJlYmFsYW5jZSA9ICgpID0+IHtcbiAgICBjb25zdCBhcnJheSA9IGluT3JkZXIoZm4pO1xuICAgIGJ1aWxkVHJlZShhcnJheSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBzZXQgcm9vdChub2RlKSB7XG4gICAgICByb290ID0gbm9kZTtcbiAgICB9LFxuICAgIGdldCByb290KCkge1xuICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgfSxcbiAgICBidWlsZFRyZWUsXG4gICAgaW5zZXJ0LFxuICAgIHJlbW92ZSxcbiAgICBmaW5kLFxuICAgIGxldmVsT3JkZXIsXG4gICAgaW5PcmRlcixcbiAgICBwcmVPcmRlcixcbiAgICBwb3N0T3JkZXIsXG4gICAgaGVpZ2h0LFxuICAgIGRlcHRoLFxuICAgIGlzQmFsYW5jZWQsXG4gICAgcmViYWxhbmNlLFxuICB9O1xufTtcblxuY29uc3QgcHJldHR5UHJpbnQgPSAobm9kZSwgcHJlZml4ID0gJycsIGlzTGVmdCA9IHRydWUpID0+IHtcbiAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKG5vZGUucmlnaHQgIT09IG51bGwpIHtcbiAgICBwcmV0dHlQcmludChub2RlLnJpZ2h0LCBgJHtwcmVmaXh9JHtpc0xlZnQgPyAn4pSCICAgJyA6ICcgICAgJ31gLCBmYWxzZSk7XG4gIH1cbiAgY29uc29sZS5sb2coYCR7cHJlZml4fSR7aXNMZWZ0ID8gJ+KUlOKUgOKUgCAnIDogJ+KUjOKUgOKUgCAnfSR7bm9kZS5kYXRhfWApO1xuICBpZiAobm9kZS5sZWZ0ICE9PSBudWxsKSB7XG4gICAgcHJldHR5UHJpbnQobm9kZS5sZWZ0LCBgJHtwcmVmaXh9JHtpc0xlZnQgPyAnICAgICcgOiAn4pSCICAgJ31gLCB0cnVlKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gZm4odmFsdWUpIHtcbiAgY29uc29sZS5sb2coJ/CfmoAgfiBmaWxlOiBpbmRleC5qczoyMjIgfiBmbiB+IHZhbHVlOicsIHZhbHVlKTtcbn1cblxuY29uc3QgdHJlZSA9IFRyZWUoKTtcbnRyZWUuYnVpbGRUcmVlKFs0LCAxMCwgMTIsIDE1LCAxOCwgMjIsIDI0LCAyNSwgMzEsIDQ0LCAzNSwgNTAsIDcwLCA2NiwgOTAsIDk5XSk7XG5wcmV0dHlQcmludCh0cmVlLnJvb3QpO1xuLy8gdHJlZS5yZW1vdmUoMTUpO1xuLy8gcHJldHR5UHJpbnQodHJlZS5yb290KTtcbi8vIHRyZWUucmVtb3ZlKDE2KTtcbi8vIHByZXR0eVByaW50KHRyZWUucm9vdCk7XG4vLyBjb25zb2xlLmxvZyh0cmVlLmZpbmQoMTApKTtcbi8vIGNvbnNvbGUubG9nKHRyZWUuZmluZCg3KSk7XG4vLyBjb25zb2xlLmxvZyh0cmVlLmZpbmQoNCkpO1xuLy8gY29uc29sZS5sb2codHJlZS5maW5kKDEpKTtcblxuLy8gY29uc29sZS5sb2codHJlZS5sZXZlbE9yZGVyKCkpO1xuLy8gY29uc29sZS5sb2codHJlZS5sZXZlbE9yZGVyKGZuKSk7XG4vLyBjb25zb2xlLmxvZyh0cmVlLmluT3JkZXIoZm4pKTtcbi8vIGNvbnNvbGUubG9nKHRyZWUucHJlT3JkZXIoZm4pKTtcbi8vIGNvbnNvbGUubG9nKHRyZWUucG9zdE9yZGVyKGZuKSk7XG4vLyBjb25zb2xlLmxvZyh0cmVlLmhlaWdodCh0cmVlLmZpbmQoMjUpKSk7XG4vLyBjb25zb2xlLmxvZyh0cmVlLmhlaWdodCh0cmVlLmZpbmQoMTUpKSk7XG4vLyBjb25zb2xlLmxvZyh0cmVlLmRlcHRoKHRyZWUuZmluZCgyNSkpKTtcbi8vIGNvbnNvbGUubG9nKHRyZWUuZGVwdGgodHJlZS5maW5kKDE1KSkpO1xuLy8gY29uc29sZS5sb2codHJlZS5kZXB0aCh0cmVlLmZpbmQoMTApKSk7XG4vLyBjb25zb2xlLmxvZyh0cmVlLmRlcHRoKHRyZWUuZmluZCgxMikpKTtcbi8vIGNvbnNvbGUubG9nKHRyZWUuZGVwdGgodHJlZS5maW5kKDEpKSk7XG5jb25zb2xlLmxvZyh0cmVlLmlzQmFsYW5jZWQoKSk7XG4vLyB0cmVlLnJlbW92ZSgxOCk7XG4vLyBwcmV0dHlQcmludCh0cmVlLnJvb3QpO1xuLy8gY29uc29sZS5sb2codHJlZS5pc0JhbGFuY2VkKCkpO1xudHJlZS5yZW1vdmUoMTgpO1xucHJldHR5UHJpbnQodHJlZS5yb290KTtcbmNvbnNvbGUubG9nKHRyZWUuaXNCYWxhbmNlZCgpKTtcbnRyZWUucmVtb3ZlKDIyKTtcbnByZXR0eVByaW50KHRyZWUucm9vdCk7XG5jb25zb2xlLmxvZyh0cmVlLmlzQmFsYW5jZWQoKSk7XG50cmVlLnJlbW92ZSgyNCk7XG5wcmV0dHlQcmludCh0cmVlLnJvb3QpO1xuY29uc29sZS5sb2codHJlZS5pc0JhbGFuY2VkKCkpO1xudHJlZS5yZWJhbGFuY2UoKTtcbnByZXR0eVByaW50KHRyZWUucm9vdCk7XG5cbm1vZHVsZS5leHBvcnRzID0gVHJlZTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
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

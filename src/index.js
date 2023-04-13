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
      const mid = Math.floor(sortedArray.length / 2);
      const node = Node(sortedArray[mid]);

      if (sortedArray.length <= 1) return node;

      const leftArray = sortedArray.slice(0, mid);
      node.left = buildTreeRecursion(leftArray);

      const rightArray = sortedArray.slice(mid + 1);
      node.right = buildTreeRecursion(rightArray);

      return node;
    };

    if (!array.length) return null;
    // Remove duplicates, then sort the array
    const sortedArray = mergeSort([...new Set(array)]);
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
        return findRecursive(current.left, value)
      } else if (value > current.data) {
        return findRecursive(current.right, value)
      } else { // Found!
        return current;
      }
    }
    return findRecursive(root, value)
  }

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

const tree = Tree();
tree.buildTree([10, 5, 15, 3, 7, 12, 18, 1, 4, 6, 8, 11, 14, 16, 20]);
prettyPrint(tree.root);
tree.remove(15);
prettyPrint(tree.root);
tree.remove(16);
prettyPrint(tree.root);
console.log(tree.find(10));
console.log(tree.find(7));
console.log(tree.find(4));
console.log(tree.find(1));


module.exports = Tree;

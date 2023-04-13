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
    // Sort the array first
    const sortedArray = mergeSort(array);
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
    // console.log(`Removing ${value}`);
    let current = root;
    let parent = root;
    while (current) {
      // console.log("🚀 ~ file: index.js:60 ~ remove ~ parent:", parent)
      // console.log("🚀 ~ file: index.js:61 ~ remove ~ current:", current)
      if (value < current.data) {
        // Make sure parent is first assigned to current before reassigning current
        parent = current;
        current = current.left;
      } else if (value > current.data) {
        // Make sure parent is first assigned to current before reassigning current
        parent = current;
        current = current.right;
      } else {
        // Found a match
        if (!current.left && !current.right) {
          // Node is a leaf
          // Special case to remove the root node of a tree with one data
          if (current === root) {
            root = null;
            return;
          }
          // console.log(`${value} is a leaf, removing...`);
          // Determine if the node is left or right leaf of it's parent
          // Remove the node by making that leaf of it's parent null
          if (value < parent.data) {
            parent.left = null;
          } else {
            parent.right = null;
          }
          return;
        } else if (current.left) {
          // node has a left branch
          let replacement = current.left;
          let replacementParent = replacement;
          // find the largest number in the left branch
          while (replacement.right) {
            replacementParent = replacement;
            replacement = replacement.right;
          }
          // console.log('🚀 ~ file: index.js:67 ~ remove ~ parent:', parent);
          // console.log('🚀 ~ file: index.js:97 ~ remove ~ current:', current);
          // console.log(
          //   '🚀 ~ file: index.js:85 ~ remove ~ replacement:',
          //   replacement
          // );
          // console.log(
          //   '🚀 ~ file: index.js:98 ~ remove ~ replacementParent:',
          //   replacementParent
          // );

          replacementParent.right = null;
          if (replacement !== replacementParent) {
            replacement.left = current.left;
          }
          replacement.right = current.right;
          if (current === root) {
            root = replacement;
          } else {
            if (value < parent.data) {
              parent.left = replacement;
            } else {
              parent.right = replacement;
            }
          }
          // replacementParent.left = current.left;
          return;
        } else {
          // Node had only the right branch
          let replacement = current.right;
          let replacementParent = replacement;
          // find the smallest number in the left branch
          while (replacement.left) {
            replacementParent = replacement;
            replacement = replacement.left;
          }
          // console.log('🚀 ~ file: index.js:67 ~ remove ~ parent:', parent);
          // console.log('🚀 ~ file: index.js:97 ~ remove ~ current:', current);
          // console.log(
          //   '🚀 ~ file: index.js:85 ~ remove ~ replacement:',
          //   replacement
          // );
          // console.log(
          //   '🚀 ~ file: index.js:98 ~ remove ~ replacementParent:',
          //   replacementParent
          // );

          replacementParent.right = null;
          replacement.left = current.left;
          replacement.right = current.right;

          parent.right = replacement;
          if (value < parent.data) {
            parent.left = replacement;
          } else {
            parent.right = replacement;
          }

          replacementParent.left = current.left;
          return;
        }
      }
    }
    // console.log('No match found!');
    return;
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

// const array = [
//   1, 7, 2, 6, 0, 4, 23, 8, 9, 4, 3, 5, 7, 9, 10, 12, 67, 6345, 324,
// ];
// // const array = [7,8,9];
// // Remove duplicates, then sort
// const sortedArray = mergeSort([...new Set(array)]);
// console.log('🚀 ~ file: index.js:16 ~ sortedArray:', sortedArray);
// const tree = Tree();
// tree.buildTree([10, 5, 15, 3, 7, 12, 18, 1, 4, 6, 8, 11, 14, 16, 20]);

// const tree = Tree();
// tree.buildTree(sortedArray);
// console.log(tree.root);
// prettyPrint(tree.root);

// tree.insert(9);
// tree.insert(10);
// tree.insert(10);
// tree.insert(11);
// tree.insert(15);
// tree.insert(13);
// tree.insert(18);
// prettyPrint(tree.root);

// tree.remove(18);
// // prettyPrint(tree.root);
// tree.remove(18);
// prettyPrint(tree.root);
// tree.remove(6);
// prettyPrint(tree.root);
// tree.remove(10);
// prettyPrint(tree.root);
// tree.remove(4);
// prettyPrint(tree.root);
// tree.remove(8);
// prettyPrint(tree.root);
// tree.remove(11);
// prettyPrint(tree.root);
// tree.remove(12);
// prettyPrint(tree.root);
// tree.remove(324);
// prettyPrint(tree.root);

// const removeDuplicates = (array) => {
//   const newArray = []
//   for (let i = 0; i < array.length; i++) {
//     if (newArray.includes(array[i])) {
//       continue;
//     } else {
//       newArray.push(array[i])
//     }
//   }
//   return newArray;
// }

// const sortedArray = mergeSort(removeDuplicates(array))

// export default Tree;

// const tree = Tree();
// tree.buildTree([10, 5, 15, 3, 7, 12, 18, 1, 4, 6, 8, 11, 14, 16, 20]);
// prettyPrint(tree.root);


// tree.insert(18);
// prettyPrint(tree.root);
// tree.insert(19);
// prettyPrint(tree.root);
// tree.remove(15);
// prettyPrint(tree.root);

module.exports = Tree;

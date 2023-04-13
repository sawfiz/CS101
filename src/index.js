import './style.css';
import { mergeSort } from './mergeSort';

const Node = (data = null, left = null, right = null) => ({
  data,
  left,
  right,
});

const Tree = (root = null) => {
  
  const buildTreeRecursive = (array) => {
    if (!array.length) return null;

    const mid = Math.floor(array.length / 2);
    const node = Node(array[mid]);

    if (array.length <= 1) return node;

    const leftArray = array.slice(0, mid);
    node.left = buildTreeRecursive(leftArray);

    const rightArray = array.slice(mid + 1);
    node.right = buildTreeRecursive(rightArray);

    return node;
  };
  
  const buildTree = (array) => {
    root = buildTreeRecursive(array);
  };

  const insert = (value) => {
    let current = root;
    let parent = root;
    while (current) {
      parent = current;
      if (value < current.data) {
        current = current.left;
      } else if (value > current.data) {
        current = current.right;
      } else {
        console.log(`${value} already exists in tree`);
        return;
      }
    }
    
    const node = Node(value);
    if (value < parent.data) {
      parent.left = node;
    } else {
      parent.right = node;
    }
  };

  const remove = (value) => {
    let current = root;
    let parent = root;
    while (current) {
      if (value < current.data) {
        parent = current;
        current = current.left;
      } else if (value > current.data) {
        parent = current;
        current = current.right;
      } else {
        console.log(`${value} is a leaf`);
        if (value < parent.data) {
          parent.left = null;
        } else {
          parent.right = null;
        }
        return;
      }
    }
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

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// const array = [7,8,9];
// Remove duplicates, then sort
const sortedArray = mergeSort([...new Set(array)]);
console.log('🚀 ~ file: index.js:16 ~ sortedArray:', sortedArray);

const tree = Tree();
tree.buildTree(sortedArray);
console.log(tree.root);
prettyPrint(tree.root);

tree.insert(9);
tree.insert(10);
tree.insert(10);
tree.insert(11);
tree.insert(15);
tree.insert(13);
tree.insert(18);
prettyPrint(tree.root);
tree.remove(18);
prettyPrint(tree.root);

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

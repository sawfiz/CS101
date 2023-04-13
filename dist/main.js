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

      if (sortedArray.length <= 1) return node;

      const leftArray = sortedArray.slice(0, mid);
      node.left = buildTreeRecursion(leftArray);

      const rightArray = sortedArray.slice(mid + 1);
      node.right = buildTreeRecursion(rightArray);

      return node;
    };

    // Sort the array first
    const sortedArray = mergeSort(array);
    // The root of the tree is what's returned by the top level recursion
    root = buildTreeRecursion(sortedArray);
  };

  // Function for inserting a value into a tree
  const insert = (value) => {
    // Create a new node of the value
    const node = Node(value);
    
    // If empty tree, insert the node as the root
    if (root === null) {
      root = node;
      return;
    }

    // Treverse the tree to find a node that the new node should be a leaf for
    let current = root;
    let parent = root;
    while (current) {
      parent = current;
      if (value < current.data) {
        current = current.left;
      } else if (value > current.data) {
        current = current.right;
      } else { // The value already exists in the tree, do nothing.
        // console.log(`${value} already exists in tree`);
        return;
      }
    }

    // Decide left or right side to insert the leaf
    if (value < parent.data) {
      parent.left = node;
    } else {
      parent.right = node;
    }
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

const tree = Tree();
tree.buildTree([10, 5, 15, 3, 7, 12, 18, 1, 4, 6, 8, 11, 14, 16, 20]);
prettyPrint(tree.root);
tree.remove(15);
prettyPrint(tree.root);

module.exports = Tree;


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0EsWUFBWSxZQUFZOztBQUV4QjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRLE9BQU87QUFDZiwwQkFBMEIsT0FBTztBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtCQUErQixNQUFNO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixPQUFPO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsT0FBTyxFQUFFLHlCQUF5QjtBQUNqRTtBQUNBLGlCQUFpQixPQUFPLEVBQUUseUJBQXlCLEVBQUUsVUFBVTtBQUMvRDtBQUNBLDhCQUE4QixPQUFPLEVBQUUseUJBQXlCO0FBQ2hFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsa0JBQWtCO0FBQ3ZDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY3MxMDEvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG4vLyBpbXBvcnQgeyBtZXJnZVNvcnQgfSBmcm9tICcuL21lcmdlU29ydCc7XG5cbmZ1bmN0aW9uIG1lcmdlKGxlZnQsIHJpZ2h0KSB7XG4gIGxldCBuZXdBcnJheSA9IFtdO1xuICBjb25zdCBrID0gbGVmdC5sZW5ndGggKyByaWdodC5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgazsgaSsrKSB7XG4gICAgaWYgKGxlZnQubGVuZ3RoID09PSAwKSB7XG4gICAgICBuZXdBcnJheS5wdXNoKHJpZ2h0LnNoaWZ0KCkpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChyaWdodC5sZW5ndGggPT09IDApIHtcbiAgICAgIG5ld0FycmF5LnB1c2gobGVmdC5zaGlmdCgpKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAocmlnaHRbMF0gPCBsZWZ0WzBdKSB7XG4gICAgICBuZXdBcnJheS5wdXNoKHJpZ2h0LnNoaWZ0KCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdBcnJheS5wdXNoKGxlZnQuc2hpZnQoKSk7XG4gICAgfVxuICB9XG4gIC8vIGNvbnNvbGUubG9nKCduZXdBcnJheScsIG5ld0FycmF5KTtcbiAgcmV0dXJuIG5ld0FycmF5O1xufVxuXG5mdW5jdGlvbiBtZXJnZVNvcnQoYXJyYXkpIHtcbiAgaWYgKGFycmF5Lmxlbmd0aCA8PSAxKSByZXR1cm4gYXJyYXk7XG5cbiAgY29uc3QgbWlkID0gTWF0aC5mbG9vcihhcnJheS5sZW5ndGggLyAyKTtcbiAgY29uc3QgbGVmdCA9IGFycmF5LnNsaWNlKDAsIG1pZCk7XG4gIC8vIGNvbnNvbGUubG9nKCfwn5qAIH4gZmlsZTogaW5kZXguanM6NjAgfiBtZXJnZVNvcnQgfiBsZWZ0OicsIGxlZnQpO1xuICBjb25zdCByaWdodCA9IGFycmF5LnNsaWNlKG1pZCk7XG4gIC8vIGNvbnNvbGUubG9nKCfwn5qAIH4gZmlsZTogaW5kZXguanM6NjIgfiBtZXJnZVNvcnQgfiByaWdodDonLCByaWdodCk7XG5cbiAgcmV0dXJuIG1lcmdlKG1lcmdlU29ydChsZWZ0KSwgbWVyZ2VTb3J0KHJpZ2h0KSk7XG59XG5cbmNvbnN0IE5vZGUgPSAoZGF0YSA9IG51bGwsIGxlZnQgPSBudWxsLCByaWdodCA9IG51bGwpID0+ICh7XG4gIGRhdGEsXG4gIGxlZnQsXG4gIHJpZ2h0LFxufSk7XG5cbmNvbnN0IFRyZWUgPSAocm9vdCA9IG51bGwpID0+IHtcbiAgLy8gRnVuY3Rpb24gZm9yIGJ1aWxkaW5nIGEgdHJlZSBmcm9tIGEgcmFuZG9tIGFycmF5XG4gIGNvbnN0IGJ1aWxkVHJlZSA9IChhcnJheSkgPT4ge1xuICAgIC8vIEZ1bmN0aW9uIGZvciBidWlsZGluZyBhIHRyZWUgZnJvbSBhIHNvcnRlZCBhcnJheVxuICAgIGNvbnN0IGJ1aWxkVHJlZVJlY3Vyc2lvbiA9IChzb3J0ZWRBcnJheSkgPT4ge1xuICAgICAgaWYgKCFzb3J0ZWRBcnJheS5sZW5ndGgpIHJldHVybiBudWxsO1xuXG4gICAgICBjb25zdCBtaWQgPSBNYXRoLmZsb29yKHNvcnRlZEFycmF5Lmxlbmd0aCAvIDIpO1xuICAgICAgY29uc3Qgbm9kZSA9IE5vZGUoc29ydGVkQXJyYXlbbWlkXSk7XG5cbiAgICAgIGlmIChzb3J0ZWRBcnJheS5sZW5ndGggPD0gMSkgcmV0dXJuIG5vZGU7XG5cbiAgICAgIGNvbnN0IGxlZnRBcnJheSA9IHNvcnRlZEFycmF5LnNsaWNlKDAsIG1pZCk7XG4gICAgICBub2RlLmxlZnQgPSBidWlsZFRyZWVSZWN1cnNpb24obGVmdEFycmF5KTtcblxuICAgICAgY29uc3QgcmlnaHRBcnJheSA9IHNvcnRlZEFycmF5LnNsaWNlKG1pZCArIDEpO1xuICAgICAgbm9kZS5yaWdodCA9IGJ1aWxkVHJlZVJlY3Vyc2lvbihyaWdodEFycmF5KTtcblxuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfTtcblxuICAgIC8vIFNvcnQgdGhlIGFycmF5IGZpcnN0XG4gICAgY29uc3Qgc29ydGVkQXJyYXkgPSBtZXJnZVNvcnQoYXJyYXkpO1xuICAgIC8vIFRoZSByb290IG9mIHRoZSB0cmVlIGlzIHdoYXQncyByZXR1cm5lZCBieSB0aGUgdG9wIGxldmVsIHJlY3Vyc2lvblxuICAgIHJvb3QgPSBidWlsZFRyZWVSZWN1cnNpb24oc29ydGVkQXJyYXkpO1xuICB9O1xuXG4gIC8vIEZ1bmN0aW9uIGZvciBpbnNlcnRpbmcgYSB2YWx1ZSBpbnRvIGEgdHJlZVxuICBjb25zdCBpbnNlcnQgPSAodmFsdWUpID0+IHtcbiAgICAvLyBDcmVhdGUgYSBuZXcgbm9kZSBvZiB0aGUgdmFsdWVcbiAgICBjb25zdCBub2RlID0gTm9kZSh2YWx1ZSk7XG4gICAgXG4gICAgLy8gSWYgZW1wdHkgdHJlZSwgaW5zZXJ0IHRoZSBub2RlIGFzIHRoZSByb290XG4gICAgaWYgKHJvb3QgPT09IG51bGwpIHtcbiAgICAgIHJvb3QgPSBub2RlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFRyZXZlcnNlIHRoZSB0cmVlIHRvIGZpbmQgYSBub2RlIHRoYXQgdGhlIG5ldyBub2RlIHNob3VsZCBiZSBhIGxlYWYgZm9yXG4gICAgbGV0IGN1cnJlbnQgPSByb290O1xuICAgIGxldCBwYXJlbnQgPSByb290O1xuICAgIHdoaWxlIChjdXJyZW50KSB7XG4gICAgICBwYXJlbnQgPSBjdXJyZW50O1xuICAgICAgaWYgKHZhbHVlIDwgY3VycmVudC5kYXRhKSB7XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LmxlZnQ7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlID4gY3VycmVudC5kYXRhKSB7XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnJpZ2h0O1xuICAgICAgfSBlbHNlIHsgLy8gVGhlIHZhbHVlIGFscmVhZHkgZXhpc3RzIGluIHRoZSB0cmVlLCBkbyBub3RoaW5nLlxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHt2YWx1ZX0gYWxyZWFkeSBleGlzdHMgaW4gdHJlZWApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRGVjaWRlIGxlZnQgb3IgcmlnaHQgc2lkZSB0byBpbnNlcnQgdGhlIGxlYWZcbiAgICBpZiAodmFsdWUgPCBwYXJlbnQuZGF0YSkge1xuICAgICAgcGFyZW50LmxlZnQgPSBub2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJlbnQucmlnaHQgPSBub2RlO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZW1vdmUgPSAodmFsdWUpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZyhgUmVtb3ZpbmcgJHt2YWx1ZX1gKTtcbiAgICBsZXQgY3VycmVudCA9IHJvb3Q7XG4gICAgbGV0IHBhcmVudCA9IHJvb3Q7XG4gICAgd2hpbGUgKGN1cnJlbnQpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwi8J+agCB+IGZpbGU6IGluZGV4LmpzOjYwIH4gcmVtb3ZlIH4gcGFyZW50OlwiLCBwYXJlbnQpXG4gICAgICAvLyBjb25zb2xlLmxvZyhcIvCfmoAgfiBmaWxlOiBpbmRleC5qczo2MSB+IHJlbW92ZSB+IGN1cnJlbnQ6XCIsIGN1cnJlbnQpXG4gICAgICBpZiAodmFsdWUgPCBjdXJyZW50LmRhdGEpIHtcbiAgICAgICAgLy8gTWFrZSBzdXJlIHBhcmVudCBpcyBmaXJzdCBhc3NpZ25lZCB0byBjdXJyZW50IGJlZm9yZSByZWFzc2lnbmluZyBjdXJyZW50XG4gICAgICAgIHBhcmVudCA9IGN1cnJlbnQ7XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LmxlZnQ7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlID4gY3VycmVudC5kYXRhKSB7XG4gICAgICAgIC8vIE1ha2Ugc3VyZSBwYXJlbnQgaXMgZmlyc3QgYXNzaWduZWQgdG8gY3VycmVudCBiZWZvcmUgcmVhc3NpZ25pbmcgY3VycmVudFxuICAgICAgICBwYXJlbnQgPSBjdXJyZW50O1xuICAgICAgICBjdXJyZW50ID0gY3VycmVudC5yaWdodDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZvdW5kIGEgbWF0Y2hcbiAgICAgICAgaWYgKCFjdXJyZW50LmxlZnQgJiYgIWN1cnJlbnQucmlnaHQpIHtcbiAgICAgICAgICAvLyBOb2RlIGlzIGEgbGVhZlxuICAgICAgICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZW1vdmUgdGhlIHJvb3Qgbm9kZSBvZiBhIHRyZWUgd2l0aCBvbmUgZGF0YVxuICAgICAgICAgIGlmIChjdXJyZW50ID09PSByb290KSB7XG4gICAgICAgICAgICByb290ID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7dmFsdWV9IGlzIGEgbGVhZiwgcmVtb3ZpbmcuLi5gKTtcbiAgICAgICAgICAvLyBEZXRlcm1pbmUgaWYgdGhlIG5vZGUgaXMgbGVmdCBvciByaWdodCBsZWFmIG9mIGl0J3MgcGFyZW50XG4gICAgICAgICAgLy8gUmVtb3ZlIHRoZSBub2RlIGJ5IG1ha2luZyB0aGF0IGxlYWYgb2YgaXQncyBwYXJlbnQgbnVsbFxuICAgICAgICAgIGlmICh2YWx1ZSA8IHBhcmVudC5kYXRhKSB7XG4gICAgICAgICAgICBwYXJlbnQubGVmdCA9IG51bGw7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcmVudC5yaWdodCA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50LmxlZnQpIHtcbiAgICAgICAgICAvLyBub2RlIGhhcyBhIGxlZnQgYnJhbmNoXG4gICAgICAgICAgbGV0IHJlcGxhY2VtZW50ID0gY3VycmVudC5sZWZ0O1xuICAgICAgICAgIGxldCByZXBsYWNlbWVudFBhcmVudCA9IHJlcGxhY2VtZW50O1xuICAgICAgICAgIC8vIGZpbmQgdGhlIGxhcmdlc3QgbnVtYmVyIGluIHRoZSBsZWZ0IGJyYW5jaFxuICAgICAgICAgIHdoaWxlIChyZXBsYWNlbWVudC5yaWdodCkge1xuICAgICAgICAgICAgcmVwbGFjZW1lbnRQYXJlbnQgPSByZXBsYWNlbWVudDtcbiAgICAgICAgICAgIHJlcGxhY2VtZW50ID0gcmVwbGFjZW1lbnQucmlnaHQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfwn5qAIH4gZmlsZTogaW5kZXguanM6NjcgfiByZW1vdmUgfiBwYXJlbnQ6JywgcGFyZW50KTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygn8J+agCB+IGZpbGU6IGluZGV4LmpzOjk3IH4gcmVtb3ZlIH4gY3VycmVudDonLCBjdXJyZW50KTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcbiAgICAgICAgICAvLyAgICfwn5qAIH4gZmlsZTogaW5kZXguanM6ODUgfiByZW1vdmUgfiByZXBsYWNlbWVudDonLFxuICAgICAgICAgIC8vICAgcmVwbGFjZW1lbnRcbiAgICAgICAgICAvLyApO1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFxuICAgICAgICAgIC8vICAgJ/CfmoAgfiBmaWxlOiBpbmRleC5qczo5OCB+IHJlbW92ZSB+IHJlcGxhY2VtZW50UGFyZW50OicsXG4gICAgICAgICAgLy8gICByZXBsYWNlbWVudFBhcmVudFxuICAgICAgICAgIC8vICk7XG5cbiAgICAgICAgICByZXBsYWNlbWVudFBhcmVudC5yaWdodCA9IG51bGw7XG4gICAgICAgICAgaWYgKHJlcGxhY2VtZW50ICE9PSByZXBsYWNlbWVudFBhcmVudCkge1xuICAgICAgICAgICAgcmVwbGFjZW1lbnQubGVmdCA9IGN1cnJlbnQubGVmdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVwbGFjZW1lbnQucmlnaHQgPSBjdXJyZW50LnJpZ2h0O1xuICAgICAgICAgIGlmIChjdXJyZW50ID09PSByb290KSB7XG4gICAgICAgICAgICByb290ID0gcmVwbGFjZW1lbnQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA8IHBhcmVudC5kYXRhKSB7XG4gICAgICAgICAgICAgIHBhcmVudC5sZWZ0ID0gcmVwbGFjZW1lbnQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwYXJlbnQucmlnaHQgPSByZXBsYWNlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcmVwbGFjZW1lbnRQYXJlbnQubGVmdCA9IGN1cnJlbnQubGVmdDtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gTm9kZSBoYWQgb25seSB0aGUgcmlnaHQgYnJhbmNoXG4gICAgICAgICAgbGV0IHJlcGxhY2VtZW50ID0gY3VycmVudC5yaWdodDtcbiAgICAgICAgICBsZXQgcmVwbGFjZW1lbnRQYXJlbnQgPSByZXBsYWNlbWVudDtcbiAgICAgICAgICAvLyBmaW5kIHRoZSBzbWFsbGVzdCBudW1iZXIgaW4gdGhlIGxlZnQgYnJhbmNoXG4gICAgICAgICAgd2hpbGUgKHJlcGxhY2VtZW50LmxlZnQpIHtcbiAgICAgICAgICAgIHJlcGxhY2VtZW50UGFyZW50ID0gcmVwbGFjZW1lbnQ7XG4gICAgICAgICAgICByZXBsYWNlbWVudCA9IHJlcGxhY2VtZW50LmxlZnQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfwn5qAIH4gZmlsZTogaW5kZXguanM6NjcgfiByZW1vdmUgfiBwYXJlbnQ6JywgcGFyZW50KTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygn8J+agCB+IGZpbGU6IGluZGV4LmpzOjk3IH4gcmVtb3ZlIH4gY3VycmVudDonLCBjdXJyZW50KTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcbiAgICAgICAgICAvLyAgICfwn5qAIH4gZmlsZTogaW5kZXguanM6ODUgfiByZW1vdmUgfiByZXBsYWNlbWVudDonLFxuICAgICAgICAgIC8vICAgcmVwbGFjZW1lbnRcbiAgICAgICAgICAvLyApO1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFxuICAgICAgICAgIC8vICAgJ/CfmoAgfiBmaWxlOiBpbmRleC5qczo5OCB+IHJlbW92ZSB+IHJlcGxhY2VtZW50UGFyZW50OicsXG4gICAgICAgICAgLy8gICByZXBsYWNlbWVudFBhcmVudFxuICAgICAgICAgIC8vICk7XG5cbiAgICAgICAgICByZXBsYWNlbWVudFBhcmVudC5yaWdodCA9IG51bGw7XG4gICAgICAgICAgcmVwbGFjZW1lbnQubGVmdCA9IGN1cnJlbnQubGVmdDtcbiAgICAgICAgICByZXBsYWNlbWVudC5yaWdodCA9IGN1cnJlbnQucmlnaHQ7XG5cbiAgICAgICAgICBwYXJlbnQucmlnaHQgPSByZXBsYWNlbWVudDtcbiAgICAgICAgICBpZiAodmFsdWUgPCBwYXJlbnQuZGF0YSkge1xuICAgICAgICAgICAgcGFyZW50LmxlZnQgPSByZXBsYWNlbWVudDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGFyZW50LnJpZ2h0ID0gcmVwbGFjZW1lbnQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVwbGFjZW1lbnRQYXJlbnQubGVmdCA9IGN1cnJlbnQubGVmdDtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2coJ05vIG1hdGNoIGZvdW5kIScpO1xuICAgIHJldHVybjtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHNldCByb290KG5vZGUpIHtcbiAgICAgIHJvb3QgPSBub2RlO1xuICAgIH0sXG4gICAgZ2V0IHJvb3QoKSB7XG4gICAgICByZXR1cm4gcm9vdDtcbiAgICB9LFxuICAgIGJ1aWxkVHJlZSxcbiAgICBpbnNlcnQsXG4gICAgcmVtb3ZlLFxuICB9O1xufTtcblxuY29uc3QgcHJldHR5UHJpbnQgPSAobm9kZSwgcHJlZml4ID0gJycsIGlzTGVmdCA9IHRydWUpID0+IHtcbiAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKG5vZGUucmlnaHQgIT09IG51bGwpIHtcbiAgICBwcmV0dHlQcmludChub2RlLnJpZ2h0LCBgJHtwcmVmaXh9JHtpc0xlZnQgPyAn4pSCICAgJyA6ICcgICAgJ31gLCBmYWxzZSk7XG4gIH1cbiAgY29uc29sZS5sb2coYCR7cHJlZml4fSR7aXNMZWZ0ID8gJ+KUlOKUgOKUgCAnIDogJ+KUjOKUgOKUgCAnfSR7bm9kZS5kYXRhfWApO1xuICBpZiAobm9kZS5sZWZ0ICE9PSBudWxsKSB7XG4gICAgcHJldHR5UHJpbnQobm9kZS5sZWZ0LCBgJHtwcmVmaXh9JHtpc0xlZnQgPyAnICAgICcgOiAn4pSCICAgJ31gLCB0cnVlKTtcbiAgfVxufTtcblxuLy8gY29uc3QgYXJyYXkgPSBbXG4vLyAgIDEsIDcsIDIsIDYsIDAsIDQsIDIzLCA4LCA5LCA0LCAzLCA1LCA3LCA5LCAxMCwgMTIsIDY3LCA2MzQ1LCAzMjQsXG4vLyBdO1xuLy8gLy8gY29uc3QgYXJyYXkgPSBbNyw4LDldO1xuLy8gLy8gUmVtb3ZlIGR1cGxpY2F0ZXMsIHRoZW4gc29ydFxuLy8gY29uc3Qgc29ydGVkQXJyYXkgPSBtZXJnZVNvcnQoWy4uLm5ldyBTZXQoYXJyYXkpXSk7XG4vLyBjb25zb2xlLmxvZygn8J+agCB+IGZpbGU6IGluZGV4LmpzOjE2IH4gc29ydGVkQXJyYXk6Jywgc29ydGVkQXJyYXkpO1xuLy8gY29uc3QgdHJlZSA9IFRyZWUoKTtcbi8vIHRyZWUuYnVpbGRUcmVlKFsxMCwgNSwgMTUsIDMsIDcsIDEyLCAxOCwgMSwgNCwgNiwgOCwgMTEsIDE0LCAxNiwgMjBdKTtcblxuLy8gY29uc3QgdHJlZSA9IFRyZWUoKTtcbi8vIHRyZWUuYnVpbGRUcmVlKHNvcnRlZEFycmF5KTtcbi8vIGNvbnNvbGUubG9nKHRyZWUucm9vdCk7XG4vLyBwcmV0dHlQcmludCh0cmVlLnJvb3QpO1xuXG4vLyB0cmVlLmluc2VydCg5KTtcbi8vIHRyZWUuaW5zZXJ0KDEwKTtcbi8vIHRyZWUuaW5zZXJ0KDEwKTtcbi8vIHRyZWUuaW5zZXJ0KDExKTtcbi8vIHRyZWUuaW5zZXJ0KDE1KTtcbi8vIHRyZWUuaW5zZXJ0KDEzKTtcbi8vIHRyZWUuaW5zZXJ0KDE4KTtcbi8vIHByZXR0eVByaW50KHRyZWUucm9vdCk7XG5cbi8vIHRyZWUucmVtb3ZlKDE4KTtcbi8vIC8vIHByZXR0eVByaW50KHRyZWUucm9vdCk7XG4vLyB0cmVlLnJlbW92ZSgxOCk7XG4vLyBwcmV0dHlQcmludCh0cmVlLnJvb3QpO1xuLy8gdHJlZS5yZW1vdmUoNik7XG4vLyBwcmV0dHlQcmludCh0cmVlLnJvb3QpO1xuLy8gdHJlZS5yZW1vdmUoMTApO1xuLy8gcHJldHR5UHJpbnQodHJlZS5yb290KTtcbi8vIHRyZWUucmVtb3ZlKDQpO1xuLy8gcHJldHR5UHJpbnQodHJlZS5yb290KTtcbi8vIHRyZWUucmVtb3ZlKDgpO1xuLy8gcHJldHR5UHJpbnQodHJlZS5yb290KTtcbi8vIHRyZWUucmVtb3ZlKDExKTtcbi8vIHByZXR0eVByaW50KHRyZWUucm9vdCk7XG4vLyB0cmVlLnJlbW92ZSgxMik7XG4vLyBwcmV0dHlQcmludCh0cmVlLnJvb3QpO1xuLy8gdHJlZS5yZW1vdmUoMzI0KTtcbi8vIHByZXR0eVByaW50KHRyZWUucm9vdCk7XG5cbi8vIGNvbnN0IHJlbW92ZUR1cGxpY2F0ZXMgPSAoYXJyYXkpID0+IHtcbi8vICAgY29uc3QgbmV3QXJyYXkgPSBbXVxuLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4vLyAgICAgaWYgKG5ld0FycmF5LmluY2x1ZGVzKGFycmF5W2ldKSkge1xuLy8gICAgICAgY29udGludWU7XG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICAgIG5ld0FycmF5LnB1c2goYXJyYXlbaV0pXG4vLyAgICAgfVxuLy8gICB9XG4vLyAgIHJldHVybiBuZXdBcnJheTtcbi8vIH1cblxuLy8gY29uc3Qgc29ydGVkQXJyYXkgPSBtZXJnZVNvcnQocmVtb3ZlRHVwbGljYXRlcyhhcnJheSkpXG5cbi8vIGV4cG9ydCBkZWZhdWx0IFRyZWU7XG5cbmNvbnN0IHRyZWUgPSBUcmVlKCk7XG50cmVlLmJ1aWxkVHJlZShbMTAsIDUsIDE1LCAzLCA3LCAxMiwgMTgsIDEsIDQsIDYsIDgsIDExLCAxNCwgMTYsIDIwXSk7XG5wcmV0dHlQcmludCh0cmVlLnJvb3QpO1xudHJlZS5yZW1vdmUoMTUpO1xucHJldHR5UHJpbnQodHJlZS5yb290KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUcmVlO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
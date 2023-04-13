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


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0EsWUFBWSxZQUFZOztBQUV4QjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsT0FBTztBQUM5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUSxPQUFPO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixPQUFPLEVBQUUseUJBQXlCO0FBQ2pFO0FBQ0EsaUJBQWlCLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxVQUFVO0FBQy9EO0FBQ0EsOEJBQThCLE9BQU8sRUFBRSx5QkFBeUI7QUFDaEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NzMTAxLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCAnLi9zdHlsZS5jc3MnO1xuLy8gaW1wb3J0IHsgbWVyZ2VTb3J0IH0gZnJvbSAnLi9tZXJnZVNvcnQnO1xuXG5mdW5jdGlvbiBtZXJnZShsZWZ0LCByaWdodCkge1xuICBsZXQgbmV3QXJyYXkgPSBbXTtcbiAgY29uc3QgayA9IGxlZnQubGVuZ3RoICsgcmlnaHQubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGs7IGkrKykge1xuICAgIGlmIChsZWZ0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgbmV3QXJyYXkucHVzaChyaWdodC5zaGlmdCgpKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAocmlnaHQubGVuZ3RoID09PSAwKSB7XG4gICAgICBuZXdBcnJheS5wdXNoKGxlZnQuc2hpZnQoKSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKHJpZ2h0WzBdIDwgbGVmdFswXSkge1xuICAgICAgbmV3QXJyYXkucHVzaChyaWdodC5zaGlmdCgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3QXJyYXkucHVzaChsZWZ0LnNoaWZ0KCkpO1xuICAgIH1cbiAgfVxuICAvLyBjb25zb2xlLmxvZygnbmV3QXJyYXknLCBuZXdBcnJheSk7XG4gIHJldHVybiBuZXdBcnJheTtcbn1cblxuZnVuY3Rpb24gbWVyZ2VTb3J0KGFycmF5KSB7XG4gIGlmIChhcnJheS5sZW5ndGggPD0gMSkgcmV0dXJuIGFycmF5O1xuXG4gIGNvbnN0IG1pZCA9IE1hdGguZmxvb3IoYXJyYXkubGVuZ3RoIC8gMik7XG4gIGNvbnN0IGxlZnQgPSBhcnJheS5zbGljZSgwLCBtaWQpO1xuICAvLyBjb25zb2xlLmxvZygn8J+agCB+IGZpbGU6IGluZGV4LmpzOjYwIH4gbWVyZ2VTb3J0IH4gbGVmdDonLCBsZWZ0KTtcbiAgY29uc3QgcmlnaHQgPSBhcnJheS5zbGljZShtaWQpO1xuICAvLyBjb25zb2xlLmxvZygn8J+agCB+IGZpbGU6IGluZGV4LmpzOjYyIH4gbWVyZ2VTb3J0IH4gcmlnaHQ6JywgcmlnaHQpO1xuXG4gIHJldHVybiBtZXJnZShtZXJnZVNvcnQobGVmdCksIG1lcmdlU29ydChyaWdodCkpO1xufVxuXG5jb25zdCBOb2RlID0gKGRhdGEgPSBudWxsLCBsZWZ0ID0gbnVsbCwgcmlnaHQgPSBudWxsKSA9PiAoe1xuICBkYXRhLFxuICBsZWZ0LFxuICByaWdodCxcbn0pO1xuXG5jb25zdCBUcmVlID0gKHJvb3QgPSBudWxsKSA9PiB7XG4gIC8vIEZ1bmN0aW9uIGZvciBidWlsZGluZyBhIHRyZWUgZnJvbSBhIHJhbmRvbSBhcnJheVxuICBjb25zdCBidWlsZFRyZWUgPSAoYXJyYXkpID0+IHtcbiAgICAvLyBGdW5jdGlvbiBmb3IgYnVpbGRpbmcgYSB0cmVlIGZyb20gYSBzb3J0ZWQgYXJyYXlcbiAgICBjb25zdCBidWlsZFRyZWVSZWN1cnNpb24gPSAoc29ydGVkQXJyYXkpID0+IHtcbiAgICAgIGNvbnN0IG1pZCA9IE1hdGguZmxvb3Ioc29ydGVkQXJyYXkubGVuZ3RoIC8gMik7XG4gICAgICBjb25zdCBub2RlID0gTm9kZShzb3J0ZWRBcnJheVttaWRdKTtcblxuICAgICAgaWYgKHNvcnRlZEFycmF5Lmxlbmd0aCA8PSAxKSByZXR1cm4gbm9kZTtcblxuICAgICAgY29uc3QgbGVmdEFycmF5ID0gc29ydGVkQXJyYXkuc2xpY2UoMCwgbWlkKTtcbiAgICAgIG5vZGUubGVmdCA9IGJ1aWxkVHJlZVJlY3Vyc2lvbihsZWZ0QXJyYXkpO1xuXG4gICAgICBjb25zdCByaWdodEFycmF5ID0gc29ydGVkQXJyYXkuc2xpY2UobWlkICsgMSk7XG4gICAgICBub2RlLnJpZ2h0ID0gYnVpbGRUcmVlUmVjdXJzaW9uKHJpZ2h0QXJyYXkpO1xuXG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9O1xuXG4gICAgaWYgKCFhcnJheS5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgIC8vIFJlbW92ZSBkdXBsaWNhdGVzLCB0aGVuIHNvcnQgdGhlIGFycmF5XG4gICAgY29uc3Qgc29ydGVkQXJyYXkgPSBtZXJnZVNvcnQoWy4uLm5ldyBTZXQoYXJyYXkpXSk7XG4gICAgLy8gVGhlIHJvb3Qgb2YgdGhlIHRyZWUgaXMgd2hhdCdzIHJldHVybmVkIGJ5IHRoZSB0b3AgbGV2ZWwgcmVjdXJzaW9uXG4gICAgcm9vdCA9IGJ1aWxkVHJlZVJlY3Vyc2lvbihzb3J0ZWRBcnJheSk7XG4gIH07XG5cbiAgLy8gRnVuY3Rpb24gZm9yIGluc2VydGluZyBhIHZhbHVlIGludG8gYSB0cmVlXG4gIGNvbnN0IGluc2VydCA9ICh2YWx1ZSkgPT4ge1xuICAgIC8vIEZ1bmN0aW9uIHRvIHJlY3Vyc2l2ZWx5IGluc2VydCBhIHZhbHVlXG4gICAgY29uc3QgaW5zZXJ0UmVjdXJzaW9uID0gKGN1cnJlbnQsIHZhbHVlKSA9PiB7XG4gICAgICAvLyBJZiBlbXB0eSwgaW5zZXJ0IHRoZSBub2RlIGFzIHRoZSByb290XG4gICAgICBpZiAoY3VycmVudCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gTm9kZSh2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIERvIG5vdGhpbmcgaWYgdGhlIHZhbHVlIGV4aXN0cyBpbiB0aGUgdHJlZS5cbiAgICAgIGlmICh2YWx1ZSA9PSBjdXJyZW50LmRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coYCR7dmFsdWV9IGFscmVhZHkgZXhpc3RzIGluIHRoZSB0cmVlLmApO1xuICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICAgIH1cblxuICAgICAgLy8gRGVjaWRlIGxlZnQgb3IgcmlnaHQgc2lkZSB0byBpbnNlcnQgdGhlIGxlYWZcbiAgICAgIGlmICh2YWx1ZSA8IGN1cnJlbnQuZGF0YSkge1xuICAgICAgICBjdXJyZW50LmxlZnQgPSBpbnNlcnRSZWN1cnNpb24oY3VycmVudC5sZWZ0LCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXJyZW50LnJpZ2h0ID0gaW5zZXJ0UmVjdXJzaW9uKGN1cnJlbnQucmlnaHQsIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjdXJyZW50O1xuICAgIH07XG5cbiAgICByb290ID0gaW5zZXJ0UmVjdXJzaW9uKHJvb3QsIHZhbHVlKTtcbiAgfTtcblxuICBjb25zdCByZW1vdmUgPSAodmFsdWUpID0+IHtcbiAgICAvLyBGdW5jdGlvbiB0byBmaW5kIHRoZSBub2RlIHdpdGggbWluaW11bSB2YWx1ZSBpbiB0cmVlXG4gICAgY29uc3QgZmluZE1pblZhbHVlTm9kZSA9IChiYXNlKSA9PiB7XG4gICAgICBsZXQgY3VycmVudCA9IGJhc2U7XG4gICAgICB3aGlsZSAoY3VycmVudC5sZWZ0KSB7XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LmxlZnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gY3VycmVudDtcbiAgICB9O1xuXG4gICAgLy8gRnVuY3Rpb24gdG8gcmVjdXJzaXZlbHkgcmVtb3ZlIGEgbm9kZSB3aXRoIGEgZ2l2ZW4gdmFsdWVcbiAgICBjb25zdCByZW1vdmVSZWN1c2lvbiA9IChjdXJyZW50LCB2YWx1ZSkgPT4ge1xuICAgICAgaWYgKCFjdXJyZW50KSB7XG4gICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgICAgfVxuXG4gICAgICBpZiAodmFsdWUgPCBjdXJyZW50LmRhdGEpIHtcbiAgICAgICAgY3VycmVudC5sZWZ0ID0gcmVtb3ZlUmVjdXNpb24oY3VycmVudC5sZWZ0LCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlID4gY3VycmVudC5kYXRhKSB7XG4gICAgICAgIGN1cnJlbnQucmlnaHQgPSByZW1vdmVSZWN1c2lvbihjdXJyZW50LnJpZ2h0LCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBNYXRjaCBmb3VuZFxuICAgICAgICBpZiAoIWN1cnJlbnQubGVmdCkge1xuICAgICAgICAgIC8vIE9ubHkgMSByaWdodCBicmFuY2hcbiAgICAgICAgICByZXR1cm4gY3VycmVudC5yaWdodDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWN1cnJlbnQucmlnaHQpIHtcbiAgICAgICAgICAvLyBPbmx5IDEgbGVmdCBicmFuY2hcbiAgICAgICAgICByZXR1cm4gY3VycmVudC5sZWZ0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG5vZGUgaGFkIDIgYnJhbmNoZXNcbiAgICAgICAgICAvLyBGaW5kIHRoZSBtaW5pbXVtIHZhbHVlIGluIHRoZSByaWdodCBicmFuY2hcbiAgICAgICAgICBjb25zdCBtaW4gPSBmaW5kTWluVmFsdWVOb2RlKGN1cnJlbnQucmlnaHQpO1xuXG4gICAgICAgICAgLy8gQXNzaWduIHRoaXMgdmFsdWUgdG8gY3VycmVudCBub2RlXG4gICAgICAgICAgY3VycmVudC5kYXRhID0gbWluLmRhdGE7XG5cbiAgICAgICAgICAvLyBSZW1vdmUgdGhlIG5vZGUgd2l0aCB0aGF0IG1pbmltdW0gdmFsdWVcbiAgICAgICAgICBjdXJyZW50LnJpZ2h0ID0gcmVtb3ZlUmVjdXNpb24oY3VycmVudC5yaWdodCwgbWluLmRhdGEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gY3VycmVudDtcbiAgICB9O1xuXG4gICAgcm9vdCA9IHJlbW92ZVJlY3VzaW9uKHJvb3QsIHZhbHVlKTtcbiAgfTtcblxuICAvLyBGdW5jdGlvbiB3aGljaCBhY2NlcHRzIGEgdmFsdWUgYW5kIHJldHVybnMgdGhlIG5vZGUgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVcbiAgY29uc3QgZmluZCA9ICh2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IGZpbmRSZWN1cnNpdmUgPSAoY3VycmVudCwgdmFsdWUpID0+IHtcbiAgICAgIC8vIE5vdGhpbmcgZm91bmRcbiAgICAgIGlmICghY3VycmVudCkge1xuICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICAgIH1cblxuICAgICAgaWYgKHZhbHVlIDwgY3VycmVudC5kYXRhKSB7XG4gICAgICAgIHJldHVybiBmaW5kUmVjdXJzaXZlKGN1cnJlbnQubGVmdCwgdmFsdWUpXG4gICAgICB9IGVsc2UgaWYgKHZhbHVlID4gY3VycmVudC5kYXRhKSB7XG4gICAgICAgIHJldHVybiBmaW5kUmVjdXJzaXZlKGN1cnJlbnQucmlnaHQsIHZhbHVlKVxuICAgICAgfSBlbHNlIHsgLy8gRm91bmQhXG4gICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmluZFJlY3Vyc2l2ZShyb290LCB2YWx1ZSlcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc2V0IHJvb3Qobm9kZSkge1xuICAgICAgcm9vdCA9IG5vZGU7XG4gICAgfSxcbiAgICBnZXQgcm9vdCgpIHtcbiAgICAgIHJldHVybiByb290O1xuICAgIH0sXG4gICAgYnVpbGRUcmVlLFxuICAgIGluc2VydCxcbiAgICByZW1vdmUsXG4gICAgZmluZCxcbiAgfTtcbn07XG5cbmNvbnN0IHByZXR0eVByaW50ID0gKG5vZGUsIHByZWZpeCA9ICcnLCBpc0xlZnQgPSB0cnVlKSA9PiB7XG4gIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChub2RlLnJpZ2h0ICE9PSBudWxsKSB7XG4gICAgcHJldHR5UHJpbnQobm9kZS5yaWdodCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gJ+KUgiAgICcgOiAnICAgICd9YCwgZmFsc2UpO1xuICB9XG4gIGNvbnNvbGUubG9nKGAke3ByZWZpeH0ke2lzTGVmdCA/ICfilJTilIDilIAgJyA6ICfilIzilIDilIAgJ30ke25vZGUuZGF0YX1gKTtcbiAgaWYgKG5vZGUubGVmdCAhPT0gbnVsbCkge1xuICAgIHByZXR0eVByaW50KG5vZGUubGVmdCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gJyAgICAnIDogJ+KUgiAgICd9YCwgdHJ1ZSk7XG4gIH1cbn07XG5cbmNvbnN0IHRyZWUgPSBUcmVlKCk7XG50cmVlLmJ1aWxkVHJlZShbMTAsIDUsIDE1LCAzLCA3LCAxMiwgMTgsIDEsIDQsIDYsIDgsIDExLCAxNCwgMTYsIDIwXSk7XG5wcmV0dHlQcmludCh0cmVlLnJvb3QpO1xudHJlZS5yZW1vdmUoMTUpO1xucHJldHR5UHJpbnQodHJlZS5yb290KTtcbnRyZWUucmVtb3ZlKDE2KTtcbnByZXR0eVByaW50KHRyZWUucm9vdCk7XG5jb25zb2xlLmxvZyh0cmVlLmZpbmQoMTApKTtcbmNvbnNvbGUubG9nKHRyZWUuZmluZCg3KSk7XG5jb25zb2xlLmxvZyh0cmVlLmZpbmQoNCkpO1xuY29uc29sZS5sb2codHJlZS5maW5kKDEpKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFRyZWU7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
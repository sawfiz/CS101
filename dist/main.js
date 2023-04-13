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

  const levelOrder = (fn) => {
    if (!root) return [];
    const queue = [];
    const output = [];

    queue.push(root);
    while (queue.length) {
      if (queue[0]) {
        if (fn) fn(queue[0].data)
        output.push(queue[0].data);
        queue.push(queue[0].left);
        queue.push(queue[0].right);
      }
      queue.shift();
    }
    return output;
  };


  const inOrder = (fn) => {
    const inOrderRecursive = (current, fn) => {
      if (!current) return;

      inOrderRecursive(current.left, fn)
      fn(current.data)
      output.push(current.data)
      inOrderRecursive(current.right, fn)
    }
    const output = [];
    inOrderRecursive(root, fn);
    return output;
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
    levelOrder,
    inOrder,
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
tree.buildTree([4, 10, 12, 15, 18, 22, 24, 25, 31, 44, 35, 50, 70, 66, 90]);
prettyPrint(tree.root);
// tree.remove(15);
// prettyPrint(tree.root);
// tree.remove(16);
// prettyPrint(tree.root);
console.log(tree.find(10));
console.log(tree.find(7));
console.log(tree.find(4));
console.log(tree.find(1));

function fn(value) {
  console.log("🚀 ~ file: index.js:222 ~ fn ~ value:", value)
}
console.log(tree.levelOrder());
console.log(tree.levelOrder(fn));
console.log(tree.inOrder(fn));

module.exports = Tree;


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0EsWUFBWSxZQUFZOztBQUV4QjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsT0FBTztBQUM5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLE9BQU8sRUFBRSx5QkFBeUI7QUFDakU7QUFDQSxpQkFBaUIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFVBQVU7QUFDL0Q7QUFDQSw4QkFBOEIsT0FBTyxFQUFFLHlCQUF5QjtBQUNoRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY3MxMDEvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG4vLyBpbXBvcnQgeyBtZXJnZVNvcnQgfSBmcm9tICcuL21lcmdlU29ydCc7XG5cbmZ1bmN0aW9uIG1lcmdlKGxlZnQsIHJpZ2h0KSB7XG4gIGxldCBuZXdBcnJheSA9IFtdO1xuICBjb25zdCBrID0gbGVmdC5sZW5ndGggKyByaWdodC5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgazsgaSsrKSB7XG4gICAgaWYgKGxlZnQubGVuZ3RoID09PSAwKSB7XG4gICAgICBuZXdBcnJheS5wdXNoKHJpZ2h0LnNoaWZ0KCkpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChyaWdodC5sZW5ndGggPT09IDApIHtcbiAgICAgIG5ld0FycmF5LnB1c2gobGVmdC5zaGlmdCgpKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAocmlnaHRbMF0gPCBsZWZ0WzBdKSB7XG4gICAgICBuZXdBcnJheS5wdXNoKHJpZ2h0LnNoaWZ0KCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdBcnJheS5wdXNoKGxlZnQuc2hpZnQoKSk7XG4gICAgfVxuICB9XG4gIC8vIGNvbnNvbGUubG9nKCduZXdBcnJheScsIG5ld0FycmF5KTtcbiAgcmV0dXJuIG5ld0FycmF5O1xufVxuXG5mdW5jdGlvbiBtZXJnZVNvcnQoYXJyYXkpIHtcbiAgaWYgKGFycmF5Lmxlbmd0aCA8PSAxKSByZXR1cm4gYXJyYXk7XG5cbiAgY29uc3QgbWlkID0gTWF0aC5mbG9vcihhcnJheS5sZW5ndGggLyAyKTtcbiAgY29uc3QgbGVmdCA9IGFycmF5LnNsaWNlKDAsIG1pZCk7XG4gIC8vIGNvbnNvbGUubG9nKCfwn5qAIH4gZmlsZTogaW5kZXguanM6NjAgfiBtZXJnZVNvcnQgfiBsZWZ0OicsIGxlZnQpO1xuICBjb25zdCByaWdodCA9IGFycmF5LnNsaWNlKG1pZCk7XG4gIC8vIGNvbnNvbGUubG9nKCfwn5qAIH4gZmlsZTogaW5kZXguanM6NjIgfiBtZXJnZVNvcnQgfiByaWdodDonLCByaWdodCk7XG5cbiAgcmV0dXJuIG1lcmdlKG1lcmdlU29ydChsZWZ0KSwgbWVyZ2VTb3J0KHJpZ2h0KSk7XG59XG5cbmNvbnN0IE5vZGUgPSAoZGF0YSA9IG51bGwsIGxlZnQgPSBudWxsLCByaWdodCA9IG51bGwpID0+ICh7XG4gIGRhdGEsXG4gIGxlZnQsXG4gIHJpZ2h0LFxufSk7XG5cbmNvbnN0IFRyZWUgPSAocm9vdCA9IG51bGwpID0+IHtcbiAgLy8gRnVuY3Rpb24gZm9yIGJ1aWxkaW5nIGEgdHJlZSBmcm9tIGEgcmFuZG9tIGFycmF5XG4gIGNvbnN0IGJ1aWxkVHJlZSA9IChhcnJheSkgPT4ge1xuICAgIC8vIEZ1bmN0aW9uIGZvciBidWlsZGluZyBhIHRyZWUgZnJvbSBhIHNvcnRlZCBhcnJheVxuICAgIGNvbnN0IGJ1aWxkVHJlZVJlY3Vyc2lvbiA9IChzb3J0ZWRBcnJheSkgPT4ge1xuICAgICAgY29uc3QgbWlkID0gTWF0aC5mbG9vcihzb3J0ZWRBcnJheS5sZW5ndGggLyAyKTtcbiAgICAgIGNvbnN0IG5vZGUgPSBOb2RlKHNvcnRlZEFycmF5W21pZF0pO1xuXG4gICAgICBpZiAoc29ydGVkQXJyYXkubGVuZ3RoIDw9IDEpIHJldHVybiBub2RlO1xuXG4gICAgICBjb25zdCBsZWZ0QXJyYXkgPSBzb3J0ZWRBcnJheS5zbGljZSgwLCBtaWQpO1xuICAgICAgbm9kZS5sZWZ0ID0gYnVpbGRUcmVlUmVjdXJzaW9uKGxlZnRBcnJheSk7XG5cbiAgICAgIGNvbnN0IHJpZ2h0QXJyYXkgPSBzb3J0ZWRBcnJheS5zbGljZShtaWQgKyAxKTtcbiAgICAgIG5vZGUucmlnaHQgPSBidWlsZFRyZWVSZWN1cnNpb24ocmlnaHRBcnJheSk7XG5cbiAgICAgIHJldHVybiBub2RlO1xuICAgIH07XG5cbiAgICBpZiAoIWFycmF5Lmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgLy8gUmVtb3ZlIGR1cGxpY2F0ZXMsIHRoZW4gc29ydCB0aGUgYXJyYXlcbiAgICBjb25zdCBzb3J0ZWRBcnJheSA9IG1lcmdlU29ydChbLi4ubmV3IFNldChhcnJheSldKTtcbiAgICAvLyBUaGUgcm9vdCBvZiB0aGUgdHJlZSBpcyB3aGF0J3MgcmV0dXJuZWQgYnkgdGhlIHRvcCBsZXZlbCByZWN1cnNpb25cbiAgICByb290ID0gYnVpbGRUcmVlUmVjdXJzaW9uKHNvcnRlZEFycmF5KTtcbiAgfTtcblxuICAvLyBGdW5jdGlvbiBmb3IgaW5zZXJ0aW5nIGEgdmFsdWUgaW50byBhIHRyZWVcbiAgY29uc3QgaW5zZXJ0ID0gKHZhbHVlKSA9PiB7XG4gICAgLy8gRnVuY3Rpb24gdG8gcmVjdXJzaXZlbHkgaW5zZXJ0IGEgdmFsdWVcbiAgICBjb25zdCBpbnNlcnRSZWN1cnNpb24gPSAoY3VycmVudCwgdmFsdWUpID0+IHtcbiAgICAgIC8vIElmIGVtcHR5LCBpbnNlcnQgdGhlIG5vZGUgYXMgdGhlIHJvb3RcbiAgICAgIGlmIChjdXJyZW50ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBOb2RlKHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgLy8gRG8gbm90aGluZyBpZiB0aGUgdmFsdWUgZXhpc3RzIGluIHRoZSB0cmVlLlxuICAgICAgaWYgKHZhbHVlID09IGN1cnJlbnQuZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgJHt2YWx1ZX0gYWxyZWFkeSBleGlzdHMgaW4gdGhlIHRyZWUuYCk7XG4gICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgICAgfVxuXG4gICAgICAvLyBEZWNpZGUgbGVmdCBvciByaWdodCBzaWRlIHRvIGluc2VydCB0aGUgbGVhZlxuICAgICAgaWYgKHZhbHVlIDwgY3VycmVudC5kYXRhKSB7XG4gICAgICAgIGN1cnJlbnQubGVmdCA9IGluc2VydFJlY3Vyc2lvbihjdXJyZW50LmxlZnQsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnQucmlnaHQgPSBpbnNlcnRSZWN1cnNpb24oY3VycmVudC5yaWdodCwgdmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgfTtcblxuICAgIHJvb3QgPSBpbnNlcnRSZWN1cnNpb24ocm9vdCwgdmFsdWUpO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZSA9ICh2YWx1ZSkgPT4ge1xuICAgIC8vIEZ1bmN0aW9uIHRvIGZpbmQgdGhlIG5vZGUgd2l0aCBtaW5pbXVtIHZhbHVlIGluIHRyZWVcbiAgICBjb25zdCBmaW5kTWluVmFsdWVOb2RlID0gKGJhc2UpID0+IHtcbiAgICAgIGxldCBjdXJyZW50ID0gYmFzZTtcbiAgICAgIHdoaWxlIChjdXJyZW50LmxlZnQpIHtcbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubGVmdDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjdXJyZW50O1xuICAgIH07XG5cbiAgICAvLyBGdW5jdGlvbiB0byByZWN1cnNpdmVseSByZW1vdmUgYSBub2RlIHdpdGggYSBnaXZlbiB2YWx1ZVxuICAgIGNvbnN0IHJlbW92ZVJlY3VzaW9uID0gKGN1cnJlbnQsIHZhbHVlKSA9PiB7XG4gICAgICBpZiAoIWN1cnJlbnQpIHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgICB9XG5cbiAgICAgIGlmICh2YWx1ZSA8IGN1cnJlbnQuZGF0YSkge1xuICAgICAgICBjdXJyZW50LmxlZnQgPSByZW1vdmVSZWN1c2lvbihjdXJyZW50LmxlZnQsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgPiBjdXJyZW50LmRhdGEpIHtcbiAgICAgICAgY3VycmVudC5yaWdodCA9IHJlbW92ZVJlY3VzaW9uKGN1cnJlbnQucmlnaHQsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE1hdGNoIGZvdW5kXG4gICAgICAgIGlmICghY3VycmVudC5sZWZ0KSB7XG4gICAgICAgICAgLy8gT25seSAxIHJpZ2h0IGJyYW5jaFxuICAgICAgICAgIHJldHVybiBjdXJyZW50LnJpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmICghY3VycmVudC5yaWdodCkge1xuICAgICAgICAgIC8vIE9ubHkgMSBsZWZ0IGJyYW5jaFxuICAgICAgICAgIHJldHVybiBjdXJyZW50LmxlZnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gbm9kZSBoYWQgMiBicmFuY2hlc1xuICAgICAgICAgIC8vIEZpbmQgdGhlIG1pbmltdW0gdmFsdWUgaW4gdGhlIHJpZ2h0IGJyYW5jaFxuICAgICAgICAgIGNvbnN0IG1pbiA9IGZpbmRNaW5WYWx1ZU5vZGUoY3VycmVudC5yaWdodCk7XG5cbiAgICAgICAgICAvLyBBc3NpZ24gdGhpcyB2YWx1ZSB0byBjdXJyZW50IG5vZGVcbiAgICAgICAgICBjdXJyZW50LmRhdGEgPSBtaW4uZGF0YTtcblxuICAgICAgICAgIC8vIFJlbW92ZSB0aGUgbm9kZSB3aXRoIHRoYXQgbWluaW11bSB2YWx1ZVxuICAgICAgICAgIGN1cnJlbnQucmlnaHQgPSByZW1vdmVSZWN1c2lvbihjdXJyZW50LnJpZ2h0LCBtaW4uZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjdXJyZW50O1xuICAgIH07XG5cbiAgICByb290ID0gcmVtb3ZlUmVjdXNpb24ocm9vdCwgdmFsdWUpO1xuICB9O1xuXG4gIC8vIEZ1bmN0aW9uIHdoaWNoIGFjY2VwdHMgYSB2YWx1ZSBhbmQgcmV0dXJucyB0aGUgbm9kZSB3aXRoIHRoZSBnaXZlbiB2YWx1ZVxuICBjb25zdCBmaW5kID0gKHZhbHVlKSA9PiB7XG4gICAgY29uc3QgZmluZFJlY3Vyc2l2ZSA9IChjdXJyZW50LCB2YWx1ZSkgPT4ge1xuICAgICAgLy8gTm90aGluZyBmb3VuZFxuICAgICAgaWYgKCFjdXJyZW50KSB7XG4gICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgICAgfVxuXG4gICAgICBpZiAodmFsdWUgPCBjdXJyZW50LmRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGZpbmRSZWN1cnNpdmUoY3VycmVudC5sZWZ0LCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlID4gY3VycmVudC5kYXRhKSB7XG4gICAgICAgIHJldHVybiBmaW5kUmVjdXJzaXZlKGN1cnJlbnQucmlnaHQsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZvdW5kIVxuICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBmaW5kUmVjdXJzaXZlKHJvb3QsIHZhbHVlKTtcbiAgfTtcblxuICBjb25zdCBsZXZlbE9yZGVyID0gKGZuKSA9PiB7XG4gICAgaWYgKCFyb290KSByZXR1cm4gW107XG4gICAgY29uc3QgcXVldWUgPSBbXTtcbiAgICBjb25zdCBvdXRwdXQgPSBbXTtcblxuICAgIHF1ZXVlLnB1c2gocm9vdCk7XG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgaWYgKHF1ZXVlWzBdKSB7XG4gICAgICAgIGlmIChmbikgZm4ocXVldWVbMF0uZGF0YSlcbiAgICAgICAgb3V0cHV0LnB1c2gocXVldWVbMF0uZGF0YSk7XG4gICAgICAgIHF1ZXVlLnB1c2gocXVldWVbMF0ubGVmdCk7XG4gICAgICAgIHF1ZXVlLnB1c2gocXVldWVbMF0ucmlnaHQpO1xuICAgICAgfVxuICAgICAgcXVldWUuc2hpZnQoKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfTtcblxuXG4gIGNvbnN0IGluT3JkZXIgPSAoZm4pID0+IHtcbiAgICBjb25zdCBpbk9yZGVyUmVjdXJzaXZlID0gKGN1cnJlbnQsIGZuKSA9PiB7XG4gICAgICBpZiAoIWN1cnJlbnQpIHJldHVybjtcblxuICAgICAgaW5PcmRlclJlY3Vyc2l2ZShjdXJyZW50LmxlZnQsIGZuKVxuICAgICAgZm4oY3VycmVudC5kYXRhKVxuICAgICAgb3V0cHV0LnB1c2goY3VycmVudC5kYXRhKVxuICAgICAgaW5PcmRlclJlY3Vyc2l2ZShjdXJyZW50LnJpZ2h0LCBmbilcbiAgICB9XG4gICAgY29uc3Qgb3V0cHV0ID0gW107XG4gICAgaW5PcmRlclJlY3Vyc2l2ZShyb290LCBmbik7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc2V0IHJvb3Qobm9kZSkge1xuICAgICAgcm9vdCA9IG5vZGU7XG4gICAgfSxcbiAgICBnZXQgcm9vdCgpIHtcbiAgICAgIHJldHVybiByb290O1xuICAgIH0sXG4gICAgYnVpbGRUcmVlLFxuICAgIGluc2VydCxcbiAgICByZW1vdmUsXG4gICAgZmluZCxcbiAgICBsZXZlbE9yZGVyLFxuICAgIGluT3JkZXIsXG4gIH07XG59O1xuXG5jb25zdCBwcmV0dHlQcmludCA9IChub2RlLCBwcmVmaXggPSAnJywgaXNMZWZ0ID0gdHJ1ZSkgPT4ge1xuICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAobm9kZS5yaWdodCAhPT0gbnVsbCkge1xuICAgIHByZXR0eVByaW50KG5vZGUucmlnaHQsIGAke3ByZWZpeH0ke2lzTGVmdCA/ICfilIIgICAnIDogJyAgICAnfWAsIGZhbHNlKTtcbiAgfVxuICBjb25zb2xlLmxvZyhgJHtwcmVmaXh9JHtpc0xlZnQgPyAn4pSU4pSA4pSAICcgOiAn4pSM4pSA4pSAICd9JHtub2RlLmRhdGF9YCk7XG4gIGlmIChub2RlLmxlZnQgIT09IG51bGwpIHtcbiAgICBwcmV0dHlQcmludChub2RlLmxlZnQsIGAke3ByZWZpeH0ke2lzTGVmdCA/ICcgICAgJyA6ICfilIIgICAnfWAsIHRydWUpO1xuICB9XG59O1xuXG5jb25zdCB0cmVlID0gVHJlZSgpO1xudHJlZS5idWlsZFRyZWUoWzQsIDEwLCAxMiwgMTUsIDE4LCAyMiwgMjQsIDI1LCAzMSwgNDQsIDM1LCA1MCwgNzAsIDY2LCA5MF0pO1xucHJldHR5UHJpbnQodHJlZS5yb290KTtcbi8vIHRyZWUucmVtb3ZlKDE1KTtcbi8vIHByZXR0eVByaW50KHRyZWUucm9vdCk7XG4vLyB0cmVlLnJlbW92ZSgxNik7XG4vLyBwcmV0dHlQcmludCh0cmVlLnJvb3QpO1xuY29uc29sZS5sb2codHJlZS5maW5kKDEwKSk7XG5jb25zb2xlLmxvZyh0cmVlLmZpbmQoNykpO1xuY29uc29sZS5sb2codHJlZS5maW5kKDQpKTtcbmNvbnNvbGUubG9nKHRyZWUuZmluZCgxKSk7XG5cbmZ1bmN0aW9uIGZuKHZhbHVlKSB7XG4gIGNvbnNvbGUubG9nKFwi8J+agCB+IGZpbGU6IGluZGV4LmpzOjIyMiB+IGZuIH4gdmFsdWU6XCIsIHZhbHVlKVxufVxuY29uc29sZS5sb2codHJlZS5sZXZlbE9yZGVyKCkpO1xuY29uc29sZS5sb2codHJlZS5sZXZlbE9yZGVyKGZuKSk7XG5jb25zb2xlLmxvZyh0cmVlLmluT3JkZXIoZm4pKTtcblxubW9kdWxlLmV4cG9ydHMgPSBUcmVlO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
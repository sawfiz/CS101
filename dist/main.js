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

const tree = Tree();
tree.buildTree([10, 5, 15, 3, 7, 12, 18, 1, 4, 6, 8, 11, 14, 16, 20]);
prettyPrint(tree.root);
tree.remove(15);
prettyPrint(tree.root);
tree.remove(16);
prettyPrint(tree.root);

module.exports = Tree;


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0EsWUFBWSxZQUFZOztBQUV4QjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsT0FBTztBQUM5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsT0FBTyxFQUFFLHlCQUF5QjtBQUNqRTtBQUNBLGlCQUFpQixPQUFPLEVBQUUseUJBQXlCLEVBQUUsVUFBVTtBQUMvRDtBQUNBLDhCQUE4QixPQUFPLEVBQUUseUJBQXlCO0FBQ2hFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jczEwMS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgJy4vc3R5bGUuY3NzJztcbi8vIGltcG9ydCB7IG1lcmdlU29ydCB9IGZyb20gJy4vbWVyZ2VTb3J0JztcblxuZnVuY3Rpb24gbWVyZ2UobGVmdCwgcmlnaHQpIHtcbiAgbGV0IG5ld0FycmF5ID0gW107XG4gIGNvbnN0IGsgPSBsZWZ0Lmxlbmd0aCArIHJpZ2h0Lmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBrOyBpKyspIHtcbiAgICBpZiAobGVmdC5sZW5ndGggPT09IDApIHtcbiAgICAgIG5ld0FycmF5LnB1c2gocmlnaHQuc2hpZnQoKSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKHJpZ2h0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgbmV3QXJyYXkucHVzaChsZWZ0LnNoaWZ0KCkpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChyaWdodFswXSA8IGxlZnRbMF0pIHtcbiAgICAgIG5ld0FycmF5LnB1c2gocmlnaHQuc2hpZnQoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld0FycmF5LnB1c2gobGVmdC5zaGlmdCgpKTtcbiAgICB9XG4gIH1cbiAgLy8gY29uc29sZS5sb2coJ25ld0FycmF5JywgbmV3QXJyYXkpO1xuICByZXR1cm4gbmV3QXJyYXk7XG59XG5cbmZ1bmN0aW9uIG1lcmdlU29ydChhcnJheSkge1xuICBpZiAoYXJyYXkubGVuZ3RoIDw9IDEpIHJldHVybiBhcnJheTtcblxuICBjb25zdCBtaWQgPSBNYXRoLmZsb29yKGFycmF5Lmxlbmd0aCAvIDIpO1xuICBjb25zdCBsZWZ0ID0gYXJyYXkuc2xpY2UoMCwgbWlkKTtcbiAgLy8gY29uc29sZS5sb2coJ/CfmoAgfiBmaWxlOiBpbmRleC5qczo2MCB+IG1lcmdlU29ydCB+IGxlZnQ6JywgbGVmdCk7XG4gIGNvbnN0IHJpZ2h0ID0gYXJyYXkuc2xpY2UobWlkKTtcbiAgLy8gY29uc29sZS5sb2coJ/CfmoAgfiBmaWxlOiBpbmRleC5qczo2MiB+IG1lcmdlU29ydCB+IHJpZ2h0OicsIHJpZ2h0KTtcblxuICByZXR1cm4gbWVyZ2UobWVyZ2VTb3J0KGxlZnQpLCBtZXJnZVNvcnQocmlnaHQpKTtcbn1cblxuY29uc3QgTm9kZSA9IChkYXRhID0gbnVsbCwgbGVmdCA9IG51bGwsIHJpZ2h0ID0gbnVsbCkgPT4gKHtcbiAgZGF0YSxcbiAgbGVmdCxcbiAgcmlnaHQsXG59KTtcblxuY29uc3QgVHJlZSA9IChyb290ID0gbnVsbCkgPT4ge1xuICAvLyBGdW5jdGlvbiBmb3IgYnVpbGRpbmcgYSB0cmVlIGZyb20gYSByYW5kb20gYXJyYXlcbiAgY29uc3QgYnVpbGRUcmVlID0gKGFycmF5KSA9PiB7XG4gICAgLy8gRnVuY3Rpb24gZm9yIGJ1aWxkaW5nIGEgdHJlZSBmcm9tIGEgc29ydGVkIGFycmF5XG4gICAgY29uc3QgYnVpbGRUcmVlUmVjdXJzaW9uID0gKHNvcnRlZEFycmF5KSA9PiB7XG4gICAgICBjb25zdCBtaWQgPSBNYXRoLmZsb29yKHNvcnRlZEFycmF5Lmxlbmd0aCAvIDIpO1xuICAgICAgY29uc3Qgbm9kZSA9IE5vZGUoc29ydGVkQXJyYXlbbWlkXSk7XG5cbiAgICAgIGlmIChzb3J0ZWRBcnJheS5sZW5ndGggPD0gMSkgcmV0dXJuIG5vZGU7XG5cbiAgICAgIGNvbnN0IGxlZnRBcnJheSA9IHNvcnRlZEFycmF5LnNsaWNlKDAsIG1pZCk7XG4gICAgICBub2RlLmxlZnQgPSBidWlsZFRyZWVSZWN1cnNpb24obGVmdEFycmF5KTtcblxuICAgICAgY29uc3QgcmlnaHRBcnJheSA9IHNvcnRlZEFycmF5LnNsaWNlKG1pZCArIDEpO1xuICAgICAgbm9kZS5yaWdodCA9IGJ1aWxkVHJlZVJlY3Vyc2lvbihyaWdodEFycmF5KTtcblxuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfTtcblxuICAgIGlmICghYXJyYXkubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICAvLyBSZW1vdmUgZHVwbGljYXRlcywgdGhlbiBzb3J0IHRoZSBhcnJheVxuICAgIGNvbnN0IHNvcnRlZEFycmF5ID0gbWVyZ2VTb3J0KFsuLi5uZXcgU2V0KGFycmF5KV0pO1xuICAgIC8vIFRoZSByb290IG9mIHRoZSB0cmVlIGlzIHdoYXQncyByZXR1cm5lZCBieSB0aGUgdG9wIGxldmVsIHJlY3Vyc2lvblxuICAgIHJvb3QgPSBidWlsZFRyZWVSZWN1cnNpb24oc29ydGVkQXJyYXkpO1xuICB9O1xuXG4gIC8vIEZ1bmN0aW9uIGZvciBpbnNlcnRpbmcgYSB2YWx1ZSBpbnRvIGEgdHJlZVxuICBjb25zdCBpbnNlcnQgPSAodmFsdWUpID0+IHtcbiAgICAvLyBGdW5jdGlvbiB0byByZWN1cnNpdmVseSBpbnNlcnQgYSB2YWx1ZVxuICAgIGNvbnN0IGluc2VydFJlY3Vyc2lvbiA9IChjdXJyZW50LCB2YWx1ZSkgPT4ge1xuICAgICAgLy8gSWYgZW1wdHksIGluc2VydCB0aGUgbm9kZSBhcyB0aGUgcm9vdFxuICAgICAgaWYgKGN1cnJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIE5vZGUodmFsdWUpO1xuICAgICAgfVxuXG4gICAgICAvLyBEbyBub3RoaW5nIGlmIHRoZSB2YWx1ZSBleGlzdHMgaW4gdGhlIHRyZWUuXG4gICAgICBpZiAodmFsdWUgPT0gY3VycmVudC5kYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGAke3ZhbHVlfSBhbHJlYWR5IGV4aXN0cyBpbiB0aGUgdHJlZS5gKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgICB9XG5cbiAgICAgIC8vIERlY2lkZSBsZWZ0IG9yIHJpZ2h0IHNpZGUgdG8gaW5zZXJ0IHRoZSBsZWFmXG4gICAgICBpZiAodmFsdWUgPCBjdXJyZW50LmRhdGEpIHtcbiAgICAgICAgY3VycmVudC5sZWZ0ID0gaW5zZXJ0UmVjdXJzaW9uKGN1cnJlbnQubGVmdCwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3VycmVudC5yaWdodCA9IGluc2VydFJlY3Vyc2lvbihjdXJyZW50LnJpZ2h0LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY3VycmVudDtcbiAgICB9O1xuXG4gICAgcm9vdCA9IGluc2VydFJlY3Vyc2lvbihyb290LCB2YWx1ZSk7XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlID0gKHZhbHVlKSA9PiB7XG4gICAgLy8gRnVuY3Rpb24gdG8gZmluZCB0aGUgbm9kZSB3aXRoIG1pbmltdW0gdmFsdWUgaW4gdHJlZVxuICAgIGNvbnN0IGZpbmRNaW5WYWx1ZU5vZGUgPSAoYmFzZSkgPT4ge1xuICAgICAgbGV0IGN1cnJlbnQgPSBiYXNlO1xuICAgICAgd2hpbGUgKGN1cnJlbnQubGVmdCkge1xuICAgICAgICBjdXJyZW50ID0gY3VycmVudC5sZWZ0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgfTtcblxuICAgIC8vIEZ1bmN0aW9uIHRvIHJlY3Vyc2l2ZWx5IHJlbW92ZSBhIG5vZGUgd2l0aCBhIGdpdmVuIHZhbHVlXG4gICAgY29uc3QgcmVtb3ZlUmVjdXNpb24gPSAoY3VycmVudCwgdmFsdWUpID0+IHtcbiAgICAgIGlmICghY3VycmVudCkge1xuICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICAgIH1cblxuICAgICAgaWYgKHZhbHVlIDwgY3VycmVudC5kYXRhKSB7XG4gICAgICAgIGN1cnJlbnQubGVmdCA9IHJlbW92ZVJlY3VzaW9uKGN1cnJlbnQubGVmdCwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZSA+IGN1cnJlbnQuZGF0YSkge1xuICAgICAgICBjdXJyZW50LnJpZ2h0ID0gcmVtb3ZlUmVjdXNpb24oY3VycmVudC5yaWdodCwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTWF0Y2ggZm91bmRcbiAgICAgICAgaWYgKCFjdXJyZW50LmxlZnQpIHtcbiAgICAgICAgICAvLyBPbmx5IDEgcmlnaHQgYnJhbmNoXG4gICAgICAgICAgcmV0dXJuIGN1cnJlbnQucmlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjdXJyZW50LnJpZ2h0KSB7XG4gICAgICAgICAgLy8gT25seSAxIGxlZnQgYnJhbmNoXG4gICAgICAgICAgcmV0dXJuIGN1cnJlbnQubGVmdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBub2RlIGhhZCAyIGJyYW5jaGVzXG4gICAgICAgICAgLy8gRmluZCB0aGUgbWluaW11bSB2YWx1ZSBpbiB0aGUgcmlnaHQgYnJhbmNoXG4gICAgICAgICAgY29uc3QgbWluID0gZmluZE1pblZhbHVlTm9kZShjdXJyZW50LnJpZ2h0KTtcblxuICAgICAgICAgIC8vIEFzc2lnbiB0aGlzIHZhbHVlIHRvIGN1cnJlbnQgbm9kZVxuICAgICAgICAgIGN1cnJlbnQuZGF0YSA9IG1pbi5kYXRhO1xuXG4gICAgICAgICAgLy8gUmVtb3ZlIHRoZSBub2RlIHdpdGggdGhhdCBtaW5pbXVtIHZhbHVlXG4gICAgICAgICAgY3VycmVudC5yaWdodCA9IHJlbW92ZVJlY3VzaW9uKGN1cnJlbnQucmlnaHQsIG1pbi5kYXRhKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgfTtcblxuICAgIHJvb3QgPSByZW1vdmVSZWN1c2lvbihyb290LCB2YWx1ZSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBzZXQgcm9vdChub2RlKSB7XG4gICAgICByb290ID0gbm9kZTtcbiAgICB9LFxuICAgIGdldCByb290KCkge1xuICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgfSxcbiAgICBidWlsZFRyZWUsXG4gICAgaW5zZXJ0LFxuICAgIHJlbW92ZSxcbiAgfTtcbn07XG5cbmNvbnN0IHByZXR0eVByaW50ID0gKG5vZGUsIHByZWZpeCA9ICcnLCBpc0xlZnQgPSB0cnVlKSA9PiB7XG4gIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChub2RlLnJpZ2h0ICE9PSBudWxsKSB7XG4gICAgcHJldHR5UHJpbnQobm9kZS5yaWdodCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gJ+KUgiAgICcgOiAnICAgICd9YCwgZmFsc2UpO1xuICB9XG4gIGNvbnNvbGUubG9nKGAke3ByZWZpeH0ke2lzTGVmdCA/ICfilJTilIDilIAgJyA6ICfilIzilIDilIAgJ30ke25vZGUuZGF0YX1gKTtcbiAgaWYgKG5vZGUubGVmdCAhPT0gbnVsbCkge1xuICAgIHByZXR0eVByaW50KG5vZGUubGVmdCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gJyAgICAnIDogJ+KUgiAgICd9YCwgdHJ1ZSk7XG4gIH1cbn07XG5cbmNvbnN0IHRyZWUgPSBUcmVlKCk7XG50cmVlLmJ1aWxkVHJlZShbMTAsIDUsIDE1LCAzLCA3LCAxMiwgMTgsIDEsIDQsIDYsIDgsIDExLCAxNCwgMTYsIDIwXSk7XG5wcmV0dHlQcmludCh0cmVlLnJvb3QpO1xudHJlZS5yZW1vdmUoMTUpO1xucHJldHR5UHJpbnQodHJlZS5yb290KTtcbnRyZWUucmVtb3ZlKDE2KTtcbnByZXR0eVByaW50KHRyZWUucm9vdCk7XG5cbm1vZHVsZS5leHBvcnRzID0gVHJlZTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
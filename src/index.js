import './style.css';

// function fibs(n) {
//   console.log('hi');
//   console.log('🚀 ~ file: index.js:6 ~ fibs ~ n:', n);

// else {
//   let array = fibs(n - 1);
//   array.push(array[n - 2] + array[n - 1]);
//   return array;
// }
// }

// fibs[1];

function fibs(n) {
  console.log('🚀 ~ file: index.js:23 ~ test ~ n:', n);
  if (n === 0) {
    return [];
  } else if (n === 1) {
    return [0];
  } else if (n === 2) {
    return [0, 1];
  } else {
    let sequence = fibs(n - 1);
    sequence.push(sequence[n - 3] + sequence[n - 2]);
    return sequence;
  }
}

const sequence = fibs(8);
console.log('🚀 ~ file: index.js:28 ~ sequence:', sequence);

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
  console.log('newArray', newArray);
  return newArray;
}

function mergeSort(array) {
  if (array.length <= 1) return array;

  const mid = Math.floor(array.length / 2);
  const left = array.slice(0, mid);
  console.log('🚀 ~ file: index.js:60 ~ mergeSort ~ left:', left);
  const right = array.slice(mid);
  console.log('🚀 ~ file: index.js:62 ~ mergeSort ~ right:', right);

  return merge(mergeSort(left), mergeSort(right));
}

const array = [9, 4, 23, 5, 0, 23, 35];

console.log(mergeSort(array));

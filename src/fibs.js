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

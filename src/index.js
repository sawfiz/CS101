import './style.css';

const Node = (value = null, next = null) => ({
  value,
  next,
});

const List = (head = null, tail = null, size = 0) => {
  const printList = () => {
    console.log('Please find the list below:');
    let string = '';
    let current = head;
    while (current) {
      string += `( ${current.value} ) -> `;
      current = current.next;
    }
    string += 'null';
    console.log(string);
  };

  const append = (value) => {
    console.log(`Append ${value} to the list`);
    const node = Node(value);

    if (!head) {
      head = node;
      tail = node;
    } else {
      tail.next = node;
      tail = node;
    }
    size++;

    printList();
  };

  const prepend = (value) => {
    console.log(`Prepend ${value} to the list`);
    const node = Node(value);

    node.next = head;
    head = node;
    size++;
    printList();
  };

  const at = (input) => {
    const index = +input;
    if (isNaN(index)) {
      const errMsg = 'Index needs to be a number';
      return errMsg;
    }
    if (index < 0) {
      const errMsg = 'Index needs to be a positive number';
      return errMsg;
    }
    if (index >= size) {
      const errMsg = 'Index provided is too large';
      return errMsg;
    }

    let current = head;
    let count = 0;
    while (count < index) {
      current = current.next;
      count++;
    }
    return `The value at ${index} is ${current.value}`;
  };

  const pop = () => {
    if (!head) {
      console.log('Empty list, nothing to pop!');
      printList();
      return;
    }

    let current = head;
    if (!current.next) {
      head = null;
      tail = null;
      console.log('Only one item in the list, it is now empty');
      printList();
      return;
    }

    while (current.next.next) {
      current = current.next;
    }
    current.next = null;
    tail = current;
    printList();
    return;
  };

  const contains = (value) => {
    let current = head;

    while (current) {
      if (current.value === value) {
        return true;
      } else {
        current = current.next;
      }
    }
    return false;
  };

  const find = (value) => {
    let current = head;
    let count = 0;

    while (current) {
      if (current.value === value) {
        return count;
      } else {
        current = current.next;
        count++;
      }
    }
    return null;
  };

  const insertAt = (value, input) => {
    const index = +input;
    if (isNaN(index)) {
      console.log('Index is not a number!');
      return;
    }
    if (index < 0 || index >= size) {
      console.log('Index is outside the linked list');
      return;
    }

    let current = head;
    let count = 0;
    while (count < index - 1) {
      current = current.next;
      count++;
    }
    const node = Node(value, current.next);
    current.next = node;
    printList();
  };

  const removeAt = (input) => {
    const index = +input;
    if (isNaN(index)) {
      console.log('Index is not a number!');
      return;
    }
    if (index < 0 || index >= size) {
      console.log('Index is outside the linked list');
      return;
    }

    let current = head;
    let count = 0;
    let last = head;
    while (count < index) {
      last = current;
      current = current.next;
      count++;
    }
    last.next = current.next;
    printList();
  };

  return {
    append,
    prepend,
    get head() {
      return head;
    },
    get tail() {
      return tail;
    },
    get size() {
      return size;
    },
    at,
    pop,
    contains,
    find,
    insertAt,
    removeAt,
    printList,
  };
};

const list = List();

list.append(1);
list.append(2);
list.append(3);
list.append(4);

list.prepend(0);
list.prepend(-1);

console.log(list.head);
console.log(list.tail);
console.log(list.size);

console.log(list.at('a'));
console.log(list.at(-1));
console.log(list.at(0));
console.log(list.at(1));
console.log(list.at(2));
console.log(list.at(5));
console.log(list.at(6));

console.log(list.contains(-1));
console.log(list.contains(0));
console.log(list.contains(1));
console.log(list.contains(2));
console.log(list.contains(3));
console.log(list.contains(4));
console.log(list.contains(5));
console.log(list.contains(6));

console.log(list.find(-2));
console.log(list.find(-1));
console.log(list.find(0));
console.log(list.find(1));
console.log(list.find(2));
console.log(list.find(3));
console.log(list.find(4));
console.log(list.find(5));
console.log(list.find(6));

list.insertAt(8, 'a');
list.insertAt(8, -1);
list.insertAt(8, 8);
list.insertAt(8, 2);
list.insertAt(8, 4);

list.removeAt(4)
list.removeAt(2)


list.pop();
list.pop();
list.pop();
list.pop();
list.pop();
list.pop();
list.pop();

console.log('The end');

const Tree = require('../src/index');
// import { Tree } from '../src/index';

describe('Tree', () => {
  let tree;

  beforeEach(() => {
    tree = Tree();
  });

  // describe('buildTree', () => {
  //   it('should build a balanced binary search tree from an array', () => {
  //     tree.buildTree([10, 5, 15, 3, 7, 12, 18, 1, 4, 6, 8, 11, 14, 16, 20]);

  //     // Root node should have data 10
  //     expect(tree.root.data).toBe(10);

  //     // Left subtree should have datas 1, 3, 4, 5, 6, 7, and 8
  //     expect(tree.root.left.data).toBe(5);
  //     expect(tree.root.left.left.data).toBe(3);
  //     expect(tree.root.left.left.left.data).toBe(1);
  //     expect(tree.root.left.right.data).toBe(7);
  //     expect(tree.root.left.right.left.data).toBe(6);
  //     expect(tree.root.left.right.right.data).toBe(8);
  //     expect(tree.root.left.right.left.right).toBe(null);
  //     expect(tree.root.left.right.right.right).toBe(null);

  //     // Right subtree should have datas 11, 12, 14, 15, 16, 18, and 20
  //     expect(tree.root.right.data).toBe(15);
  //     expect(tree.root.right.left.data).toBe(12);
  //     expect(tree.root.right.left.left.data).toBe(11);
  //     expect(tree.root.right.left.right.data).toBe(14);
  //     expect(tree.root.right.left.left.left).toBe(null);
  //     expect(tree.root.right.left.left.right).toBe(null);
  //     expect(tree.root.right.left.right.left).toBe(null);
  //     expect(tree.root.right.left.right.right).toBe(null);
  //     expect(tree.root.right.right.data).toBe(18);
  //     expect(tree.root.right.right.left.data).toBe(16);
  //     expect(tree.root.right.right.right.data).toBe(20);
  //     expect(tree.root.right.right.left.left).toBe(null);
  //     expect(tree.root.right.right.left.right).toBe(null);
  //     expect(tree.root.right.right.right.left).toBe(null);
  //     expect(tree.root.right.right.right.right).toBe(null);
  //   });

  //   it('should build a balanced binary search tree from an array with one data', () => {
  //     tree.buildTree([10]);

  //     // Root node should have data 10
  //     expect(tree.root.data).toBe(10);
  //     expect(tree.root.left).toBe(null);
  //     expect(tree.root.right).toBe(null);
  //   });

  //   it('should build an empty tree from an empty array', () => {
  //     tree.buildTree([]);

  //     // Root node should be null
  //     expect(tree.root).toBe(null);
  //   });
  // });

  describe('insert', () => {
    it('should insert a data into an empty tree', () => {
      tree.insert(10);

      // Root node should have data 10
      expect(tree.root.data).toBe(10);
      expect(tree.root.left).toBe(null);
      expect(tree.root.right).toBe(null);
    });

    it('should insert a data into the left subtree', () => {
      tree.buildTree([10, 5, 15]);
      tree.insert(3);

      // Left subtree should have datas 3, 5, and 10
      expect(tree.root.left.data).toBe(5);
      expect(tree.root.left.left.data).toBe(3);
      expect(tree.root.left.right).toBe(null);
    });

    it('should insert a data into the right subtree', () => {
      tree.buildTree([10, 5, 15]);
      tree.insert(17);

      // Right subtree should have datas 15 and 17
      expect(tree.root.right.data).toBe(15);
      expect(tree.root.right.left).toBe(null);
      expect(tree.root.right.right.data).toBe(17);
    });

    it('should insert a data that is already in the tree', () => {
      tree.buildTree([10, 5, 15]);
      tree.insert(5);

      // Tree should be unchanged
      expect(tree.root.data).toBe(10);
      expect(tree.root.left.data).toBe(5);
      expect(tree.root.right.data).toBe(15);
    });
  });

  // describe('remove', () => {
  //   it('should remove the root node of a tree with one data', () => {
  //     tree.buildTree([10]);
  //     tree.remove(10);
  //     // Tree should be empty
  //     expect(tree.root).toBe(null);
  //   });

  //   it('should remove a leaf node from the left subtree', () => {
  //     tree.buildTree([10, 5, 15, 3, 7, 12, 18, 1, 4, 6, 8, 11, 14, 16, 20]);
  //     tree.remove(1);

  //     // Left subtree should have datas 3, 4, 5, 6, 7, 8, and 10
  //     expect(tree.root.left.data).toBe(5);
  //     expect(tree.root.left.left.data).toBe(3);
  //     expect(tree.root.left.left.left).toBe(null);
  //     expect(tree.root.left.left.right.data).toBe(4);
  //     expect(tree.root.left.right.data).toBe(7);
  //     expect(tree.root.left.right.left.data).toBe(6);
  //     expect(tree.root.left.right.right.data).toBe(8);
  //   });

  //   it('should remove a leaf node from the right subtree', () => {
  //     tree.buildTree([10, 5, 15, 3, 7, 12, 18, 1, 4, 6, 8, 11, 14, 16, 20]);
  //     tree.remove(20);

  //     // Right subtree should have datas 11, 12, 14, 15, 16, and 18
  //     expect(tree.root.right.data).toBe(15);
  //     expect(tree.root.right.left.data).toBe(12);
  //     expect(tree.root.right.left.left.data).toBe(11);
  //     expect(tree.root.right.left.right.data).toBe(14);
  //     expect(tree.root.right.right.data).toBe(18);
  //     expect(tree.root.right.right.left.data).toBe(16);
  //     expect(tree.root.right.right.right).toBe(null);
  //   });

  //   it('should remove a node with one child', () => {
  //     tree.buildTree([10, 5, 15, 3, 7, 12, 18, 1, 4, 6, 8, 11, 14, 16, 20]);
  //     tree.remove(12);

  //     // Right subtree of 15 should have data 14
  //     expect(tree.root.right.data).toBe(15);
  //     expect(tree.root.right.left.data).toBe(11);
  //     expect(tree.root.right.right.data).toBe(18);
  //     expect(tree.root.right.left.left).toBe(null);
  //     expect(tree.root.right.left.right.data).toBe(14);
  //     expect(tree.root.right.right.left.data).toBe(16);
  //     expect(tree.root.right.right.right.data).toBe(20);
  //   });

  //   it('should remove a node with two children', () => {
  //     tree.buildTree([10, 5, 15, 3, 7, 12, 18, 1, 4, 6, 8, 11, 14, 16, 20]);
  //     tree.remove(15);
    
  //     // Root node should have data 10
  //     expect(tree.root.data).toBe(10);
    
  //     // Left subtree should have datas 1, 3, 4, 5, 6, 7, 8, and 12
  //     expect(tree.root.left.data).toBe(5);
  //     expect(tree.root.left.left.data).toBe(3);
  //     expect(tree.root.left.left.left.data).toBe(1);
  //     expect(tree.root.left.left.right.data).toBe(4);
  //     expect(tree.root.left.right.data).toBe(7);
  //     expect(tree.root.left.right.left.data).toBe(6);
  //     expect(tree.root.left.right.right.data).toBe(8);
  //     expect(tree.root.left.right.right.right.data).toBe(12);
    
  //     // Right subtree should have datas 11, 14, 16, 18, and 20
  //     expect(tree.root.right.data).toBe(12);
  //     expect(tree.root.right.left.data).toBe(11);
  //     expect(tree.root.right.left.right.data).toBe(14);
  //     expect(tree.root.right.right.data).toBe(18);
  //     expect(tree.root.right.right.right.data).toBe(20);
  //   });

    

  //   it('should remove the root node', () => {
  //     tree.buildTree([10, 5, 15, 3, 7, 12, 18, 1, 4, 6, 8, 11, 14, 16, 20]);
  //     tree.remove(10);

  //     // Root node should have data 11
  //     expect(tree.root.data).toBe(11);

  //     // Left subtree should have datas 5, 7, and 12
  //     expect(tree.root.left.data).toBe(5);
  //     expect(tree.root.left.left).toBe(null);
  //     expect(tree.root.left.right.data).toBe(7);
  //     expect(tree.root.left.right.left).toBe(6);
  //     expect(tree.root.left.right.right.data).toBe(12);
  //     expect(tree.root.left.right.right.left.data).toBe(8);
  //     expect(tree.root.left.right.right.right).toBe(null);

  //     // Right subtree should have datas 14, 15, 16, 18, and 20
  //     expect(tree.root.right.data).toBe(15);
  //     expect(tree.root.right.left.data).toBe(14);
  //     expect(tree.root.right.right.data).toBe(18);
  //     expect(tree.root.right.left.left).toBe(null);
  //     expect(tree.root.right.left.right).toBe(null);
  //     expect(tree.root.right.right.left.data).toBe(16);
  //     expect(tree.root.right.right.right.data).toBe(20);
  //   });

  //   it('should do nothing if the data is not in the tree', () => {
  //     tree.buildTree([10, 5, 15]);
  //     tree.remove(20);

  //     // Tree should be unchanged
  //     expect(tree.root.data).toBe(10);
  //     expect(tree.root.left.data).toBe(5);
  //     expect(tree.root.right.data).toBe(15);
  //   });
  // });
});

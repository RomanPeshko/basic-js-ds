const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.tree = null;
  }

  root() {
    return this.tree;
  }

  add(data) {
    function addNode(node, data) {
      if (!node) {
        return new Node(data)
      }
      if (data < node.data) {
        node.left = addNode(node.left, data)
      } else {
        node.right = addNode(node.right, data)
      }
      return node
    }

    this.tree = addNode(this.tree, data)
  }

  has(data) {
    function hasNode(node, data) {
      if (!node) {
        return false
      }
      if (node.data === data) {
        return true;
      }
      return node.data < data ? hasNode(node.right, data) : hasNode(node.left, data);
    }

    return hasNode(this.tree, data)
  }

  find(data) {
    function findNode(node, data) {
      if (!node) {
        return null
      }
      if (node.data === data) {
        return node
      }
      return node.data < data ? findNode(node.right, data) : findNode(node.left, data);
    }

    return findNode(this.tree, data)
  }

  remove(data) {
    function removeNode(node, data) {
      if (!node) return null;
      if (node.data < data) {
        node.right = removeNode(node.right, data)
        return node
      } else if (node.data > data) {
        node.left = removeNode(node.left, data)
        return node
      } else {
        if (!node.left && !node.right) return null;
        if (!node.left) {
          node = node.right
          return node;
        }
        if (!node.right) {
          node = node.left
          return node;
        }
        let minData = node.right;
        while (minData.left) minData = minData.left
        node.data = minData.data
        node.right = removeNode(node.right, minData.data)
        return node;
      }
    }
    return removeNode(this.tree, data)
  }

  min() {
    let min = this.tree;
    while (min.left) min = min.left;

    return min.data;
  }

  max() {
    let max = this.tree;
    while (max.right) max = max.right;

    return max.data;
  }
}

module.exports = {
  BinarySearchTree
};
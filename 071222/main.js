// need to determine the total size of each directory
// The total size of a directory is the sum of the sizes of the files it contains
// find all of the directories with a total size of at most 100000, then calculate the sum of their total sizes.
// What is the sum of the total sizes of those directories?

// ls : It prints out all of the files and directories immediately contained by the current directory
// cd : This changes which directory is the current directory
// dir xyz means that the current directory contains a directory named xyz

const { readFileSync } = require('fs')
const rawInput = readFileSync('./input.txt').toString().split('\n')
// const rawInput = readFileSync('./input.txt', { encoding: 'utf-8'}).replace((/\r/g, "").trim().split('\n')).slice(0,20)

const lines = readFileSync("./input.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split("\n"); // Split on newline

function createTree(lines) {
  const tree = {
    name: "/",
    isDirectory: true,
    children: [],
  }; // node: name, isDirectory, size, children, parent

  let currentNode = tree;
  let currentCommand = null;

  for (const line of lines) {
    if (line[0] === "$") {
      // command
      const match = /^\$ (?<command>\w+)(?: (?<arg>.+))?$/.exec(line);

      currentCommand = match.groups.command;

      if (currentCommand === "cd") {
        const target = match.groups.arg;
        switch (target) {
          case "/":
            currentNode = tree;
            break;
          case "..":
            currentNode = currentNode.parent;
            break;
          default:
            currentNode = currentNode.children.find(
              (folder) => folder.isDirectory && folder.name === target
            );
        }
      }
    } else {
      if (currentCommand === "ls") {
        // For now, it's a file/directory from a 'ls' command
        const fileMatch = /^(?<size>\d+) (?<name>.+)$/.exec(line);
        if (fileMatch) {
          const node = {
            name: fileMatch.groups.name,
            size: parseInt(fileMatch.groups.size),
            isDirectory: false,
            parent: currentNode,
          };
          currentNode.children.push(node);
        }
        const dirMatch = /^dir (?<name>.+)$/.exec(line);
        if (dirMatch) {
          const node = {
            name: dirMatch.groups.name,
            isDirectory: true,
            children: [],
            parent: currentNode,
          };
          currentNode.children.push(node);
        }
      } else {
        throw new Error("unkown state");
      }
    }
  }

  return tree;
}

function printTree(node, depth = 0) {
  console.log(
    `${" ".repeat(depth * 2)}- ${node.name} (${
      node.isDirectory ? "dir" : `file, size=${node.size}`
    })`
  );
  if (node.isDirectory) {
    for (const child of node.children) {
      printTree(child, depth + 1);
    }
  }
}

function getSize(node, directoryCallback = () => {}) {
  if (!node.isDirectory) {
    return node.size;
  }
  const directorySize = node.children
    .map((child) => getSize(child, directoryCallback))
    .reduce((a, b) => a + b, 0);

  directoryCallback(node.name, directorySize);

  return directorySize;
}

function part1() {
  const thresholdSize = 100000;
  const tree = createTree(lines);

  // printTree(tree);

  let sumSmallFolder = 0;

  getSize(tree, (name, size) => {
    if (size < thresholdSize) {
      sumSmallFolder += size;
    }
  });

  console.log(sumSmallFolder);
}

function part2() {
  const totalDiskSpace = 70000000;
  const requiredSpace = 30000000;

  const tree = createTree(lines);

  const usedSpace = getSize(tree);
  const availableSpace = totalDiskSpace - usedSpace;
  if (availableSpace > requiredSpace) {
    throw new Error("There is already enough space");
  }
  const minimumFolderSize = requiredSpace - availableSpace;

  const candidates = [];

  getSize(tree, (name, size) => {
    if (size >= minimumFolderSize) {
      candidates.push({
        name,
        size,
      });
    }
  });

  candidates.sort((a, b) => a.size - b.size);

  console.log(candidates[0].size);
}

part1();
part2();
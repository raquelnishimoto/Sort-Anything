"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NumbersCollection_1 = require("./NumbersCollection");
var CharactersCollection_1 = require("./CharactersCollection");
var LinkedList_1 = require("./LinkedList");
var numbersCollection = new NumbersCollection_1.NumbersCollection([1, 23333, 22, -3, 0, 5, 1111]);
var charactersCollections = new CharactersCollection_1.CharactersCollection('Xbaya');
var linkedList = new LinkedList_1.LinkedList();
linkedList.add(500);
linkedList.add(-10);
linkedList.add(-3);
linkedList.add(4);
linkedList.sort();
linkedList.print();
numbersCollection.sort();
console.log('Sorted Num:', numbersCollection.data);
charactersCollections.sort();
console.log('Sorted Chars:', charactersCollections.data);

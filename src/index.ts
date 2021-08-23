import { Sorter } from "./Sorter";
import { NumbersCollection } from "./NumbersCollection";
import { CharactersCollection } from "./CharactersCollection";
import { LinkedList } from "./LinkedList";

const numbersCollection = new NumbersCollection([1, 23333, 22, -3, 0, 5, 1111]);

const charactersCollections = new CharactersCollection('Xbaya');

const linkedList = new LinkedList();
linkedList.add(500);
linkedList.add(-10);
linkedList.add(-3);
linkedList.add(4);

linkedList.sort();
linkedList.print();

numbersCollection.sort()
console.log('Sorted Num:', numbersCollection.data);

charactersCollections.sort();
console.log('Sorted Chars:', charactersCollections.data);
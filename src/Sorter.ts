export abstract class Sorter {
  abstract compare(leftIndex: number, rightIndex: number): boolean;
  abstract swap(leftIndex: number, rightIndex: number): void;
  abstract length: number;

  sort(): void {
    const { length } = this;

    for (let idx = 0; idx < length; idx++) {
      for (let iidx = 0; iidx < length - idx - 1; iidx++) {
        if (this.compare(iidx, iidx + 1)) {
          this.swap(iidx, iidx + 1);
        }
      }
    }
  }
}

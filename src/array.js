const arrDefault = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

const arrTitle = ["tit", "big", "great"];

let objIndex = 0;

const arrResult = arrDefault.reduce(
  (prev, next, currentIndex) => {
    let index = currentIndex % arrTitle.length;

    prev[objIndex][arrTitle[index]] = next;

    if (index === arrTitle.length - 1) {
      objIndex++;
      prev.push({});
    }

    return prev;
  },
  [{}],
);

console.log(arrResult);

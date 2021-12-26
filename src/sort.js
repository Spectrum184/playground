const arr = [
  3, 34, 67, 1231, 415, 24, 2, 5, 6, 6, 45, 78, 78, 13, 5, 623, 54, 2, 3, 3, 34,
  5,
];

/**
 * sort array by bubble sort algorithm
 * @var array arrData
 * @returns array data after sort
 */
const bubbleSort = (arrData) => {
  for (let i = 0; i < arrData.length; i++) {
    for (let j = arrData.length; j > i; j--) {
      if (arrData[j] < arrData[j - 1]) {
        const value = arrData[j];
        arrData[j] = arrData[j - 1];
        arrData[j - 1] = value;
      }
    }
  }

  return arrData;
};

/**
 * sort array by selection sort algorithm
 * @var array arrData
 * @returns array data after sort
 */
const selectionSort = (arrData) => {
  for (let i = 0; i < arrData.length; i++) {
    let idMin = i;

    for (let j = i + 1; j < arrData.length; j++) {
      if (arrData[j] < arrData[idMin]) idMin = j;
    }

    const value = arrData[i];
    arrData[i] = arrData[idMin];
    arrData[idMin] = value;
  }

  return arrData;
};

/**
 * sort array by insertion sort algorithm
 * @var array arrData
 * @returns array data after sort
 */
const insertionSort = (arrData) => {
  let position;
  let value;

  for (let i = 1; i < arrData.length; i++) {
    position = i - 1;
    value = arrData[i];

    while (position >= 0 && arrData[position] > value) {
      arrData[position + 1] = arrData[position];
      position--;
    }

    arrData[position + 1] = value;
  }

  return arrData;
};

/**
 * sort array by binary insertion sort algorithm
 * @var array arrData
 * @returns array data after sort
 */
const binaryInsertionSort = (arrData) => {
  let left;
  let right;
  let mid;
  let value;

  for (let i = 0; i < arrData.length; i++) {
    left = 0;
    right = i - 1;
    value = arrData[i];

    while (left <= right) {
      mid = Math.floor((left + right) / 2);

      if (arrData[mid] > value) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    for (let j = i; j > left; j--) {
      arrData[j] = arrData[j - 1];
      arrData[left] = value;
    }
  }

  return arrData;
};

/**
 * sort array by inter change sort algorithm
 * @var array arrData
 * @returns array data after sort
 */
const interChangeSort = (arrData) => {
  for (let i = 0; i < arrData.length; i++) {
    for (let j = i + 1; j < arrData.length; j++) {
      if (arrData[j] < arrData[i]) {
        const value = arrData[i];
        arrData[i] = arrData[j];
        arrData[j] = value;
      }
    }
  }

  return arrData;
};

/**
 * sort array by quick sort algorithm
 * case: left is 0 and right is last value of array
 * @var array arrData
 * @var number left
 * @var number right
 * @returns array data after sort
 */
const quickSort = (arrData, left, right) => {
  let l = left;
  let r = right;
  const mid = Math.floor((l + r) / 2);
  const pivot = arrData[mid];

  while (l <= r) {
    while (arrData[l] < pivot) l++;
    while (arrData[r] > pivot) r--;

    if (l <= r) {
      const value = arrData[l];

      arrData[l] = arrData[r];
      arrData[r] = value;

      l++;
      r--;
    }
  }

  if (l < right) quickSort(arrData, l, right);
  if (r > left) quickSort(arrData, left, r);

  return arrData;
};

const test = quickSort(arr, 0, arr.length - 1);
console.log(test);

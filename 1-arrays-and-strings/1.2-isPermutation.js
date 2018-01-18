// Given two strings, check to see if one is a permutation of the other
export function isPermutation(stringOne, stringTwo) {
  const oneSorted = stringOne.split('').sort().slice()
  const twoSorted = stringTwo.split('').sort().slice()

  return oneSorted.some((letter, index) => {
    return twoSorted[index] === letter ? true : false
  })
}
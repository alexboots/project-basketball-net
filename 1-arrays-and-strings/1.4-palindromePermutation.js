// Given a string of letters, can it be made into a palindrome.

// String check methods - placed in an object for readbility
const checkString = {
  // return the total number of times a letter appears in the string
  countLetters: function(array, letter, accumulator = 0) {
    const letterIndex = array.indexOf(letter)
    const newArray = array.slice(letterIndex + 1)

    if(letterIndex !== -1) {
      return this.countLetters(newArray, letter, accumulator += 1)
    } else {
      return accumulator
    }
  },
  // Must have at max only 1 odd letter
  stringHasZeroOrOneUnevenLetter: function(lettersCounted) {
    let oddLettersCount = 0
    for(let letter in lettersCounted) {
      const count = lettersCounted[letter]
      if(count % 2 !== 0) {
        oddLettersCount++
      }
    }

    return oddLettersCount <= 1 ? true : false
  }
}


const checkForValidString = (array) => {
  const letters = []
  const lettersCounted = {}

  array.forEach((letter) => {
    if(!letters.includes(letter)) {
      letters.push(letter)
    }
  })


  letters.forEach((letter) => {
    lettersCounted[`${letter}`] = checkString.countLetters(array, letter)
  })

  return checkString.stringHasZeroOrOneUnevenLetter(lettersCounted)
}

export function palindromePermuation(string) {
  let palindromable = false
  // get rid of spaces and 
  
  const arrayOfLetters = string.toLowerCase().replace(/[^a-z$]/g, '').split('')
  
  return checkForValidString(arrayOfLetters)
}
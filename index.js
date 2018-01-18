import { isUnique } from './1-arrays-and-strings/1.1-isUnique'
import { isPermutation } from './1-arrays-and-strings/1.2-isPermutation'
import { URLify } from './1-arrays-and-strings/1.3-URLify'
import { palindromePermuation } from './1-arrays-and-strings/1.4-palindromePermutation'

import { palindromes } from './1-arrays-and-strings/test-data'
// console.log('isUnique | true', isUnique('abcdefh'));
// console.log('isUnique | false', isUnique('abcdefhcgh'));

// console.log('\n\n');

// console.log('isPermutation | false', isPermutation('abcde', 'fghijk'));
// console.log('isPermutation | true', isPermutation('abcde', 'debca'));

// console.log('\n\n');

// console.log('URLify', URLify('hello some url'));

// console.log('\n\n');

palindromes.forEach((palindrome) => {
  console.log('palindromePermuation (of Tact coa)', palindromePermuation(palindrome));
})


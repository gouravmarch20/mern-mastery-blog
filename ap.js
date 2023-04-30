//! 1tags data passing logic
const arr = ['vbl', 'dixon', 'affle', 'indiamart', 'lti']
const str = arr.join(',') //! array item ko break as string
console.log(str)
const againArr = str.split(',') // ! string to array
console.log(againArr)

//! 2 redux state overview

// 1. state -> posts , auth ==> two parts

//a>> posts -> isLoading(boolean), post (array of object), currentPage(number) ,  noOfPage(number )
//b>> auth --> authData , loading : boolean , errors
// ! 3 :

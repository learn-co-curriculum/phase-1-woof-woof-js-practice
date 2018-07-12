const data = [
  [2, 3, 7, 8],
  [0, 1, 3],
  [9, 2, 8, 3]
]

function checkSum(data){

  const addValuesOfArray = (accumulator, currentValue) => accumulator + currentValue

  const differenceOfArrayValues = (numbers) => {
    return Math.max(...numbers) - Math.min(...numbers)
  }

  return data.map(differenceOfArrayValues).reduce(addValuesOfArray)
}

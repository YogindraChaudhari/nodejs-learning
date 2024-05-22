const jsonString = '{ "name": "John", "age": 30, "city": "New Jersey"}'
const jsonObject = JSON.parse(jsonString)
console.log(typeof jsonObject)
console.log(jsonObject.name)

const objectToJson = {
    name: 'Chloe',
    age: 25
}

const json = JSON.stringify(objectToJson)
console.log(json)
console.log(typeof json)
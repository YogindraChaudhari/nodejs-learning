const a = 5
const b = 6
const c = a + b
console.log(c)

const length = 6
const breadth = 10


function rectangleAreaarea(){
    const area = length * breadth
    console.log(area)
}

rectangleAreaarea()


const obj = {
    jeans: {
        name: 'levis',
        price: 12,
        inStock: 'yes',
    },

    shirt: {
        name: 'arrow',
        price: 16,
        inStock: 'yes',
    },
    watch: {
        name: 'fasttrack',
        price: 5,
        inStock: 'no'
    }
}

console.log(obj['jeans']['inStock'])

const guests = ['lauren', 'leah', 'angela', 'luna', 'savannah']
const person = ['chloe']

    if(guests.includes(person)){
        console.log(`welcome ${person}`)
    }
    else{
        console.log(`Sorry! ${person}`)
    }

const Weather = {
    city: 'mumbai',
    temperature: 36,
    latitude: 167,
    longitude: 158,
    state: 'maharashtra',
    langugae: 'marathi',
    date: 'British Bombay Presidency',
    condition: 'leveraging',
    food: 'vadaapaav',
    festival: 'ganesh chaturthi'
}

console.log(Weather['date'])
function add(a, b){
    return a + b
}

var result = add(2, 4)
console.log(result)

let addme = function(a, b){
    return a + b
}

// let multi = (a, b) => {return a * b}
let multi = (a, b) => (a * b)
let multime = multi(7, 9)
console.log(multime)

let adding = addme(7, 2)
console.log(adding)

;(function(){
    console.log('welcome')
})()


function callback2(add){
    console.log('second function')
    console.log(`value of addition is ${add}`)
}

const callback1 = (a, b, callback2) => {
    console.log('first function')
    let add = a + b
    // console.log(add)
    console.log(`value of a: ${a} and b: ${b} `)
    console.log('calling another function')
    callback2(add)
}

callback1(17, 13, callback2)
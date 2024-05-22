var fs = require('fs')
var os = require('os')
var urgent = require('./urgent')
var _ = require('lodash')

let user = os.userInfo()
// console.log(user.username)
console.log(user)
console.log(urgent)

const result = urgent.addAge(12, 14)
console.log(result)

fs.appendFile('message.txt', 'learning nodejs modules' + '!\n', () => console.log('file is created'))

let data = ['person', 1, 4, 'person', '11', 1, '4', 4]
const filter = _.uniq(data)
console.log(filter)
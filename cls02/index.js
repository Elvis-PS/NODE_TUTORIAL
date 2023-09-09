const { format } = require('date-fns');
const {v4: uuid}/* the expression means "v4 as uuid" */ = require('uuid');

console.log(new Date(), 'yyyyMMdd\tHH:mm:ss')
console.log('hello');

console.log(uuid());
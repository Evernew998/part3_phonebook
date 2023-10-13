const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log("1. Usage for adding a new contact to database: node mongo.js <password> <name> <phone number>")
    console.log("If the name contains whitespace characters, it must be enclosed in quotes")
    console.log("2. Usage for getting all contacts from database: node mongo.js <password>")
    process.exit(1)
}

const password = process.argv[2]

const url = 
    `mongodb+srv://phonebook:${password}@cluster0.zgsvwy5.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
} else {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    
    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}
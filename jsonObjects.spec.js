/// <reference types="cypress"/>

describe('JSON objects', () =>{

    it('JSON Object Test1', () =>{
        cy.openHomePage()

        const simpleObject = {"key": "value","key2": "value2"}

        const simpleArrayOfValue = ["one","two","three"]

        const arrayOfObjects =[{"key": "value"},{"key2": "value2"},{"key3": "value3"}]

        const typesOfData = {"string": "this is testing Ayu", "number": 10 }

        const mix={
            "FirstName": "Ayu",
            "LastName": "Purnama",
            "Age":30,
            "Students":[{
                "fistName": "Sara",
                "lastName": "Conor"
            },
            {
                "fistName": "Bruce",
                "lastName": "Willis"
            }
            ]
        }

console.log(simpleObject.key2)
console.log(simpleObject["key2"])
console.log(simpleArrayOfValue[1])
console.log(arrayOfObjects[2].key3)
console.log(mix.Students[1].lastName)

const lastNameOfStudent = mix.Students[1].lastName

    })
})
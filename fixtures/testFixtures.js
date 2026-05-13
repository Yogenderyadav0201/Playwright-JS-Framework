import { test as base} from '@playwright/test';


// Export the extended test object
export const test = base.extend({
<<<<<<< HEAD
    // Define the fixture
=======
    // // Define the fixture
>>>>>>> f6bf5f9668dede0cd3068bc38c9ffd8a26d04b2c
    // helloworld: async({}, use) => {
    //     console.log('Hello World')
    //     // 'use' is the callback that represents the test execution
    //     await use()
    //     console.log("Good bye!")
    // }


    helloworld: async({}, use) => {
        const myWorld = "Hello World";
        await use(myWorld)
    },

<<<<<<< HEAD
    niceDay: async({helloworld}, use) => {
=======
    niceDay: async({helloworld, page, request}, use) => {
>>>>>>> f6bf5f9668dede0cd3068bc38c9ffd8a26d04b2c
        const myDay = helloworld + '. What a great day!'
        // await page.goto("")
        // await request.get()
        await use(myDay)
    }
})
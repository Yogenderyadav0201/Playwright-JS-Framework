import { test } from '../fixtures/testFixtures';

// test.beforeEach('Hello', async({}) => {
//     console.log("Hello World");
// })

test('Where is my candy', async({helloworld}) => {
    //call the fixture
    console.log(helloworld)
    console.log("Where is my candy");
})


test('Test i am alive', async({niceDay}) => {
    console.log(niceDay)
    console.log("I am Alive!");
})
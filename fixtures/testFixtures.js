import { test as base} from '@playwright/test';

// Export the extended test object
export const test = base.extend({

    helloworld: async({}, use) => {
        const myWorld = "Hello World";
        await use(myWorld)
    },

    niceDay: async({helloworld, page, request}, use) => {
        const myDay = helloworld + '. What a great day!';
        // await page.goto("")
        // await request.get()
        await use(myDay)
    }
})

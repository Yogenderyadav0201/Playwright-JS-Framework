const { test, expect } = require('@playwright/test');
const BookingController = require('../../pages/API/CRUD-API');

test.describe('Update Operations for Booking API', () => {
    let bookingId;
    let controller;
    let authToken = 'password123';
    const testBooking = {
        firstname: 'Jane',
        lastname: 'Smith',
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
            checkin: '2023-02-01',
            checkout: '2023-02-15'
        },
        additionalneeds: 'Dinner'
    };

    test.beforeEach(async ({ request }) => {
        controller = new BookingController(request);
    });

    test('Setup: Create booking for update tests', async () => {
        const createResponse = await controller.createBooking(testBooking);
        expect(createResponse.status()).toBe(200);
        
        const createBody = await createResponse.json();
        bookingId = createBody.bookingid;
        console.log(bookingId,"12345234567876543457")
        expect(bookingId).toBeTruthy();
    });

    test('Should successfully update a product via PUT request', async ({ request }) => {
        // 1. Define the URL and Payload
        const url = 'https://fakestoreapi.com/products/1';
        const productPayload = { 
            title: 'Updated Product', 
            price: 39.99 
        };

        // 2. Execute the PUT request
        const response = await request.put(url, {
            headers: { 
                'Content-Type': 'application/json' 
            },
            data: productPayload // Playwright automatically stringifies objects passed to 'data'
        });

        // 3. Assertions (The QA way!)
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        // 4. Extract and print the response body
        const responseBody = await response.json();
        console.log("Updated Product Response:", JSON.stringify(responseBody, null, 2));

        // 5. Verify the payload changes were reflected in the response
        expect(responseBody.title).toBe('Updated Product');
        expect(responseBody.price).toBe(39.99);
    });

    test('Update booking with invalid token', async () => {
        const invalidToken = 'invalidtoken123';
        const updateResponse = await controller.updateBooking(bookingId, testBooking, invalidToken);
        expect(updateResponse.status()).toBe(403); // Forbidden
    });

    test('Update non-existent booking', async () => {
        const nonExistentId = 999999;
        const updateResponse = await controller.updateBooking(nonExistentId, testBooking, authToken);
        expect(updateResponse.status()).toBe(403); // Forbidden
    });
});
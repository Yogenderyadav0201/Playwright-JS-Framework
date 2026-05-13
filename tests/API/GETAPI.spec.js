const { test, expect } = require('@playwright/test');
const BookingController = require('../../pages/API/CRUD-API');

test.describe('CRUD Operations for Booking API', () => {
    let bookingId;
    let controller;
    let authToken = 'password123'; // In real life, get this via an Auth call

    test.beforeEach(async ({ request }) => {
        controller = new BookingController(request);
    });

    test('Full CRUD Lifecycle', async () => {
        // 2. READ
        const getRes = await controller.getBooking();
        
        // Extract the JSON body (assuming this is an Array)
        const responseBody = await getRes.json();
        
        // Use .slice(0, 10) to get only the first 10 items
        const limitedResponse = responseBody.slice(0, 10);
        
        // Print the limited set to the terminal
        console.log("First 10 Results:", JSON.stringify(limitedResponse, null, 2));

        expect(getRes.status()).toBe(200);
        
        // Standard check to ensure we actually got an array back
        expect(Array.isArray(responseBody)).toBe(true);
    });
});
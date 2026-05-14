const { test, expect } = require('@playwright/test');
const BookingController = require('../../pages/API/CRUD-API');

test.describe('Full CRUD Operations for Booking API', () => {
    let bookingId;
    let controller;
    let authToken = 'password123'; // In real life, get this via an Auth call
    const testBooking = {
        firstname: 'John',
        lastname: 'Doe',
        totalprice: 123,
        depositpaid: true,
        bookingdates: {
            checkin: '2023-01-01',
            checkout: '2023-01-10'
        },
        additionalneeds: 'Breakfast',
        lastname: 'Doe'
    };

    test.beforeEach(async ({ request }) => {
        controller = new BookingController(request);
    });

    test('1. CREATE Booking', async () => {
        // Create a new booking
        const createResponse = await controller.createBooking(testBooking);
        expect(createResponse.status()).toBe(200);
        
        // Extract booking ID from response
        const createBody = await createResponse.json();
        bookingId = createBody.bookingid;
        expect(bookingId).toBeTruthy();
        
        console.log(`Created booking with ID: ${bookingId}`);
    });

    test('2. READ Booking', async () => {
        // Read the created booking
        const getResponse = await controller.getBooking(bookingId);
        expect(getResponse.status()).toBe(200);
        
        const getBody = await getResponse.json();
        expect(getBody).toEqual({
            bookingid: bookingId,
            ...testBooking
        });
    });

    test('3. UPDATE Booking', async () => {
        // Update the booking
        const updatedBooking = {...testBooking, totalprice: 200};
        const updateResponse = await controller.updateBooking(bookingId, updatedBooking, authToken);
        expect(updateResponse.status()).toBe(200);
        
        // Verify the update
        const updatedResponse = await controller.getBooking(bookingId);
        const updatedBody = await updatedResponse.json();
        expect(updatedBody.totalprice).toBe(200);
    });

    test('4. DELETE Booking', async () => {
        // Delete the booking
        const deleteResponse = await controller.deleteBooking(bookingId, authToken);
        expect(deleteResponse.status()).toBe(200);
        
        // Verify deletion by attempting to read (should return 404)
        const readAfterDelete = await controller.getBooking(bookingId);
        expect(readAfterDelete.status()).toBe(404);
    });
});
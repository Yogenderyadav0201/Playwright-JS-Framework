const { test, expect } = require('@playwright/test');
const BookingController = require('../../pages/API/CRUD-API');

test.describe('Delete Operations for Booking API', () => {
    let bookingId;
    let controller;
    let authToken = 'password123';
    const testBooking = {
        firstname: 'Mike',
        lastname: 'Johnson',
        totalprice: 300,
        depositpaid: true,
        bookingdates: {
            checkin: '2023-03-01',
            checkout: '2023-03-20'
        },
        additionalneeds: 'Airport transfer'
    };

    test.beforeEach(async ({ request }) => {
        controller = new BookingController(request);
    });

    test('Setup: Create booking for delete tests', async () => {
        const createResponse = await controller.createBooking(testBooking);
        expect(createResponse.status()).toBe(200);
        
        const createBody = await createResponse.json();
        bookingId = createBody.bookingid;
        expect(bookingId).toBeTruthy();
    });

    test('Delete booking with invalid token', async () => {
        const invalidToken = 'invalidtoken123';
        const deleteResponse = await controller.deleteBooking(bookingId, invalidToken);
        expect(deleteResponse.status()).toBe(403); // Forbidden
    });

});
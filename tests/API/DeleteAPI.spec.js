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

    test('Delete booking with valid token', async () => {
        const deleteResponse = await controller.deleteBooking(bookingId, authToken);
        expect(deleteResponse.status()).toBe(200);
    });

    test('Verify deleted booking cannot be retrieved', async () => {
        const readAfterDelete = await controller.getBooking(bookingId);
        expect(readAfterDelete.status()).toBe(404);
    });

    test('Delete non-existent booking', async () => {
        const nonExistentId = 999999;
        const deleteResponse = await controller.deleteBooking(nonExistentId, authToken);
        expect(deleteResponse.status()).toBe(404); // Not Found
    });

    test('Delete booking with invalid token', async () => {
        const invalidToken = 'invalidtoken123';
        const deleteResponse = await controller.deleteBooking(bookingId, invalidToken);
        expect(deleteResponse.status()).toBe(403); // Forbidden
    });

    test('Multiple bookings - delete specific one', async () => {
        const booking1 = { ...testBooking, firstname: 'John', lastname: 'Doe' };
        const booking2 = { ...testBooking, firstname: 'Jane', lastname: 'Smith' };

        const createRes1 = await controller.createBooking(booking1);
        const createRes2 = await controller.createBooking(booking2);

        const body1 = await createRes1.json();
        const body2 = await createRes2.json();
        const id1 = body1.bookingid;
        const id2 = body2.bookingid;

        // Delete only the first booking
        const deleteRes = await controller.deleteBooking(id1, authToken);
        expect(deleteRes.status()).toBe(200);

        // Verify id1 is deleted
        const read1 = await controller.getBooking(id1);
        expect(read1.status()).toBe(404);

        // Verify id2 still exists
        const read2 = await controller.getBooking(id2);
        expect(read2.status()).toBe(200);
    });
});
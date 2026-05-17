const { test, expect } = require('@playwright/test');
const BookingController = require('../../pages/API/CRUD-API');

test.describe('Full CRUD Operations for Booking API', () => {
    let controller;
    const authToken = 'password123'; // In real life, get this via an Auth call
    const testBooking = {
        firstname: 'John',
        lastname: 'Doe',
        totalprice: 123,
        depositpaid: true,
        bookingdates: {
            checkin: '2023-01-01',
            checkout: '2023-01-10'
        },
        additionalneeds: 'Breakfast'
    };

    test.beforeEach(async ({ request }) => {
        controller = new BookingController(request);
    });

    test('1. CREATE Booking', async () => {
        const createResponse = await controller.createBooking(testBooking);
        expect(createResponse.status()).toBe(200);

        const createBody = await createResponse.json();
        expect(createBody.bookingid).toBeTruthy();
        expect(createBody.booking).toEqual(testBooking);
    });

    test('2. READ Booking', async () => {
        const createResponse = await controller.createBooking(testBooking);
        expect(createResponse.status()).toBe(200);

        const createBody = await createResponse.json();
        const bookingId = createBody.bookingid;
        expect(bookingId).toBeTruthy();

        const getResponse = await controller.getBooking(bookingId);
        expect(getResponse.status()).toBe(200);

        const getBody = await getResponse.json();
        expect(getBody).toEqual({
            bookingid: bookingId,
            ...testBooking
        });
    });

    test('3. UPDATE Booking', async () => {
        const createResponse = await controller.createBooking(testBooking);
        expect(createResponse.status()).toBe(200);

        const createBody = await createResponse.json();
        const bookingId = createBody.bookingid;
        expect(bookingId).toBeTruthy();

        const updatedBooking = {...testBooking, totalprice: 200};
        const updateResponse = await controller.updateBooking(bookingId, updatedBooking, authToken);
        expect(updateResponse.status()).toBe(200);

        const updatedResponse = await controller.getBooking(bookingId);
        expect(updatedResponse.status()).toBe(200);

        const updatedBody = await updatedResponse.json();
        expect(updatedBody.totalprice).toBe(200);
    });

    test('4. DELETE Booking', async () => {
        const createResponse = await controller.createBooking(testBooking);
        expect(createResponse.status()).toBe(200);

        const createBody = await createResponse.json();
        const bookingId = createBody.bookingid;
        expect(bookingId).toBeTruthy();

        const deleteResponse = await controller.deleteBooking(bookingId, authToken);
        expect(deleteResponse.status()).toBe(200);

        const readAfterDelete = await controller.getBooking(bookingId);
        expect(readAfterDelete.status()).toBe(404);
    });
});

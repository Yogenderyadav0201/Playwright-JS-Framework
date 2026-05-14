const { test, expect } = require('@playwright/test');
const BookingController = require('../../pages/API/CRUD-API');

test.describe('Read Operations for Booking API', () => {
    let bookingId;
    let controller;
    let firstName1;
    let authToken = 'password123';
    const testBooking = {
        firstname: 'Alice',
        lastname: 'Williams',
        totalprice: 200,
        depositpaid: true,
        bookingdates: {
            checkin: '2023-04-01',
            checkout: '2023-04-10'
        },
        additionalneeds: 'Vegetarian meal'
    };

    test.beforeEach(async ({ request }) => {
        controller = new BookingController(request);
    });

    test('Get all bookings', async () => {
        const getResponse = await controller.getBooking();
        expect(getResponse.status()).toBe(200);
        
        const responseBody = await getResponse.json();
        expect(Array.isArray(responseBody)).toBe(true);
        
        // Verify at least one booking exists
        expect(responseBody.length).toBeGreaterThan(0);
    });

    test('Get specific booking by ID', async () => {
        // First create a booking to get an ID
        const createResponse = await controller.createBooking(testBooking);
        expect(createResponse.status()).toBe(200);
        
        const createBody = await createResponse.json();
        bookingId = createBody.bookingid;
        firstName1 = createBody.booking["firstname"];
        expect(getBody).toEqual({ ...testBooking, firstname: firstName1 });
    });

});
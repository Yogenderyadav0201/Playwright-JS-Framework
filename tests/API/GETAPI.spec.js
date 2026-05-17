const { test, expect } = require('@playwright/test');
const BookingController = require('../../pages/API/CRUD-API');

test.describe('Read Operations for Booking API', () => {
    let bookingId;
    let controller;
    let firstName1;
    let responseBody;
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

    test('Should successfully generate auth token via POST request', async ({ request }) => {
        // 1. Define the API endpoint and authentication payload
        const url = 'https://restful-booker.herokuapp.com/auth';
        const authPayload = {
            username: 'admin',
            password: 'password123'
        };

        // 2. Execute the POST request
        const response = await request.post(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: authPayload // Playwright handles JSON stringification automatically
        });

        // 3. Assertions to validate the response status
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        // 4. Extract and print the response body to capture the token
        responseBody = await response.json();
        console.log('Auth Response Body:', responseBody);

        // 5. Assert that the token property exists in the response
        expect(responseBody).toHaveProperty('token');
        expect(typeof responseBody.token).toBe('string');
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

        const getResponse = await controller.getBooking(bookingId);
        expect(getResponse.status()).toBe(200);

        const getBody = await getResponse.json();
        expect(getBody.firstname).toBe(firstName1);
        expect(getBody).toEqual({ ...testBooking, firstname: firstName1 });
    });

    test('Get non-existent booking', async () => {
        const nonExistentId = 999999;
        const getResponse = await controller.getBooking(nonExistentId);
        expect(getResponse.status()).toBe(404); // not found
    });

    test('Get booking with invalid token', async () => {
        const invalidToken = "testuser12312312";
        const getResponse = await controller.getBooking(bookingId, invalidToken);
        const createBody = await getResponse.json();
        console.log(createBody, "@#$%$#@#$%$#@!$#@#%$#@")
        expect(getResponse.status()).toBe(403); // Forbidden
    });

});


/**Status Code

400    Bad Request       Token format is wrong

401    Unauthorized        Invalid or expired token

403    Forbidden.           Token is valid but access is denied

498    Invalid Token    Custom status used by some APIs */
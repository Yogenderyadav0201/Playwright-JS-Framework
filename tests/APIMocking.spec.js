import { test, expect } from '@playwright/test';

test('Mock API Example', async ({ page }) => {

  // Intercept API request
  await page.route('**/api/users', async route => {

    // Mocked response
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: 1,
          name: 'Yogender',
          role: 'QA Engineer'
        },
        {
          id: 2,
          name: 'Rahul',
          role: 'Automation Tester'
        }
      ])
    });
  });

  // Open application
  await page.goto('https://example.com');

  // Assertions
  await expect(page.locator('text=Yogender')).toBeVisible();
});



/*
1. Stub

A Stub is a fixed predefined response returned instead of calling the real API.

Think of it as:

"Whenever this API is called, always return this fake data."


2. Mock

A Mock is more advanced.

It not only returns fake data but also:

* simulates behavior
* validates requests
* checks whether API was called correctly

Think of it as:

"Pretend to be the real backend."


3. Intercept

Intercept means:

"Catch the network request before it reaches the server."

Once intercepted, you can:

* inspect request
* modify request
* block request
* mock response
* continue original request

Intercept is the main mechanism.
*/

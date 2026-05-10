const { test } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');

const loginData = require('../../test-data/loginData.json');

test('Valid Login Test', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        loginData.validUser.username,
        loginData.validUser.password
    );

    await loginPage.verifyDashboard();
});

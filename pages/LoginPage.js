class LoginPage {

    constructor(page) {
        this.page = page;

        // Locates the span with id 'signin'
        this.signButton = page.locator('#signin');

        // Targets the input element inside the div with id='username'
        // Using CSS is cleaner: '#username input'
        this.usernameInput = page.locator('#username input');

        // Targets the input element inside the div with id='password'
        this.passwordInput = page.locator('#password input');

        this.loginButton = page.locator('button[type="submit"]');

        // Verify login by checking if 'Logout' text appears
        this.dashboardText = page.locator('span:has-text("Logout")');
    }

    async navigate() {
        await this.page.goto('https://bstackdemo.com/');
    }

    async login(username, password) {
        await this.signButton.click();
        await this.usernameInput.fill(username);
        await this.usernameInput.press('Enter');
        await this.passwordInput.fill(password);
        await this.passwordInput.press('Enter');
        await this.loginButton.click();
    }

    async verifyDashboard() {
        await this.dashboardText.waitFor({ state: 'visible' });
    }
}

module.exports = LoginPage;
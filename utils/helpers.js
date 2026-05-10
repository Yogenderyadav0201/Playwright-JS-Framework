function generateRandomEmail() {
    return `test${Date.now()}@gmail.com`;
}

module.exports = {
    generateRandomEmail
};

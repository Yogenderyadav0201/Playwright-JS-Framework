class BookingController {
    constructor(request) {
        this.request = request;
    }

    async createBooking(payload) {
        const response = await this.request.post('https://restful-booker.herokuapp.com/booking', {
            data: payload
        });
        return response;
    }

    async getBooking(id, token) {
        const base = 'https://restful-booker.herokuapp.com';
        const url = id ? `${base}/booking/${id}` : `${base}/booking`;
        const options = {};
        if (token) {
            options.headers = { 'Cookie': `token=${token}` };
        }
        return await this.request.get(url, options);
    }

    async updateBooking(id, payload, token) {
        const url = `https://restful-booker.herokuapp.com/booking/${id}`;
        return await this.request.put(url, {
            data: payload,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${token}` 
            }
        });
    }

    async deleteBooking(id, token) {
        const url = `https://restful-booker.herokuapp.com/booking/${id}`;
        return await this.request.delete(url, {
            headers: { 'Cookie': `token=${token}` }
        });
    }
}

module.exports = BookingController;
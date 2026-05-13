class BookingController {
    constructor(request) {
        this.request = request;
    }

    async createBooking(payload) {
        const response = await this.request.post('/booking', {
            data: payload
        });
        return response;
    }

    async getBooking(id) {
        return await this.request.get(`https://restful-booker.herokuapp.com/booking`);
    }

    async updateBooking(id, payload, token) {
        return await this.request.put(`/booking/${id}`, {
            data: payload,
            headers: { 'Cookie': `token=${token}` }
        });
    }

    async deleteBooking(id, token) {
        return await this.request.delete(`/booking/${id}`, {
            headers: { 'Cookie': `token=${token}` }
        });
    }
}

module.exports = BookingController;
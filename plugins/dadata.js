const Axios = require("axios");

const { DADATA_API_KEY } = process.env;

const http = Axios.create({
    headers: {
        "Authorization": `Token ${DADATA_API_KEY}`
    }
})

class Dadata {
    link = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/postal_unit"

    constructor() {}

    async postalInit (query) {
        const assignParams = Object.assign(query, { "radius_meters": 3000 });
        return http.post(this.link, { query: assignParams })
    }
}

const dadata = new Dadata()

module.exports = {
    dadata
};
import axios from "axios";

const ApiClient = axios.create({
    baseURL: 'https://rekrutacja-webhosting-it.krd.pl/api/Recruitment',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default ApiClient;
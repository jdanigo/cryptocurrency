import axios from 'axios';

export const API =  {
    fetchDataDashboard() {
        return axios.get(`${process.env.REACT_APP_API_URL}/tickers/`);
    }
}
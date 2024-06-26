import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3"
const TOKEN = import.meta.env.VITE_APP_API_TOKEN

const headers = {
    authorization: "bearer " + TOKEN
}

export const fetchData = async (url ,params) => {
    try {
        const {data} = await axios.get(BASE_URL + url, {headers, params})
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}
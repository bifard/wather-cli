import axios from "axios";
import { getKeyValue, KEY_DICTIONARY } from "./storage.service.js";

//ba6c7cbd2799b160db1f964244ea8b0e
const getWeatherByCity = async (city) => {
  const token = await getKeyValue(KEY_DICTIONARY.token);
  if (!token) {
    throw new Error("Задайте токен через -t [API_TOKEN], получить токен можно на https://weatherstack.com/");
  }
  const { data } = await axios.get("http://api.weatherstack.com/current", {
    params: {
      access_key: "ba6c7cbd2799b160db1f964244ea8b0e",
      query: city,
    },
  });

  return data;
};

export { getWeatherByCity };

import axios from "axios";
import { getKeyValue, KEY_DICTIONARY } from "./storage.service.js";

//ba6c7cbd2799b160db1f964244ea8b0e
const getWeatherByCity = async (city) => {
  const token = await getKeyValue(KEY_DICTIONARY.token);
  if (!token) {
    throw new Error("Задайте токен через -t [API_TOKEN], получить токен можно на https://weatherstack.com/");
  }

  const httpClient = axios.create();
  httpClient.interceptors.response.use(
    (res) => {
      if (res.data.success === false && res.data.error?.code === 101) {
        res.status = 401;
        const error = new axios.AxiosError(
          res.data.error?.info || "Ошибка запроса к API",
          401,
          res.config,
          res.request,
          res
        );
        return Promise.reject(error);
      }
      return res;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const { data } = await httpClient.get("http://api.weatherstack.com/current", {
    params: {
      access_key: token,
      query: city,
    },
  });

  return data;
};

export { getWeatherByCity };

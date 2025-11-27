#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeatherByCity } from "./services/api.service.js";
import { printError, printHelp, printSuccess, printWeather } from "./services/log.service.js";

import { saveKeyValue, KEY_DICTIONARY, getKeyValue } from "./services/storage.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Не верно введен токен");
    return;
  }
  try {
    await saveKeyValue(KEY_DICTIONARY.token, token);
    printSuccess("Токен успешно сохранен");
  } catch (error) {
    printError(`Ошибка сохранения токена : ${error.message}`);
  }
};

const getForcast = async () => {
  try {
    const city = await getKeyValue(KEY_DICTIONARY.city);
    if (!city) {
      throw Error("Задайте город через -s [CITY_NAME]");
    }
    const weather = await getWeatherByCity(city);
    printWeather(weather);
  } catch (error) {
    if (error?.response?.status === 401) {
      printError("Не уверно указан токен");
    } else {
      printError(error.message);
    }
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError("Не верно введен город");
  }
  try {
    await saveKeyValue(KEY_DICTIONARY.city, city);
    printSuccess("Город успешно сохранен");
  } catch (error) {
    printError(`Ошибка сохранения города : ${error.message}`);
  }
};
const initCLI = async () => {
  try {
    const args = getArgs(process.argv);
    const city = args.s;
    if (args.h) {
      printHelp();
      return;
    }
    if (args.s) {
      await saveCity(args.s);
      return;
    }
    if (args.t) {
      await saveToken(args.t);
      return;
    }

    getForcast();
  } catch (error) {
    printError(error);
  }
};
initCLI();

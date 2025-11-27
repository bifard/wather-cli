#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeatherByCity } from "./services/api.service.js";
import { printError, printSuccess } from "./services/log.service.js";

import { saveKeyValue, KEY_DICTIONARY } from "./services/storage.service.js";

const saveToken = async (token) => {
  try {
    await saveKeyValue(KEY_DICTIONARY.token, token);
    printSuccess("Токен успешно сохранен");
  } catch (error) {
    printError(`Ошибка сохранения токена : ${error.message}`);
  }
};

const getForcast = async (city) => {
  try {
    const weather = await getWeatherByCity(city);
    printSuccess(weather);
  } catch (error) {
    if (error?.response?.status === 401) {
      printError("Не уверно указан токен");
    } else {
      printError(error.message);
    }
  }
};
const initCLI = async () => {
  try {
    const args = getArgs(process.argv);
    const city = args.s;
    if (args.h) {
    }
    if (!args.s) {
    }
    if (args.t) {
      await saveToken(args.t);
    }

    getForcast(city);
  } catch (error) {
    printError(error);
  }
};
initCLI();

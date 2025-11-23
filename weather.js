#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printError, printSuccess } from "./services/log.service.js";

import { saveKeyValue } from "./services/storage.service.js";

const saveToken = async (token) => {
  try {
    await saveKeyValue("token", token);
    printSuccess("Токен успешно сохранен");
  } catch (error) {
    printError(`Ошибка сохранения токена : ${error.message}`);
  }
};
const initCLI = async () => {
  const args = getArgs(process.argv);
  if (args.h) {
  }
  if (args.s) {
  }
  if (args.t) {
    return saveToken(args.t);
  }
};
initCLI();

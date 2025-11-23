import { join } from "path";
import { homedir } from "os";

const filePath = join(homedir(), "weather-cli-data.json");

export const saveKeyValue = (key, value) => {
  console.log(filePath);
  console.log(homedir());
};

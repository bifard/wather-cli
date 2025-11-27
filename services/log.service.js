import chalk from "chalk";
import dedent from "dedent-js";

const printError = (error) => {
  console.log(chalk.bgRed(" ERROR "), " ", error);
};
const printSuccess = (success) => {
  console.log(chalk.bgGreen(" SUCCESS "), " ", success);
};

const printHelp = () => {
  console.log(dedent`
		${chalk.bgCyan(" HELP ")}
		Без параметров - вывод погоды
		-s [CITY] для установки города
		-h для вывода помощи
		-t [API_KEY] сохранения токена
		`);
};

const printWeather = (data) => {
  const { location, current } = data;

  // Функция для определения эмодзи погоды
  const getWeatherEmoji = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes("sun") || desc.includes("clear")) return "☀️";
    if (desc.includes("cloud")) return "☁️";
    if (desc.includes("rain")) return "🌧️";
    if (desc.includes("snow")) return "❄️";
    if (desc.includes("storm") || desc.includes("thunder")) return "⛈️";
    if (desc.includes("fog") || desc.includes("mist")) return "🌫️";
    if (desc.includes("wind")) return "💨";
    return "🌤️";
  };

  // Эмодзи для ощущаемой температуры
  const getFeelsLikeEmoji = (temp) => {
    if (temp > 30) return "🔥";
    if (temp > 20) return "😊";
    if (temp > 10) return "😌";
    if (temp > 0) return "😐";
    if (temp > -10) return "🥶";
    return "🧊";
  };

  console.log(dedent`
		
		
		${chalk.bgYellow("🌡️  ПОГОДА ")} ${chalk.cyan(location.name)}, ${chalk.cyan(location.country)}
		
		${chalk.gray("🕐 Время:")} ${location.localtime}
		
		${chalk.bold("🌡️  Температура:")} ${
    current.temperature > 0 ? chalk.red(`+${current.temperature}°C`) : chalk.blue(`${current.temperature}°C`)
  }
		${chalk.bold(`${getFeelsLikeEmoji(current.feelslike)} Ощущается как:`)} ${
    current.feelslike > 0 ? chalk.red(`+${current.feelslike}°C`) : chalk.blue(`${current.feelslike}°C`)
  }
		${chalk.bold(`${getWeatherEmoji(current.weather_descriptions[0])}  Погода:`)} ${chalk.yellow(
    current.weather_descriptions[0]
  )}
		
		${chalk.bold("💧 Влажность:")} ${chalk.cyan(`${current.humidity}%`)}
		${chalk.bold("💨 Ветер:")} ${chalk.cyan(`${current.wind_speed} км/ч ${current.wind_dir}`)}
		${chalk.bold("📊 Давление:")} ${chalk.cyan(`${current.pressure} мбар`)}
		${chalk.bold("👁️  Видимость:")} ${chalk.cyan(`${current.visibility} км`)}
		
		${chalk.bold("🌬️ Качество воздуха:")}
		  ${chalk.gray("PM2.5:")} ${chalk.cyan(`${current.air_quality.pm2_5} мкг/м³`)}
		  ${chalk.gray("PM10:")} ${chalk.cyan(`${current.air_quality.pm10} мкг/м³`)}
		  ${chalk.gray("Индекс EPA:")} ${chalk.cyan(current.air_quality["us-epa-index"])}
		`);

  // Определяем качество воздуха по индексу EPA
  const airQualityIndex = parseInt(current.air_quality["us-epa-index"]);
  let airQualityText = "";
  let airQualityColor = chalk.green;
  let airQualityEmoji = "✅";

  if (airQualityIndex <= 1) {
    airQualityText = "Отличное";
    airQualityColor = chalk.green;
    airQualityEmoji = "✅";
  } else if (airQualityIndex <= 2) {
    airQualityText = "Хорошее";
    airQualityColor = chalk.greenBright;
    airQualityEmoji = "👍";
  } else if (airQualityIndex <= 3) {
    airQualityText = "Умеренное";
    airQualityColor = chalk.yellow;
    airQualityEmoji = "⚠️";
  } else if (airQualityIndex <= 4) {
    airQualityText = "Нездоровое";
    airQualityColor = chalk.red;
    airQualityEmoji = "😷";
  } else {
    airQualityText = "Опасное";
    airQualityColor = chalk.redBright;
    airQualityEmoji = "🚨";
  }

  console.log(`  ${chalk.gray("Статус:")} ${airQualityEmoji} ${airQualityColor(airQualityText)}\n`);
};

export { printError, printSuccess, printHelp, printWeather };

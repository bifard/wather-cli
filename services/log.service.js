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

export { printError, printSuccess, printHelp };

export const getArgs = (arrayArgs) => {
  const res = {};
  const [_executer, _file, ...arr] = arrayArgs;
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];

    if (element.charAt(0) === "-") {
      const nextElement = arr[index + 1];
      if (arr.length - 1 !== index && nextElement.charAt(0) !== "-") {
        res[element.substring(1)] = nextElement;
      } else {
        res[element.substring(1)] = true;
      }
    }
  }

  return res;
};

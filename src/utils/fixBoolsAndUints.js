export default async function (abiJsonInterface, paramsArray) {
  let index = 0;
  const resultArray = paramsArray;
  abiJsonInterface.inputs.forEach((item) => {
    if (JSON.stringify(item.type)) {
      if (item.type.startsWith('uint')) {
        resultArray[index] = paramsArray.index.parseInt();
      }
      if (item.type === 'bool') {
        resultArray[index] = (paramsArray.index !== 'false');
      }
      index += 1;
    }
  });
  return resultArray;
}

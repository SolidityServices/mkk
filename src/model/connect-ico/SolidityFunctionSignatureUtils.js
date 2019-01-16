const stringArgv = require('string-argv');

function fixBoolsAndUints(abiJsonInterface, paramsArray) {
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

export default async function encodeFunctionSignatureWithParameters(signatureWithParameters) {
  const nameEndIndex = signatureWithParameters.indexOf('(');
  const signatureEndIndex = signatureWithParameters.indexOf(')') + 1;
  const paramsStartIndex = signatureEndIndex + 1;
  const functionName = signatureWithParameters.slice(0, nameEndIndex);
  const types = signatureWithParameters.slice(nameEndIndex + 1, signatureEndIndex - 1);
  const paramsString = signatureWithParameters.slice(paramsStartIndex);
  const abiJsonInterface = {
    name: '',
    type: 'function',
    inputs: [],
  };
  abiJsonInterface.name = functionName;
  const typesArray = types.split(',');
  typesArray.forEach((item) => {
    const inputItem = {};
    inputItem.type = item.trim();
    abiJsonInterface.inputs.push(inputItem);
  });
  const paramsArray = stringArgv(paramsString);
  const fixedParamsArray = fixBoolsAndUints(abiJsonInterface, paramsArray);
  return { abiJsonInterface, fixedParamsArray };
}

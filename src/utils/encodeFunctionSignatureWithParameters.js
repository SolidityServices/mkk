import stringArgv from 'string-argv';
import fixBoolsAndUints from './fixBoolsAndUints';

export default async function (signatureWithParameters) {
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
  const fixedParamsArray = await fixBoolsAndUints(abiJsonInterface, paramsArray);

  return { abiJsonInterface, fixedParamsArray };
}

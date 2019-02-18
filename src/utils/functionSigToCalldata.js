import encodeFunctionSignatureWithParameters from './encodeFunctionSignatureWithParameters';

export default async function (functionSig) {
  try {
    const encodedFuncSignature = await encodeFunctionSignatureWithParameters(functionSig);
    return window.web3.eth.abi.encodeFunctionCall(encodedFuncSignature.abiJson, encodedFuncSignature.params);
  } catch (e) {
    console.log(e);
  }

  return '';
}

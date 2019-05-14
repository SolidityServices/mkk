import encodeFunctionSignatureWithParameters from './encodeFunctionSignatureWithParameters';

export default async function (functionSig) {
  // eslint-disable-next-line no-unneeded-ternary
  if (functionSig) {
    try {
      const encodedFuncSignature = await encodeFunctionSignatureWithParameters(functionSig);
      return window.web3.eth.abi.encodeFunctionCall(encodedFuncSignature.abiJson, encodedFuncSignature.params);
    } catch (e) {
      console.log(e);
    }
  }

  return 0;
}

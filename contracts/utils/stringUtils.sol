/* pragma solidity ^0.4.24;

library stringUtils {

  function bytes3ToString(bytes3 x) public pure returns (string) {
      bytes memory bytesString = new bytes(3);
      uint charCount = 0;
      for (uint j = 0; j < 3; j++) {
          byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
          if (char != 0) {
              bytesString[charCount] = char;
              charCount++;
          }
      }
      bytes memory bytesStringTrimmed = new bytes(charCount);
      for (j = 0; j < charCount; j++) {
          bytesStringTrimmed[j] = bytesString[j];
      }
      return string(bytesStringTrimmed);
  }
}
 */
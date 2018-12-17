pragma solidity ^0.4.24;

//pow operation with a very weak but simple safety check

library SemiSafeMath {

    function pow(uint256 a, uint256 pow) internal pure returns (uint256 c) {
        uint256 result = 1;
        for (uint256 i = 0; i < pow; i++) {
            result *= a;
            assert(result >= a);
        }
        return result;
    }

}

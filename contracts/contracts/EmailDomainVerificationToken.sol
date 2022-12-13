// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract EmailDomainVerificationToken is ERC721URIStorage, EIP712, AccessControl {
    using Strings for uint256;

    uint256 tokenId;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    string baseURI = "";

    constructor(string memory name, string memory symbol)
    ERC721(name, symbol)
    EIP712(name, "1.0.0")
    {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function setAdminRole(address _owner) onlyRole(DEFAULT_ADMIN_ROLE) public {
        revokeRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(DEFAULT_ADMIN_ROLE, _owner);
    }

    function setMinterRole(address _minter) onlyRole(DEFAULT_ADMIN_ROLE) public {
        _setupRole(MINTER_ROLE, _minter);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function redeem(address account, string memory emailDomain, bytes calldata signature)
    external
    {
        require(_verify(_hash(account, emailDomain), signature), "Invalid signature");
        _safeMint(account, tokenId);
        _setTokenURI(tokenId, emailDomain);
    }

    function _hash(address account, string memory emailDomain)
    internal view returns (bytes32)
    {
        return _hashTypedDataV4(keccak256(abi.encode(
            keccak256("AttestationData(string emailDomain,address account)"),
            keccak256(bytes(emailDomain)),
            account
        )));
    }

    function _verify(bytes32 digest, bytes memory signature)
    internal view returns (bool)
    {
        return hasRole(MINTER_ROLE, ECDSA.recover(digest, signature));
    }

    function recover(address account, string memory emailDomain, bytes memory signature) public view returns (address) {
        bytes32 digest = _hash(account, emailDomain);
        return ECDSA.recover(digest, signature);
    }
}
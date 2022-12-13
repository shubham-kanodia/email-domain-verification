// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract EmailDomainVerificationToken is ERC721Enumerable, EIP712, AccessControl {
    using Strings for uint256;

    uint256 tokenId;
    mapping (uint256 => string) public emailDomains;

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
        emailDomains[tokenId] = emailDomain;
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

    function tokenURI(uint256 tokenId) override public view returns (string memory) {
        string[19] memory parts;
        parts[0] = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 100 100"><g><rect x="0" y="0" width="100" height="100" fill="red"></rect><text x="10" y="50" font-family="Verdana" font-size="10" fill="blue">@';
        parts[1] = emailDomains[tokenId];
        parts[2] = '</text></g></svg>';

        string memory output = string(abi.encodePacked(parts[0], parts[1], parts[2]));
        
        string memory json = Base64.encode(bytes(string(abi.encodePacked('{"name": "Token #', Strings.toString(tokenId), '", "description": "Email domain verification NFT", "image": "data:image/svg+xml;base64,', Base64.encode(bytes(output)), '"}'))));
        output = string(abi.encodePacked('data:application/json;base64,', json));

        return output;
    }
}
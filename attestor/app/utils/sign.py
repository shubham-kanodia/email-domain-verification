from eth_account.messages import encode_structured_data
from web3 import Web3

from config import Config


class SigningUtils:
    def __init__(self, config: Config):
        self.web3 = Web3(Web3.HTTPProvider(config.node_url))

        self.chain_id = config.chain_id
        self.contract_address = config.contract_address

        self.private_key = config.private_key

    def sign(self, email_domain, user_address):
        data = {
            "types": {
                "AttestationData": [{"name": "emailDomain", "type": "string"}, {"name": "account", "type": "address"}],
                "EIP712Domain": [{"name": "name", "type": "string"}, {"name": "version", "type": "string"},
                                 {"name": "chainId", "type": "uint256"},
                                 {"name": "verifyingContract", "type": "address"}]},
            "domain": {"name": "Attestation Token", "version": "1.0.0", "chainId": int(self.chain_id),
                       "verifyingContract": self.contract_address}, "primaryType": "AttestationData",
            "message": {"emailDomain": email_domain, "account": user_address}}

        encoded_data = encode_structured_data(data)
        signed_msg = self.web3.eth.account.sign_message(encoded_data, self.private_key)
        signature = Web3.toHex(signed_msg.signature)

        return signature

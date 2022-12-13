from pydantic import BaseModel


class AttestationInput(BaseModel):
    email_address: str
    ethereum_address: str

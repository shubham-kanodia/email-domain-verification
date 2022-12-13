import os
from envyaml import EnvYAML
from dotenv import load_dotenv


class Config:
    current_path = os.path.dirname(os.path.realpath(__file__))

    source = EnvYAML(os.path.join(current_path, "data/config.yaml"))
    load_dotenv(os.path.join(current_path, "data/.env"))

    node_url = os.getenv("NODE_URL")
    private_key = os.getenv("PRIVATE_KEY")

    contract_address = source.get("signing.contract_address")
    chain_id = source.get("signing.chain_id")

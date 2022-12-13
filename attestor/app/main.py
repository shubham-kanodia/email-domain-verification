from fastapi import FastAPI
from fastapi import status, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from utils.sign import SigningUtils

from models.inputs import *

from config import Config

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

config = Config()
signing_utils = SigningUtils(config)


@app.get("/")
async def root():
    return {"message": f"Welcome to HenceProved"}


@app.post("/attest")
async def attest(attestation_input: AttestationInput):
    print(attestation_input)
    return {"message": f"Welcome to HenceProved"}

import React from 'react';
import { useParams } from 'react-router-dom'

function Verify(props) {
    const { sig, domain, account } = useParams();

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div>
                <label>
                    <b>Signature: </b>
                </label><br />
                <i>{sig.substring(0, 20) + "..."}</i>
            </div><br />
            <div>
                <label>
                    <b>Email Domain: </b>
                </label><br />
                <i>{domain.substring(0, 20) + "..."}</i>
            </div><br />
            <div>
                <label>
                    <b>Ethereum Address: </b>
                </label><br />
                <i>{account.substring(0, 20) + "..."}</i>
            </div><br />
            <div className="flex items-center justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  Mint Verification NFT
                </button>
            </div>
        </div>
    );
}

export default Verify;
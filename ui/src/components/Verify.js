import React, { useState } from 'react';
import { useParams } from 'react-router-dom'

import { mintVerificationNFT } from '../utils';
import EmailDomainVerificationToken from '../abi/EmailDomainVerificationToken.json';

function Verify(props) {
    const [minted, setMinted] = useState(false);

    const { sig, domain, account } = useParams();
    const CONTRACT_ADDR = "0x34A96f04A205fd77D8Dc81E2cDA2bA649c0C70f5";

    const mint = async () => {
        try {
            await mintVerificationNFT(
                CONTRACT_ADDR,
                EmailDomainVerificationToken,
                domain,
                account,
                sig
            );
            setMinted(true);
        }
        catch (err) {
            console.log(err);
        }

    }

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            { !minted && <div>
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
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => mint()}>
                        Mint Verification NFT
                    </button>
                </div>
            </div> }

            {minted && <p>Your email domain has been successfully verified!</p>}
        </div>
    );
}

export default Verify;
import React, { useEffect, useState } from 'react';

const Form = () => {
    const [email, setEmail] = useState("");
    const [account, setAccount] = useState("");

    const [content, setContent] = useState(null);

    const sendRequest = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email_address: `${email}`, ethereum_address: `${account}` })
        };
        fetch('http://localhost:8000/attest', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setContent(data);
            });
    }

    return (
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email Address
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" for="ethereum-addr">
                Ethereum Address
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="ethereum-addr" type="text" placeholder="Ethereum Address" value={account} onChange={(e) => setAccount(e.target.value)} />
            </div>
            <div className="flex items-center justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => sendRequest()}>
                  Submit
                </button>
            </div>
            <br />{content && <a href={content.confirmation_link}><b>Confirmation Link</b></a>}
          </form>
        </div>
    );
};

export default Form;
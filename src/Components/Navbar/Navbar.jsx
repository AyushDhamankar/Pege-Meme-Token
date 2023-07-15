import { useState } from "react";
import { Link } from "react-router-dom";
import ABI from "./ABI.json";
import Web3 from "web3";
function Navbar({ saveState }) {
  const [connected, setConnected] = useState(true);
  const [token, setToken] = useState("0");
  const init = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const contract = new web3.eth.Contract(
        ABI,
        "0xC0a4508CF3dC8F9d137b76A22B41Af424c8fA53d"
      );
      saveState({ web3: web3, contract: contract }, accounts[0]);
      setConnected(false);
      const balance = await contract.methods.TokenBalances(accounts[0]).call();
      console.log(balance);
      setToken(balance);
      console.log(contract);
    } catch (err) {
      console.log("ERROR");
    }
  };

  const styles = {
    minHeight: "10vh",
  };
  return (
    <header class="text-gray-400 bg-gray-900 body-font">
      <div
        class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center"
        style={styles}
      >
        <Link
          to="/"
          class="flex title-font font-medium items-center text-white mb-4 md:mb-0"
        >
          <img src="https://uploads-ssl.webflow.com/6440775b98cac1c304cd2c06/64414128bafa3b616f19e584_PepeInu_Coin%20(1)%20(1).png" style={{ width: '50px', height: '50px' }} />
          <span class="ml-1 text-xl">Pege Token</span>
        </Link>
        <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/transfer" class="mr-5 hover:text-white">
            Transfer Token
          </Link>
          <Link to="/stake" class="mr-5 hover:text-white">
            Stake Token
          </Link>
          <Link to="/proposal" class="mr-5 hover:text-white">
            Create Proposal
          </Link>
          <Link to="/vote" class="mr-5 hover:text-white">
            Vote for Proposal
          </Link>
          <Link to="/register" class="mr-5 hover:text-white">
            Upload NFT
          </Link>
          <Link to="/post" class="mr-5 hover:text-white">
            NFT Posts
          </Link>
          <Link to="/transaction" class="mr-5 hover:text-white">
            Transaction
          </Link>
          <Link to="/purchase" class="mr-5 hover:text-white">
            Purchase Token
          </Link>
        </nav>
        <button
          class="inline-flex items-center bg-indigo-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0 mr-5"
          style={{ backgroundColor: '#1f2937', color: '#9ca3af' }}
        >
            <img src="https://uploads-ssl.webflow.com/6440775b98cac1c304cd2c06/64414128bafa3b616f19e584_PepeInu_Coin%20(1)%20(1).png" style={{ width: '25px', marginRight: '5px' }} /> { Number(token) } Token
        </button>
        <button
          class="inline-flex items-center bg-indigo-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"
          onClick={init}
          disabled={!connected}
        >
          {" "}
          {connected ? "Connect Metamask" : "Connected"}
        </button>
      </div>
    </header>
  );
}

export default Navbar;

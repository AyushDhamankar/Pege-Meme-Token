import { useState } from "react";
function Admin({ state }) {
  const [token, setToken] = useState("");

  const mint = async (event) => {
    try {
      if (token !== "") {
        event.preventDefault();
        const Token = Number(token);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const { contract } = state;
        await contract.methods.mint(Token).send({ from: accounts[0] });
      }
    } catch (error) {
      console.log("Byee");
    }
  };

  const burn = async (event) => {
    try {
        event.preventDefault();
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
        const { contract } = state;
        await contract.methods.burn().send({ from: accounts[0] });
    } catch (error) {
      console.log("Byee");
    }
  };

    const styles = {
      minHeight: "90vh",
    };
    return (
      <>
        <section class="text-gray-400 bg-gray-900 body-font relative">
          <form
            class="container px-5 py-24 mx-auto"
            style={styles}
            autocomplete="off"
          >
            <div class="flex flex-col text-center w-full mb-12">
              <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
                Admin Panel
              </h1>
              <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
                Submit grievance by filling out all the fields below. Please fill
                the form correctly as the details entered will be used for further
                processing of your grievance.
              </p>
            </div>
            <div class="lg:w-1/2 md:w-2/3 mx-auto">
              <div class="flex flex-wrap -m-2">
              <div class="p-2 w-full">
                  <div class="relative">
                    <label for="name" class="leading-7 text-sm text-gray-400">
                      Token
                    </label>
                    <input
                      type="text"
                      autocomplete="off"
                      onChange={(e) => setToken(e.target.value)}
                      class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div class="flex p-2 w-full">
                  <button
                    class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={mint}
                  >
                    Mint Token
                  </button>
                  <button
                    class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={burn}
                  >
                    Burn Token
                  </button>
                </div>
              </div>
            </div>
          </form>
        </section>
      </>
    );
  }
  
  export default Admin;
  
import { useState, useEffect } from "react";
function Post({ state }) {
  const [detail, setDetail] = useState("");
  useEffect(() => {
    const { contract } = state;
    const getDetail = async () => {
      const nameText = await contract.methods.getNFT().call();
      setDetail(nameText);
      // console.log(Number(nameText[0][3]));
      // console.log(nameText[0][0]);
    };
    contract && getDetail();
  }, [state]);

  const buyNFT = async (id, value) => {
    try {
      console.log("Hii");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const { contract } = state;

      const result = await contract.methods
        .buyNFT(id, value)
        .send({ from: accounts[0] });
      console.log(result);
    } catch (error) {
      console.error(error);
      console.log("Bye");
    }
  };
  return (
    <>
      <div className="App">
        <header
          className="App-header"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: '#111827',
            minHeight: '90vh'
          }}
        >
          {detail !== "" &&
            detail.map((detail) => {
              console.log(detail);
              return (
                <div class="group mt-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                  <div
                    class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                    // href="#"
                  >
                    <img
                      class="peer absolute top-0 right-0 h-full w-full object-cover"
                      src={detail[5]}
                      alt="product image"
                    />
                    
                    {detail[7] === false ? <span class="absolute top-0 left-0 m-2 rounded-full bg-green-600 px-2 text-center text-sm font-medium text-white">On Sale</span> : <span class="absolute top-0 left-0 m-2 rounded-full bg-red-600 px-2 text-center text-sm font-medium text-white">Sold</span>}
                  </div>
                  <div class="mt-4 px-5 pb-5">
                    <a href="#">
                      <h5 class="text-xl tracking-tight text-slate-900">
                        {detail[1]}
                      </h5>
                    </a>
                    <div class="mt-2 mb-5 flex items-center justify-between" style={{ flexDirection: 'column',  alignItems: 'baseline' }}>
                      <p>
                        <span class="text-3xl font-bold text-slate-900">
                          {Number(detail[3])} Token
                        </span>
                        {/* <span class="text-sm text-slate-900 line-through">
                          $699
                        </span> */}
                      </p>
                    </div>

                    <button
                      onClick={() => buyNFT(Number(detail[0]), Number(detail[3]))}
                      class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                      style={{ marginBottom: '10px', width: '100%' }}
                      disabled={detail[7]}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="mr-2 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      {detail[7] === false ? "Buy NFT" : "Sold Out"}
                    </button>
                  </div>
                </div>
              );
            })}
        </header>
      </div>
    </>
  );
}

export default Post;

const COVALENT_API_KEY = process.env.REACT_APP_COVALENT_API_KEY;

export const getNFTs = async (address) => {
  console.log("getNFTs", address);
  const res = (
    await (
      await fetch(
        `https://api.covalenthq.com/v1/80001/address/${address}/balances_v2/?format=JSON&nft=true&no-nft-fetch=false&key=${COVALENT_API_KEY}`
      )
    ).json()
  ).data;
  return res;
};

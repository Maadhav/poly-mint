export const ipfsToUrl = (ipfsHash) => {
  return `https://infura-ipfs.io/ipfs/${encodeURIComponent(
    ipfsHash.replace("ipfs://", "")
  )}`;
};

// Import the NFTStorage class and File constructor from the 'nft.storage' package
import { NFTStorage, File } from "nft.storage";

const NFT_STORAGE_KEY = process.env.REACT_APP_IPFS_API_KEY;

export async function storeNFT(file, name, description) {
  const image = new File([file], name, { type: file.type });

  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

  return nftstorage.store({
    image,
    name,
    description,
  });
}

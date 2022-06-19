
![Logo](https://user-images.githubusercontent.com/21285859/174494354-0fd25a5c-4de8-4043-8086-49bdc199bab3.png)

# PolyMint

> PolyMint is a dapp (decentralized application) which allows users to deploy and mint non-fungible tokens (NFTs) on the Polygon blockchain.
## Features

- Mint both ERC 721 and ERC 1155 NFTs
- Create NFT Collections
- Use an existing PolyMint NFT Contract to add NFTs to an existing Collection
- IPFS Stroge (image, metadata, etc)
- On-chain contract deployment system
- View all of your NFTs on the Polygon Network (Using the Covalant API)
- Login with Unstoppable Domains or MetaMask
- Simple and user-friendly user interface



## Demo

Live Website (https://polymint.netlify.app/)

Youtube Video Demo

[![Youtube Video](https://img.youtube.com/vi/iD_HzwIKrAo/0.jpg)](https://www.youtube.com/watch?v=iD_HzwIKrAo)



## FAQ
#### How is this project different from just a NFT Marketplace?

PolyMint is not a NFT Marketplace, using PolyMint you can create and deploy your own NFT Smart Contracts. You can then use those contracts to deploy any new NFTs you like.

To explain it even more, basically PolyMint allows a non tech guy to deploy their own NFT Collections.
No need to use Truffle, Hardhat or any other EVM deplyment tools. 

#### How does it work?

An internal function of the Smart Contract for deploying a new ERC-721 Contract.

```solidity
function _mint721(
        string memory name,
        string memory symbol,
        string memory tokenURI
    ) internal {
        PolyMintERC721 contract_ = new PolyMintERC721(name, symbol);
        address erc721Address = address(contract_);
        contract_.mint(msg.sender, tokenURI);
        contracts[erc721Address] = PolyMint(erc721Address, 721, name, symbol);
        addresses.push(erc721Address);
    }
```


## Tech Stack

**Client:** React, React Router, Semantic-UI

**Server:** Truffle, IPFS, Covalant API



## Roadmap

- [x] Custom ERC-721 & ERC-1155 minting
- [x] IPFS metadata storage
- [ ] A more better UI/UX
- [ ] Zero minting fees using meta-transaction
- [ ] Account Access Management
- [ ] List NFTs on Opensea
- [ ] Security Enhancements


See the [open issues][github-issues] for a full list of proposed features (and known issues).

## Run Locally

Clone the project

```bash
  git clone https://github.com/Maadhav/poly-mint
```

Go to the project directory

```bash
  cd poly-mint
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_CLIENT_ID`

`REACT_APP_REDIRECT_URI`

`REACT_APP_IPFS_API_KEY`

`REACT_APP_COVALENT_API_KEY`


## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch
   ```sh
   git checkout -b feature/AmazingFeature
   ```
3. Commit your Changes 
    ```sh
    git commit -m 'Add some AmazingFeature'
    ```
4. Push to the Branch 
   ```sh
    git push origin feature/AmazingFeature
    ```
6. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE.md` for more information.
    
## Feedback & Contact

If you have any feedback or contact, please reach out to us at maadhav2001@gmail.com


## Authors

- [@Maadhav](https://www.github.com/Maadhav)


import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { getNFTs } from "../api/user_details";
import NFTsCard from "../components/NftsCard";
import { ipfsToUrl } from "../utils/ipfs_utils";

function UserDetails() {
  const [nfts, setNfts] = useState([]);
  const [selectedContract, setSelectedContract] = React.useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { account } = useWeb3React();
  useEffect(() => {
    console.log("account", account);
    getNFTs(account).then((res) => {
      var nfts = res.items.filter(
        (e) =>
          e.type == "nft" &&
          e.nft_data[0] &&
          e.nft_data[0].token_url.includes("metadata.json")
      );
      setNfts(nfts);
      getIPFS(nfts);
    });
  }, []);

  const getIPFS = async (nfts) => {
    for (let i = 0; i < nfts.length; i++) {
      const url = ipfsToUrl(nfts[i].nft_data[0].token_url);
      const json = await fetch(url).then((res) => res.json());
      const name = json.name;
      const description = json.description;
      const image = ipfsToUrl(json.image);
      nfts[i].name = name;
      nfts[i].description = description;
      nfts[i].image = image;
      setNfts([...nfts]);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Card.Group
          style={{
            padding: 100,
          }}
        >
          {nfts.map((nft) => {
            return (
              <Card onClick={() => setSelectedContract(nft.nft_data)}>
                <Image src={nft.image} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{nft.contract_name}</Card.Header>
                  <Card.Meta>
                    <span className="date">{nft.last_transferred_at}</span>
                  </Card.Meta>
                  <Card.Description>{nft.description}</Card.Description>
                  <Card.Content>
                    {nft.nft_data.length} {nft.contract_ticker_symbol}
                  </Card.Content>
                </Card.Content>
                <Card.Content extra>
                  <a
                    className="ellipsis"
                    href={`https://mumbai.polygonscan.com/address/${nft.contract_address}#internaltx`}
                    target="_blank"
                  >
                    <Icon name="external" />
                    {nft.contract_address}
                  </a>
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
      )}
      {selectedContract != null && (
        <NFTsCard
          data={selectedContract}
          open={selectedContract}
          onClose={() => {
            setSelectedContract(null);
          }}
          onOpen={() => {}}
        />
      )}
    </>
  );
}

export default UserDetails;

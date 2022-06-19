import React, { useEffect, useState } from "react";
import { Button, Card, Header, Image, Modal } from "semantic-ui-react";
import { ipfsToUrl } from "../utils/ipfs_utils";

function NFTsCard({ data, open, onClose, onOpen }) {
  const [images, setImages] = useState([]);
  const [nftData, setNftData] = useState(data);
  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    if (nftData) {
      for (let i = 0; i < nftData.length; i++) {
        const url = ipfsToUrl(nftData[i].token_url);
        const json = await fetch(url).then((res) => res.json());
        const name = json.name;
        const description = json.description;
        const image = ipfsToUrl(json.image);
        nftData[i].name = name;
        nftData[i].description = description;
        nftData[i].image = image;
      }
    }
    setNftData(nftData);
  };
  if (images == []) return <div>Loading...</div>;
  return (
    <Modal
      onClose={onClose}
      onOpen={onOpen}
      open={open}
      loading
      trigger={<Button>Show Modal</Button>}
    >
      <Card.Group
        itemsPerRow={6}
        style={{
          padding: 24,
        }}
      >
        {nftData.map((nft) => (
          <Card raised image={nft.image} />
        ))}
      </Card.Group>
      <Modal.Actions>
        <Button color="black" onClick={onClose}>
          Back
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default NFTsCard;

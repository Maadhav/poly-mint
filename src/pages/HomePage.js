import { useWeb3React } from "@web3-react/core";
import React, { useEffect } from "react";
import {
  Button,
  Confirm,
  Form,
  Grid,
  Header,
  Message,
  Radio,
  Segment,
} from "semantic-ui-react";
import { storeNFT } from "../api/ipfs_api";
import { FileInput } from "../components/FileInput/FileInput";
const PolyMintFactory = require("../contracts/PolyMintFactory.json");

const HomePage = () => {
  const POLYMINTFACTORY_ADDRESS = "0x4C42FE4671394c5e2e0e81AEcE913bd3a9570015";
  const [state, setState] = React.useState({
    quantity: 1,
    isNew: true,
    contractType: 721,
  });
  const [isNew, setIsNew] = React.useState(true);
  const [isComplete, setIsComplete] = React.useState(false);
  const [isLoadingContract, setIsLoadingContract] = React.useState(false);
  const [isLoading, setisLoading] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const { active, library, account } = useWeb3React();
  const [contract, setContract] = React.useState(null);

  useEffect(() => {
    if (active) {
      const contract = new library.eth.Contract(
        PolyMintFactory.abi,
        POLYMINTFACTORY_ADDRESS
      );
      setContract(contract);
    }
  }, [active]);

  const handleSubmit = async () => {
    setisLoading(true);
    console.log(state);
    const metadata = await storeNFT(state.file, state.title, state.description);
    console.log(metadata.url);
    let mint;
    if (isNew) {
      if (state.contractType == 721) {
        mint = contract.methods.mint(state.name, state.symbol, metadata.url);
      } else if (state.contractType == 1155) {
        mint = contract.methods.mint(
          state.name,
          state.symbol,
          metadata.url,
          state.quantity
        );
      }
    } else {
      if (state.contractType == 721) {
        mint = contract.methods.mint(state.contractAddress, metadata.url);
      } else if (state.contractType == 1155) {
        mint = contract.methods.mint(
          state.contractAddress,
          metadata.url,
          state.quantity
        );
      }
    }
    mint
      .send({
        from: account,
      })
      .then((res) => {
        console.log(res);
        setState((state) => ({ ...state, tx: res.transactionHash }));
        setisLoading(false);
        setIsComplete(true);
      });
  };

  const validateContract = async (address) => {
    setIsLoadingContract(true);
    let res = await contract.methods.getContract(address).call();
    console.log(res);
    setIsLoadingContract(false);
    if (res[0] == "") return false;
    setState((state) => ({
      ...state,
      contractName: res[0],
      contractSymbol: res[1],
      contractType: parseInt(res[2]),
    }));
    return true;
  };

  if (!active)
    return (
      <div style={{ paddingTop: 100, minHeight: "100vh" }}>
        <Grid textAlign="center" verticalAlign="middle">
          <Message negative>
            <Message.Header>No Connected Account Found</Message.Header>
            <p>Please Login with Unstoppable to use PolyMint</p>
          </Message>
        </Grid>
      </div>
    );

  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 500, marginTop: 100 }}>
        <Form size="large" success loading={isLoading}>
          <Segment>
            <span className="field">
              <label>
                {isNew ? "" : "Contract Address: "}
                <span
                  style={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "#6299BB",
                    fontWeight: "normal",
                  }}
                  onClick={() => {
                    setIsNew(!isNew);
                  }}
                >
                  {isNew
                    ? "Already Have a PolyMint Contract? "
                    : "Don't Have a PolyMint Contract? "}
                </span>
              </label>
            </span>
            {!isNew && (
              <Form.Input
                placeholder="0xEd95c43715c0359382316171E3e2f66522eEc26c"
                error={
                  library.utils.isAddress(state.contractAddress) ||
                  state.contractAddress == ""
                    ? false
                    : {
                        content: "Please enter a valid contract address",
                        pointing: "above",
                      }
                }
                loading={isLoadingContract}
                onChange={(e, { value }) => {
                  setState({ ...state, contractAddress: value });
                  if (library.utils.isAddress(value)) {
                    validateContract(value);
                  }
                }}
              />
            )}
            <Form.Group widths="equal">
              <Form.Field className={isNew ? "" : "disabled"}>
                <label>NFT Collection name</label>
                <Form.Input
                  fluid
                  placeholder="ApeCoin"
                  value={state.contractName}
                  onChange={(e, { value }) =>
                    setState({ ...state, name: value })
                  }
                />
              </Form.Field>
              <Form.Field className={isNew ? "" : "disabled"}>
                <label>Symbol</label>
                <Form.Input
                  fluid
                  placeholder="APE"
                  value={state.contractSymbol}
                  onChange={(e, { value }) =>
                    setState({ ...state, symbol: value.toUpperCase() })
                  }
                />
              </Form.Field>
            </Form.Group>
            <Form.Input
              label="Title"
              placeholder="NFT Name"
              onChange={(e, { value }) => setState({ ...state, title: value })}
            />
            <Form.TextArea
              label="Description"
              placeholder="Tell us more about the NFT..."
              onChange={(e, { value }) =>
                setState({ ...state, description: value })
              }
            />
            <Form.Field label="NFT Type" />
            <Form.Group inline>
              <Form.Field
                control={Radio}
                disabled={!isNew}
                label="ERC-721"
                value={721}
                checked={state.contractType === 721}
                onChange={(e, { value }) => {
                  setState({ ...state, contractType: value, quantity: 1 });
                }}
              />
              <Form.Field
                disabled={!isNew}
                control={Radio}
                label="ERC-1155"
                value={1155}
                checked={state.contractType === 1155}
                onChange={(e, { value }) =>
                  setState({ ...state, contractType: value })
                }
              />
            </Form.Group>
            <Form.Input
              type="number"
              label="Quantity"
              min="1"
              disabled={state.contractType === 721}
              value={`${state.quantity}`}
              onChange={(e, { value }) =>
                setState({ ...state, quantity: parseInt(value) })
              }
            />
            <Form.Field label="NFT File" />
            <FileInput
              onFileChange={(_file) => setState({ ...state, file: _file })}
            />
            <Button color="violet" fluid size="large" onClick={handleSubmit}>
              Submit
            </Button>
          </Segment>
          <Confirm
            open={isComplete}
            cancelButton="View On Explorer"
            confirmButton="Ok"
            content="NFT Minting Completed"
            onCancel={() => {
              setState({});
              setIsComplete(false);
              const win = window.open(
                `https://mumbai.polygonscan.com/tx/${state.tx}`,
                "_blank"
              );
              if (win != null) {
                win.focus();
              }
            }}
            onConfirm={() => {
              setIsComplete(false);
              setState({});
            }}
          />
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default HomePage;

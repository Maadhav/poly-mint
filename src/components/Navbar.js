import React, { useEffect } from "react";
import UnstoppableIcon from "../images/unstoppable-icon.png";
import connector from "../connectors";
import { Container, Dropdown, Image, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";

const Navbar = () => {
  const { active, account, activate, deactivate } = useWeb3React();

  function createConnectHandler() {
    return async () => {
      try {
        await activate(connector);
      } catch (error) {
        console.error(error);
      }
    };
  }

  useEffect(() => {
    getUser();
  }, [active]);

  async function handleDisconnect() {
    try {
      deactivate();
    } catch (error) {
      console.error(error);
    }
  }

  const [user, setUser] = React.useState(null);

  const getUser = () => {
    if (active)
      connector.uauth
        .user()
        .then((user) => {
          console.log(user);
          setUser(user);
        })
        .catch(console.log);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Menu fixed="top" inverted>
      <Container
        style={
          !active
            ? {
                pointerEvents: "none",
              }
            : {}
        }
      >
        <Link to="/" className="item header">
          <Image size="tiny" src="/logo.svg" style={{ marginRight: "1.5em" }} />
          PolyMint
        </Link>
        <Link to="/" className="item">
          Home
        </Link>
        <Link to="/nfts" className="item">
          Your NFT Contracts
        </Link>
      </Container>
      {active && user ? (
        <Menu.Item>
          <Dropdown text={user.sub}>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleDisconnect}>Sign out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      ) : (
        <Image
          as="a"
          className="right item"
          src={UnstoppableIcon}
          onClick={createConnectHandler()}
        />
      )}
    </Menu>
  );
};

export default Navbar;

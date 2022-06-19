import React from "react"

export const Web3Context = React.createContext({
    web3: null,
    setWeb3: (web3) => {},
})
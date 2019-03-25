/*
 * Module for interaction of LeadCoin from MetaMask.
 */

"use strict"

const Web3 = require("web3")

const web3js = new Web3()
const token = "0x5102791ca02fc3595398400bfe0e33d7b6c82267"
//LeadCoin "0x5102791ca02fc3595398400bfe0e33d7b6c82267"
//SimpleToken "0x9d397e179642172c337378504fa273573d603623"
const decimals = 18
const abi = [
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
]
const metamask = {}

const isProvider = () => {
  return new Promise((resolve, reject) => {
    if (
      typeof web3js.currentProvider !== "undefined" &&
      web3js.currentProvider.isMetaMask === true
    ) {
      return resolve("MetaMask is provider")
    }
    return reject(new Error("MetaMask is not provider"))
  })
}

const isMainNetwork = () => {
  return new Promise((resolve, reject) => {
    web3js.version.getNetwork((err, netId) => {
      if (err !== null) {
        return reject(err)
      } else if (netId === "1") {
        // 1 Ethereum // 3 Ropsten
        return resolve("This network is main network")
      }
      return reject(new Error("This network is not main network"))
    })
  })
}

const isEnable = () => {
  return new Promise((resolve, reject) => {
    if (typeof ethereum !== "undefined") {
      return resolve(ethereum.enable())
    }
    return resolve("The browser uses web3")
  })
}

const isLocked = () => {
  return new Promise((resolve, reject) => {
    web3js.eth.getAccounts((err, accounts) => {
      if (err !== null) {
        return reject(err)
      } else if (accounts.length === 0) {
        return reject(new Error("MetaMask is locked"))
      }
      return resolve("MetaMask is unlocked")
    })
  })
}

const defaultAccount = () => {
  return new Promise((resolve, reject) => {
    web3js.eth.defaultAccount = web3js.eth.accounts[0]
    return resolve("Completed")
  })
}

const verifyWallet = () => {
  return isProvider()
    .then(() => isMainNetwork())
    .then(() => isEnable())
    .then(() => isLocked())
    .then(() => defaultAccount())
    .then(() => "Verification is successful")
}

const balance = address => {
  return new Promise((resolve, reject) => {
    let contract = web3js.eth.contract(abi).at(token)
    contract.balanceOf(address, (err, balance) => {
      if (err !== null) {
        return reject(err)
      }
      return resolve(balance.div(10 ** decimals).toNumber())
    })
  })
}

const checkBalance = needBalance => {
  return balance(web3js.eth.defaultAccount).then(balance => {
    if (balance >= needBalance) {
      return "Enough tokens"
    }
    throw new Error("Not enough tokens")
  })
}

const transfer = (to, value) => {
  return new Promise((resolve, reject) => {
    value = +value
    if (typeof value !== "number" && value <= 0) {
      return reject(new Error("value is false"))
    }
    let valueBigNumber = web3js.toBigNumber(value)
    let decimalsBigNumber = decimals
    let calculatedTransferValue = valueBigNumber.times(
      web3js.toBigNumber(10).pow(decimalsBigNumber),
    )
    let contract = web3js.eth.contract(abi).at(token)
    contract.transfer(to, calculatedTransferValue, (err, txHash) => {
      if (err !== null) {
        return reject(err)
      }
      return resolve(txHash)
    })
  })
}

const getTransactionReceipt = txHash => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      web3js.eth.getTransactionReceipt(txHash, (err, receipt) => {
        if (err !== null) {
          return reject(err)
        }
        if (receipt != null) {
          return resolve(receipt)
        }
        return resolve(getTransactionReceipt(txHash))
      })
    }, 10000)
  })
}

const isAddress = address => {
  return new Promise((resolve, reject) => {
    if (!web3js.isAddress(address)) {
      return reject(new Error("address is false"))
    }
    return resolve({ msg: "address is true", success: true })
  })
}

metamask.init = () => {
  return new Promise((resolve, reject) => {
    window.addEventListener("load", () => {
      if (typeof ethereum !== "undefined") {
        web3js.setProvider(ethereum)
        return resolve("Initialization completed")
      } else if (typeof web3 !== "undefined") {
        web3js.setProvider(web3.currentProvider)
        return resolve("Initialization completed")
      }
      return reject(new Error("web3 and ethereum is not defined"))
    })
  })
}

metamask.verify = () => {
  return isProvider()
    .then(() => isMainNetwork())
    .then(() => "Verification is successful")
}

metamask.isAddress = isAddress

metamask.transfer = (to, value) => {
  return verifyWallet()
    .then(() => isAddress(to))
    .then(() => checkBalance(value))
    .then(() => transfer(to, value))
}

metamask.checkTxHash = txHash => {
  return new Promise((resolve, reject) => {
    if (typeof txHash !== "string") {
      return reject("txHash is false")
    }
    return resolve("txHash is true")
  })
    .then(() => getTransactionReceipt(txHash))
    .then(receipt => {
      if (receipt.status === "0x1") {
        return "Transaction succeeded"
      }
      throw new Error("Transaction failure")
    })
}

metamask.getBalance = address => {
  return balance(address)
}

export { metamask }

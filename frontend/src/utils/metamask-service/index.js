/*
 * Module for interaction of LeadCoin from MetaMask.
 */

"use strict"

const Web3 = require("web3")

const web3js = new Web3()
const address = "0x9d397e179642172c337378504fa273573d603623" //LeadCoin "0x5102791ca02fc3595398400bfe0e33d7b6c82267"
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
]
const metamask = {}

// window.metamask.js = metamask.js;

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
      } else if (netId === "3") {
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

const verifyWallet = async () => {
  let verify = []
  verify.push(await isProvider())
  verify.push(await isMainNetwork())
  verify.push(await isEnable())
  verify.push(await isLocked())
  return Promise.all(verify).then(() => "Wallet verification is successful")
}

const transfer = (to, value) => {
  return new Promise((resolve, reject) => {
    value = +value
    if (!web3js.isAddress(to)) {
      return reject(new Error("to is false"))
    }
    if (typeof value !== "number" && value <= 0) {
      return reject(new Error("value is false"))
    }
    if (typeof web3js.eth.defaultAccount === "undefined") {
      web3js.eth.defaultAccount = web3js.eth.accounts[0]
    }
    let valueBigNumber = web3js.toBigNumber(value)
    let decimalBigNumber = decimals
    let calculatedTransferValue = valueBigNumber.times(
      web3js.toBigNumber(10).pow(decimalBigNumber),
    )
    let contract = web3js.eth.contract(abi).at(address)
    contract.transfer(to, calculatedTransferValue, (err, txHash) => {
      if (err !== null) {
        return reject(err)
      }
      return resolve(txHash)
    })
  })
}

const getTransactionReceipt = txHash => {
  return new Promise(function(resolve, reject) {
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

metamask.verify = async () => {
  let verify = []
  verify.push(await isProvider())
  verify.push(await isMainNetwork())
  return Promise.all(verify).then(() => ({
    success: true,
    message: "Verification is successful",
  }))
}

metamask.isAddress = address => {
  return new Promise((resolve, reject) => {
    if (!web3js.isAddress(address)) {
      return reject(new Error("address is false"))
    }
    return resolve("address is true")
  })
}

metamask.transfer = (to, value) => {
  return verifyWallet().then(() => transfer(to, value))
}

metamask.checkTxHash = txHash => {
  return new Promise(function(resolve, reject) {
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

export { metamask }

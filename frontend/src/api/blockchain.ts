export default class BlockchainApi {
  constructor(private request) {}
  async logTransaction({
    fiat_amount,
    exchange_rate,
    leads_count,
    destination,
  }) {
    const res = await this.request({
      url: "http://blockchain.leadcoin.network/exchange",
      method: "POST",
      json: {
        fiat_amount,
        exchange_rate,
        leads_count,
        destination:
          destination || "0xca35b7d915458ef540ade6068dfe2f44e8fa733c",
      },
    })
    console.log(res)
    //{ txid: '0x9d6cd285dd8ac7bde247da8943ca2b536f58d7cac79deac975ba48766901eb68',
    //  link: 'http://ropsten.etherscan.io/tx/0x9d6cd285dd8ac7bde247da8943ca2b536f58d7cac79deac975ba48766901eb68' }
  }
}

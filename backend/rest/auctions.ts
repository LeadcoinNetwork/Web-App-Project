import * as passport from "passport"
import * as Express from "express"
import AppLogic from "../app-logic/index"
import { Industry } from "@/models/leads/types"

const authOptions = {
  session: false,
}

export function start({
  appLogic,
  expressApp,
}: {
  appLogic: AppLogic
  expressApp: Express.Express
}) {
  expressApp
    .route("/auctions")
    .all(passport.authenticate("jwt", authOptions))
    .get(GetAuctionsAndLead)
    .post(AddAuction)

  expressApp
    .route("/auctions/:id/bets/")
    .all(passport.authenticate("jwt", authOptions))
    .post(AddBet)

  function AddAuction(req, res, nex) {
    const { leadId, endDate } = req.body
    const { user } = req
    appLogic.auctions
      .addAuction({ leadId, endDate, userId: user.id })
      .then(auction => {
        res.json(auction)
      })
      .catch(err => {
        res.status(400).send({ error: err.message })
      })
  }

  function GetAuctionsAndLead(req, res, nex) {
    const { sortBy, page, limit, sortOrder } = req.query
    const {
      industry,
      search,
      searchIn,
      favorites,
    }: {
      industry: Industry
      search: string
      searchIn: string
      favorites: string
    } =
      req.query.filter || []

    const { user } = req
    let _sort = {
      sortBy: sortBy && sortBy != "id" ? sortBy : "date",
      sortOrder: sortOrder || "DESC",
    }
    let filters = { search: null, industry: null, favorites: null }

    if (favorites === "true") filters.favorites = user.favorites || []

    if (favorites === "true" && filters.favorites.length === 0) {
      let jsonResponse = { ...req.query, list: [], total: 0 }
      res.json(jsonResponse)
      return
    }

    if (search) {
      const allSearchFields = [
        "content_updates",
        "comments",
        "functionality[]",
        "languages[]",
      ]
      const searchFields =
        allSearchFields.indexOf(searchIn) === -1 ? allSearchFields : [searchIn]

      filters.search = searchFields.map(field => {
        return {
          field,
          op: "LIKE",
          val: search,
        }
      })
    }

    filters.industry = industry === "All" || !industry ? "" : industry

    let _limit = {
      start: parseInt(page || 0) * parseInt(limit || 50),
      offset: limit || 50,
    }
    appLogic.auctions
      .getAuctionsAndLead({
        sort: _sort,
        filters,
        limit: _limit,
        userId: user.id,
      })
      .then(async response => {
        let jsonResponse = Object.assign(response, req.query)
        jsonResponse.list = appLogic.auctions.addIsFavoriteTotAuctionsAndLead(
          jsonResponse.list,
          user.favorites || [],
        )

        res.json(jsonResponse)
      })
      .catch(err => {
        res.status(400)
        res.send({ error: err.message })
      })
  }

  function AddBet(req, res, nex) {
    let auctionId = req.params.id
    let { price } = req.body
    let { user } = req
    appLogic.bets
      .addBet({ auctionId, price, userId: user.id })
      .then(bet => {
        res.json(bet)
      })
      .catch(err => {
        res.status(400).send({ error: err.message })
      })
  }
}

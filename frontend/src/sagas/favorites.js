import React from "react"
import { types } from "Actions"
import * as actions from "Actions"
import { select, take, put, all, call } from "redux-saga/effects"
import { toast } from "react-toastify"
import API from "../api/index"

/**
 * @param api {API} - this is this paramters
 */

export default function* favoritesAdd(api) {
  while (true) {
    yield take(types.FAVORITES_ADD_START)
    let { selected, list } = yield select(state => state.buyLeads)
    let selectedLeads = list.filter(lead => selected.has(lead.id))
    var req = yield api.leads.favoritesAdd({
      favorites: selectedLeads.map(lead => lead.id),
    })
    window.triggerFetch()
    if (!req.error) {
      toast("Favorites added", {
        type: "success",
        closeOnClick: true,
      })
      yield put(actions.favorites.favoritesAddSuccess)
    } else {
      toast("Favorites add error", {
        type: "error",
        closeOnClick: true,
      })
      yield put(actions.favorites.favoritesAddError(req.error))
    }
  }
}

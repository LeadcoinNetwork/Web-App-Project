import React from "react"
import { types } from "Actions"
import * as actions from "Actions"
import { select, take, put, all, call } from "redux-saga/effects"
import { toast } from "react-toastify"
import API from "../api/index"

/**
 * @param api {API} - this is this paramters
 */

export default function* favoritesRemove(api) {
  while (true) {
    yield take(types.FAVORITES_REMOVE_START)
    let { selected, list } = yield select(state => state.buyLeads)
    let selectedLeads = list.filter(lead => selected.has(lead.id))
    var req = yield api.leads.favoritesRemove({
      favorites: selectedLeads.map(lead => lead.id),
    })
    window.triggerFetch()
    if (!req.error) {
      toast("Favorites removed", {
        type: "success",
        closeOnClick: true,
      })
      yield put(actions.favorites.favoritesRemoveSuccess)
    } else {
      toast("Favorites remove error", {
        type: "error",
        closeOnClick: true,
      })
      yield put(actions.favorites.favoritesRemoveError(req.error))
    }
  }
}

import * as types from "./types"

export function updateUserBalance(total, inEscrow) {
  return {
    type: types.UPDATE_USER_BALANCE,
    payload: {
      total,
      inEscrow,
    },
  }
}

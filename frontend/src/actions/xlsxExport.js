import types from "./types"

export default {
  exportIds(leadIds) {
    return {
      type: types.XLSX_EXPORT_IDS,
      leadIds,
    }
  },

  importFile(file) {
    return {
      type: types.XLSX_IMPORT_FILE,
      file,
    }
  },
}

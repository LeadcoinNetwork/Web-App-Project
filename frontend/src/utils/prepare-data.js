import fields from "../reducers/fields-data"

export const prepareLeadDataForDisplay = data => {
  data.list = data.list.map(value => ({
    ...value,
    languages: value.languages.join(", "),
    functionality: value.functionality.join(", "),
  }))
  return data
}

export const prepareLeadDataForSend = data => {
  let obj = Object.assign({}, data)
  fields.forEach(field => {
    obj[field.key] =
      field.type === "select"
        ? obj[field.key].label
        : field.type === "multiselect"
          ? obj[field.key].map(r => r.label)
          : obj[field.key]
  })
  obj.industry = "Website building"
  return obj
}

export const filterFields = lead => {
  let obj = {}
  fields.filter(field => field.editable).forEach(f => {
    obj[f.key] =
      f.type === "input"
        ? lead[f.key]
        : f.type === "select"
          ? { value: lead[f.key], label: lead[f.key] }
          : lead[f.key].map(r => ({ type: f.key, value: r, label: r }))
  })
  return obj
}

export const totalLeadsPrice = leads =>
  leads.reduce((price, lead) => price + lead.lead_price, 0)

export const parseFieldsMap = fields_map => {
  let obj = {}

  fields.forEach(x => {
    if (x.name === fields_map[x.name]) {
      obj[x.key] = fields_map[x.name]
    }
  })

  return obj
}

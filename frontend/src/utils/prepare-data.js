import fields from "../reducers/fields-data"

export const prepareData = data => {
  data.list = data.list.map(value => ({
    ...value,
    languages: value.languages.join(", "),
    functionality: value.functionality.join(", "),
  }))
  return data
}

export const preparedLeadData = data => {
  data = fields.reduce((values, field) => {
    data[field.key] =
      field.type === "select"
        ? data[field.key].label
        : field.type === "multiselect"
          ? data[field.key].map(r => r.label)
          : data[field.key]
    return data
  }, {})

  return data
}

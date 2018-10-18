import statesData from "./states-data"

//filter 0 should always be the relevent industry categories with name: "Category", type: "select"
export const RealEstateFilters = [
  {
    name: "Category",
    type: "select",
    options: ["Buy", "Sell", "Looking to rent", "Properties for rent"],
    value: "",
  },
  {
    name: "State",
    type: "select",
    options: statesData,
    value: "",
  },
  {
    name: "Price",
    type: "range",
    inputType: "number",
    min: "",
    max: "",
  },
  {
    name: "Size",
    type: "range",
    inputType: "number",
    min: "",
    max: "",
  },
  {
    name: "Housing Type",
    type: "select",
    options: [
      "Building",
      "House",
      "Apartment",
      "Flat",
      "Condo",
      "Duplex",
      "Townhouse",
      "Cottage",
      "Rooftop",
      "Penthouse",
      "Manufactured",
      "Studio",
      "Gallery",
      "Farm",
      "Office",
      "Warehouse",
      "Land",
    ],
    value: "",
  },
  {
    name: "Date",
    type: "date",
    from: "",
    to: "",
  },
]

export const DesignFilters = [
  {
    name: "Category",
    type: "select",
    options: ["Order", "Offer"],
    value: "",
  },
  {
    name: "State",
    type: "select",
    options: statesData,
    value: "",
  },
  {
    name: "Price",
    type: "range",
    inputType: "number",
    min: "",
    max: "",
  },
  {
    name: "Date",
    type: "date",
    from: "",
    to: "",
  },
]

import React from "react"
import Select from "../Select"
import TextField from "../TextField"

const Filter = ({ index, filter, filters, handleFilter }) => (
  <div className="filter">
    {filter.type === "select" && (
      <Select
        value={filters[index].value}
        onChange={e => {
          filters[index].value = e.target.value
          handleFilter(filters)
        }}
      >
        {
          <option key="0" vlaue="">
            {"Choose " + filter.name}
          </option>
        }
        {filter.options.map((option, index) => (
          <option key={index + 1} value={option}>
            {option}
          </option>
        ))}
      </Select>
    )}
    {filter.type === "range" && (
      <>
        <TextField
          value={filters[index].min}
          appStyle
          placeholder={"Min " + filter.name}
          type={filter.inputType || "text"}
          onChange={e => {
            filters[index].min = e.target.value
            handleFilter(filters)
          }}
        />
        <TextField
          value={filters[index].max}
          appStyle
          placeholder={"Max " + filter.name}
          type={filter.inputType || "text"}
          onChange={e => {
            filters[index].max = e.target.value
            handleFilter(filters)
          }}
        />
      </>
    )}
    {filter.type === "date" && (
      <>
        <TextField
          appStyle
          placeholder="From"
          value={filters[index].from}
          type="date"
          onChange={e => {
            filters[index].from = e.target.value
            handleFilter(filters)
          }}
        />
        <TextField
          appStyle
          placeholder="To"
          value={filters[index].to}
          type="date"
          onChange={e => {
            filters[index].to = e.target.value
            handleFilter(filters)
          }}
        />
      </>
    )}
  </div>
)

export default Filter

import React from "react"
import Select from "../Select"
import TextField from "../TextField"

const Filter = ({ index, filter, filters, handleFilter }) => (
  <div className="filter">
    {filter.type === "select" && (
      <Select
        value={filters[index].value}
        onChange={e =>
          handleFilter({
            ...filters,
            [index]: {
              ...filters[index],
              value: e.target.value,
            },
          })
        }
      >
        {<option vlaue="All">{"Choose " + filter.name}</option>}
        {filter.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Select>
    )}
    {filter.type === "range" && (
      <>
        <TextField
          appStyle
          placeholder={"Min " + filter.name}
          onChange={e =>
            handleFilter({
              ...filters,
              [index]: {
                ...filters[index],
                min: e.target.value,
              },
            })
          }
        />
        <TextField
          appStyle
          placeholder={"Max " + filter.name}
          onChange={e =>
            handleFilter({
              ...filters,
              [index]: {
                ...filters[index],
                max: e.target.value,
              },
            })
          }
        />
      </>
    )}
    {/* {filter.type === "date" &&
      <>
        <TextField appStyle value={filters[index].from} type="date" />
        <TextField appStyle value={filters[index].to} type="date" />
      </>
    } */}
  </div>
)

export default Filter

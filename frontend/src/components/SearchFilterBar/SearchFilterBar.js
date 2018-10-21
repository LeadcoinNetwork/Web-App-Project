import React from "react"
import IndustryFilters from "../../components/IndustryFilters"
import IndustrySelector from "../../components/IndustrySelector"
import Select from "../../components/Select"
import TextField from "../../components/TextField"
import Button from "../../components/Button"
import t from "../../utils/translate/translate"

const SearchFilterBar = ({
  className,
  filter,
  handleFilter,
  clearList,
  searchClicked,
  fetchLeads,
  expandFiltersClick,
  expandIndustryFilters,
  industryUpdate,
}) => {
  const categoryFilter = filter.industryFilters
    ? filter.industryFilters.filter(f => f.name === "Category")[0]
    : undefined
  return (
    <div className={`search-filter-bar${className ? " " + className : ""}`}>
      <IndustrySelector
        industry={filter.industry}
        industryUpdate={industryUpdate}
      />
      {filter.industry && (
        <>
          {categoryFilter && (
            <Select
              className="category"
              value={categoryFilter.value}
              onChange={e => {
                const industryFilters = filter.industryFilters.map(f => {
                  if (f.name === "Category") {
                    f.value = e.target.value
                  }
                  return f
                })
                handleFilter({
                  ...filter,
                  industryFilters,
                })
              }}
            >
              {
                <option key="0" value="">
                  {"Choose " + categoryFilter.name}
                </option>
              }
              {categoryFilter.options.map((option, index) => (
                <option key={index + 1} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          )}
          <TextField
            appStyle
            className="search_bar"
            placeholder={t("Search...")}
            value={filter.search}
            onChange={e => {
              handleFilter({
                ...filter,
                search: e.target.value,
              })
            }}
          />
          <IndustryFilters
            filters={filter.industryFilters}
            expand={expandIndustryFilters}
            onExpandClick={expandFiltersClick}
            handleFilter={industryFilters => {
              filter.industryFilters = industryFilters
              handleFilter(filter)
            }}
          />
          <div className="search-button-wrapper">
            <Button
              className="search"
              onClick={() => {
                clearList()
                searchClicked()
                fetchLeads()
              }}
              appStyle={true}
              disabled={!filter.industry}
            >
              {t("Search")}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default SearchFilterBar

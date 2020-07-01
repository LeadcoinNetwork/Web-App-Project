import React from "react"
import {
  List,
  Datagrid,
  NumberField,
  DateField,
  NumberInput,
  Filter,
} from "react-admin"

const BetFilter = props => (
  <Filter {...props}>
    <NumberInput source="id" />
    <NumberInput source="price" />
    <NumberInput source="userId" />
    <NumberInput source="auctionId" />
  </Filter>
)

export const BetList = props => (
  <List {...props} bulkActionButtons={false} filters={<BetFilter />}>
    <Datagrid>
      <NumberField source="id" />
      <NumberField source="price" />
      <NumberField source="userId" />
      <NumberField source="auctionId" />
      <DateField source="date" showTime />
    </Datagrid>
  </List>
)

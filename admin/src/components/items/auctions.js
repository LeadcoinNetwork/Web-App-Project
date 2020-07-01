import React from "react"
import {
  List,
  Datagrid,
  BooleanInput,
  NumberField,
  BooleanField,
  DateField,
  Filter,
  NumberInput,
} from "react-admin"

const AuctionFilter = props => (
  <Filter {...props}>
    <NumberInput source="id" />
    <NumberInput source="leadId" />
    <NumberInput source="creatorId" />
    <NumberInput source="startPrice" />
    {/*<BooleanInput source='isClosed'/>*/}
  </Filter>
)

export const AuctionList = props => (
  <List {...props} bulkActionButtons={false} filters={<AuctionFilter />}>
    <Datagrid>
      <NumberField source="id" />
      <NumberField source="leadId" />
      <NumberField source="creatorId" />
      <NumberField source="startPrice" />
      <DateField source="startDate" showTime />
      <DateField source="endDate" showTime />
      <BooleanField source="isClosed" />
    </Datagrid>
  </List>
)

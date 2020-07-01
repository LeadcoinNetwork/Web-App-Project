import React from "react"
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  Filter,
  NumberInput,
  TextInput,
} from "react-admin"

const TransactionFilter = props => (
  <Filter {...props}>
    <NumberInput source="id" />
    <NumberInput source="from" />
    <NumberInput source="to" />
    <NumberInput source="value" />
    <TextInput source="txHash" />
  </Filter>
)

export const TransactionList = props => (
  <List {...props} bulkActionButtons={false} filters={<TransactionFilter />}>
    <Datagrid>
      <NumberField source="id" />
      <NumberField source="from" />
      <NumberField source="to" />
      <NumberField source="value" />
      <TextField source="txHash" />
      <DateField source="date" showTime />
    </Datagrid>
  </List>
)

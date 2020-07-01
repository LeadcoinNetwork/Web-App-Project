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

const ReviewFilter = props => (
  <Filter {...props}>
    <NumberInput source="id" />
    <NumberInput source="toUserId" />
    <NumberInput source="fromUserId" />
    <NumberInput source="rating" />
    <TextInput source="comment" />
  </Filter>
)

export const ReviewList = props => (
  <List {...props} bulkActionButtons={false} filters={<ReviewFilter />}>
    <Datagrid>
      <NumberField source="id" />
      <NumberField source="toUserId" />
      <NumberField source="fromUserId" />
      <NumberField source="rating" />
      <TextField source="comment" />
      <DateField source="date" showTime />
    </Datagrid>
  </List>
)

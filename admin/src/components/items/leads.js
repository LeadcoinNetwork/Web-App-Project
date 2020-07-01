import React from "react"
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  DateField,
  Filter,
  NumberInput,
  TextInput,
  EmailField,
  BooleanInput,
  SelectInput,
} from "react-admin"

const yesNo = [{ id: "Yes" }, { id: "No" }]
const industries = [
  { id: "Website building" },
  { id: "Crypto" },
  { id: "Insurance" },
  { id: "Loans" },
]
const contentUpdates = [{ id: "Mostly Static" }, { id: "Dynamic" }]

const LeadFilter = props => (
  <Filter {...props}>
    <NumberInput source="id" />
    <NumberInput source="ownerId" />
    <TextInput source="telephone" />
    <TextInput source="email" />
    <NumberInput source="bought_from" />
    <SelectInput source="industry" choices={industries} optionText="id" />
    <SelectInput
      source="content_updates"
      choices={contentUpdates}
      optionText="id"
    />
    <TextInput source="content_updates" />
    <NumberInput source="budget" />
    <SelectInput source="mobile_design" choices={yesNo} optionText="id" />
    <SelectInput source="seo" choices={yesNo} optionText="id" />
    <SelectInput source="e_commerce" choices={yesNo} optionText="id" />
    <SelectInput source="content_management" choices={yesNo} optionText="id" />
    <SelectInput source="blog" choices={yesNo} optionText="id" />
    <SelectInput source="hosting" choices={yesNo} optionText="id" />
    <TextInput source="comments" />
    {/*<BooleanInput source='favorite'/>*/}
    {/*<BooleanInput source='active'/>*/}
    {/*<BooleanInput source='forSale'/>*/}
    {/*<BooleanInput source='isReview'/>*/}
  </Filter>
)

export const LeadList = props => (
  <List {...props} bulkActionButtons={false} filters={<LeadFilter />}>
    <Datagrid>
      <NumberField source="id" />
      <NumberField source="ownerId" />
      <TextField source="telephone" />
      <EmailField source="email" />
      <TextField source="bought_from" />
      <TextField source="industry" />
      <TextField source="content_updates" />
      <TextField source="functionality" />
      <TextField source="mobile_design" />
      <TextField source="seo" />
      <TextField source="content_management" />
      <TextField source="e_commerce" />
      <TextField source="blog" />
      <TextField source="languages" />
      <NumberField source="budget" />
      <TextField source="hosting" />
      <TextField source="comments" />
      <BooleanField source="favorite" />
      <BooleanField source="active" />
      <BooleanField source="forSale" />
      <BooleanField source="isReview" />
      <DateField source="date" />
    </Datagrid>
  </List>
)

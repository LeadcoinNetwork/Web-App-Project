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
  EmailField,
  BooleanField,
  BooleanInput,
  Edit,
  SimpleForm,
  EditButton,
  SelectInput,
} from "react-admin"

const roles = [{ id: "user" }, { id: "admin" }]

const UserFilter = props => (
  <Filter {...props}>
    <NumberInput source="id" />
    <TextInput source="fname" />
    <TextInput source="lname" />
    <TextInput source="email" />
    <NumberInput source="balance" />
    <NumberInput source="rating" />
    <NumberInput source="numberReviews" />
    <TextInput source="country" />
    <TextInput source="phone" />
    <TextInput source="company" />
    <TextInput source="wallet" />
    <TextInput source="role" />
    {/*<BooleanInput source='getNotifications'/>*/}
    {/*<BooleanInput source='getEmails'/>*/}
  </Filter>
)

export const UserList = props => (
  <List {...props} bulkActionButtons={false} filters={<UserFilter />}>
    <Datagrid>
      <NumberField source="id" />
      <TextField source="fname" />
      <TextField source="lname" />
      <EmailField source="email" />
      <NumberField source="balance" />
      <NumberField source="rating" />
      <NumberField source="numberReviews" />
      <TextField source="country" />
      <TextField source="phone" />
      <TextField source="company" />
      <TextField source="wallet" />
      <BooleanField source="getNotifications" />
      <BooleanField source="getEmails" />
      <TextField source="favorites" />
      <TextField source="role" />
      <DateField source="created" />
      <EditButton />
    </Datagrid>
  </List>
)

export const UserEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <NumberInput source="id" disabled />
      <TextInput source="fname" disabled />
      <TextInput source="lname" disabled />
      <SelectInput source="role" choices={roles} optionText="id" />
    </SimpleForm>
  </Edit>
)

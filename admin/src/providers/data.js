import simpleRestProvider from "ra-data-simple-rest"
const apiUrl = "/api/admin"

const dataProvider = simpleRestProvider(apiUrl)

export default dataProvider

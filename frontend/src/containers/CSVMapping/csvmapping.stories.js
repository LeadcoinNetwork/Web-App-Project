import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"
import CSVMapping from "../CSVMapping"

storiesOf("Containers/CSVMapping")

  .add("CSVMapping - empty", () => {
    var { store, story } = createStoreAndStory({
      component: CSVMapping,
    })
    return story
  })

  .add("CSVMapping - with fields from db", () => {
    var { store, story } = createStoreAndStory({
      component: CSVMapping,
    })
    store.dispatch(actions.csvMapping.csvMappingFormChange('batch_id','666'))
    store.dispatch(actions.csvMapping.csvMappingGetFileFields([
      "date", "name", "phone", "email", "state",
      "city", "property type", "size", "budget",
      "bedrooms", "floor", "specification"
    ]))
    store.dispatch(actions.csvMapping.csvMappingGetDbFields([
      "date", "name", "phone", "email", "state",
      "city", "property type", "size", "budget",
      "bedrooms", "floor", "specification"
    ]))
    return story
  })

  .add("CSVMapping - price error", () => {
    var { store, story } = createStoreAndStory({
      component: CSVMapping,
    })
    store.dispatch(actions.csvMapping.csvMappingFormChange('batch_id','666'))
    store.dispatch(actions.csvMapping.csvMappingGetFileFields([
      "date", "name", "phone", "email", "state",
      "city", "property type", "size", "budget",
      "bedrooms", "floor", "specification"
    ]))
    store.dispatch(actions.csvMapping.csvMappingGetDbFields([
      "date", "name", "phone", "email", "state",
      "city", "property type", "size", "budget",
      "bedrooms", "floor", "specification"
    ]))
    store.dispatch(actions.csvMapping.csvMappingAgreeToTerms(false))
    store.dispatch(actions.csvMapping.csvMappingFormChange('price',""))
    store.dispatch(actions.csvMapping.csvMappingError(['price']))
    return story
  })

  .add("CSVMapping - terms error", () => {
    var { store, story } = createStoreAndStory({
      component: CSVMapping,
    })
    store.dispatch(actions.csvMapping.csvMappingFormChange('batch_id','666'))
    store.dispatch(actions.csvMapping.csvMappingGetFileFields([
      "date", "name", "phone", "email", "state",
      "city", "property type", "size", "budget",
      "bedrooms", "floor", "specification"
    ]))
    store.dispatch(actions.csvMapping.csvMappingGetDbFields([
      "date", "name", "phone", "email", "state",
      "city", "property type", "size", "budget",
      "bedrooms", "floor", "specification"
    ]))
    store.dispatch(actions.csvMapping.csvMappingAgreeToTerms(false))
    store.dispatch(actions.csvMapping.csvMappingFormChange('price',""))
    store.dispatch(actions.csvMapping.csvMappingError(['agree_to_terms']))
    return story
  })

  .add("CSVMapping - multiple errors", () => {
    var { store, story } = createStoreAndStory({
      component: CSVMapping,
    })
    store.dispatch(actions.csvMapping.csvMappingFormChange('batch_id','666'))
    store.dispatch(actions.csvMapping.csvMappingGetFileFields([
      "date", "name", "phone", "email", "state",
      "city", "property type", "size", "budget",
      "bedrooms", "floor", "specification"
    ]))
    store.dispatch(actions.csvMapping.csvMappingGetDbFields([
      "date", "name", "phone", "email", "state",
      "city", "property type", "size", "budget",
      "bedrooms", "floor", "specification"
    ]))
    store.dispatch(actions.csvMapping.csvMappingAgreeToTerms(false))
    store.dispatch(actions.csvMapping.csvMappingFormChange('price',""))
    store.dispatch(actions.csvMapping.csvMappingError(['agree_to_terms', 'price']))
    return story
  })
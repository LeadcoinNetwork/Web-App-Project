import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/createStoreAndStory"

storiesOf("Containers/CSVMapping", module)
  .add("CSVMapping - empty", () => {
    var { store, story } = createStoreAndStory({
      path: "/csv-mapping",
      loggedIn: true,
    })
    store.dispatch(actions.csvMapping.csvMappingFormChange("batch_id", null))
    return story
  })

  .add("CSVMapping - with fields from db", () => {
    var { store, story } = createStoreAndStory({
      path: "/csv-mapping",
      loggedIn: true,
    })
    store.dispatch(actions.csvMapping.csvMappingFormChange("batch_id", "666"))
    store.dispatch(
      actions.csvMapping.csvMappingGetFileFields([
        "date",
        "name",
        "phone",
        "state",
        "location",
        "housing_type",
        "size",
        "price",
        "bedrooms_baths",
        "description",
      ]),
    )
    let mock_fields = {
      private: ["name", "phone"],
      public: ["housing_type", "size"],
    }
    store.dispatch(actions.csvMapping.csvMappingGetDbFields(mock_fields))
    return story
  })

  .add("CSVMapping - price error", () => {
    var { store, story } = createStoreAndStory({
      path: "/csv-mapping",
      loggedIn: true,
    })
    store.dispatch(actions.csvMapping.csvMappingFormChange("batch_id", "666"))
    store.dispatch(
      actions.csvMapping.csvMappingGetFileFields([
        "date",
        "name",
        "phone",
        "state",
        "location",
        "housing_type",
        "size",
        "price",
        "bedrooms_baths",
        "description",
      ]),
    )
    let mock_fields = {
      private: ["name", "phone"],
      public: ["housing_type", "size"],
    }
    store.dispatch(actions.csvMapping.csvMappingGetDbFields(mock_fields))
    store.dispatch(actions.csvMapping.csvMappingAgreeToTerms(false))
    store.dispatch(actions.csvMapping.csvMappingFormChange("price", ""))
    store.dispatch(actions.csvMapping.csvMappingError(["price"]))
    return story
  })

  .add("CSVMapping - terms error", () => {
    var { store, story } = createStoreAndStory({
      path: "/csv-mapping",
      loggedIn: true,
    })
    store.dispatch(actions.csvMapping.csvMappingFormChange("batch_id", "666"))
    store.dispatch(
      actions.csvMapping.csvMappingGetFileFields([
        "date",
        "name",
        "phone",
        "state",
        "location",
        "housing_type",
        "size",
        "price",
        "bedrooms_baths",
        "description",
      ]),
    )
    let mock_fields = {
      private: ["name", "phone"],
      public: ["housing_type", "size"],
    }
    store.dispatch(actions.csvMapping.csvMappingGetDbFields(mock_fields))
    store.dispatch(actions.csvMapping.csvMappingAgreeToTerms(false))
    store.dispatch(actions.csvMapping.csvMappingFormChange("price", ""))
    store.dispatch(actions.csvMapping.csvMappingError(["agree_to_terms"]))
    return story
  })

  .add("CSVMapping - multiple errors", () => {
    var { store, story } = createStoreAndStory({
      path: "/csv-mapping",
      loggedIn: true,
    })
    store.dispatch(actions.csvMapping.csvMappingFormChange("batch_id", "666"))
    store.dispatch(
      actions.csvMapping.csvMappingGetFileFields([
        "date",
        "name",
        "phone",
        "state",
        "location",
        "housing_type",
        "size",
        "price",
        "bedrooms_baths",
        "description",
      ]),
    )
    let mock_fields = {
      private: ["name", "phone"],
      public: ["housing_type", "size"],
    }
    store.dispatch(actions.csvMapping.csvMappingGetDbFields(mock_fields))
    store.dispatch(actions.csvMapping.csvMappingAgreeToTerms(false))
    store.dispatch(actions.csvMapping.csvMappingFormChange("price", ""))
    store.dispatch(
      actions.csvMapping.csvMappingError(["agree_to_terms", "price"]),
    )
    return story
  })

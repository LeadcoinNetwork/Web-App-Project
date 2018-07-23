import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/createStoreAndStory"
import CSVUpload from "../CSVUpload"

storiesOf("Containers/CSVUpload", module)
  .add("CSVUpload - empty", () => {
    var { store, story } = createStoreAndStory({
      path: "/csv-upload",
      loggedIn: true,
    })
    return story
  })

  .add("CSVUpload - file picked", () => {
    var { store, story } = createStoreAndStory({
      path: "/csv-upload",
      loggedIn: true,
    })
    const mock_file = {
      name: "BestFileEver.csv",
    }
    store.dispatch(actions.csvUpload.csvUploadPickFile(mock_file))
    return story
  })

  .add("CSVUpload - loading", () => {
    var { store, story } = createStoreAndStory({
      path: "/csv-upload",
      loggedIn: true,
    })
    store.dispatch(actions.csvUpload.csvUploadLoadingStart())
    return story
  })

  .add("CSVUpload - error", () => {
    var { store, story } = createStoreAndStory({
      path: "/csv-upload",
      loggedIn: true,
    })
    store.dispatch(actions.csvUpload.csvUploadError("Error!"))
    return story
  })

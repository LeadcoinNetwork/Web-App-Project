import * as _ from "lodash"
import translateDatabase from "./translate-database"
const storage = window.localStorage

if (!storage.getItem("current")) {
  storage.setItem("current", "en")
}
/**
 * This function gets text for translation
 * and returns the translated text per the current language.
 * Returns random text when no translation is avalible.
 *
 * E.g. use
 *
 * <div>{t("Hello")}</div>
 *
 * Will display a verification symbol before the text to verify text in db,
 * only if localStorage holds a 'translate-verify' key.
 *
 * @return String
 */
export default function t(textToTransalte) {
  const current = storage.getItem("current")
  const value = _.get(translateDatabase, [textToTransalte, current])
  if (value || value === "") {
    return storage.getItem("translate-verify") ? "☑" + value : value
  } else {
    return storage.getItem("translate-verify")
      ? "☒" + textToTransalte
      : textToTransalte
  }
}

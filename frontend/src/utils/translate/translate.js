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
 * @return String
 */
export default function t(textToTransalte) {
  const current = storage.getItem("current")
  const value = _.get(translateDatabase, [textToTransalte, current])
  if (value || value === "") {
    return value
  } else {
    return textToTransalte
  }
}
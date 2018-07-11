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
  if (value) {
    return value
  } else if (current !== "en" && current !== "he") {
    return getRandom(current, textToTransalte)
  } else {
    return textToTransalte
  }
}

function getRandom(language, original) {
  const randomSource = {
    zh:
      "你好吗 喂 請問 这是什么 在哪里 别管我 常来    这儿吗 我不知道 是的 当 懈 关 所以 一個 找到 回家",
    ja:
      "いですよ どうたして  すみせん どうぞ   それは何ですか まずいです いただきます 英語 危ない 質問 どこ",
    ko:
      "풀, 잔 살 고기 알 보다 떨어지 빨 씻다 매 별 부드럽 안녕하세요 맥주/소 잘 모르겠네 얼마에 교환해 주세",
  }
  let str = ""
  for (let i = 0; i < original.length; i++) {
    str += randomSource[language][parseInt(Math.random() * randomSource[language].length)]
  }
  return str
}

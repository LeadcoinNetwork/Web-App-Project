import { types } from "../actions"
import fields from "./fields-data"

let initialIndustry = window.localStorage.getItem("industry")

const initialState = () => ({
  db_fields: {
    private: fields[initialIndustry] ? fields[initialIndustry].private : [],
    public: fields[initialIndustry]
      ? fields[initialIndustry].public.filter(
          f =>
            f.key !== "lead_price" && f.key !== "Industry" && f.key !== "date",
        )
      : [],
  },
  file_fields: [],
  fields_map: {},
  errors: [],
  lead_price: "",
  industry: initialIndustry,
  agree_to_terms: false,
})

export default function(state = initialState(), action) {
  switch (action.type) {
    case types.CSV_MAPPING_SUBMIT:
      const { errors, lead_price, agree_to_terms } = state
      if (!lead_price) {
        errors.push("price")
      }
      if (!agree_to_terms) errors.push("agree_to_terms")
      if (errors.length > 0)
        return {
          ...state,
          errors: action.errors,
        }
      else
        return {
          ...state,
          errors: [],
        }
    case types.CSV_MAPPING_ERROR:
      return {
        ...state,
        errors: action.errors,
      }

    case types.CSV_MAPPING_AGREE_TO_TERMS:
      return {
        ...state,
        errors: [],
        agree_to_terms: action.agree_to_terms.value,
      }

    case types.CSV_MAPPING_CLEAR_FORM:
      return initialState()

    case types.CSV_MAPPING_FORM_HANDLE_CHANGE:
      return {
        ...state,
        errors: [],
        [action.payload.name]: action.payload.value,
      }

    case types.CSV_MAPPING_SET_DB_FIELDS:
      return {
        ...state,
        db_fields: action.db_fields,
      }

    case types.CSV_MAPPING_MAP_HANDLE_CHANGE:
      return {
        ...state,
        fields_map: {
          ...state.fields_map,
          [action.map_change.name]: action.map_change.value,
        },
      }

    case types.CSV_MAPPING_SET_FILE_FIELDS:
      return {
        ...state,
        file_fields: action.file_fields,
      }
    case types.INDUSTRY_UPDATE:
      initialIndustry = action.payload
      return {
        ...state,
        db_fields: {
          private: fields[action.payload] ? fields[action.payload].private : [],
          public: fields[action.payload]
            ? fields[action.payload].public.filter(
                f =>
                  f.key !== "lead_price" &&
                  f.key !== "Industry" &&
                  f.key !== "date",
              )
            : [],
        },
        industry: action.payload,
      }
    default:
      return state
  }
}

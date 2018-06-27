import UploadCSV from "./upload-csv"
import UploadForm from "./upload-form"
import UploadLeads from "./leads"
import UserLogin from "./user-login"
import UserLogout from "./user-logout"
import UserRegister from "./user-register"

import EmailCreator from "../models/email-creator/email-creator"
import EmailSender from "../models/emailsender/abstraction"

export interface appModels {
  emailCreator: EmailCreator
  emailSender: EmailSender
}

export interface appLogic {
  uploadCSV: UploadCSV
  uploadForm: UploadForm
  uploadLeads: UploadLeads
  userLogin: UserLogin
  userLogout: UserLogout
  userRegister: UserRegister
}

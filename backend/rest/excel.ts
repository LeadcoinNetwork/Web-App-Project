// external modules
import * as passport from "passport"
import * as Express from "express"
import AppLogic from "../app-logic/index"
const multer = require("multer")
const excel = require("exceljs")
const fs = require("fs")
const { promisify } = require("util")

const unlink = promisify(fs.unlink)
const excelPath = "tmp/excel"
const storage = multer.diskStorage({
  destination: excelPath,
  filename: function(req, file, cb) {
    cb(
      null,
      `import-leads-${Math.random()
        .toString(36)
        .substring(2)}-${new Date().getTime()}.xlsx`,
    )
  },
})
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype ==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error("Only .xlsx format allowed!"))
    }
  },
  limits: { fileSize: 3145728 }, // 3mb
})

let fields = [
  { property: "page", title: "Number of pages", width: 15 },
  { property: "content_updates", title: "Content updates", width: 15 },
  { property: "functionality", title: "Functionality", width: 15 },
  { property: "mobile_design", title: "Mobile design", width: 15 },
  { property: "seo", title: "SEO", width: 5 },
  { property: "content_management", title: "Content Management", width: 20 },
  { property: "e_commerce", title: "E-commerce", width: 10 },
  { property: "blog", title: "Blog", width: 5 },
  { property: "budget", title: "Budget", width: 9 },
  { property: "languages", title: "Languages", width: 15 },
  { property: "hosting", title: "Hosting", width: 10 },
  { property: "comments", title: "Comments", width: 10 },
  { property: "contact_person", title: "Contact Person", width: 15 },
  { property: "email", title: "Email", width: 15 },
  { property: "telephone", title: "Telephone", width: 15 },
  { property: "industry", title: "Indystry", width: 15 },
  { property: "lead_price", title: "Lead price", width: 15 },
]

const authOptions = {
  session: false,
}

export function start({
  appLogic,
  expressApp,
}: {
  appLogic: AppLogic
  expressApp: Express.Express
}) {
  expressApp.post(
    "/excel/import",
    upload.single("leads"),
    passport.authenticate("jwt", authOptions),
    importExcel,
  )

  expressApp.get(
    "/excel/export",
    passport.authenticate("jwt", authOptions),
    exportExcel,
  )

  async function importExcel(req, res, next) {
    if (!req.file) return res.status(400).json({ error: "file not found" })

    const { user } = req
    let fileName = req.file.filename

    let filePath = excelPath + "/" + fileName
    let isReadFileError = false

    let workbook = new excel.Workbook()

    try {
      await workbook.xlsx.readFile(filePath)
    } catch (e) {
      isReadFileError = e.message
    }

    await unlink(filePath)

    if (isReadFileError) return res.status(400).json({ error: isReadFileError })

    let worksheet = workbook.getWorksheet()
    let leads = getLeads(worksheet, user.id)

    if (!leads.length)
      return res.status(400).json({ error: "lead is not found" })

    for (let lead of leads) {
      lead = appLogic.leads.sanitaizeCsvLead(lead)

      let problems = appLogic.leads.validateLead(lead)
      if (!problems.length) {
        await appLogic.leads.AddLead(lead, true)
      } else {
        return res.status(400).json({ error: problems })
      }
    }
    return res.json({ status: true })
  }

  async function exportExcel(req, res, next) {
    const { user } = req
    const leadIds = req.query.leadId
      ? []
          .concat(req.query.leadId)
          .map(lId => +lId)
          .filter(lId => Number.isInteger(lId))
      : null

    if (!leadIds || !leadIds.length) {
      return res.status(400).json({ error: "leadIds is incorrect" })
    }

    const lead_promises = leadIds.map(async (l_id: number) => {
      return await appLogic.models.leads.getById(l_id).then(lead => {
        if (!lead) throw { message: "Lead " + lead.id + " is not defined" }
        if (lead.ownerId === user.id) return lead
        else throw { message: "User is not the owner for lead " + lead.id }
      })
    })

    let leads: any = []
    let isLeadsError = false

    try {
      leads = await Promise.all(lead_promises)
    } catch (e) {
      isLeadsError = e.message
    }

    leads = leads.filter(lead => !!lead)

    if (isLeadsError || !leads.length) {
      return res.status(400).json({ error: "leadIds is incorrect" })
    }

    let workbook = new excel.Workbook()

    let sheet = workbook.addWorksheet("leads")
    sheet.columns = fields.map(field => {
      return { width: field.width }
    })
    sheet.addRow(fields.map(field => field.title))

    leads.forEach(lead => {
      lead = excelDecorator(lead)
      sheet.addRow(fields.map(field => lead[field.property]))
    })

    // let isWriteFileError = false;
    // try {
    // await workbook.xlsx.writeFile(filePath);
    // } catch (e) {
    //     isWriteFileError = e;
    // }
    // if (isWriteFileError) {
    //     return res.status(400).json({error: isWriteFileError});
    // }e
    // let file = fs.createReadStream(filePath);
    // file.on('end', function() {
    //     unlink(filePath);
    // });
    // return file.pipe(res);

    return await workbook.xlsx.write(res)
  }

  const excelDecorator = lead => {
    lead.functionality = lead.functionality.join(", ")
    lead.languages = lead.languages.join(", ")
    return lead
  }

  const getLeads = (worksheet, ownerId, rowNumber = 2, leads = []) => {
    let row = worksheet.getRow(rowNumber)
    let lead: any = {}
    if (row.getCell(2).value === null || rowNumber > 1000) return leads // 2 = content_updates
    fields.forEach((field, i) => {
      if (
        field.property === "functionality" ||
        field.property === "languages"
      ) {
        lead[field.property] = strToArray(row.getCell(i + 1).value)
      } else lead[field.property] = row.getCell(i + 1).value
      lead.ownerId = ownerId
      lead.date = new Date().getTime()
      lead.active = true
      lead.forSale = true
      lead.bought_from = 0
    })
    leads.push(lead)
    rowNumber++
    return getLeads(worksheet, ownerId, rowNumber, leads)
  }

  const strToArray = str => {
    if (str === null) return str
    return str.split(",").map(element => element.trim())
  }
}

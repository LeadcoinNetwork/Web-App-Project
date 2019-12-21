import LANGUAGES from "./langs"

const OPTIONS = {
  YES_OR_NO: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }],
  FUNCTIONALITY: [
    { type: "functionality", value: "corporate", label: "Corporate" },
    { type: "functionality", value: "educational", label: "Educational" },
    { type: "functionality", value: "personal", label: "Personal" },
    { type: "functionality", value: "portfolio", label: "Portfolio" },
    { type: "functionality", value: "restaurant", label: "Restaurant" },
    {
      type: "functionality",
      value: "small business",
      label: "Small Business",
    },
    { type: "functionality", value: "other", label: "Other" },
  ],
  CONTENT_UPDATES: [
    { value: "Mostly Static", label: "Mostly Static" },
    { value: "Dynamic", label: "Dynamic" },
  ],
  LANGUAGES: LANGUAGES,
}

const fields = [
  {
    key: "auction",
    name: "Auction",
    sortable: true,
    editable: true,
    maxWidth: "60px",
    minWidth: "60px",
  },
  {
    key: "industry",
    name: "Industry",
    sortable: true,
    editable: true,
    maxWidth: "100px",
    minWidth: "100px",
    type: "input",
    options: [],
  },
  {
    key: "date",
    name: "Date Published",
    sortable: true,
    editable: false,
    maxWidth: "120px",
    minWidth: "120px",
    type: "input",
    options: [],
  },
  {
    key: "pages",
    name: "Number of pages",
    sortable: true,
    editable: true,
    maxWidth: "120px",
    minWidth: "120px",
    type: "input",
    options: [],
    tooltip: "How many web pages do you expect to have?",
  },
  {
    key: "content_updates",
    name: "Content updates",
    sortable: true,
    editable: true,
    maxWidth: "130px",
    minWidth: "130px",
    type: "select",
    options: OPTIONS.CONTENT_UPDATES,
    tooltip: "Regularity and scale of content changes?",
  },
  {
    key: "functionality",
    name: "Functionality",
    sortable: true,
    editable: true,
    maxWidth: "auto",
    minWidth: "100px",
    type: "multiselect",
    options: OPTIONS.FUNCTIONALITY,
    tooltip: "Core function of the website?",
  },
  {
    key: "mobile_design",
    name: "Mobile design",
    sortable: true,
    editable: true,
    maxWidth: "120px",
    minWidth: "100px",
    type: "select",
    options: OPTIONS.YES_OR_NO,
    tooltip: "Do you require mobile design?",
  },
  {
    key: "seo",
    name: "SEO",
    sortable: true,
    editable: true,
    maxWidth: "50px",
    minWidth: "50px",
    type: "select",
    options: OPTIONS.YES_OR_NO,
    tooltip: "Is Search Engine Optimization required?",
  },
  {
    key: "content_management",
    name: "Content Management",
    sortable: true,
    editable: true,
    maxWidth: "150px",
    minWidth: "150px",
    type: "select",
    options: OPTIONS.YES_OR_NO,
    tooltip: "Do you require content management functionality?",
  },
  {
    key: "e_commerce",
    name: "E-commerce",
    sortable: true,
    editable: true,
    maxWidth: "100px",
    minWidth: "100px",
    type: "select",
    options: OPTIONS.YES_OR_NO,
    tooltip:
      "Will the website be used for buying or selling of goods and services?",
  },
  {
    key: "blog",
    name: "Blog",
    sortable: true,
    editable: true,
    maxWidth: "50px",
    minWidth: "50px",
    type: "select",
    options: OPTIONS.YES_OR_NO,
    tooltip: "Will the website be used for blogging?",
  },
  {
    key: "budget",
    name: "Budget",
    sortable: true,
    editable: true,
    maxWidth: "85px",
    minWidth: "85px",
    type: "input",
    tooltip: "What is your estimated budget for this project (USD)?",
  },
  {
    key: "languages",
    name: "Languages",
    sortable: true,
    editable: true,
    maxWidth: "auto",
    minWidth: "80px",
    type: "multiselect",
    options: OPTIONS.LANGUAGES,
  },
  {
    key: "hosting",
    name: "Hosting",
    sortable: true,
    editable: true,
    maxWidth: "80px",
    minWidth: "80px",
    type: "select",
    options: OPTIONS.YES_OR_NO,
    tooltip:
      "Do you need hosting for your website, or will you be providing your own?",
  },
  {
    key: "comments",
    name: "Comments",
    sortable: true,
    editable: true,
    maxWidth: "auto",
    minWidth: "auto",
    type: "input",
    options: [],
  },
  {
    key: "contact_person",
    name: "Contact Person",
    sortable: true,
    editable: true,
    maxWidth: "auto",
    minWidth: "auto",
    type: "input",
    private: true,
    options: [],
  },
  {
    key: "email",
    name: "Email",
    sortable: true,
    editable: true,
    maxWidth: "auto",
    minWidth: "auto",
    type: "input",
    private: true,
    options: [],
  },
  {
    key: "telephone",
    name: "Telephone",
    sortable: true,
    editable: true,
    maxWidth: "80px",
    minWidth: "80px",
    type: "input",
    private: true,
    options: [],
  },
  {
    key: "lead_price",
    name: "Price",
    sortable: true,
    editable: true,
    maxWidth: "auto",
    minWidth: "60px",
    type: "input",
    options: [],
    tooltip: "The lead’s price in LDCs",
  },
]

export default fields

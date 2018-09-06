describe("LeadCoin demo", () => {
  it("should login with test account", () => {
    cy.clearCookies()
    cy.window().then(window => {
      window.localStorage.skip_inline_manual = true
    })
    cy.visit("/")
    /*
    cy.clearLocalStorage()
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
  */
    cy.get(".ldc-textfield.email").type("erez+test@leadcoin.network")
    cy.get(".ldc-textfield.password").type("test123")
    cy.get("button.ldc-button").click()
    cy.get(".buy > .ldc-button").should("be.visible")
  })
  it("should search leads and find them", () => {
    cy.visit("/")
    cy.get(".buy > .ldc-button").click()
    cy.get(".bl-filters > :nth-child(1)").select("Real Estate")
    cy.get(".bl-filters > :nth-child(2)").select("Sell")
    cy.get(".bl-filters > .ldc-button").click()
    cy.get("h4").should("be.visible")
    cy.get(".lt-results-head > .ldc-button").should("be.visible")
  })
  it("should buy a lead and check it out", () => {
    cy.visit("/")
    cy.get(".buy > .ldc-button").click()
    cy.get(".bl-filters > :nth-child(1)").select("Real Estate")
    cy.get(".bl-filters > :nth-child(2)").select("Sell")
    cy.get(".bl-filters > .ldc-button").click()
    cy.get("h4").should("be.visible")
    cy.get(".lt-results-head > .ldc-button").should("be.visible")
    cy.get(":nth-child(1) > .tbr-checkbox > .ldc-checkbox > input").check({
      force: true,
    })
    cy.get(".lt-results-head > .ldc-button").click()
    cy.url().should("contain", "/shopping-cart")
    cy.get(".ldc-button").click()
    cy.get(".Toastify__toast-body > :nth-child(1) > :nth-child(1)").should(
      "contain",
      "completed",
    )
  })
  it("should move owned lead to sell", () => {
    cy.visit("/")
    cy.get('[data-text="my leads"] > .menu-icons').click()
    cy.get(":nth-child(1) > .tbr-checkbox > .ldc-checkbox > input").check({
      force: true,
    })
    cy.get(".lt-results-head > .ldc-button").click()
    cy.get(".ldc-dialog-selection > :nth-child(1)").click()
    cy.get(".Toastify__toast-body").should(
      "contain",
      "Leads moved successfully",
    )
    return
    cy.url().should("contain", "/shopping-cart")
    cy.get(".ldc-button").click()
    cy.get(".Toastify__toast-body > :nth-child(1) > :nth-child(1)").should(
      "contain",
      "completed",
    )
  })
})

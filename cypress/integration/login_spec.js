describe("login", () => {
  it("should fail", () => {
    cy.visit("http://g.leadcoin.network/erez")
    cy.clearCookies()
    /*
    cy.clearLocalStorage()
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
  */
    cy.get(".ldc-textfield.email").type("erez+test@leadcoin.network")
    cy.get(".ldc-textfield.password").type("test123")
    cy.get("button.ldc-button").click()
    cy.get(".ldc-button")
      .contains("Buy Leads")
      .click()
    expect(true).to.equal(true)
  })
})

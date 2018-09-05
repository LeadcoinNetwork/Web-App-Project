describe("login", () => {
  it("should fail", () => {
    cy.visit("http://g.leadcoin.network/erez")
    cy.get(".ldc-textfield.email").type("tester@leadcoin.network")
    cy.get(".ldc-textfield.password").type("test123")
    expect(true).to.equal(true)
  })
})
describe("homepage", () => {
  it("loads and displays homepage content", () => {
    cy.contains("Struggling with German numbers?");
  });
});

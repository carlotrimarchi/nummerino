describe("Navigation", () => {
  it("navigates to each section from the nav bar", () => {
    cy.visit("/");
    cy.get('nav a[href="/quizzes"]').click();
    cy.url().should("include", "/quizzes");

    cy.get('nav a[href="/speller"]').click();
    cy.url().should("include", "/speller");
  });
});

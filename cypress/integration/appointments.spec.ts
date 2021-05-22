describe('Appointments page', () => {
  before(() => {
    cy.visit('/appointments');
  });

  it('can see the instructions section', () => {
    cy.pick('instructions').should('be.visible');
  });

  it('can see the appointments list', () => {
    cy.pick('appointments-list').should('be.visible');
    cy.pick('appointments-list')
      .get('.appointments-item')
      .should('have.length.greaterThan', 5);
  });

  it('can see the appointments form', () => {
    cy.pick('appointments-form').should('be.visible');
  });
});

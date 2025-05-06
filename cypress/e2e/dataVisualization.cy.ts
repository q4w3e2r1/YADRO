/// <reference types="cypress" />

describe('Data Visualization E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display initial data and allow row selection', () => {
    cy.get('table').should('exist');
    cy.contains('th', 'title').should('be.visible');
    cy.contains('td', 'abc').should('be.visible');

    cy.get('[data-testid="chart-container"]').should('exist');

  });

  it('should handle data set changes with fetch button', () => {
    cy.contains('button', 'fetch').click();

    cy.contains('td', 'row1').should('be.visible');
    cy.contains('td', '70').should('be.visible');

  });

  it('should clear data when clear button is clicked', () => {
    cy.contains('button', 'clear').click();

    cy.get('tbody tr').should('not.exist');
    cy.get('[data-testid="chart-container"]').should('not.exist');
  });

  it('should export data to CSV when save button is clicked', () => {
    cy.get('table').should('exist');
    cy.contains('td', 'abc').should('be.visible');

    cy.contains('button', 'save').click();

    cy.readFile('cypress/downloads/table_data.csv').should('exist');
  });

  it('should maintain selected row state across data set changes', () => {
    cy.contains('tr', 'xyz').click();

    cy.contains('button', 'fetch').click();

    cy.get('[data-testid="selectedRow"]').should('not.exist');
  });

  it('should update chart when different rows are selected', () => {
    cy.contains('tr', 'abc').click();
    cy.get('[data-testid="chart-container"]').should('contain', '1');
    cy.get('[data-testid="chart-container"]').should('contain', '7');

    cy.contains('tr', 'xyz').click();
    cy.get('[data-testid="chart-container"]').should('contain', '5');
  });
});
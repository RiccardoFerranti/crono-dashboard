const signalsCardSelector = 'section[aria-labelledby="signals-title"]';
const firstSignalMessage = 'Robert Smith changed role from SDR to Senior SDR at Medium';
const remainingSignalMessage = 'Amazon viewed 2 pages of your website for 65 sec';

function signalsCard() {
  return cy.get(signalsCardSelector);
}

function signalActionFor(message: string, actionName: string) {
  return cy
    .contains('p', message)
    .parent()
    .parent()
    .parent()
    .find(`button[aria-label="Action for ${actionName}"]`);
}

function expectVisibleSignalCount(count: number) {
  signalsCard().find('button[aria-label^="Action for "]').should('have.length', count);
}

describe('Dashboard', () => {
  it('should render the dashboard after asynchronous data loads', () => {
    cy.visit('/');

    cy.get('main[aria-label="Dashboard"]').should('be.visible');
    cy.contains('h1', 'Welcome Alex,').should('be.visible');
    cy.contains('h2', 'Replies').should('be.visible');
    cy.contains('h2', 'Today’s tasks').should('be.visible');
    cy.contains('h2', 'Signals').should('be.visible');
    cy.contains('h2', 'May’s performance').should('be.visible');
    cy.contains('h2', 'Onboarding').should('be.visible');

    cy.get('section[aria-labelledby="replies-title"]').should('have.attr', 'aria-busy', 'false');
    cy.get('section[aria-labelledby="tasks-title"]').should('have.attr', 'aria-busy', 'false');
    signalsCard().should('have.attr', 'aria-busy', 'false');
    cy.get('section[aria-labelledby="performance-title"]').should('have.attr', 'aria-busy', 'false');

    cy.contains('section[aria-labelledby="replies-title"]', '24').should('be.visible');
    cy.contains('section[aria-labelledby="tasks-title"]', 'Overdue').should('be.visible');
    cy.contains('section[aria-labelledby="tasks-title"]', '3').should('be.visible');
    cy.contains('p', firstSignalMessage).should('be.visible');
  });

  it('should collapse and expand the sidebar', () => {
    cy.visit('/');

    cy.get('[aria-label="Collapse sidebar"]').should('have.attr', 'aria-expanded', 'true').click();
    cy.get('[aria-label="Expand sidebar"]').should('have.attr', 'aria-expanded', 'false');
    cy.contains('Dashboard').should('not.exist');
    cy.contains('Trial ends in 2 days').should('not.exist');
    cy.contains('William Robertson').should('not.exist');

    cy.get('[aria-label="Expand sidebar"]').click();
    cy.get('[aria-label="Collapse sidebar"]').should('have.attr', 'aria-expanded', 'true');
    cy.contains('Dashboard').should('be.visible');
    cy.contains('Trial ends in 2 days').should('be.visible');
    cy.contains('William Robertson').should('be.visible');
  });

  it('should complete a signal and update the visible count', () => {
    cy.visit('/');

    signalsCard().should('have.attr', 'aria-busy', 'false');
    expectVisibleSignalCount(12);
    cy.contains('p', firstSignalMessage).should('be.visible');

    signalActionFor(firstSignalMessage, 'Medium').click();
    cy.get('[role="menuitem"]').contains('Complete').click();

    cy.contains('p', firstSignalMessage).should('not.exist');
    expectVisibleSignalCount(11);
    signalActionFor(remainingSignalMessage, 'Amazon').click();
    cy.get('[role="menuitem"]').contains('Delete').should('be.visible');
  });
});

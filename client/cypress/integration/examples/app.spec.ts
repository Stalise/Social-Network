// TODO: проверить работу cypress, настроить под него husky.
// TODO: отредактировать все файлы с новыми настройками, добавит cly-jsx в eslint
import { Urls } from '../../../src/data/constants/api';

describe('app', () => {
   it('should show auth-page after auth request', () => {
      cy.visit('/');

      cy.get('[data-test-id="loader-spinner"]').should('be.visible');

      cy.intercept('GET', `${Urls.server_url}${Urls.userAuth}`, {
         statusCode: 401,
         body: {
            message: 'Need authorization',
         },
      }).as('checkAuth');

      cy.wait('@checkAuth');

      cy.get('[data-test-id="auth-page"]').should('be.visible');
   });

   it('should show main-page after auth request', () => {
      cy.visit('/');

      cy.get('[data-test-id="loader-spinner"]').should('be.visible');

      cy.intercept('GET', `${Urls.server_url}${Urls.userAuth}`, {
         statusCode: 200,
         body: {
            message: 'success',
            data: 'boxie',
         },
      }).as('checkAuth');

      cy.wait('@checkAuth');

      cy.get('[data-test-id="loader-spinner"]').should('be.visible');
   });
});

export {};

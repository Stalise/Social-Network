// TODO: проверить работу cypress, настроить под него husky.
// TODO: отредактировать все файлы с новыми настройками, добавит cly-jsx в eslint

describe('App test', () => {
   it('should have loader', () => {
      cy.visit('/');

      cy.get('[data-test-id="loader-spinner"]');

      cy.intercept('GET', 'http://localhost:8000/api/user/auth', {
         statusCode: 200,
         body: {
            username: 'boxie',
         },
      }).as('checkAuth');

      cy.wait('@checkAuth');
   });
});

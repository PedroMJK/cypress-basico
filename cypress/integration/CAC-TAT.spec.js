{/* <reference types="Cypress" />   */}

// Inicia uma suite de testes para a "Central de Atendimento ao Cliente TAT"
describe('Central de atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        // Para acessar a página principal da aplicação
        cy.visit('./src/index.html')
    }) 

    it('verifica o título da aplicação', function () {
         // Para verificar se o título da página é exatamente "Central de Atendimento ao Cliente TAT"
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it.only('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo.'
        cy.get('#firstName').type('Pedro')
        cy.get('#lastName').type('Monteiro')
        cy.get('#email').type('pedro@exemplo.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })
}) 
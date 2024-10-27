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

    it.only('exibe mensagem de erro ao submeter o formulário com um email com formato inválido', function() {
        cy.get('#firstName').type('Pedro')
        cy.get('#lastName').type('Monteiro')
        cy.get('#email').type('pedro@exemplo,com')   // Digita um email inválido no campo com ID "email"
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        // Verifica se o elemento com a classe "error" está visível, indicando um erro
        cy.get('.error').should('be.visible')

    })

    // Testando o campo numérico
    it.only('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('#phone')
          .type('abcdefghijk')
          .should('have.value', '')
    })
    
}) 
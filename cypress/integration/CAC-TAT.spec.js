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

    // Teste 01
    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo.'
        cy.get('#firstName').type('Pedro')
        cy.get('#lastName').type('Monteiro')
        cy.get('#email').type('pedro@exemplo.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    //Teste 02
    it('exibe mensagem de erro ao submeter o formulário com um email com formato inválido', function() {
        cy.get('#firstName').type('Pedro')
        cy.get('#lastName').type('Monteiro')
        cy.get('#email').type('pedro@exemplo,com')   // Digita um email inválido no campo com ID "email"
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        // Verifica se o elemento com a classe "error" está visível, indicando um erro
        cy.get('.error').should('be.visible')

    })

     // Testando o campo numérico
    it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('#phone')
          .type('abcdefghijk')
          .should('have.value', '')
    })
    
    // Teste 03
    it('exibe mensagem de erro ao submeter o formulário com um email com formato inválido', function() {
        cy.get('#firstName').type('Pedro')
        cy.get('#lastName').type('Monteiro')
        cy.get('#email').type('pedro@exemplo.com')
        cy.get('#phone-checkbox').click() // Checa a funcionalidade do checkbox
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        // Verifica se o elemento com a classe "error" está visível, indicando um erro
        cy.get('.error').should('be.visible')

    })

    // Teste 04 
    //Usando o clear() para limpar o campo
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
          .type('Pedro')
          .should('have.value', 'Pedro')
          .clear()
          .should('have.value', '')
        cy.get('#firstName')
          .type('Monteiro')
          .should('have.value', 'Monteiro')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type('pedro@exemplo.com')
          .should('have.value', 'pedro@exemplo.com')
          .clear()
          .should('have.value', '')
        cy.get('#phone')
          .type('1234567890')
          .should('have.value', '1234567890')
          .clear()
          .should('have.value', '')
    })

    // Teste 05
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',  function () {
        cy.get('button[type="submit"]').click()

        // Verifica se o elemento com a classe "error" está visível, indicando um erro
        cy.get('.error').should('be.visible')
    })

    // Teste 06
    // Usando comandos customizados
    it('envia o formulário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        // Verifica se o elemento com a classe "error" está visível, indicando um erro
        cy.get('.success').should('be.visible')
    })

    // Teste 07
    it.only('identifica o botão de Enviar usando a  funcionalidade contains', function() {
        cy.get('#firstName').type('Pedro')
        cy.get('#lastName').type('Monteiro')
        cy.get('#email').type('pedro@exemplo.com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        // Verifica se o elemento com a classe "error" está visível, indicando um erro
        cy.get('.success').should('be.visible')
    })
    
}) 
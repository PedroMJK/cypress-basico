it.only("testa apágina de política de privacidade de forma independente", () => {
  cy.visit('./src/privacy.html')

  cy.contains('Talking About Testing').should('be.visible')

  
  //   Quarto Módulo

  // Teste 01

  it("preenche os campos obrigatórios e envia o formulário", function () {
    const longText =
      "Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo.";

    cy.clock();

    cy.get("#firstName").type("Pedro");
    cy.get("#lastName").type("Monteiro");
    cy.get("#email").type("pedro@exemplo.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.get('button[type="submit"]').click();

    cy.get(".success").should("be.visible");

    cy.tick(THREE_SECONDS_IN_MS);

    cy.get(".success").should("not.be.visible");
  });

  //    Teste 02

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é enviado", function () {
    cy.clock();

    cy.get("#firstName").type("Pedro");
    cy.get("#lastName").type("Monteiro");
    cy.get("#email").type("pedro@exemplo.com");
    cy.get("#phone-checkbox").check(); // Checa a funcionalidade do checkbox
    cy.get("#open-text-area").type("Teste");
    cy.get('button[type="submit"]').click();

    // Verifica se o elemento com a classe "error" está visível, indicando um erro
    cy.get(".error").should("be.visible");

    cy.tick(THREE_SECONDS_IN_MS);

    cy.get(".error").should("not.be.visible");
  });

  //    Utilizando lodash
  //   Teste 01
  Cypress._.times(3, () => {
    it("campo telefone continua vazio quando preenchido com valor não-numérico", function () {
      cy.get("#phone").type("abcdefghijk").should("have.value", "");
    });
  });

  //   Teste 02
  Cypress._.times(5, function () {
    it("marca ambos checkboxes, depois desmarca o último", function () {
      cy.get('input[type="checkbox"]')
        .check()
        .should("be.checked")
        .last()
        .uncheck()
        .should("not.be.checked");
    });
  });

  //   Teste 01

  it("exibe e esconde as mensagens de sucesso e erro usando .invoke", () => {
    cy.get(".success")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Mensagem enviada com sucesso.")
      .invoke("hide")
      .should("not.be.visible");
    cy.get(".error")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Valide os campos obrigatórios!")
      .invoke("hide")
      .should("not.be.visible");
  });

  //   Teste 02
  it("preenche a area de texto usando o invoke", () => {
    const longText = Cypress._.repeat("0123456789", 20);

    cy.get("#open-text-area")
      .invoke("val", longText)
      .should("have.value", longText);
  });

  //     cy.request
  it("faz uma requisição HTTP", () => {
    cy.request(
      "https://cac-tat.s3.eu-central-1.amazonaws.com/index.html"
    ).should(function (response) {
      const { status, statusText, body } = response;
      expect(status).to.equal(200);
      expect(statusText).to.equal("OK");
      expect(body).to.include("CAC TAT");
    });
  });
  it.only("encontre o gato escondido", () => {
    cy.get("#cat")
      .invoke("show")
      .should('be.visible')
    cy.get('#title')
      .invoke('text', 'CAT TAT')
    cy.get('#subtitle')
      .invoke('text', 'Eu ❤️ gatos!')
  });
});

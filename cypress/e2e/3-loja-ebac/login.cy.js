/// <reference types="cypress"/>
const perfil = require('../../fixtures/perfil.json')

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('minha-conta')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer login com sucesso', () => {
        cy.get('#username').type('sergio.teste@teste.com')
        cy.get('#password').type('teste@123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, sergio.teste (não é sergio.teste? Sair)')
    })

    it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
        cy.get('#username').type('sergio@teste.com')
        cy.get('#password').type('teste@123')
        cy.get('.woocommerce-form > .button').click() 
        cy.get('.woocommerce-error').should('contain' , 'Endereço de e-mail desconhecido.')
        cy.get('.woocommerce-error').should('exist')
    });

    it('Deve exibir uma mensagem de erro ao inserir senha inválida', () => {
        cy.get('#username').type('sergio.teste@teste.com')
        cy.get('#password').type('erro@123')
        cy.get('.woocommerce-form > .button').click() 
        cy.get('.woocommerce-error').should('contain' , 'Erro: A senha fornecida para o e-mail sergio.teste@teste.com está incorreta.')
        cy.get('.woocommerce-error').should('exist')
    });

    it('Deve efetuar login com sucesso - Utilizando massa da dados', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, sergio.teste (não é sergio.teste? Sair)')
    });

    it('Deve efetuar login com sucesso - Utilizando Fixture', () => {
        cy.fixture('perfil').then(dados => {
            cy.get('#username').type(dados.usuario , {log: false})
            cy.get('#password').type(dados.senha , {log: false})
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, sergio.teste (não é sergio.teste? Sair)')
        })
    });

    it.only('Deve efetuar login com sucesso - Utilizando comandos customizados', () => {
        cy.login('sergio.teste@teste.com' , 'teste@123')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, sergio.teste (não é sergio.teste? Sair)')
});    

})
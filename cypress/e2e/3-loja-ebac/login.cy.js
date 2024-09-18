/// <reference types="cypress"/>

describe('Funcionalidade: Login', () => {

    it ('Dever fazer login com sucesso', () => {
        cy.visit ('http://lojaebac.ebaconline.art.br/minha-conta/')
        cy.get('#username').type('sergio.teste@teste.com.br')
        cy.get('#password').type('teste@123')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, sergio.teste (não é sergio.teste? Sair)')
    })

})
import { Given, When, Then, } from "@badeball/cypress-cucumber-preprocessor";
const page = require("../../pages/ArtistMatchFinder-page");

Given("user is at ArtistMatchFinder page", function () {
    cy.visit('/ArtistMatchFinder')
});

Given("user selects first artist", function () {
    page.fillArtistForm('ctangana');
    page.selectArtist(1);
});

When("user selects second artist", function () {
    page.fillArtistForm('FXY');
    page.selectArtist(2);
});

Then("results are displayed in the screen", function () {
    page.elements.finalResult().should('exist')
});
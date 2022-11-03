import { Given, When, Then, } from "@badeball/cypress-cucumber-preprocessor";
const page = require("../../pages/ArtistMatchFinder-page");

Given("user is at ArtistMatchFinder page", function () {
    cy.visit('/ArtistMatchFinder')
});

Given("user selects first artist", function () {
    page.fillArtistForm('hola');
    page.selectArtist(1);
});

Given("user selects second artist", function () {
    page.fillArtistForm('qwe');
    page.selectArtist(2);
});

When("results are ready", function () {

});

Then("results are displayed in the screen", function () {

});
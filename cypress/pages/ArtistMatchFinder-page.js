class ArtistMatchFinder {
    elements = {
        artistInput: () => cy.get('input[type=search]'),
        artistSubmit: () => cy.get('button[type=submit]'),
        resultArtist: () => cy.get(".tarjeta_res"),
        finalResult: () => cy.get("#final-result-container"),
    };

    fillArtistForm(userInput) {
        this.elements.artistInput().type(userInput);
        this.elements.artistSubmit().click();
    }

    selectArtist(which) {
        which === 1 
        ?
        this.elements.resultArtist().first().click()
        :
        this.elements.resultArtist().first().click()
    }
}

module.exports = new ArtistMatchFinder();
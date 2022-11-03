Feature: ArtistMatchFinder

    ArtistMatchFinder works properly. User selects two artists, and results are displayed.

    Background: user is at ArtistMatchFinder page
        Given user is at ArtistMatchFinder page

    Scenario: After selecting two artists, results are displayed in the screen.
        Given user selects first artist
        And user selects second artist
        When results are ready
        Then results are displayed in the screen

Feature: Specify number of events

  Scenario: Default number of events is 32
    Given the user hasn’t specified the number of events
    When the user opens the app
    Then the default number of displayed events should be 32

  Scenario: User can change the number of displayed events
    Given the user sees the number of events input field
    When the user changes the number to 10
    Then the app should display 10 events

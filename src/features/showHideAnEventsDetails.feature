Feature: Show/Hide Event Details

  Scenario: An event element is collapsed by default
    Given the user opens the events page
    When the page loads
    Then all event elements are collapsed by default

  Scenario: User can expand an event to see details
    Given an event is collapsed
    When the user clicks on the event
    Then the event details are displayed

  Scenario: User can collapse an event to hide details
    Given an event is expanded
    When the user clicks on the event
    Then the event details are hidden

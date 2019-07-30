# Feed Reader Testing Project

This project uses Javascript unit tests to make sure that this web-based application that reads RSS feeds functions correctly. The testing framework used
for this project is [Jasmine](http://jasmine.github.io/) and is included in the
project using `script` tags sourced to the framework, which are contained in the `head` tag of the [index.html](index.html) file.


# Running the project

To run this project, simply clone the repo from the [github link]() and then
open [index.html](index.html) in the browser of your choice. Do not touch anything
for about two (2) seconds, after which all the tests should have run and the
app should have returned to the first RSS feed. Some of the tests included for
this project involve loading different RSS feeds and making sure they load and
are non-empty, which is the reason for the app loading different RSS feeds for
the first few seconds upon launch.

You should be able to see that all the tests have passed by scrolling to the bottom of the page and seeing all green circles (no red X's) under the Jasmine framework
logo. Underneath that, you should be able to read white text on a green background
that reads **9 specs, 0 failures**, and below that you can see all the test suites and all their individual tests that were run (and should have passed). These test suites and test names should all be green text, meaning that they passed.

# Test Suites

The following test suites were included to test the basic functionality of this project. These test suites should not need to change much in order to test the same features of the project - but more will likely be needed to test additional functionality or features of the app as it develops. These tests should continue to pass as the app is developed; otherwise, something that was previously working in an earlier version of the app would then be broken and need to be remediated.

## RSS Feeds

This is the first test suite. It checks that there is at least one RSS Feed to
use for this app, and that each RSS Feed used for this application has both a
defined, non-empty string name, and a defined, non-empty string URL. It also
checks every name against every other name to make sure there are no duplicates,
which could be confusing, and checks every URL against every other URL to also ensure there are no duplicates, since that would cause the same feed information to
be loaded twice (under different feed names, or the same feed name if both the names and URLs are duplicates).


## The menu

This is the second test suite. It first checks that the **menu** from which a user can select different feeds is hidden from view by default, then checks that the menu's visibility can be toggled from hidden to visible and then hidden again by clicking on the **menu icon** that looks like a hamburger twice. The test suite checks for all these features by examining the classes on the HTML `body` tag, because the `menu-hidden` class applied to that tag hides the menu.

## Initial Entries

This is the third test suite. It cycles through the RSS feeds using the `loadFeed`
function, and tests the resulting pages to ensure there is at least one (1) entry
per RSS feed page. If any of the pages have no entries, then the test should fail.

## New Feed Selection

This is the final test suite. It tests the `loadFeed` function by first loading
one page (specified by a `num` variable in the code, which could be set to the
index of any feed in `allFeeds` array in [app.js](js/app.js) except the last one), and then attempting to load the next page sequentially in `allFeeds` - if the second page does not have the same 'entries' content as the first page, then we can assume the page has updated successfully and the new feed's content is now visible in the application.

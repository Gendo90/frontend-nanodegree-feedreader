/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have a defined, non-empty URL string for each feed', function() {
             for (let feed of allFeeds) {
                 expect(feed.url).toBeDefined();
                 expect(typeof feed.url).toBe('string');
                 expect(feed.url.length).not.toBe(0);
             }
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have a defined, non-empty name string for each feed', function() {
             for (let feed of allFeeds) {
                 expect(feed.name).toBeDefined();
                 expect(typeof feed.name).toBe('string');
                 expect(feed.name.length).not.toBe(0);
             }
         });

         //prevents confusion from having duplicate names for different items
         it('do not have a duplicate name', function() {
             for (let i=0; i<allFeeds.length; i++) {
                 for (let j=i+1; j<allFeeds.length; j++) {
                     expect(allFeeds[i].name).not.toBe(allFeeds[j].name)
                 }
             }
         });

         //prevents redundant entries from having identical URLs in allFeeds
         it('do not have a duplicate URL', function() {
             for (let i=0; i<allFeeds.length; i++) {
                 for (let j=i+1; j<allFeeds.length; j++) {
                     expect(allFeeds[i].url).not.toBe(allFeeds[j].url)
                 }
             }
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('the menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('should be hidden by default', function() {
            let bodyElement = document.getElementsByTagName('body')[0];

            expect(bodyElement.classList.contains('menu-hidden')).toBe(true);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
         it('should toggle visibility on a click', function() {
             let bodyElement = document.getElementsByTagName('body')[0];
             let menuToggleButton = document.getElementsByClassName('menu-icon-link')[0];

             //cause button to be clicked, which should make the menu appear
             menuToggleButton.click();
             expect(bodyElement.classList.contains('menu-hidden')).toBe(false);

             //cause button to be clicked again, which should make the menu disappear
             menuToggleButton.click();
             expect(bodyElement.classList.contains('menu-hidden')).toBe(true);
         });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         //goes through each feed in allFeeds and loads the page
         beforeEach(function(done) {
             for (let id=0; id<allFeeds.length; id++) {
                 loadFeed(id, done);
             }
         });

         //checks that there is at least one entry for the current feed loaded
         it('should have at least one entry in the feed list', function(done) {
            let feed = document.getElementsByClassName('feed')[0];
            let entries = feed.getElementsByClassName('entry');

            // console.log(entries.length)

            expect(entries.length).not.toBe(0);

            done();
         })

    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         let num = 0;
         let lastFeedChildren = [];
         let lastFeed, thisFeed;

         //goes through each feed in allFeeds and loads the page
         beforeEach(function(done) {
             loadFeed(num, function() {
                 lastFeed = document.querySelector(".feed").querySelectorAll("a")
                 lastFeedChildren.push(lastFeed);
                 done();
             });
         });

         //Note - fails if the following item is a duplicate of the first item
         //but there should not be duplicate feeds by design
         it('should load new content', function(done) {
             loadFeed(num+1, function() {
                 //add a set timeout to this function to run it after the page loads!
                 thisFeed = document.querySelector(".feed").querySelectorAll("a")

                 lastFeedChildren.push(thisFeed);
                 // console.log(lastFeedChildren)

                 //check that the function loads new content!
                 expect(lastFeedChildren[0]).not.toEqual(lastFeedChildren[1]);
                 done();
             });
         });
     });
    }());

//resets the webpage to the original feed (assuming it has at least one entry)
// setTimeout(function() {
//     loadFeed(0)
//     console.log('back')
// }, 1000)

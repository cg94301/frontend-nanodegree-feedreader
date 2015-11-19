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

        /* 
           Test by simply using built in Jasmine expect defined tests
           on allFeeds array
        */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* DONE: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs', function() {
            allFeeds.forEach( function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe("");
            });
        });


        /* DONE: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names', function() {
            allFeeds.forEach( function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe("");
            });
        });

    });


    /* DONE: Write a new test suite named "The menu" */

    /* DONE: Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */

    /* DONE: Write a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    describe('The menu', function() {

        /*
          Test by selecting the menu-hidden class on the body element:
          Before triggering hide menu it should exist.
          After triggering hide menu once it should not exist.
          After triggering hide menu twice it should exist.
        */

        it('is hidden per default', function() {
            expect($('body').attr('class')).toBe('menu-hidden');
        });

        it('visibility can be toggled', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').attr('class')).toBe('');
            $('.menu-icon-link').trigger('click');
            expect($('body').attr('class')).toBe('menu-hidden');
        });

    });

    /* DONE: Write a new test suite named "Initial Entries" */

    /* DONE: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test wil require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    describe('Initial Entries', function() {

        /*
          Test by loading a feed, spying on call completion, 
          and checking for entries
        */

        beforeAll(function(done) {

            // Monitor calls to loadFeed function
            spyOn(window,'loadFeed').and.callThrough();
            // Call loadFeed and signal done in callback
            loadFeed(0, function() { done();} );

        });

        it('loadFeed has been called', function() {
            expect(window.loadFeed).toHaveBeenCalled();
        });

        it('at least one entry was created', function() {
            expect($('.feed .entry')).toBeDefined();
        });
    });

    /* DONE: Write a new test suite named "New Feed Selection"

       /* DONE: Write a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
    describe('New Feed Selection', function() {

        /* 
           Test by loading two different feeds and comparing their titles
        */
        var titleOne = '';
        var titleTwo = '';

        it('loads feed 1', function(done) {

            // load feed 0
            loadFeed(0, function() {
                titleOne = $('.entry')[0].children[0].innerHTML;
                done();
            });

            // make sure title exists
            expect(titleOne).toBeDefined();

        });

        it('loads feed 2 different from feed 1', function(done) {

            // load feed 2
            loadFeed(1, function() {
                titleTwo = $('.entry')[0].children[0].innerHTML;
                done();
            });

            // Establish that both feed titles are different
            expect(titleOne).not.toEqual(titleTwo);

        });

    });


}());

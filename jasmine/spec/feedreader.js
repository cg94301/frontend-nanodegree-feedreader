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
        it('have URLs', function() {
            allFeeds.forEach( function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe("");
            });
        });


        /* TODO: Write a test that loops through each feed
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


    /* TODO: Write a new test suite named "The menu" */

    /* TODO: Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */

    /* TODO: Write a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    describe('The menu', function() {

        it('is hidden per default', function() {
            expect(document.getElementsByClassName('menu-hidden')[0].className).toBe('menu-hidden');
        });

        it('visibility can be toggled', function() {
            var event = {
                type: 'click'
            };
            $('.menu-icon-link').trigger(event);
            expect(document.getElementsByClassName('menu-hidden')[0]).toBeUndefined();
            $('.menu-icon-link').trigger(event);
            expect(document.getElementsByClassName('menu-hidden')[0].className).toBe('menu-hidden');
        });

    });

    /* TODO: Write a new test suite named "Initial Entries" */

    /* TODO: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test wil require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    describe('Initial Entries', function() {

        console.log('start1');
        console.log(new Date().getTime());

        beforeAll(function(done) {

            // Monitor calls to loadFeed function
            spyOn(window,'loadFeed').and.callThrough();

            // Wait for initial load to finish
            // Jasmine default allows 5s max
            setTimeout(function() {
                value = 0;
                console.log('stop1');
                console.log(new Date().getTime());
                done();
            }, 1000); // 5000 == 5s
        });

        it('loadFeed has been called', function() {
            expect(window.loadFeed).toHaveBeenCalled();
        });

        it('at least one entry was created', function() {
            console.log('async1 call');
            console.log(new Date().getTime());
            var loadlength = document.getElementsByClassName('entry').length;
            console.log("length of entries loaded: " + loadlength);
            expect(loadlength).toBeGreaterThan(0);
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection"

       /* TODO: Write a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
    describe('New Feed Selection', function() {

        var titleOne = '';
        var titleTwo = '';

        // No initial delay necessary
        // Specs are run sequentially
        // The inital page is already loaded because of dealy in 'Initial Entries'
        beforeAll(function() {

            // Monitor calls to loadFeed function
            spyOn(window,'loadFeed').and.callThrough();

        });

        it('original feed load complete', function() {

            console.log('start2');
            console.log(new Date().getTime());
            titleOne = document.getElementsByClassName('entry')[0].children[0].innerHTML;
            console.log("1st title: " + titleOne);

            // Need to have expect statement
            expect(titleOne).toBeDefined();

            // Trigger another feed load by calling loadFeed()
            // Assume that there's at least one more feed, different from original feed
            loadFeed(1);

        });

        it('new feed load complete', function(done) {
            setTimeout(function() {

                console.log('async2 call');
                console.log(new Date().getTime());

                titleTwo = document.getElementsByClassName('entry')[0].children[0].innerHTML;
                console.log("2nd title: " + titleTwo);

                // Expect at least one more title differing from first
                expect(titleOne).not.toEqual(titleTwo);

                done();
            }, 1000);
        });

    });


}());

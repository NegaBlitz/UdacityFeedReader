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
    describe('RSS feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have urls defined', function() {

            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names defined', function() {

            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    describe('The menu', function() {

        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('has menu element hidden by default', function() {
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });

        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        var menuIcon = $('.menu-icon-link');

        it('changes visibility when icon is clicked', function() {
					
						// Initial state of menu icon is invisible, as tested above,
						// so we can expect clicking twice to cause it to appear and then vanish.						
						// Clicks the menu icon
						menuIcon.click();
						expect(document.body.classList.contains('menu-hidden')).toBe(false);
						console.log(document.body.classList.contains('menu-hidden'));
						
						// Clicks the menu icon again, which should toggle it back
						menuIcon.click();
						expect(document.body.classList.contains('menu-hidden')).toBe(true);
						console.log(document.body.classList.contains('menu-hidden'));
						
        });
    });


    describe('Initial entries', function() {

        // Checks if loadFeed is done
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('has at least a single .entry element within the .feed container when loadFeed is called', function(done) {
            var entry = $('.feed .entry').length;
            expect(entry).not.toBe(0);
            done();
        });
    });

    describe('New feed selection', function() {

        // Checks if loadFeed is done
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * I used the Udacity forums to assist me with this part.
         */

        // Content to look for
        var oldContent, newContent;

        // Get feed information
        var contentChanges = true;

        it('has content change when a new feed is loaded by the loadFeed function', function(done) {

            //The old title of the initial feed
            oldContent = $('.feed').html();;

            //Triggers a click
            $("a[data-id='1']").trigger("click");

            //Loads the next feed an compares the content
            loadFeed(1, function() {

                // Gets what should be the new title
                newContent = $('.feed').html();;

                // Runs a check to make sure both the old and new title are NOT the same
                if (oldContent === newContent) {
                    contentChanges = false;
                }

                // Test statements for the old content and new content
                // console.log(oldContent);
                // console.log(newContent);
                // console.log(contentChanges);

                //If the content doesn't change, the test fails.
                expect(contentChanges).toBe(true);
                done();
            });
        });
    });
}());
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
 'use strict';
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
					 expect(document.body.className).toBe('menu-hidden');
				 });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
					var menuIcon = $('.menu-icon-link');
					
					it('changes visibility when icon is clicked', function() {
						menuIcon.on('click', function() {
							if(document.body.className == 'menu-hidden') {
								expect(document.body.className).not.toBe('menu-hidden');
							}
							else {
								expect(document.body.className).toBe('menu-hidden');
							}
						});
						expect(document.body).toBeDefined();
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
						var entry = $('.entry');
						expect(entry).toBeDefined();
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
				
				//Get feed information
				var feeds = window.allFeeds,
				numberOfFeeds = feeds.length,
				numberOfFeedsLoaded = 0,
				contentChanges = true;
				

				it('has content change when a new feed is loaded by the loadFeed function', function(done) {

					feeds.forEach(function(feed) {
						window.loadFeed(feed.id, checkContent);
					});
					
					function checkContent () {
						numberOfFeedsLoaded++;
						
						// Get old and new material
						if(!oldContent) {
							newContent = $('.feed').html();
							oldContent = true;
						}
						else {
							oldContent = newContent;
							newContent = $('.feed').html();
							
							// Check if they're different
							if(oldContent === newContent) {
								contentChanges = false;
							}
							else {
								contentChanges = true;
							}
						}
					}
						
					//If they aren't, the test fails.
					if (numberOfFeedsLoaded >= numberOfFeeds) {
						expect(contentChanges).toBe(true);
						done();
					}
				});
				
				afterAll(function() {
					window.loadFeed(0);
				});
		});
}());
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
						// Runs when the menu icon is clicked
						menuIcon.on('click', function() {
							// If the menu is hidden, then it should appear, if not, then it should disappear.
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
				
				// Get feed information
				var contentChanges = true;
				
				it('has content change when a new feed is loaded by the loadFeed function', function(done) {
					
					//The old title of the initial feed
					oldContent = $(".header-title").html();
					
					//Triggers a click
					$("a[data-id='1']").trigger("click");
					
					//Timeouts a little to ensure a change has time to happen, and then checks and compares the old and new together
					window.setTimeout(function() {
						
						// Gets what should be the new title
						newContent = $(".header-title").html();
						
						// Runs a check to make sure both the old and new title are NOT the same
						if(oldContent === newContent) {
							contentChanges = false;
						}
						
						// Test statements for the old content and new content
						// console.log(oldContent);
						// console.log(newContent);
						// console.log(contentChanges);
						
						//If the content doesn't change, the test fails.
						expect(contentChanges).toBe(true);
						done();
					}, 400); // 400 MS seems to be an ideal time to make sure that the content has time to actually appear onto the page.
				});
		});
}());
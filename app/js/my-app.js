// Initialize your app
var myApp = new Framework7({
    cache: false
});

// Export selectors engine
var $$ = Dom7;

$$(document).on('ready', function (e) { 
    // Insert SVG-icons into page
    document.getElementById('svg-icons').innerHTML = SVG_ICONS;
});

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true,
    
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

myApp.onPageInit('*', function (page) {
  console.log(page.name + ' initialized');
  var body = $$('body');
  body.attr('class', '').addClass('layout_type_' + page.name);
});

$$(document).on('pageInit', function (page) {
  console.log(page.name + ' initialized');
  var body = $$('body');
  body.attr('class', '').addClass('layout_type_' + $$('.view-main').data('page'));
});


// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}
/*

<div class="modal b-modal {{#unless buttons}}modal-no-buttons{{/unless}}">
  <div class="b-modal__inner">
    {{#if title}}
      <div class="b-modal__title">
          {{title}}
          {{#if closeButton}}
            <div class="b-modal__close">
                <div class="b-close-ctrl"></div>
            </div>
          {{/if}}
      </div>
    {{/if}}
    <div class="b-modal__body">
        {{#if text}}
           <div class="b-modal__content">{{text}}</div>
        {{/if}}
        {{#if afterText}}
          {{afterText}}
        {{/if}}
        {{#if buttons}}
          <div class="b-modal__buttons">
            {{#each buttons}}
              <div class="modal-button b-modal__button b-button {{#if cancel}}b-button_style_bordered b-button_color_cancel{{/if}}">{{text}}</div>
            {{/each}}
          </div>
        {{/if}}
    </div>
  </div>
</div>


*/

 



// Initialize your app
var myApp = new Framework7({
    cache: false,
    modalTitle: 'Утро 2016',
    modalTemplate: '<div class="modal b-modal {{#unless buttons}}modal-no-buttons{{/unless}}"> <div class="b-modal__inner"> {{#if title}} <div class="b-modal__title"> {{title}} {{#if closeButton}} <div class="b-modal__close"> <div class="b-close-ctrl"></div> </div> {{/if}} </div> {{/if}} <div class="b-modal__body"> {{#if text}} <div class="b-modal__content">{{text}}</div> {{/if}} {{#if afterText}} {{afterText}} {{/if}} {{#if buttons}} <div class="b-modal__buttons"> {{#each buttons}} <div class="modal-button b-modal__button b-button {{#if cancel}}b-button_style_bordered b-button_color_cancel{{/if}}">{{text}}</div> {{/each}} </div> {{/if}} </div> </div></div>'
});

// Export selectors engine
var $$ = Dom7;

document.getElementById('svg-icons').innerHTML = SVG_ICONS;


// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true,
    
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('*', function (page) {
    // run createContentPage func after link was clicked
    $$('.open-filter').on('click', function () {
      var modal = myApp.modal({
        title: 'Выбрать площадки',
        text: 'Урал патриотичный',
        closeButton: true,
        buttons: [
          {
            text: 'Отменить',
            cancel: true
          },
          {
            text: 'Применить',
            bold: true,
            onClick: function () {
              myApp.alert('Отфильтровано!')
            }
          },
        ]
      })
    });

});


$$('.open-filter').on('click', function () {
  var modal = myApp.modal({
    title: 'Выбрать площадки',
    text: 'Урал патриотичный',
    closeButton: true,
    buttons: [
      {
        text: 'Отменить',
        cancel: true
      },
      {
        text: 'Применить',
        bold: true,
        onClick: function () {
          myApp.alert('Отфильтровано!')
        }
      },
    ]
  })
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
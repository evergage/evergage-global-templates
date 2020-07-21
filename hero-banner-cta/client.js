(function() {

  /**
   * @function applyColorTheme
   * @param {Object} context
   * @description Sets the color theme to the Color Theme option selected.
   */
  function applyColorTheme(context) {
    var colorTheme = context.colorTheme ? context.colorTheme.className : "evg-light-on-dark";
    Evergage.cashDom("#evg-hero-banner, #evg-hero-banner .evg-h1, #evg-hero-banner .evg-h2").addClass(colorTheme);
  }

  function apply(context, template) {
    var selector = Evergage.getContentZoneSelector(context.contentZone);

    /**
     * The pageElementLoaded method waits for the content zone to load into the DOM
     * before rendering the template. The observer element that monitors for the content 
     * zone element to get inserted into its DOM node is set to "body" by default. 
     * For performance optimization, this default can be overridden by adding
     * a second selector argument, which will be used as the observer element instead.
     * 
     * Visit the Template Display Utilities documentation to learn more:
     * https://developer.evergage.com/templates/display-utilities
     * 
     * Note: To use Evergage.DisplayUtils.pageElementLoaded, you must have the 
     * Display Utilities gear installed and enabled for your dataset.
     */
    
    return Evergage.DisplayUtils.pageElementLoaded(selector).then(function(element) {
      var html = template(context);
      Evergage.cashDom(element).html(html);
      applyColorTheme(context);
    });

  }

  function reset(context, template) {
    Evergage.cashDom("#evg-hero-banner").remove();
  }

  function control(context) {
    var selector = Evergage.getContentZoneSelector(context.contentZone);
    Evergage.cashDom(selector).attr("data-evg-campaign-id", context.campaign);
    Evergage.cashDom(selector).attr("data-evg-experience-id", context.experience);
    Evergage.cashDom(selector).attr("data-evg-user-group", "Control");
    Evergage.cashDom(selector + " a").attr("data-evg-clickthrough", "");
  }

  registerTemplate({
    apply: apply,
    reset: reset,
    control: control
  });
})();
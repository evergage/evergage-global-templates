(function() {

  function apply(context, template) {
      context.infobarClass = context.contentZone == "global_infobar_top_of_page" ? "evg-infobar-top" : "evg-infobar-bottom";
      if (context && context.infobarClass) {
      var html = template(context);
      Evergage.cashDom("body").append(html);

      /** Infobar positioning */
      if (context.infobarClass = context.contentZone === "global_infobar_top_of_page") {
        Evergage.cashDom("body").css("margin-bottom", "0px");
        Evergage.cashDom("body").css("margin-top", "42px");
      } else {
        Evergage.cashDom("body").css("margin-bottom", "42px");
        Evergage.cashDom("body").css("margin-top", "0px");
      }
      
      /** Dismisses popup */
            const dismissSelectors = [
                "#evg-infobar-cta .evg-btn-dismissal",
            ];

            Evergage.cashDom(dismissSelectors.join(", ")).on("click", () => {
                Evergage.cashDom("#evg-infobar-cta").remove();
                Evergage.cashDom("body").css("margin-bottom", "0px");
                Evergage.cashDom("body").css("margin-top", "0px");
            });
      }
  }

  function reset(context, template) {
    Evergage.cashDom("#evg-infobar-cta").remove();
    Evergage.cashDom("body").css("margin-bottom", "0px");
    Evergage.cashDom("body").css("margin-top", "0px");
  }
  
  function control() {
    
  }

  registerTemplate({
    apply: apply,
    reset: reset,
    control: control
  });
    
})();
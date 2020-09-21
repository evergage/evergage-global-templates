(function() {
 
    /**
     * @function setInfobarPosition
     * @param {Object} context
     * @description Sets the position of the infobar via class assignments, based on content zone selected.
     */
    function setInfobarPosition(context) {
        context.infobarClass = context.contentZone == "global_infobar_top_of_page"
            ? "evg-infobar-top"
            : "evg-infobar-bottom";
        if (context.infobarClass === "evg-infobar-top") {
            Evergage.cashDom("body").css({ "margin-bottom": "0", "margin-top": "2.5rem" });
        } else {
            Evergage.cashDom("body").css({ "margin-bottom": "2.5rem", "margin-top": "0" });
        }
    }

    /**
     * @function setDismissal
     * @description Sets the area within the template that removes the template from view upon a dismissal.
     */
    function setDismissal(context) {
        Evergage.cashDom("#evg-infobar-cta .evg-btn-dismissal").on("click", () => {
            Evergage.cashDom("#evg-infobar-cta").remove();
            Evergage.cashDom("body").css({ "margin-top": "0", "margin-bottom": "0" });
        });
    }

    function apply(context, template) {
        setInfobarPosition(context);
        var html = template(context);
        Evergage.cashDom("body").append(html);
        setDismissal(context);
    }

    function reset(context, template) {
        Evergage.cashDom("#evg-infobar-cta").remove();
        Evergage.cashDom("body").css({ "margin-top": "0", "margin-bottom": "0" });
    }

    function control() {

    }

    registerTemplate({
        apply: apply,
        reset: reset,
        control: control
    });
      
  })();
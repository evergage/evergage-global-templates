export class StyleField {
    label: string;
    className: string;
}

export class LightboxField {
    label: boolean;
    overlayClass: string
}

export class ExitIntentPopupTemplate implements CampaignTemplateComponent {

    @title("Title")
    @subtitle("i.e. Don't leave yet!")
    @richText(true)
    title: string = "Wait, don't leave!";

    @title("Subtitle")
    @subtitle("i.e. Grow your money with a Cumulus account.")
    @richText(true)
    subtitle: string = "Grow your money with a Cumulus account.";

    @title('CTA Text')
    @subtitle("i.e. Learn More")
    ctaText: string ="Learn More";

    @title('CTA Destination URL')
    @subtitle("Enter a fully qualified destination URL for the CTA (e.g., https://www.cumulusfinserv.com/)")
    ctaUrl: string = "https://cumulusfinserv.com/banking/checking-and-savings";

    @title("Lightbox")
    lightboxEnabled: boolean = true;

    @options([
        {label: "Light on Dark", className: "evg-light-on-dark"},
        {label: "Dark on Light", className: "evg-dark-on-light" }
    ])
    style: StyleField = {label: "Light on Dark", className: "evg-dark-on-light"}

    @title("Background Image URL")
    imageUrl: string = "https://cdn.evergage.com/evergage-content/cumulus/cumulus_growth.jpg";

    run(context: CampaignComponentContext) {
        return {};
    }

}
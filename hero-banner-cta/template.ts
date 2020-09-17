export class StyleField {
    label: string;
    className: string;
}

export class HeroBannerCtaTemplate implements CampaignTemplateComponent {

    @header("Why Use This Template")
    @headerSubtitle("Easily swap out a hero image and test different headers and CTA copy.")

    readonly spacing = " ";

    @header("How to Use This Template")
    @headerSubtitle(`
        Enter the image URL for your asset, select your text styling, and then 
        configure your copy, CTA, and image destination.
    `)

    @title("Background Image URL")
    @subtitle("Replace the placeholder image URL with the image URL for your background image.")
    imageURL: string = "https://cdn.evergage.com/evergage-content/nto/nto_hero_banner_bike.jpg";
  
    @options([
        {label: "Light on Dark", className: "evg-light-on-dark"},
        {label: "Dark on Light", className: "evg-dark-on-light" }
    ])
    @subtitle("Define header and subheader text styling.")
    style: StyleField = {label: "Light on Dark", className: "evg-light-on-dark"};  

    header: string = "New Arrivals in Men's";

    @title("Header Visibility")
    headerVisibility: boolean = true;

    subheader: string = "Check out the latest styles in jackets, footwear, and more!";

    @title("Subheader Visibility")
    subheaderVisibility: boolean = true;

    @title("CTA Text")
    @subtitle("e.g. Shop Now")
    ctaText: string = "SHOP NOW";

    @title("CTA Destination URL")
    @subtitle(`
        Enter a fully qualified destination URL for the CTA 
        (e.g. https://www.northerntrailoutfitters.com).
    `)
    ctaUrl: string = "https://www.northerntrailoutfitters.com/default/men";

    run(context: CampaignComponentContext) {
        return {};
    }

}
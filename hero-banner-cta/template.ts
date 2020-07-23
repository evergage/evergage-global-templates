export class ColorTheme {
    label: string;
    className: string;
}

export class HeroBannerCtaTemplate implements CampaignTemplateComponent {

    @title('Background Image URL')
    imageURL: string = "https://www.northerntrailoutfitters.com/dw/image/v2/BDPX_PRD/on/demandware.static/-/Library-Sites-NTO-SFRASharedLibrary/default/dw37eb7010/images/homepage/home-banner-hero-04-1905-600.jpg"

    @hidden(true)
    contentZone: string = "Homepage | Hero";
  
    @options([
        {label: "Dark text on light background", className: "evg-dark-on-light"},
        {label: "Light text on dark background", className: "evg-light-on-dark"}
    ])
    colorTheme: ColorTheme; 

    header: string = "New Arrivals in Men's";

    subheader: string = "Check out the latest styles in jackets, footwear, and more!";

    @title('CTA Text')
    ctaText: string = "SHOP NOW";

    @title('CTA Destination URL')
    @subtitle("Enter a fully qualified destination URL for the CTA (e.g., https://www.northerntrailoutfitters.com)")
    ctaUrl: string = "/default/men";

    run(context: CampaignComponentContext) {
        return {};
    }

}
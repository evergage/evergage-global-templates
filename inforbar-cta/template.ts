export class ColorTheme {
    label: string;
    className: string;
}

export class InfobarCtaTemplate implements CampaignTemplateComponent {

    @header('Why Use This Template')
    @headerSubtitle('Add an Info Bar to the site to provide a message and/or call-to-action to your visitors at the top or bottom of the site.')

    // /* workaround */
    readonly space = " "

    @header('How to Use This Template')
    @headerSubtitle('Choose your message and add a Call-to-Action.')

    // /* workaround */
    readonly space1 = " "

    @header('Choose Color Theme')
    @headerSubtitle('Pick how you want your bar to display.')
    @options([
    {label: "Dark", className: "evg-light-on-dark"},
    {label: "Light", className: "evg-dark-on-light"}
    ])
    style: ColorTheme = {label: "Light", className: "evg-dark-on-light"}

    // /* workaround */
    readonly space1 = " "

    @header('Choose Content Zone')
    @headerSubtitle('Where will the infobar be located')
    contentZone: "global_infobar_top_of_page" | "global_infobar_bottom_of_page" = "global_infobar_top_of_page"
 
    // /* workaround */
    readonly space2 = " "

    @title("Show message text")
    messageVisibility: boolean = true;
    // /* replace @header & @headerSubtitle with markdown decorator EVG-12152 */
    @header("Message Text")
    @headerSubtitle('Message added to the bar')
    @subtitle("i.e. Become a Rewards Member for Special Offers & Discounts")
    messageText: string = "Become A Rewards Member for Special Offers & Discounts";

    @title("Show CTA")
    ctaVisibility: boolean = true;
    // /* replace @header & @headerSubtitle with markdown decorator EVG-12152 */
    @header("Call-to-Action Button Text")
    @headerSubtitle('The text on the CTA button')
    @subtitle("i.e. Learn More")
    ctaText: string = "Learn More";
    // /* replace @header & @headerSubtitle with markdown decorator EVG-12152 */
    @header('Call-to-Action Button URL')
    @headerSubtitle("i.e. https://cumulusfinserv.com/banking")
    @subtitle("i.e. https://cumulusfinserv.com/banking")
    ctaUrl: string = "https://cumulusfinserv.com/banking";
    
    run(context: CampaignComponentContext) {
        return {};
    }
    
}
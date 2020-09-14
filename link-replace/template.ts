export class LinkReplaceTemplate implements CampaignTemplateComponent {

    @header("Why Use This Template")
    @headerSubtitle(`
        This template will allow you to change the URL of a link (/all links?) on a page to send a visitor to a new
        experience. This can be used in A/B testing to redirect a user to a different experience based on condition(s)
        set in the campaign.
    `)

    readonly spacing1 = " ";

    @header("How To Use This Template")
    @headerSubtitle(`
        Add the full URL that exists on the link by default and the URL that the template should replace with the new
        page or experience to send your visitors. You can create the logic to show this redirect within the campaign.
    `)

    readonly spacing2 = " ";

    @header("Redirect from URL")
    @headerSubtitle("This URL should match exactly the URL that is the default on the site.")
    @title(" ")
    @placeholder("")
    @subtitle("i.e. https://www.example.com/example.html")
    fromUrl: string = ""


    @header("Redirect to URL")
    @headerSubtitle("This URL should match exactly the URL that the visitor should go to if all conditions are met.")
    @title(" ")
    @placeholder("")
    @subtitle("i.e. https://www.example.com/example2.html")
    toUrl: string = ""

    // @hidden(true)
    // contentZone: string = "invisible";

    run(context: CampaignComponentContext) {
        return {
            // contentZone: this.contentZone,
            fromUrl: this.fromUrl,
            toUrl: this.toUrl
        };
    }

}

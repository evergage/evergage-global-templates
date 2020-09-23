export class PageURLReplacementTemplate implements CampaignTemplateComponent {

    @title("Current Link URL")
    @placeholder("")
    @subtitle("Current destination URL for selected element (e.g. https://www.example.com/example.html)")
    currentLinkUrl: string = ""


    @title("Updated Link URL")
    @placeholder("")
    @subtitle("New destination URL for selected element (e.g. https://www.example.com/example2.html)")
    updatedLinkUrl: string = ""

    run(context: CampaignComponentContext) {
        return {
            currentLinkUrl: this.currentLinkUrl,
            updatedLinkUrl: this.updatedLinkUrl
        };
    }

}

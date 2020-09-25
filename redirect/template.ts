export class RedirectTemplate implements CampaignTemplateComponent {

    @title("Redirect to URL")
    @subtitle("i.e. https://www.example.com/example.html")
    redirectUrl: string;

    run(context: CampaignComponentContext) {
        return {
            redirectUrl: this.redirectUrl
        };
    }

}

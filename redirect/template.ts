export class RedirectTemplate implements CampaignTemplateComponent {

    @title("Target Page")
    @subtitle("Requires full URL string including https://, and operates on exact match criteria")
    targetPage: string;

    @title("URL for Redirect")
    @subtitle("New destination. Requires full URL string including https://")
    urlForRedirect: string;

    @title("Redirect with query parameters from original URL")
    maintainQueryParams: boolean = true;

    run(context: CampaignComponentContext) {
        return {};
    }

}

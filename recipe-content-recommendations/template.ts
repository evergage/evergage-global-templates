import { RecommendationsConfig, recommend } from "recs";

export class ContentRecommendationsContentZones {
    name: string;
    label: string;
}

export class RecipeContentRecommendationsTemplate implements CampaignTemplateComponent {

    /**
     * Developer Controls
     */
    @hidden(true)
    maxResults: 4 | 6 = 4;

    /**
     * Business-User Controls
     */
    @options([
        "home_recs",
        "404_error_recs_row",
        "search_recs"
    ])
    contentZone: string = "home_recs";

    @subtitle("i.e. You May Also Like")
    title: string = "You May Also Like";

    @title(" ")
    @subtitle("i.e. Collaborative with Trending")
    recsConfig: RecommendationsConfig = new RecommendationsConfig().restrictItemType("Blog")
    .restrictMaxResults(this.maxResults);

    @title("Show content name")
    nameVisibility: boolean = true;

    @title("Show content description")
    descriptionVisibility: boolean = true;

    @hidden(true)
    visibilityOptions: object;

    run(context:CampaignComponentContext) {

        this.recsConfig.maxResults = this.maxResults;

        return {
            blogs: recommend(context, this.recsConfig)
        }
    }

}
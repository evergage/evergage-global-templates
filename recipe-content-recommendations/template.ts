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
    maximumNumberOfItems: 4 | 6 = 4;

    /**
     * Business-User Controls
     */
    @options([
        "home_recs",
        "search_recs"
    ])
    contentZone: string = "home_recs";

    @title("Title")
    @subtitle("i.e. You May Also Like")
    header: string = "You May Also Like";

    @title(" ")
    @subtitle("i.e. Collaborative with Trending")
    recipe: RecommendationsConfig = new RecommendationsConfig().restrictItemType("Blog")
    .restrictMaxResults(this.maximumNumberOfItems);

    @title("Show content name")
    nameVisibility: boolean = true;

    @title("Show content description")
    descriptionVisibility: boolean = true;

    @hidden(true)
    visibilityOptions: object;

    run(context:CampaignComponentContext) {

        this.recipe.maxResults = this.maximumNumberOfItems;

        return {
            blogs: recommend(context, this.recipe)
        }
    }

}
import { RecommendationsConfig, recommend } from "recs";

export class RecipeContentRecommendationsTemplate implements CampaignTemplateComponent {

    /**
     * Developer Controls
     */
    @hidden(true)
    maximumNumberOfItems: 2 | 4 | 6 = 4;

    /**
     * Business-User Controls
     */

    @title("Recommendations Block Title")
    @subtitle("i.e. You May Also Like")
    header: string = "You May Also Like";

    @title(" ")
    @subtitle("i.e. Collaborative with Trending")
    recsConfig: RecommendationsConfig = new RecommendationsConfig()
        .restrictItemType("Blog")
        .restrictMaxResults(this.maximumNumberOfItems);

    @header('Recommendation Attributes')

    @title("Show content name")
    nameVisibility: boolean = true;

    @title("Show content description")
    descriptionVisibility: boolean = true;

    run(context:CampaignComponentContext) {

        this.recsConfig.maxResults = this.maximumNumberOfItems;

        return {
            itemType: this.recsConfig.itemType,
            blogs: recommend(context, this.recsConfig)
        }
    }

}
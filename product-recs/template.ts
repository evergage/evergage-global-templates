import { RecommendationsConfig, RecipeReference, RecipeReferenceLookup, recommend } from "recs";

export class ProductRecommendationsTemplate implements CampaignTemplateComponent {

    @hidden(true)
    contentZone: string = "Homepage | Product Recommendations";
    // TODO: homepage_product_recommendations

    /** Multiple content zone options */
    // contentZone: "Content Zone 1" | "Content Zone 2";

    @title("Recommendations Row Header")
    header: string;

    @lookupOptions((self) => new RecipeReferenceLookup("Product"))
    @title("Recipe")
    recipeId: RecipeReference;
    maxResults: number = 6;

    run(context: CampaignComponentContext) {
        return {
            products: recommend(context, {
                itemType: "Product",
                maxResults: this.maxResults,
                recipeId: this.recipeId,
                validate: () => true

            } as RecommendationsConfig)
        };
    }
}

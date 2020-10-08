import { ContextualBanditConfig, decide } from "corvus";

export class PromotionImageDimensions {
    label: string;
    width: number;
    height: number;
}

export class EinsteinPromotionsBannerTemplate implements CampaignTemplateComponent {

    @title("Choose Image Size")
    @options([
        { label: "700x300", width: 700, height: 300 },
        { label: "1440x617", width: 1440, height: 617 },
        { label: "2160x450", width: 2160, height: 450 },
        { label: "2800x400", width: 2800, height: 400 }
    ])
    promoSelection: PromotionImageDimensions = { label: "1440x617", width: 1440, height: 617 };

    @hidden(true)
    banditFeatureSubsetId: string = "TdPHw";

    run(context: CampaignComponentContext) {
        let banditConfig: ContextualBanditConfig = {
            maxResults: 1,
            banditFeatureSubsetId: this.banditFeatureSubsetId,
            imageWidth: this.promoSelection.width,
            imageHeight: this.promoSelection.height,
        } as ContextualBanditConfig;
        let promo = decide(context, banditConfig, null)[0] as Promotion;

        return promo == null ? {} : {
                promotion: promo as Promotion,
                promotionImageUrl: promo.images[`${banditConfig.imageWidth}x${banditConfig.imageHeight}`].imageUrl
            };
    }

}

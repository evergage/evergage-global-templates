import { ContextualBanditConfig, decide } from "corvus";

export class EinsteinDecisionsTemplate implements CampaignTemplateComponent {

    run(context: CampaignComponentContext) {
        const banditConfig: ContextualBanditConfig = {
            maxResults: 1,
            contentZone: context.contentZone
        } as ContextualBanditConfig;

        const promotion = decide(context, banditConfig, null)[0] as Promotion;

        return promotion == null ? {} : { promotion };
    }

}

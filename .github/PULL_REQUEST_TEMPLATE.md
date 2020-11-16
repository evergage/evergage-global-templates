# Description

<!-- A brief description of changes in this PR -->

## Related Issues/Tickets

<!--
    Link to any and all tickets from GUS, Org62,
    Zendesk, etc. which are addressed in this PR
-->

## How to test

#### Template:
- You can view the demo template in account:dataset, **template name: TEMPLATE_NAME**.

#### Campaign:
- You can view the demo campaign using this template in account:dataset, **campaign name: CAMPAIGN_NAME**
_Note: you will need to force the SDK using this URL: SDK_URL_

<!-- Steps for how to test your changes -->

### Things to check for:
* **Visuals:** Does it look good across different client sites? To test this, you can copy, paste, and run this snippet in the JS console: GITHUB_GIST (see [template snippet](https://gist.github.com/nriserEG/fcfe7ab7e04d51dbf9cb19fc0476d474).)
* **Mobile/smaller screen responsiveness:** Does the Template generally look good on smaller screens?
* **WCAG compliant:** Does the template contain ARIA attributes and/or use semantic elements for web accessibility? You can use the [WAVE Chrome extension tool](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh) for a quick check.
* **Template-specific documentation**: Is there sufficient information for a Template Developer to use the Global Template and customize it for their own use?
* **FlickerDefender**: Is the page being fully hidden until the following page?
* **Campaign stats tracking:** Do impression stats and click stats fire for both the Control and Test experience?

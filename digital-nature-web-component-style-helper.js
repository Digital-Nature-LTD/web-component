export default class DigitalNatureWebComponentStyleHelper
{
    /**
     * Formats the input of a CSSStyleSheet, a string of css or a URL
     * as a CSSStyleSheet for adoption by the component
     *
     * @param component DigitalNatureWebComponent
     * @param stylesheet
     * @returns {CSSStyleSheet|null}
     */
    static async adopt(component, stylesheet)
    {
        let adoptedStylesheet;

        if (typeof stylesheet === 'string') {
            if (!stylesheet.includes('{')) {
                // assume include from file
                const response = await fetch(stylesheet);

                if (response) {
                    stylesheet = await response.text();
                }
            }

            adoptedStylesheet = new CSSStyleSheet();
            adoptedStylesheet.replaceSync(stylesheet);
        } else {
            adoptedStylesheet = stylesheet;
        }

        if (adoptedStylesheet instanceof CSSStyleSheet) {
            component.shadowRoot.adoptedStyleSheets.push(adoptedStylesheet);
            return true;
        }

        console.error('Failed to load stylesheet:', stylesheet, 'is not a valid CSSStyleSheet or string');
        return false;
    }
}
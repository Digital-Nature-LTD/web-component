export default class DigitalNatureWebComponent extends HTMLElement
{
    options = {
        template: null,
        mode: 'open',
        attachShadow: true,
    }

    constructor(options = {}) {
        super();

        // merge in new options
        this.options = {...this.options, ...options};

        if (this.options.attachShadow) {
            this.attachShadow({mode: this.options.mode});
        }

        if (this.options.template) {
            // get the template and attach shadow dom with that content
            let templateElement = document.createElement('template');
            templateElement.innerHTML = this.options.template;
            this.shadowRoot.appendChild(templateElement.content.cloneNode(true));
        }

        if (this.options.stylesheets) {
            let adoptedStylesheets = [];

            options.stylesheets.forEach(stylesheet => {
                let adoptedStylesheet;

                if (typeof stylesheet === 'string') {
                    adoptedStylesheet = new CSSStyleSheet();
                    adoptedStylesheet.replaceSync(stylesheet);
                } else {
                    adoptedStylesheet = stylesheet;
                }

                if (adoptedStylesheet instanceof CSSStyleSheet) {
                    adoptedStylesheets.push(adoptedStylesheet);
                } else {
                    console.error('Failed to load stylesheet:', stylesheet, 'is not a valid CSSStyleSheet or string');
                }
            });

            if (adoptedStylesheets.length > 0) {
                this.shadowRoot.adoptedStyleSheets = adoptedStylesheets;
            }
        }
    }

    static create(options = {})
    {
        if (!this.tagName) {
            throw new Error('tagName is not defined');
        }

        return new this(options);
    }

    /**
     * Sets the contents of the slot to the given element
     *
     * @param {string} slotName
     * @param {HTMLElement} element
     */
    setSlotContent(slotName, element)
    {
        let slot = this.#getSlotByName(slotName);

        if (!slot) {
            return false;
        }

        // clear it
        slot.innerHTML = '';
        // add new content
        slot.appendChild(element);

        return true;
    }

    /**
     * Sets the textContent attribute of the slot to the given value
     *
     * @param {string} slotName
     * @param {string} content
     * @return boolean
     */
    setSlotTextContent(slotName, content)
    {
        let slot = this.#getSlotByName(slotName);

        if (!slot) {
            return false;
        }

        slot.textContent = content;

        return true;
    }

    /**
     * @param {string} slotName
     * @return null|HTMLElement
     */
    #getSlotByName(slotName)
    {
        let slot = this.shadowRoot.querySelector(`slot[name="${slotName}"]`);

        if (!slot) {
            console.error(`Slot ${slotName} does not exist`);
            return null;
        }

        return slot;
    }

    /**
     * Allows simple handling of events.
     *
     * If a handler exists for the event type, then it will be called.
     * If not, then an error will be thrown.
     *
     * The event will be passed to the handler.
     *
     * The handler should be named `handle<EventType>` where EventType is the
     * event type in camel case - e.g. handleClick, handleKeydown, handleScroll etc.
     *
     * @param {event} event
     * @return void
     */
    handleEvent(event) {
        let capitalisedEventType = event.type.charAt(0).toUpperCase() + event.type.slice(1);

        if (typeof this[`handle${capitalisedEventType}`] === "function") {
            this[`handle${capitalisedEventType}`](event);
        } else {
            console.error(`No handler for event ${event.type}`);
        }
    }

}

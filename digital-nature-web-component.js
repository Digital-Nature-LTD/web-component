import styleHelper from './digital-nature-web-component-style-helper.js';

export default class DigitalNatureWebComponent extends HTMLElement
{
    options = {
        template: null,
        mode: 'open',
        attachShadow: true,
        stylesheets: [],
    }

    constructor(options = {}) {
        super();

        let component = this;

        // merge in new options
        this.options = {...this.options, ...options};

        if (this.options.attachShadow) {
            this.attachShadow({mode: this.options.mode});

            let allStyles = this.getAdoptedStyles().concat(this.options.stylesheets);

            allStyles.map(this.adopt.bind(this));
        }

        if (this.options.template) {
            // get the template and attach shadow dom with that content
            let templateElement = document.createElement('template');
            templateElement.innerHTML = this.options.template;
            this.shadowRoot.appendChild(templateElement.content.cloneNode(true));
        }
    }

    /**
     * Adopts the given stylesheet, formatted using the helper
     *
     * @param stylesheet
     */
    adopt(stylesheet) {
        styleHelper.adopt(this, stylesheet);
    }

    /**
     * This can be overwritten per component to include stylesheets or strings of
     * css into the shadow root
     *
     * @returns {*[]}
     */
    getAdoptedStyles() {
        return [];
    }

    /**
     * Creates an instance of the component
     *
     * @param options
     * @returns {DigitalNatureWebComponent}
     */
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

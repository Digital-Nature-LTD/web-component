# Digital Nature - Web Component
This package contains a single base class for use with Web Components. This class comes with some configuration options and utility methods for use in your extending web component class.


## Usage

### Simple usage
```javascript
import DigitalNatureWebComponent from "@digital-nature-ltd/web-component";

class MyNewComponent extends DigitalNatureWebComponent {
    constructor() {
        super({
            options: gohere
        });
    }
}

customElements.define('my-new-component', MyNewComponent);
// can be used <my-new-component></my-new-component>
```

### Template usage
HTML/CSS can be added directly into an HTML file for improved readability, this can be imported and passed into the web component constructor
```javascript
import DigitalNatureWebComponent from "@digital-nature-ltd/web-component";
// remember the ?raw param when including HTML directly
import myComponentTemplate from "./templates/my-new-component-template.html?raw"

class MyNewComponent extends DigitalNatureWebComponent {
    constructor() {
        super({
            template: myComponentTemplate
        });
    }
}

customElements.define('my-new-component', MyNewComponent);
// can be used <my-new-component></my-new-component> - will contain the contents of your template
```

### Handling events
Your custom component will be able to handle any js events with a `handleEventtype` functions, e.g. `handleClick`

```javascript
import DigitalNatureWebComponent from "@digital-nature-ltd/web-component";

class MyNewComponent extends DigitalNatureWebComponent {
    constructor() {
        super({
            options: gohere
        });

        // add the event listener with any type, pass `this` in as the handler
        this.addEventListener("click", this);
    }

    // function name should be `handle` followed by the event type.
    // note that the event type first letter will be capitalised
    handleClick (event)
    {
        console.log('You clicked the custom element');
    }
}

customElements.define('my-new-component', MyNewComponent);
// can be used <my-new-component></my-new-component> - clicking on the component will run the handleClick function and log to console
```


## Configuration
When calling the base component constructor you can pass in a configuration object, the available options are listed below

### Example
```javascript
{
    attachShadow: false, // default true,
    shadowMode: 'open', // default 'open'
    template: "<div>My component <em>has some content</em></div>",
}
```

### attachShadow
Decides whether to attach the shadow DOM for this component

### shadowMode
If you are attaching the shadow DOM then this controls the mode, options are `open` or `closed`

### template
The template should be a string of HTML

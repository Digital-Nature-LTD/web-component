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

### Creating a new web component in js
Extending components should have a static tagName property set.

```javascript
// MyNewComponent.js
class MyNewComponent extends DigitalNatureWebComponent {
    static tagName = 'my-new-component';
}
```

The base web component class comes with a static helper method `create` that will create a new instance of the extending component and return it.
```javascript
// some-other-js-file.js
// create the element
let myComponentInstance = MyNewComponent.create({
    // you can pass in options here, e.g. template, attachShadow, shadowMode
    template: "<div>My component <em>has some content</em></div>"
});
// add it to the page
document.appendChild(myComponentInstance);
```

### Adopted stylesheets
Stylesheets can be adopted in 3 ways, giving flexibility over how you style the component globally whilst retaining the ability to style components individually. 

#### What can be adopted?
- A css file, by url
- css rules in a string
- a `CSSStyleSheet`

#### Styles for all instance of your component
Add the `getAdoptedStyles` function to your component, it should return an array of the items to be adopted
```javascript
class MyNewComponent extends DigitalNatureWebComponent {
    getAdoptedStyles() {
        return [
            "/path/to/your/css/file.css",
            "div { background: blue; }"
        ];
    }
}
```

#### Styles passed as options
Pass in a stylesheets option when using the static `create` method.
```javascript
let myComponentInstance = MyNewComponent.create({
    stylesheets: [
        "/path/to/your/css/file.css",
        "div { background: red; }"
    ]
});
```

#### Styles passed in direct to instance of component
Components have an `adopt` method, note that this accepts only one rule at a time
```javascript
let oneParticularComponent = document.querySelector('my-new-component#the-one');
oneParticularComponent.adopt("div { background: purple; }");
```


## Configuration
When calling the base component constructor you can pass in a configuration object, the available options are listed below

### Example
```javascript
{
    attachShadow: false, // default true
    shadowMode: 'open', // default 'open'
    template: "<div>My component <em>has some content</em></div>",
    stylesheets: [adoptedStylesheet, "div { color: red !important; }"]
}
```

### attachShadow
Decides whether to attach the shadow DOM for this component

### shadowMode
If you are attaching the shadow DOM then this controls the mode, options are `open` or `closed`

### template
The template should be a string of HTML

### stylesheets
An array of stylesheets to be adopted by the component, either as a URL string, a CSS string or an instance of `CSSStyleSheet`

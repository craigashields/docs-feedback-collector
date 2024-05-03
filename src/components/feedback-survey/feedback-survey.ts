//This file will be the web component
//It only needs to run, not be imported by main.js

const template = document.createElement("template") as HTMLTemplateElement;
template.innerHTML = `
    <style>
    :host {
      /* Font sizes */
      --font-size-sm: 0.85rem;
      --font-size-base: 1rem; /* 16px if 1rem = 16px */
      --font-size-lg: 1.25rem; /* 20px */
      --font-size-sm: 0.875rem; /* 14px */
    
      /* Font weights */
    
      /* Color palette */
      --color-primary: #007fa1;
      --color-secondary: #d3d3d3;
      --color-text-header: rgb(2 6 23);
      --color-text-base: rgb(100 116 139);
      --color-error: #dc3545;
    
      /* Spacing */
      --spacing-xs: 0.25rem;
      --spacing-sm: 0.5rem;
      --spacing-md: 1rem;
      --spacing-lg: 1.5rem;
      --spacing-xl: 3rem;
      --spacing-2xl: 3.75rem;
    
      /* Component specific */
      --button-padding: 0.375rem 0.75rem;
      --button-border-radius: 0.25rem;
    }

div#fb-survey {
  margin: 60px 0 34px 0;
  padding: 0 var(--spacing-lg);
  text-align: center;
  max-width: 720px;
  border-left: solid 1px var(--color-secondary);
}

.fb-question {
  font-size: var(--font-size-base);
  font-weight: 600;
}

.fb-question__para {
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-xs);
}

a.fb-button__yes,
a.fb-button__no {
  text-decoration: none !important;
}

a.fb-button {
  border: solid 1px var(--color-primary);
  border-radius: var(--button-border-radius);
  margin: var(--spacing-sm);
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-size: var(--font-size-sm);
  font-weight: 400;
  line-height: var(--spacing-md);
  cursor: pointer;
  max-height: 2rem;
  padding: 8px 12px;
  width: 28px;
  min-width: 50px;
  justify-content: center;
}

.fb-button svg {
  margin-right: 8px; /* Space between icon and text */
}

.thumb path {
  stroke: var(--color-primary); /* Change to any color you like */
}

/* Hover styling for the anchor tag */
.fb-button:hover {
  background-color: var(--color-primary); /* Darker blue on hover */
}

/* Hover styling for the text span within the anchor tag */
.fb-button:hover span {
  color: white;
}

.fb-button:hover svg path {
  stroke: white;
}

    </style>
    <div id="fb-survey">
      <div class="fb-question">
          <p class="fb-question__para">Did you find this helpful?</p>
          <div class="fb_button__container">
              <a class="fb-button fb-button__yes" href="javascript:void(0)" title="Yes, this page was helpful." alt="Yes, this page was helpful.">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" class="thumb">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475"/>
                </svg>
                <span>Yes</span>
              </a>
              <a class="fb-button fb-button__no" href="javascript:void(0)" title="No, this page was not helpful." alt="No, this page was not helpful.">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" class="thumb">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13c-.889.086-1.416.543-2.156 1.057a22.322 22.322 0 0 0-3.958 5.084 1.6 1.6 0 0 1-.582.628 1.549 1.549 0 0 1-1.466.087 1.587 1.587 0 0 1-.537-.406 1.666 1.666 0 0 1-.384-1.279l1.389-4.114M17 13h3V6.5A1.5 1.5 0 0 0 18.5 5v0A1.5 1.5 0 0 0 17 6.5V13Zm-6.5 1H5.585c-.286 0-.372-.014-.626-.15a1.797 1.797 0 0 1-.637-.572 1.873 1.873 0 0 1-.215-1.673l2.098-6.4C6.462 4.48 6.632 4 7.88 4c2.302 0 4.79.943 6.67 1.475"/>
                </svg>
                <span>No</span>
              </a>
          </div>
      </div>
    </div>
`;

class FeedbackSurvey extends HTMLElement {
  private actionFunction: ((event: Event) => void) | undefined; // Declare the action function property
  private shadow: ShadowRoot;
  private buttons: NodeListOf<Element> | null = null; // Cache for buttons

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "closed" });
    let clone = template.content.cloneNode(true);
    this.shadow.append(clone);
  }

  connectedCallback() {
    if (!this.buttons) {
      // Cache the buttons only if they haven't been cached before
      this.buttons = this.shadow.querySelectorAll(".fb-button");
    }
    this.resolveActionFunctionAndAddListeners();
  }

  private async resolveActionFunctionAndAddListeners(): Promise<void> {
    await this.resolveActionFunction(); // Wait for action function resolution
    this.addEventListeners(); // Once resolved, add event listeners
  }

  private async resolveActionFunction(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.actionFunction =
        this.action && typeof (window as any)[this.action] === "function"
          ? (window as any)[this.action]
          : this.defaultAction;
      resolve(); // Resolve the promise once action function is set
    });
  }

  private addEventListeners(): void {
    // Remove event listeners from cached buttons
    if (!this.buttons) {
      return;
    }
    this.buttons!.forEach((button) => {
      button.removeEventListener("click", this.handleClick.bind(this));
    });

    // // Add event listeners to cached buttons
    this.buttons!.forEach((button) => {
      button.addEventListener("click", this.handleClick.bind(this));
    });
  }

  private handleClick(event: Event): void {
    event.preventDefault;
    if (this.actionFunction) {
      this.actionFunction(event);
    }
  }

  private defaultAction(event: Event): void {
    console.log("Default action triggered", event);
  }

  // Attributes and Properties...
  static get observedAttributes(): string[] {
    return ["action"];
  }

  get action(): string | null {
    return this.getAttribute("action");
  }

  set action(value: string | null) {
    if (value) {
      // Ensure the value is not null or undefined
      this.setAttribute("action", value);
    }
  }

  attributeChangedCallback(
    attributeName: string,
    oldVal: string | null,
    newVal: string | null
  ): void {
    if (attributeName === "action") {
      if (oldVal === newVal) {
        return;
      }
      this.action = newVal;
      this.resolveActionFunction();
      this.addEventListeners(); // Re-attach listeners to handle action changes
    }
  }
}

customElements.define("feedback-survey", FeedbackSurvey);

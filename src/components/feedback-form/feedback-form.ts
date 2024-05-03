//This file will be the web component
//It only needs to run, not be imported by main.js

const feedbackForm = document.createElement("template") as HTMLTemplateElement;
feedbackForm.innerHTML = `
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
      
      .fb-modal,
      .fb-modal::before,
      .fb-modal::after {
        box-sizing: border-box;
      }
      
      .fb-modal {
        border: none;
        line-height: 1.4;
        background-color: #fff;
        border-radius: var(--button-border-radius);
        box-shadow: 0 8px 8px rgba(0, 17, 44, 0.04), 0 2px 4px rgba(0, 17, 44, 0.08);
        cursor: initial;
        flex-direction: column;
        max-height: calc(100% - 96px);
        position: fixed;
        width: 350px !important;
      }
      
      .fb-button__close,
      .fb-button__close::before,
      .fb-button__close::after {
        box-sizing: border-box;
      }
      
      .fb-modal::backdrop {
        background-color: rgba(0, 17, 44, 0.4);
      }
      
      .fb-button__close {
        background-color: transparent;
        position: absolute;
        cursor: pointer;
        display: inline-flex;
        padding: var(--spacing-sm);
        min-width: auto;
        border: none;
        border-radius: var(--button-border-radius);
        top: 16px;
        right: 12px;
        z-index: 100;
      }
      
      .fb-button__close:hover {
        background-color: var(--color-primary);
        color: #fff;
      }
      
      .fb-modal__header {
        padding: 24px;
      }
      
      .fb-heading {
        font-size: 16px;
        font-weight: 600;
      }
      
      .fb-modal__header ~ .fb-modal__content {
        padding-top: 0;
      }
      
      .fb-modal__content {
        flex: 1;
        overflow-y: auto;
        padding: 24px;
      }
      
      .fb-modal__content > *:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
      }
      
      .fb-modal__content > *:first-child {
        margin-top: 0;
        padding-top: 0;
      }
      
      .fb-input-radio,
      .fb-input-radio::before,
      .fb-input-radio::after {
        box-sizing: border-box;
      }
      
      .feedback-component__modal--input-radio {
        display: block;
        padding: 4px 0;
      }
      
      .fb-input-radio {
        color: #00112c;
        font-size: 14px;
        font-weight: 100;
        line-height: 1.4;
      }
      
      .fb-input-radio__label {
        cursor: pointer;
        line-height: 24px;
        margin-right: 10px;
        padding-left: 8px;
        vertical-align: baseline;
      }
      
      .fb-input-radio__input:checked {
        background: var(--color-primary);
        border-color: var(--color-primary);
      }
      
      [type="checkbox"],
      [type="radio"] {
        box-sizing: border-box;
        padding: 0;
      }
      
      .fb-input-radio__input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: #fff;
        border: 1px solid #dce0e5;
        border-radius: 12px;
        cursor: pointer;
        display: inline-block;
        flex-basis: 16px;
        height: 16px;
        margin: 0;
        min-width: 16px;
        outline: none;
        position: relative;
        top: 3px;
        width: 16px;
      }
      
      .fb-input-radio__input:checked::before {
        opacity: 1;
        transform: scale(1);
      }
      
      .fb-input-radio__input::before {
        background: #fff;
        border-radius: 12px;
        content: "";
        display: block;
        height: 6px;
        left: 4px;
        opacity: 0;
        position: absolute;
        top: 4px;
        transform: scale(0);
        transition: transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
        width: 6px;
      }
      
      .fb-input-radio__input::after {
        bottom: -4px;
        content: "";
        display: block;
        left: -4px;
        position: absolute;
        right: -4px;
        top: -4px;
      }
      
      .feedback-component__modal--label {
        display: block;
        color: #20304c;
        padding: 8px 0;
        font-size: 13px;
      }
      
      .u-font-size-small {
        font-size: 13px !important;
      }
      
      .fb-field,
      .fb-field::before,
      .fb-field::after {
        box-sizing: border-box;
      }
      
      .fb-field {
        color: #00112c;
        min-height: 40px;
        appearance: none;
        background-color: #fff;
        border: 1px solid #dce0e5;
        border-radius: 6px;
        display: inline-block;
        font-size: 16px;
        font-weight: 100;
        height: auto;
        line-height: 1.4;
        margin: 0;
        outline: 0;
        padding: 8px 16px;
        resize: vertical;
        vertical-align: baseline;
      }
      
      .feedback-component__modal--textarea {
        width: 100%;
        height: 128px;
        font-size: 13px;
        margin: 8px 0 0 0;
      }
      
      textarea {
        overflow: auto;
      }
      
      .feedback-component__modal--submit-button {
        margin-top: 24px;
        text-align: center;
        align-items: center;
      }
      
      .fb-button__submit {
        font-family: fakt, -apple-system, blinkmacsystemfont, "Segoe UI", roboto,
          oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        align-items: center;
        background: none;
        border: none;
        cursor: pointer;
        display: inline-flex;
        justify-content: center;
        line-height: 1;
        margin: 0;
        outline: none;
        text-decoration: none;
        user-select: none;
        vertical-align: baseline;
        white-space: nowrap;
        background-color: var(--color-primary);
        border-radius: 6px;
        color: #fff;
        font-size: 16px;
        font-weight: 600;
        height: 40px;
        padding: 0 16px;
        position: relative;
        transition: background-color 0.3s ease, transform 0.3s ease; /* Smooth transition for background and transform */
        transition-property: color, background-color, box-shadow;
      }
      
      .fb-button__submit:hover {
        transform: scale(1.05); /* Scale up by 5% */
      }
      
      .fb-modal__thanks, .fb-modal__error {
        padding: 30px 24px;
      }

      .fb-thanks, .fb-error {
        display: inline-flex;
        align-items: center;
        justify-content: center;

      }
      .fb-modal__thanks svg {
        margin-right: 16px; /* Space between icon and text */
        fill: var(--color-primary);
      }

      .fb-modal__error svg {
        margin-right: 16px; /* Space between icon and text */
        fill: var(--color-error);
      }

      .fb-modal__error p {
        margin-bottom: 0
      }
      </style>
      <dialog id="feedback-dialog" class="fb-modal">
        <button id="close-dialog" type="button" title="Close window" class="fb-button__close">
            <svg width="16" height="16">
                <use xlink:href="#x" />
            </svg>
        </button>
        <div id="positive" class="feedback-section" style="display:none" >
            <div class="fb-modal__header">
                <div class="fb-heading">Why was this page helpful?</div>
            </div>
            <div class="fb-modal__content">
                <form method="POST">
                <input type="hidden" name="feedbackType" value="positive"/>
                    <div class="options-container">
                    </div>
                    <label class="feedback-component__modal--label u-font-size-small" for="feedback">Comments (optional):
                        <textarea class="fb-field feedback-component__modal--textarea" id="feedback" name="feedbackComment" rows="4" cols="50"></textarea>        
                    </label>
                    <div class="feedback-component__modal--submit-button">
                        <button type="submit" class="fb-button__submit">Submit</button>			
                    </div>
                </form>
            </div>
        </div>
        <div id="negative" class="feedback-section" style="display:none">
            <div class="fb-modal__header">
                <div class="fb-heading">Why was this page not helpful?</div>
            </div>
            <div class="fb-modal__content">
                <form method="POST">
                  <input type="hidden" name="feedbackType" value="negative"/>
                    <div class="options-container">

                  </div>
                  <label class="feedback-component__modal--label u-font-size-small" for="feedback">Comments (optional):
                      <textarea class="fb-field feedback-component__modal--textarea" id="feedback" name="feedbackComment" rows="4" cols="50"></textarea>        
                  </label>
                  <div class="feedback-component__modal--submit-button">
                      <button type="submit" class="fb-button__submit">Submit</button>			
                  </div>
                </form>
            </div>	
        </div>
        <div id="fb-thanks" class="feedback-section" style="display:none">
            <div class="fb-modal__thanks">
              <div class="fb-thanks">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
                </svg>
                <span class="fb-heading">Thank you for providing feedback.</span>
              </div>
            </div>
        </div>
        <div id="fb-error" class="feedback-section" style="display:none">
            <div class="fb-modal__error">
              <div class="fb-thanks">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clip-rule="evenodd"/>
                </svg>
                <span class="fb-heading">We're really sorry but something went wrong</span>
              </div>
              <p>Please contact <a href="mailto:example@example.com">Support</a> to register your feedback.</p>
            </div>
        </div>
    </dialog>	
    <!-- Close button -->
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="x" viewBox="0 0 16 16">
    <path d="m1 1 14 14m0-14-14 14" stroke="currentColor" stroke-width="2" />
    </symbol>
    </svg>
`;

class FeedbackForm extends HTMLElement {
  private _positiveOptions: string[] = [];
  private _negativeOptions: string[] = [];
  private onSubmitCallback: ((formData: FormDataObject) => void) | undefined;
  private forms: NodeListOf<Element> | null = null; // Cache for buttons

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      let clone = feedbackForm.content.cloneNode(true);
      this.shadowRoot.append(clone);
    } else {
      console.error("Failed to create shadow root.");
    }
  }

  connectedCallback() {
    if (this.shadowRoot) {
      if (!this.forms) {
        // Cache the forms only if they haven't been cached before
        this.forms = this.shadowRoot.querySelectorAll("#feedback-dialog form");
      }

      /* attach close button listener */
      const closeBtn = this.shadowRoot.querySelector("#close-dialog");
      if (!closeBtn) {
        console.log("close button does not exist");
        return;
      }
      closeBtn.addEventListener("click", () => this.closeDialog());

      if (this instanceof HTMLElement) {
        this.addEventListener("keydown", function (event: KeyboardEvent) {
          if (event.key === "Escape") {
            // Close the dialog
            this.removeAttribute("open");
          }
        });
      }

      this.resolveSubmitFunctionAndAddListeners();
      this.renderOptions();
    }
  }

  open() {
    const dialog = this.shadowRoot?.getElementById(
      "feedback-dialog"
    ) as HTMLDialogElement;
    if (dialog instanceof HTMLDialogElement) {
      dialog.showModal();
    } else {
      console.error("Dialog element is not an HTMLDialogElement or not found!");
    }
  }

  closeDialog() {
    const dialog = this.shadowRoot?.getElementById(
      "feedback-dialog"
    ) as HTMLDialogElement;
    if (dialog instanceof HTMLDialogElement) {
      this.removeAttribute("open");
      dialog.close();
    } else {
      console.error("Dialog element is not an HTMLDialogElement or not found!");
    }
  }

  renderOptions() {
    if (this._positiveOptions.length > 0) {
      this.updateOptions("positive", this._positiveOptions);
    }
    if (this._negativeOptions.length > 0) {
      this.updateOptions("negative", this._negativeOptions);
    }
  }

  private async resolveSubmitFunctionAndAddListeners(): Promise<void> {
    await this.resolveSubmitFunction(); // Wait for submit function resolution
    this.addEventListeners(); // Once resolved, add event listeners
  }

  private async resolveSubmitFunction(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.onSubmitCallback =
        this.submitCallback &&
        typeof (window as any)[this.submitCallback] === "function"
          ? (window as any)[this.submitCallback]
          : this.defaultAction;
      resolve(); // Resolve the promise once action function is set
    });
  }

  private addEventListeners(): void {
    // Remove event listeners from cached buttons
    if (!this.forms) {
      return;
    }
    // // remove event listeners to cached forms
    this.forms!.forEach((form) => {
      form.removeEventListener("submit", this.handleClick.bind(this));
    });

    // // Add event listeners to cached forms
    this.forms!.forEach((form) => {
      form.addEventListener("submit", this.handleClick.bind(this));
    });
  }

  private handleClick(event: Event): void {
    event.preventDefault(); // Prevent the default form submission behavior
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const formObject: Record<string, FormDataEntryValue> = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    if (this.onSubmitCallback) {
      this.onSubmitCallback(formObject);
    }
  }

  private defaultAction(event: Event): void {
    console.log("Default action triggered", event);
  }

  // Dynamically generate radio button inputs for given options
  updateOptions(type: "positive" | "negative", options: string[]) {
    if (!this.shadowRoot) return;

    const container = this.shadowRoot.querySelector(
      `#${type} .fb-modal__content form .options-container`
    );

    if (!container) return;

    container.innerHTML = ""; // Clear existing options if any

    options.forEach((option) => {
      const label = document.createElement("label");
      label.className = "fb-input-radio feedback-component__modal--input-radio";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "option";
      input.value = option;
      input.className = "fb-input-radio__input";

      const span = document.createElement("span");
      span.className = "fb-input-radio__label";
      span.textContent = option;

      label.appendChild(input);
      label.appendChild(span);
      container.appendChild(label);
    });
  }

  updateVisibleSection(sectionId: string) {
    const sections = this.shadowRoot?.querySelectorAll(".feedback-section");
    if (!sections) {
      console.log("no sections available");
      return;
    }
    sections.forEach((section) => {
      // Cast each section to HTMLElement to access the style property
      if (section instanceof HTMLElement) {
        section.style.display = "none";
      }
    });
    const activeSection = this.shadowRoot?.querySelector(`#${sectionId}`);
    if (activeSection instanceof HTMLElement) {
      activeSection.style.display = "block";
    }
  }

  parseOptions(options: string): string[] {
    try {
      return JSON.parse(options);
    } catch (e) {
      console.error("Failed to parse options:", e);
      return [];
    }
  }
  // Attributes and Properties...
  static get observedAttributes() {
    return [
      "positive-options",
      "negative-options",
      "open",
      "visible-section",
      "onsubmit-callback",
    ];
  }

  get submitCallback(): string | null {
    return this.getAttribute("onsubmit-callback");
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case "positive-options":
        if (oldValue !== newValue) {
          this._positiveOptions = this.parseOptions(newValue);
          this.updateOptions("positive", this._positiveOptions);
        }
        break;
      case "negative-options":
        if (oldValue !== newValue) {
          this._negativeOptions = this.parseOptions(newValue);
          this.updateOptions("negative", this._negativeOptions);
        }
        break;
      case "open":
        if (oldValue !== newValue) {
          newValue === "true" ? this.open() : this.closeDialog();
        }
        break;
      case "visible-section":
        if (oldValue !== newValue) {
          this.updateVisibleSection(newValue);
        }
        break;
      case "onsubmit-callback":
        if (oldValue !== newValue) {
          this.resolveSubmitFunction();
          this.addEventListeners(); // Re-attach listeners to handle action changes
        }
        break;
    }
  }
}

customElements.define("feedback-form", FeedbackForm);

declare global {
  interface Window {
    initializeFeedback: () => void;
    collectFeedback: (event: Event) => void;
    registerFeedback: (formData: FormDataObject) => void;
    dataLayer: any[];
  }
}

export {};

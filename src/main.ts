import {
  createFeedbackForm,
  showFeedbackFormWithOptions,
  showConfirmation,
  showError,
} from "./components/feedback-form/index";
import { createFeedbackSurvey } from "./components/feedback-survey/index";
import { logFormEvent } from "./utils/feedback-utils";

if (typeof window.initializeFeedback !== "function") {
  window.initializeFeedback = function () {
    console.log("Initialize Feedback");

    const dialogId = "fb-dialog";

    function collectFeedback(event: Event): void {
      const target = event.target as HTMLElement;
      const anchor = target.closest("a");

      if (!anchor) return;

      const feedbackType = anchor.classList.contains("fb-button__no")
        ? "negative"
        : "positive";

      showFeedbackFormWithOptions(dialogId, feedbackType);
    }

    function registerFeedback(formData: Record<string, FormDataEntryValue>) {
      const formProps: LogFormProps = {
        feedbackType:
          typeof formData["feedbackType"] === "string"
            ? formData["feedbackType"]
            : "",
        feedbackOption:
          typeof formData["option"] === "string" ? formData["option"] : "",
        feedbackComment:
          typeof formData["feedbackComment"] === "string"
            ? formData["feedbackComment"]
            : "",
      };
      try {
        logFormEvent(formProps);
        showConfirmation(dialogId, false);
      } catch (err) {
        showError(dialogId);
      }
    }

    window.collectFeedback = collectFeedback;
    window.registerFeedback = registerFeedback;

    /*
    Set up feedback dialog
    */
    const feedbackFormProps: FeedbackFormProps = {
      "positive-options":
        '["Solved my problem","Easy to understand","Good examples","Other"]',
      "negative-options":
        '["Could not find information","Too complicated","Did not understand terms used","Problem with the code","Other"]',
      open: "false",
      "visible-section": "positive",
      "onsubmit-callback": "registerFeedback",
    };

    // Create a new instance of the feedback-form dialog component
    const feedbackForm = createFeedbackForm(feedbackFormProps, dialogId);
    /*
    Set up feedback survey
    */
    const feedbackSurveyProps: FeedbackSurveyProps = {
      action: "collectFeedback",
    };
    // Create a new instance of the feedback-survey component
    const feedbackSurvey = createFeedbackSurvey(feedbackSurveyProps);

    /* 
        get containers to determine which site we are on
        element with id of 'fb-container' for madcap sites
        element with classes .vp-article__aside-right.no-print for confluence sites.
    */

    /* 
        insert dialog
    */
    const madcapDialogContainer = document.getElementById("fbd-container");
    const confluenceDialogContainer = document.getElementById(
      "article-inner-content"
    );

    if (madcapDialogContainer) {
      madcapDialogContainer.appendChild(feedbackForm);
    } else if (confluenceDialogContainer) {
      confluenceDialogContainer.insertAdjacentElement(
        "beforeend",
        feedbackForm
      );
    } else {
      console.log("no container available");
    }

    /* 
        insert survey
    */

    const madcapSurveyContainer = document.getElementById("fb-container");
    const confluenceSurveyContainer = document.querySelector(
      ".vp-article__aside-right.no-print"
    );

    if (madcapSurveyContainer) {
      madcapSurveyContainer.appendChild(feedbackSurvey);
    } else if (confluenceSurveyContainer) {
      confluenceSurveyContainer.insertBefore(
        feedbackSurvey,
        confluenceSurveyContainer.firstChild
      );
    } else {
      console.log("no container available");
    }
  };
}

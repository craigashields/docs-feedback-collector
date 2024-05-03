import "./feedback-form";
import { createElement, setAttributes } from "../../utils/dom-utils";

export function createFeedbackForm(
  props: FeedbackFormProps,
  id: string
): HTMLElement {
  const feedbackForm = createElement("feedback-form", id);
  setAttributes(feedbackForm, {
    "positive-options": props["positive-options"],
    "negative-options": props["negative-options"],
    open: props.open,
    "visible-section": props["visible-section"],
    "onsubmit-callback": props["onsubmit-callback"],
  });

  return feedbackForm;
}

export function showFeedbackFormWithOptions(
  id: string,
  feedbackType: "positive" | "negative"
) {
  const dialog = document.getElementById(id);
  if (dialog) {
    setAttributes(dialog, {
      open: "true",
      "visible-section": feedbackType,
    });
  }
}

export function showConfirmation(id: string, manualClosure: boolean) {
  const dialog = document.getElementById(id);
  if (dialog) {
    setAttributes(dialog, {
      open: "true",
      "visible-section": "fb-thanks",
    });

    if (!manualClosure) {
      const dialogElement = dialog.querySelector("dialog");
      const timeoutId = setTimeout(() => {
        setAttributes(dialog, {
          open: "false",
        });
      }, 2000); // 2000 milliseconds = 2 seconds

      if (!dialogElement) return;
      dialogElement.addEventListener("close", () => {
        // Clear the timeout if the dialog is closed by the user
        clearTimeout(timeoutId);
      });
    }
  }
}

export function showError(id: string) {
  const dialog = document.getElementById(id);
  if (dialog) {
    setAttributes(dialog, {
      open: "true",
      "visible-section": "fb-error",
    });
  }
}

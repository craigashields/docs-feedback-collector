export function logFormEvent(props: LogFormProps) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "feedback-submission",
    feedbackType: props["feedbackType"],
    feedbackOption: props["feedbackOption"],
    feedbackComment: props["feedbackComment"],
  });
}

export function logSurveyEvent(props: LogSurveyProps) {}

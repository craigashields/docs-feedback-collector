interface FeedbackFormProps {
  "positive-options": string;
  "negative-options": string;
  open: string;
  "visible-section": string;
  "onsubmit-callback": string;
}

interface FeedbackSurveyProps {
  action: string;
}

interface LogSurveyProps {}

interface LogFormProps {
  feedbackType: string;
  feedbackOption: string;
  feedbackComment: string;
}

interface FormDataObject {
  [key: string]: FormDataEntryValue; // This could be more specific depending on your form data structure
}

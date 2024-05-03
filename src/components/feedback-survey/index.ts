import "./feedback-survey";
import { createElement, setAttributes } from "../../utils/dom-utils";

export function createFeedbackSurvey(props: FeedbackSurveyProps): HTMLElement {
  const feedbackSurvey = createElement("feedback-survey");
  setAttributes(feedbackSurvey, {
    action: props["action"],
  });
  return feedbackSurvey;
}

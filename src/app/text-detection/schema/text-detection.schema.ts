import * as Yup from "yup";
export const TextDetectionForm = Yup.object().shape({
  text: Yup.string().required("Text is required"),
  method: Yup.string().required("Please select a method"),
});

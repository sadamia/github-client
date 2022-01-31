
import * as yup from "yup";

export const newIssueSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, "Title must be at least 5 characters")
    .label('Title')
    .required(),
  body: yup
    .string()
    .min(5, "Body must be at least 5 characters")
    .label('Description')
    .required(),
}).required();
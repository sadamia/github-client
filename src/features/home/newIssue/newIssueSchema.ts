
import * as yup from "yup";

export const newIssueSchema = yup.object().shape({
  title: yup
    .string()
    .length(5, "Title must be at least 3 characters")
    .label('Title')
    .required(),
  body: yup
    .string()
    .length(5, "Body must be at least 3 characters")
    .label('Description')
    .required(),
}).required();
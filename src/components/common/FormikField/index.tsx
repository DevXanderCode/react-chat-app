import React from "react";
import { ErrorMessage, Field } from "formik";
import { TextField } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {makeStyles} from "@material-ui/core/styles";
import "./FormikField.css";

interface FormikFieldProps {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  variant?: string;
  showIcon?: string;
  rounded?: boolean;
}

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '30px',
    height: "95px"
  },
  errorMessage: {
    margin: "5px"
  }
}));

const FormikField: React.FC<FormikFieldProps> = ({
  name,
  label,
  required = false,
  type = "text",
  variant,
  showIcon = null,
  rounded,
  ...props
}) => {

  let icon = null; 
  if (showIcon){
    if (name === "password") {
      icon = <VisibilityIcon />;
    } else if (name === "email") {
      icon = <MailOutlineIcon />;
    }
  }

  const classes= useStyles();
  return (
    <div className='formikField' >
      <Field
        required={required}
        name={name}
        as={TextField}
        variant={variant}
        autoComplete='off'
        label={label}
        type={type}
        fullWidth
        className={classes.root}
        helperText={<ErrorMessage name={name} className={classes.errorMessage} />}
        InputProps={{
          endAdornment: icon
        }}
      />
    </div>
  );
};

export default FormikField;

import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import IconButton from "@material-ui/core/IconButton";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField/TextField";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import NavigateNext from "@material-ui/icons/NavigateNext";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexWrap:'wrap',
    flexDirection:'column',
    display: "flex",
  },
  subForm: {
    display: "flex",
    flexDirection: "column",
  },
  groups: {
    display: "flex",
    flexWrap: "wrap",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      flexGrow: 1,
    },
  },
}));

const ContactPersonForm = ({ data, setParentFieldValue }) => {
  const classes = useStyles();
  const [index, setIndex] = useState(0);

  // storing the data in a state for manipulation
  const [contactPersons, setContactPersons] = useState([...data]);

  const schema = Yup.object().shape({
    email: Yup.string().email("Enter valid email address"),
  });

  const { values, getFieldProps, resetForm, errors } = useFormik({
    initialValues: {
      gender: "",
      firstName: "",
      lastName: "",
      position: "",
      language: "",
      telephone: 0,
      email: "",
      ...contactPersons[index],
    },
    enableReinitialize: true,
    validationSchema: schema,
  });

  // setting the updated data in the parent component using setParentFieldValue prop
  const updateContactPersons = (updateParent = false) => {
    const updatedContactPersons = [...contactPersons];
    updatedContactPersons[index] = values;
    setContactPersons(updatedContactPersons);
    if (updateParent) {
      setParentFieldValue(`contactPersons`, updatedContactPersons, true);
    }
  };

  const handleIndexChange = (action) => {
    updateContactPersons();
    switch (action) {
      case "prev":
        setIndex(index - 1);
        break;
      case "next":
        setIndex(index + 1);
        break;
      default:
        break;
    }

    resetForm();
  };

  return (
    <fieldset name="contactPersons" className={classes.root}>
      <h2>ANSPRECHPARTNER</h2>
      <div>
        <FormLabel component="legend">Anrede</FormLabel>
        <RadioGroup
          row
          aria-label="gender"
          {...getFieldProps({ name: "gender" })}
        >
          <FormControlLabel value="m" control={<Radio />} label="Herr" />
          <FormControlLabel value="f" control={<Radio />} label="Frau" />
        </RadioGroup>
      </div>
      <div className={classes.subForm}>
        <div className={classes.groups}>
          <TextField
            label="Vorname"
            {...getFieldProps({ name: "firstName" })}
          />
          <TextField
            label="Nachname"
            {...getFieldProps({ name: "lastName" })}
          />
        </div>
        <div className={classes.groups}>
          <TextField
            label="Position"
            {...getFieldProps({ name: "position" })}
          />
          <TextField label="Sprache" {...getFieldProps({ name: "language" })} />
        </div>
        <div className={classes.groups}>
          <TextField
            type="number"
            label="Telefon"
            {...getFieldProps({ name: "telephone" })}
          />
          <TextField
            label="E-Mail"
            {...getFieldProps({ name: "email" })}
            error={!!(errors && errors.email)}
            helperText={errors && errors.email}
          />
        </div>
      </div>
      <div>
        <IconButton
          aria-label="prevPage"
          disabled={index <= 0}
          onClick={() => handleIndexChange("prev")}
        >
          <NavigateBefore />
        </IconButton>
        <IconButton
          aria-label="nextPage"
          onClick={() => handleIndexChange("next")}
        >
          <NavigateNext />
        </IconButton>
      </div>
      <div>
        <Button variant="contained">Abbrechen</Button>
        <Button
          variant="contained"
          type="button"
          onClick={() => updateContactPersons(true)}
          disabled={errors && errors.email && "email" in errors}
        >
          Speichern
        </Button>
      </div>
    </fieldset>
  );
};

export default ContactPersonForm;

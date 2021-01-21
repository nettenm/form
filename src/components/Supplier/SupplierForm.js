import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import React from "react";

const useStyles = makeStyles((theme) => ({
  form: {
    flexGrow: 1,
    border: 0,
    display: "flex",
    margin: "0px",
    padding: "0px",
    flexDirection: "column",
    justifyContent: "space-around",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

const SupplierForm = ({ setParentFieldValue, errors }) => {
  const classes = useStyles();

  // updating the form data in the parent component using the setParentFieldValue prop
  const handleChange = (event) => {
    setParentFieldValue(
      `supplier.${event.target.name}`,
      event.target.value,
      true
    );
  };

  return (
    <>
      <fieldset
        name="supplier"
        className={classes.form}
        onChange={handleChange}
      >
        <TextField
          name="name"
          label="Name"
          error={!!(errors && errors.name)}
          helperText={errors && errors.name}
        />
        <TextField
          name="website"
          label="Website"
          error={!!(errors && errors.website)}
          helperText={errors && errors.website}
        />
        <TextField
          name="comment"
          multiline
          label="Kommentar"
          rows="4"
          variant="outlined"
        />
        <TextField
          name="deliveryTime"
          label="Lieferzeit"
          defaultValue="14"
          type="number"
          error={!!(errors && errors.deliveryTime)}
          helperText={errors && errors.deliveryTime}
        />
      </fieldset>
    </>
  );
};

export default SupplierForm;

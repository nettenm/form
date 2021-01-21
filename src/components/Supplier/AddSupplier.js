import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import postSupplierData from "../../redux/AddSupplier/actions";
import transformData from "../../utils/transformData";
import SupplierForm from "./SupplierForm";
import ContactPersonForm from "./ContactPersonForm";

const useStyles = makeStyles((theme) => ({
  root: { margin: theme.spacing(1) },
  container: {
    display: "flex",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
}));

const AddSupplier = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    supplier: Yup.object().shape({
      name: Yup.string().required("Please enter the name."),
      website: Yup.string().url("Enter correct url with http / https"),
      deliveryTime: Yup.number().min(1, "Enter valid Lieferzeit"),
    }),
  });

  const { loading, response, error } = useSelector((state) => state);

  // used formik library as it makes the form handling very easy in React
  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: {
      supplier: {
        name: "",
        website: "",
        comment: "",
        deliveryTime: 14,
      },
      contactPersons: [],
    },
    validationSchema: schema,
    onSubmit: () => {
      console.log(transformData(values));
      dispatch(postSupplierData(transformData(values)));
    },
  });
  // it is the main page body that is composed of two components namely : SupplierForm & ContactPersonForm
  return (
    <div className={classes.root}>
      <h2>ZULIEFERER HINZUFÜGEN</h2>
      {!loading ? (
        <>
          <form onSubmit={handleSubmit} className={classes.form}>
            <div className={classes.container}>
              <SupplierForm
                setParentFieldValue={setFieldValue}
                errors={errors.supplier}
              />
              <ContactPersonForm
                setParentFieldValue={setFieldValue}
                data={values.contactPersons}
              />
            </div>
            <Button variant="contained" type="submit">
              Hinzufügen
            </Button>
          </form>
          <h5>{response || error}</h5>
        </>
      ) : (
        <h2>....loading</h2>
      )}
    </div>
  );
};

export default AddSupplier;

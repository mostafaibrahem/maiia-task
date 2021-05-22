import { useFormik } from 'formik';
import { postAppointment, getAppointments } from 'store/appointments';
import { useDispatch } from 'react-redux';
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  makeStyles,
  Button,
} from '@material-ui/core';
import moment from 'moment';
import CustomSelect from './CustomSelect';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const validate = (values) => {
  type ErrorsType = {
    practitionerId: string;
    patientId: string;
    dateTime: string;
  };

  const errors: ErrorsType = {};
  if (!values.practitionerId) {
    errors.practitionerId = 'Required';
  }

  if (!values.patientId) {
    errors.patientId = 'Required';
  }

  if (!values.dateTime) {
    errors.dateTime = 'Required';
  }
  return errors;
};
const AppointmentForm = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    itemsPractitioners,
    itemsPatients,
    onChangePractitioner,
    itemsAvailabilities,
  } = props;
  const formik = useFormik({
    initialValues: {
      practitionerId: '',
      patientId: '',
      dateTime: '',
    },
    validate,
    onSubmit: (values) => {
      const parsedDateTime = JSON.parse(values.dateTime);
      const startDate = parsedDateTime.startDate;
      const endtDate = parsedDateTime.endDate;
      const body = {
        practitionerId: values.practitionerId,
        patientId: values.patientId,
        startDate: startDate,
        endDate: endtDate,
      };
      dispatch(postAppointment(body)).then(() => {
        dispatch(getAppointments());
        formik.handleReset(values);
      });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} datacy="appointments-form">
        <CustomSelect
          selectValue={formik.values.practitionerId}
          handelChange={(e) => {
            onChangePractitioner(e);
            formik.handleChange(e);
          }}
          selectClassName={classes.formControl}
          selectError={formik.errors.practitionerId}
          label={'Select practitioner'}
          name={'practitionerId'}
        >
          {itemsPractitioners.map((item) => (
            <MenuItem key={`itemPractitioner${item.id}`} value={item.id}>
              {item.firstName} {item.lastName}
            </MenuItem>
          ))}
        </CustomSelect>

        <CustomSelect
          selectValue={formik.values.patientId}
          handelChange={formik.handleChange}
          selectClassName={classes.formControl}
          selectError={formik.errors.patientId}
          label={'Select patient'}
          name={'patientId'}
        >
          {itemsPatients.map((item) => (
            <MenuItem key={`itemPatient${item.id}`} value={item.id}>
              {item.firstName} {item.lastName}
            </MenuItem>
          ))}
        </CustomSelect>

        <CustomSelect
          selectValue={formik.values.dateTime}
          handelChange={formik.handleChange}
          selectClassName={classes.formControl}
          selectError={formik.errors.dateTime}
          label={'Select Date and Time'}
          name={'dateTime'}
        >
          {itemsAvailabilities.map((item) => (
            <MenuItem
              key={item.id}
              value={`{ "startDate":"${item.startDate}", "endDate":"${item.endDate}" }`}
            >
              from {moment(item.startDate).format('YYYY-MM-DD hh:mm A')} to{' '}
              {moment(item.endDate).format('YYYY-MM-DD hh:mm A')}
            </MenuItem>
          ))}
        </CustomSelect>

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AppointmentForm;

/* ---before using material-ui */
/*
 <select
          placeholder="select practitioner"
          id="practitionerId"
          name="practitionerId"
          value={formik.values.practitionerId}
          onChange={(e) => {
            onChangePractitioner(e);
            formik.handleChange(e);
          }}
        >
          <option disabled value={''}>
            select practitioner
          </option>
          {itemsPractitioners.map((item) => (
            <option key={item.id} value={item.id}>
              {item.firstName} {item.lastName}
            </option>
          ))}
        </select>

        <select
          placeholder="select patients"
          id="patientId"
          name="patientId"
          value={formik.values.patientId}
          onChange={formik.handleChange}
        >
          <option disabled value={''}>
            select patient
          </option>
          {itemsPatients.map((item) => (
            <option key={item.id} value={item.id}>
              {item.firstName} {item.lastName}
            </option>
          ))}
        </select>

        <select
          placeholder="select date and time"
          id="dateTime"
          name="dateTime"
          value={formik.values.dateTime}
          onChange={formik.handleChange}
        >
          <option disabled value={''}>
            select date and time
          </option>
          {itemsAvailabilities.map((item) => (
            <option
              key={item.id}
              value={`{ "startDate":"${item.startDate}", "endDate":"${item.endDate}" }`}
            >
              {' '}
              from {item.startDate} to {item.endDate}
            </option>
          ))}
        </select>
 */

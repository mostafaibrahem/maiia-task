import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import moment from 'moment';
import CustomSelect from './CustomSelect';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const AppointmentList = (props) => {
  const [selectedPractitioner, setSelectedPractitioner] = useState(null);
  const {
    appointmentsItems,
    itemsPractitioners,
    deleteAppointmentItem,
  } = props;
  const compineItems = () => {
    const usedList = [];
    appointmentsItems.map((appointmentItem) => {
      itemsPractitioners.map((itemPractitioner) => {
        if (appointmentItem.practitionerId === itemPractitioner.id) {
          usedList.push({
            id: appointmentItem.id,
            practitionerName: `${itemPractitioner.firstName} ${itemPractitioner.lastName}`,
            startDate: appointmentItem.startDate,
            endDate: appointmentItem.endDate,
            patientId: appointmentItem.patientId,
            practitionerId: appointmentItem.practitionerId,
          });
        } else {
          return;
        }
      });
    });
    const returnObject =
      selectedPractitioner === null
        ? usedList
        : usedList.filter(
            (item) => item.practitionerId === selectedPractitioner,
          );

    return returnObject;
  };

  useEffect(() => {
    compineItems();
  }, [itemsPractitioners, appointmentsItems, selectedPractitioner]);
  const classes = useStyles();

  const getAppointmentDatacy = (id: string) => `appointment-item${id}`;
  return (
    <>
      <CustomSelect
        handelChange={(e) => {
          setSelectedPractitioner(e.target.value);
        }}
        selectClassName={classes.formControl}
        label={'Select practitioner'}
        name={'practitionerId'}
        selectWidth="200px"
      >
        <MenuItem value={null}>All</MenuItem>
        {itemsPractitioners.map((item) => (
          <MenuItem key={`itemPractitioner${item.id}`} value={item.id}>
            {item.firstName} {item.lastName}
          </MenuItem>
        ))}
      </CustomSelect>

      <TableContainer component={Paper} datacy="appointments-list">
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Practitioner Name</TableCell>
              <TableCell align="right">Start Date</TableCell>
              <TableCell align="right">End Date</TableCell>
              <TableCell align="right">Patient Id</TableCell>
              <TableCell align="right">Practitioner Id</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {compineItems().map((row, index) => {
              return (
                <TableRow key={index + 1} datacy={getAppointmentDatacy(row.id)}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{row.practitionerName}</TableCell>
                  <TableCell align="right">
                    {moment(row.startDate).format('YYYY-MM-DD hh:mm A')}
                  </TableCell>
                  <TableCell align="right">
                    {moment(row.endDate).format('YYYY-MM-DD hh:mm A')}
                  </TableCell>
                  <TableCell align="right">{row.patientId}</TableCell>
                  <TableCell align="right">{row.practitionerId}</TableCell>
                  <TableCell align="right">
                    <span
                      onClick={() => {
                        deleteAppointmentItem(row.id);
                        console.log(row);
                      }}
                    >
                      Delete
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AppointmentList;
/* ---before using material-ui */
{
  /* <ul datacy='appointments-list'>
        {compineItems().map((item, index) => {
          return (
            <li key={item.id} datacy={getAppointmentDatacy(item.id)}>
              {index}- {item.patientId} / {item.practitionerId} /{item.startDate}{' '}
            / {item.endDate} / {item.practitionerName}
            </li>
          );
        })}
      </ul> */
}

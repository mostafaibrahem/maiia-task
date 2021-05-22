import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import moment from 'moment';
import React from 'react';

const CustomSelect = (props) => {
  const {
    children,
    selectValue,
    handelChange,
    selectClassName,
    selectError,
    name,
    label,
    selectWidth,
  } = props;
  return (
    <FormControl className={selectClassName}>
      <InputLabel id={name}>{label}</InputLabel>
      <Select
        style={{ width: selectWidth ? selectWidth : '100%' }}
        id={name}
        name={name}
        value={selectValue && selectValue}
        onChange={(e) => handelChange(e)}
      >
        <MenuItem disabled value={''}>
          {label}
        </MenuItem>
        {children}
      </Select>
      {selectError ? <div>{selectError}</div> : null}
    </FormControl>
  );
};
export default CustomSelect;

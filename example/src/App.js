import React, { useState } from 'react'

import OnSearchResult from 'on-search'
import { makeStyles, Typography } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';

const useStyles = makeStyles((theme) => ({
  checkBox: {
    color: purple['700'],
  }
}));

const App = () => {
  const [employee, setEmployee] = useState([]);
  const [employeeMultiselect, setEmployeeMultiselect] = useState([]);
  const classes = useStyles();

  const empList = [
    { id: 1, name: 'Bhushan Dhage' },
    { id: 2, name: 'Vishal Ambhore' },
    { id: 3, name: 'Ravindra Kauthale' },
    { id: 4, name: 'Manik Jadhav' },
    { id: 5, name: 'Bharat Chavhan' }
  ]
  const searchEmployee = (keyword) => {
    if (!keyword) setEmployee([])
    else {
      keyword = keyword.trim();
      const filteredResult = empList.filter((v) =>
        v.name.toLowerCase().includes(keyword.toLowerCase())
      )
      setEmployee(filteredResult)
    }
  }

  const searchEmployeeForMultiselect = (keyword) => {
    if (!keyword) setEmployee([])
    else {
      keyword = keyword.trim();
      const filteredResult = empList.filter((v) =>
        v.name.toLowerCase().includes(keyword.toLowerCase())
      )
      setEmployeeMultiselect(filteredResult)
    }
  }

  return (
    <div style={{ width: '400px', marginTop: '20px', marginLeft: '50px' }}>
      <Typography> This is simple demo of single select.</Typography>
      <OnSearchResult
        fullWidth
        data={employee}
        placeHolder="Select Employee"
        itemLabel="name"
        itemId="id"
        itemValue="id"
        onItemSelect={(val) => { console.log(val); }}
        onInputKeywordChange={(keyword) => { searchEmployee(keyword); }}
        customStyles={{ checkBox: classes.checkBox }}
        simpleValue
      />
      <div style={{marginTop: '4rem'}}></div>
      <Typography></Typography>
      <Typography> This is simple demo of multiselect</Typography>
      <OnSearchResult
        fullWidth
        data={employeeMultiselect}
        placeHolder="Select Employee"
        itemLabel="name"
        itemId="id"
        itemValue="id"
        onItemSelect={(val) => { console.log(val); }}
        onInputKeywordChange={(keyword) => { searchEmployeeForMultiselect(keyword); }}
        customStyles={{ checkBox: classes.checkBox }}
        simpleValue
        multiple
      />
    </div>
  )
}

export default App

import React, { useState } from 'react'

import OnSearchResult from 'on-search'
import 'on-search/dist/index.css'

const App = () => {
  const [employee, setEmployee] = useState([])
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
  return (
    <div style={{ width: '400px' }}>
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
        multiple
      />
    </div>
  )
}

export default App

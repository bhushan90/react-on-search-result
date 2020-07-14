# on-search

> searches the etches[Cor[Cds on search

[![NPM](https://img.shields.io/npm/v/on-search.svg)](https://www.npmjs.com/package/on-search) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install react-on-search-result --save
```
## Demo
Will add asap
## Usage
### Multi select
```jsx
import React, { Component } from 'react'
import OnSearchResult from 'on-search'

class Example extends Component {
  render() {
    return <OnSearchResult
        fullWidth
        data={data}
        placeHolder="Select Employee"
        itemLabel="name"
        itemId="id"
        itemValue="id"
        onItemSelect={(val) => { console.log(val); }}
        onInputKeywordChange={(keyword) => { searchData(keyword); }}
        customStyles={{ checkBox: classes.checkBox }}
        simpleValue
        multiple
      />
  }
}
```
### Single select
```jsx
import React, { Component } from 'react'
import OnSearchResult from 'on-search'

class Example extends Component {
  render() {
    return <OnSearchResult
        fullWidth
        data={data}
        placeHolder="Select Employee"
        itemLabel="name"
        itemId="id"
        itemValue="id"
        onItemSelect={(val) => { console.log(val); }}
        onInputKeywordChange={(keyword) => { searchData(keyword); }}
        customStyles={{ checkBox: classes.checkBox }}
        simpleValue
      />
  }
}
```
## Props
| Attribute | Type |  Is Required | Description | Default Value |
| ------ | ------ |  ------ |  ----| ----|
| data | array |  Yes |list of data to display| 
| PlaceHolder | string|No| Placeholder for the search section |Search records
| itemLabel | string|Yes | label to display when item is clicked it should be from one of the property in data.|
| itemId | number/ string| Yes |Unique id from to data which will use as unque key for the list it ca be id from the list of data.
| simpleValue |boolean | No | if true then proided itemValue wiill be retrun in respose from the selected options else whole selected object will return. eg: if item value is 'id' and simple value is true then we will get selected option as list of if from the data.Else will get whiole object.|
| itemValue | number/string  | No | It will only work if the simple value is true it can be any property from the data for instance id you will get list of id's on item select.
| loading | boolean |No | if true then there is spinner while fetching data| False
| multiple |boolean | No | if true then you can select multiple options | False
| notFoundText | string | No | text to display when no item found on search | No records found
| customStyles | makeSTyle Instance| No | custom styles for the checkbox|{}

---

| Event | Return| Description |
| ------ | ------ | ----|
| onInputKeywordChange | input value |It will trigger when input value changes you will get types keyword. You can use that keyword to filter data or fetch data from the API.  |
| onItemSelect | Selected items| It will trigger once you click on item / select item for simple value it will return the selected list of itemvalue for the multiselect of item value of single select else list of slected list for multiselect or slected object for single select.


## License

MIT © [Bhushan Dhage](https://github.com/bhushan90)

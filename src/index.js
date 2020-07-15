import ClearIcon from '@material-ui/icons/Clear'
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import {
  InputAdornment,
  ButtonBase,
  Input,
  makeStyles,
  Chip,
  MenuList,
  MenuItem,
  Paper,
  CircularProgress,
  Popper,
  ClickAwayListener,
  Icon,
  Box
} from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useRef, useState, useEffect } from 'react'
import green from '@material-ui/core/colors/green'
import gray from '@material-ui/core/colors/grey'

const useStyles = makeStyles((theme) => ({
  inputField: {
    flexGrow: 1,
    border: 0,
    background: 'inherit',
    outline: 0
  },
  list: {
    listStyle: 'none'
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  singleItem: {
    display: 'flex',
    marginRight: '.6em',
    background: gray[100],
    padding: '.2em',
    border: `1px solid ${gray[50]}`,
    borderRadius: '10px'
  },
  box: {
    display: 'block',
    marginTop: '0.4em'
  },
  checkBox: {
    color: green['600']
  },
  popOver: {
    zIndex: 1500,
    maxHeight: '40%',
    overflow: 'hidden',
    overflowY: 'auto',
    boxShadow: theme.shadows[1],
    '&::-webkit-scrollbar': {
      width: '7px'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'darkgrey',
      outline: '1px solid slategrey'
    }
  },
  noRecordFound: {
    display: 'flex',
    padding: '1em .5em'
  }
}))

function OnSearchResult(props) {
  const [records, setRecords] = useState([])
  const [openOver, setOpenOver] = useState(false)
  const [keyword, setKeyword] = useState('')
  const inputRef = useRef()
  const wrapperRef = useRef()
  const outerWrapper = useRef()
  const classes = useStyles()
  const [selectedRecords, setSelectedRecords] = useState([])

  const {
    data,
    onInputKeywordChange,
    onItemSelect,
    placeHolder,
    fullWidth,
    itemLabel,
    itemId,
    simpleValue,
    loading,
    customStyles,
    multiple,
    notFoundText,
    itemValue
  } = props

  const handlClearFilter = () => {
    setKeyword('')
    onInputKeywordChange(null)
    setSelectedRecords([])
    onItemSelect([])
  }

  const handleKeywordChange = (ev) => {
    const keywords = ev.target.value
    if (!keywords) {
      setRecords([])
    }
    setKeyword(keywords)
    onInputKeywordChange(keywords)
  }

  const isOptionSelected = (option) =>
    selectedRecords.filter((v) => v[itemId] === option[itemId]).length > 0

  const handleDeleteItem = (item) => {
    const filteredOptions = selectedRecords.filter(
      (v) => v[itemId] !== item[itemId]
    )
    setSelectedRecords(filteredOptions || [])
  }

  const handleClickItem = (item) => {
    let selected = selectedRecords
    if (isOptionSelected(item) && multiple) {
      selected = selected.filter((v) => v[itemId] !== item[itemId])
    } else {
      selected = multiple ? [...selected, item] : [item]
    }
    setSelectedRecords(selected)
    /*
     * This result sends to the parent component.
     * So that they can perform any operation they want.
     */
    let itemsToPopulate = simpleValue
      ? selected.map((v) => v[itemValue])
      : selected

    itemsToPopulate = multiple ? itemsToPopulate : itemsToPopulate[0]
    onItemSelect(itemsToPopulate)
  }

  const renderInputComponent = () => (
    <div
      style={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}
      ref={outerWrapper}
    >
      {selectedRecords &&
        selectedRecords.length > 0 &&
        selectedRecords.map((selected) => (
          <li key={selected[itemId]} className={classes.list}>
            {multiple ? (
              <Chip
                label={selected[itemLabel]}
                onDelete={() => {
                  handleDeleteItem(selected)
                }}
                className={classes.chip}
              />
            ) : (
              <span className={classes.singleItem}>{selected[itemLabel]}</span>
            )}
          </li>
        ))}
      <Input
        className={classes.inputField}
        autoFocus
        inputRef={inputRef}
        onChange={(ev) => {
          handleKeywordChange(ev)
        }}
        value={keyword}
        placeholder={
          selectedRecords && selectedRecords.length > 0 ? '' : placeHolder
        }
      />
    </div>
  )

  const closePoper = () => {
    if (selectedRecords && selectedRecords.length > 0) {
      setKeyword('')
    }
    setOpenOver(false)
  }

  useEffect(() => {
    setOpenOver(true)
    setRecords(data)
  }, [data])

  return (
    <ClickAwayListener onClickAway={closePoper}>
      <Box ref={wrapperRef}>
        <Input
          readOnly
          fullWidth={fullWidth}
          inputComponent={renderInputComponent}
          endAdornment={
            <InputAdornment>
              {loading && (
                <CircularProgress
                  size={16}
                  color='primary'
                  style={{ marginRight: '1em' }}
                />
              )}
              {(!!keyword ||
                (selectedRecords && selectedRecords.length > 0)) && (
                <ButtonBase
                  centerRipple
                  tabIndex={-1}
                  onClick={() => {
                    handlClearFilter()
                  }}
                >
                  <ClearIcon />
                </ButtonBase>
              )}
            </InputAdornment>
          }
          inputProps={{
            style: {
              display: 'flex',
              flexWrap: 'wrap'
            }
          }}
        />
        <Popper
          popperRef={outerWrapper}
          className={classes.popOver}
          style={{
            minWidth: wrapperRef.current
              ? wrapperRef.current.getBoundingClientRect().width
              : undefined
          }}
          open={openOver}
          anchorEl={wrapperRef.current}
        >
          <Paper elevation={1}>
            {records && records.length > 0 ? (
              <MenuList>
                {records.map((v) => (
                  <MenuItem
                    key={v[itemId]}
                    onClick={() => {
                      handleClickItem(v)
                    }}
                  >
                    {multiple && (
                      <Icon>
                        {isOptionSelected(v) ? (
                          <CheckBoxIcon
                            className={
                              customStyles.checkBox || classes.checkBox
                            }
                            style={{ marginRight: '0.5em' }}
                          />
                        ) : (
                          <CheckBoxOutlineBlankOutlinedIcon
                            style={{ marginRight: '0.5em' }}
                            className={customStyles.checkBox}
                          />
                        )}
                      </Icon>
                    )}
                    {v[itemLabel]}
                  </MenuItem>
                ))}
              </MenuList>
            ) : (
              !!keyword && (
                <span className={classes.noRecordFound}>{notFoundText}</span>
              )
            )}
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  )
}

OnSearchResult.propTypes = {
  data: PropTypes.array,
  onInputKeywordChange: PropTypes.func.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  placeHolder: PropTypes.string,
  fullWidth: PropTypes.bool,
  itemLabel: PropTypes.string.isRequired,
  itemId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  simpleValue: PropTypes.bool,
  itemValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  loading: PropTypes.bool,
  multiple: PropTypes.bool,
  notFoundText: PropTypes.string,
  customStyles: PropTypes.shape({
    checkBox: PropTypes.string
  })
}

OnSearchResult.defaultProps = {
  fullWidth: false,
  placeHolder: 'Search records',
  data: [],
  simpleValue: false,
  loading: false,
  multiple: false,
  notFoundText: 'No records found',
  itemId: 'id',
  itemValue: 'id',
  customStyles: {
    checkBox: {
      color: green['600']
    }
  }
}

export default OnSearchResult

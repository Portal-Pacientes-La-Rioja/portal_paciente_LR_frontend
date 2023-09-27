import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

const AutocompleteComponent = React.forwardRef((props, ref) => {

  const { variants, name, handleChange, onBlur, selectValue, disabled, clearInput } = props;
  const [idValue, setIdValue] = useState(selectValue ? selectValue : false);
  const [searchString, setSearchString] = useState('');
  const [items, setItems] = useState([]);
  const [value, setValue] = useState('');


  useEffect(() => {
    if (variants) {
      let items = variants.map((item) => {
        return { id: item.id, name: item.nombre || item.name }
      });
      setItems(items);
    }
  }, [variants])


  const handleOnSearch = (string, results) => {
    handleChange(string)
    setSearchString(string);
  }

  const handleOnHover = (result) => {
  }

  const handleOnSelect = (item) => {
    if (item && item.id) {
      handleChange(item)
      setIdValue(item.id)
      if (clearInput) {
        setSearchString('');
      }
    }
  }

  const handleOnFocus = () => {
    // setItems(items);
  }

  const formatResult = (item) => {
  }


  return (
    <ReactSearchAutocomplete
      items={items}
      onSelect={handleOnSelect}
      onSearch={handleOnSearch}
      styling={{
        height: "34px",
        border: "1px solid gray",
        borderRadius: "4px",
        backgroundColor: "white",
        boxShadow: "none",
        fontSize: "12px",
        fontFamily: "Courier",
        clearIconMargin: "3px 8px 0 0",
        zIndex: 2,
      }}
      showItemsOnFocus={true}
      placeholder='Buscar...'
      inputSearchString={searchString}
    />
  )
})
export default AutocompleteComponent;
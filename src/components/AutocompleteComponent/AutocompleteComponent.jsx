import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

const AutocompleteComponent = React.forwardRef((props, ref) => {

  const { variants, handleChange, selectValue, clearInput } = props;
  const [idValue, setIdValue] = useState(selectValue ? selectValue : false);
  const [searchString, setSearchString] = useState('');
  const [items, setItems] = useState([]);


  useEffect(() => {
    if (variants) {
      let items = variants.map((item) => {
        return { id: item.id, name: item.nombre || item.name || item.description }
      });
      setItems(items);
    }
  }, [variants])


  const handleOnSearch = (string, results) => {
    handleChange(string)
    setSearchString(string);
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

  return (
    <ReactSearchAutocomplete
      items={items}
      onSelect={handleOnSelect}
      onSearch={handleOnSearch}
      styling={{
        height: "34px",
        border: "1px solid #dee2e6",
        borderRadius: "4px",
        backgroundColor: "white",
        boxShadow: "none",
        fontSize: "12px",
        fontFamily: "Courier",
        clearIconMargin: "3px 8px 0 0",
        zIndex: 10,
      }}
      showNoResultsText={'No hay resultados'}
      placeholder='Buscar...'
      inputSearchString={searchString}
    />
  )
})
export default AutocompleteComponent;
import React, { useEffect, useState } from "react";

interface Country {
  name: {
    common: string;
  };
  cca2: string;
}

interface AutoCompleteProps {
  placeholder: string;
}

const AutoComplete = ({ placeholder }: AutoCompleteProps) => {
  const [items, setItems] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
  
    async function fetchResults() {
      if (searchTerm) {
        const response = await fetch(
          `${import.meta.env.VITE_API_HOST}/name/${searchTerm}`
        );
        const countries = await response.json();
        setItems(countries);
      } else {
        setItems([]);
      }
    }
    fetchResults();
  }, [searchTerm]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setValue(event.target.value);
    setOpen(true);
  };

  const handleSelect = (country: Country) => {
    setSearchTerm(country.name.common);
    setItems([]);
    setValue(country.name.common);
    setOpen(false);
  };

  const handleInputFocus = () => {
    setValue(" ");
  };
  

const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  
  //Improving keyboard navigation by handling key events, in a production situation it would be better to use a library like Downshift
  if (event.key === "Escape") {
    setItems([]);
    setOpen(false);
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    const activeIndex =
      items.findIndex((country) => country.name.common === value) + 1;
    if (activeIndex < items.length) {
      const activeCountry = items[activeIndex];
      setSearchTerm(activeCountry.name.common);
      setValue(activeCountry.name.common);
    }
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    const activeIndex =
      items.findIndex((country) => country.name.common === value) - 1;
    if (activeIndex >= 0) {
      const activeCountry = items[activeIndex];
      setSearchTerm(activeCountry.name.common);
      setValue(activeCountry.name.common);
    }
  } else if (event.key === "Enter") {
    event.preventDefault();
    const activeCountry = items.find(
      (country) => country.name.common === value
    );
    if (activeCountry) {
      handleSelect(activeCountry);
    }
  }
};
  return (
    <div className="wrapper">
      <input
        type="text"
        placeholder={value === "" ? placeholder : value}
        className="search-input"
        onChange={handleChange}
        onFocus={handleInputFocus}
        onBlur={() => setValue(searchTerm)}
        value={value}
        aria-label="Search for a country"
        aria-expanded={open && items.length > 0}
        onKeyDown={handleKeyDown}
      />

      <div
        className="results"
        role="region"
        aria-live="assertive"
        aria-atomic="true"
      >
        {open && items.length > 0 && (
          <ul
            className="autocomplete-results"
            role="list"
            aria-label="Search results"
          >
            {items.map((country) => (
              <li
                key={country.cca2}
                role="listitem"
                tabIndex={0}
                onClick={() => handleSelect(country)}
              >
                {country.name.common}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AutoComplete;

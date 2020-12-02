import React , { useState } from 'react';

const Search = (props: any) => {
    const [searchValue, setSearchValue] = useState<string>("");

    const handleSearchInputChanges = (e: any) => {
        setSearchValue(e.target.value);
    }

    const resetInputField = () => {
        setSearchValue('');
    }

    const callSearchFunction = (e: any) => {
        e.preventDefault();
        props.search(searchValue);
        resetInputField();
    }

    return(
        <form className="search">
            <input
              value={searchValue}
              onChange={handleSearchInputChanges}
              type='text'
            />
            <input onClick={callSearchFunction} type="submit" value="Search" />
        </form>
    )
}

export default Search;
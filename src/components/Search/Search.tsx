import { useState } from "react";
import { useTableContext } from "../../context/TableContext";
import './Search.less';


const Search = () => {
    const [search, setSearch] = useState('');
    const { filterDebtRows, updateTopDebtRows } = useTableContext();


    return (
        <div className="header-search">
            <label className="header-search__label" htmlFor="searchInput">
                podaj nip lub nazwę dłużnika
            </label>
            <div className="header-search__input-container">
                <input 
                    className="header-search__input"
                    type="text" 
                    name="searchInput"  
                    value={search}
                    onChange={e => {
                        const value = e.currentTarget.value;
                        setSearch(value);
                        if(value === '') {
                            updateTopDebtRows();
                        }
                    }}
                />
                <button className="header-search__btn" onClick={() => filterDebtRows(search)}>szukaj</button>
            </div>
        </div>
    );
}

export default Search;
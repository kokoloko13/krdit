import { createContext, useContext, useEffect, useState } from "react";
import { ContextProviderProps, Debt, DebtRow, TableContextType } from "../shared/types";
import { getFilteredDebts, getTopDebts } from "../api/ApiService";


const TableContext = createContext<TableContextType | undefined>(undefined);

export const useTableContext = (): TableContextType => {
    const ctx = useContext(TableContext);

    if(!ctx) {
        throw new Error("No context found. useTableContext must be used within the TableContext");
    }
        
    return ctx;
};

export const TableContextProvider = ({ children }: ContextProviderProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sortColumn, setSortColumn] = useState<keyof DebtRow>('Name');
    const [isSortAsc, setIsSortAsc] = useState(true);
    const [sortedDebtRows, setSortedDebtRows] = useState<DebtRow[]>([]);
    const [debtRows, setDebtRows] = useState<DebtRow[]>([]);
    const [responseError, setResponseError] = useState<string | null>(null);

    const setLoading = (isLoading: boolean) => {
        setIsLoading(isLoading);
    }

    const toggleColumnSort = (column: string): void => {
        if(sortColumn !== column) {
            setSortColumn(column as keyof DebtRow);
            setIsSortAsc(true);
        } else {
            toggleSortOrder();
        }
    }

    const toggleSortOrder = () => {
        setIsSortAsc(prev => !prev);
    }

    useEffect(() => {
            sortRows();
        }, [sortColumn, isSortAsc, debtRows]);

    const sortRows = () => {
        const sortedRows = [...debtRows].sort((a, b) => {
            const aValue = a[sortColumn];
            const bValue = b[sortColumn];
    
            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return isSortAsc ? aValue - bValue : bValue - aValue;
            }
                
            return isSortAsc
                ? String(aValue).localeCompare(String(bValue))
                : String(bValue).localeCompare(String(aValue));
        });
    
        setSortedDebtRows(sortedRows);
    }

    const convertToDebtRows = (data: Debt[]): DebtRow[] => {
        return data 
            ? data.map(({ Id, Name, NIP, Value, Date }) => ({ Id, Name, NIP, Value, Date }))
            : [];
    };

    const updateTopDebtRows = () => {
        setIsLoading(true);
        getTopDebts()
            .then(res => handleResponse(res));
    };

    const filterDebtRows = (phrase: string) => {
        setIsLoading(true);
        getFilteredDebts(phrase)
            .then(res => handleResponse(res))
            .catch(err => {
                if(err.status === 405) {
                    setResponseError('Aby wyszukać, wymagane są min. 3 znaki')
                    setIsLoading(false);
                    setTimeout(() => setResponseError(null), 5000);
                }
            })
        
    }

    const handleResponse = (res: Debt[]) => {
        const rows = convertToDebtRows(res);
        setDebtRows(rows);
        setIsLoading(false);
    }

    const clearResponseError = () => {
        setResponseError(null);
    }

    return (
        <TableContext.Provider value={{isLoading, sortColumn, isSortAsc, sortedDebtRows, setLoading, toggleColumnSort, toggleSortOrder, updateTopDebtRows, filterDebtRows, responseError, clearResponseError}}>
            {children}
        </TableContext.Provider>
    );

};
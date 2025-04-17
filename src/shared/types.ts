import { ReactNode } from "react";

export type Debt = {
    Id: number,
    Name: string,
    NIP: string,
    Date: string,
    Value: number,
    Address: string,
    DocumentType: string,
    Price: number,
    Number: string
};

export type DebtRow = {
    Id: number,
    Name: string,
    NIP: string,
    Value: number,
    Date: string
};

export type Column = {
    name: string,
    title: string
}

export type DebtSearchRequestBody = {
    phrase: string
};

export type ContextProviderProps = {
    children: ReactNode
};

export type TableContextType = {
    isLoading: boolean,
    sortColumn: keyof DebtRow,
    isSortAsc: boolean,
    sortedDebtRows: DebtRow[]
    responseError: string | null,
    clearResponseError: () => void,
    setLoading: (isLoading: boolean) => void,
    toggleColumnSort: (column: string) => void,
    toggleSortOrder: () => void,
    updateTopDebtRows: () => void,
    filterDebtRows: (phrase: string) => void,
};

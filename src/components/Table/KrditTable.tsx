import { useEffect, useState } from "react";
import { isoToDateString } from "../../shared/utils";
import './KrditTable.less';
import { useTableContext } from "../../context/TableContext";
import { Column } from "../../shared/types";
import Header from "../Header/Header";
import Row from "../Row/Row";
import TableLoader from "../TableLoader/TableLoader";

const headerColumns: Column[] = [
    {
        name: 'Name',
        title: 'dłużnik',
    },
    {
        name: 'NIP',
        title: 'nip',
    },
    {
        name: 'Value',
        title: 'kwota zadłużenia',
    },
    {
        name: 'Date',
        title: 'data powstania zobowiązania',
    },
]

const KrditTable = () => {
    const { updateTopDebtRows, sortedDebtRows, isLoading } = useTableContext();
    

    useEffect(() => {
        updateTopDebtRows();
    }, []);

    return (
        <>
            {isLoading 
                ? <TableLoader />
                : <table className="table">
                    <Header columns={headerColumns} />
                    <tbody className="body">
                        {sortedDebtRows?.map((debtRow) => (
                            <Row key={debtRow.Id} debtRow={debtRow} />
                        ))}
                    </tbody>
            </table>
            }
        </>
    );
};

export default KrditTable;
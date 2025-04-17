import { DebtRow } from "../../shared/types";
import { isoToDateString } from "../../shared/utils";
import './Row.less';

type RowProps = {
    debtRow: DebtRow
};

const Row = ({debtRow}: RowProps) => {
    return(
        <tr className="table-row">
                            <td className="table-body__col">{debtRow.Name}</td>
                            <td className="table-body__col">{debtRow.NIP}</td>
                            <td className="table-body__col">{debtRow.Value}</td>
                            <td className="table-body__col">{isoToDateString(debtRow.Date)}</td>
        </tr>
    );
};

export default Row;
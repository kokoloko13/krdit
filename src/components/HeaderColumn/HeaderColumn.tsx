import { useTableContext } from "../../context/TableContext";
import './HeaderColumn.less';

type HeaderColumnProps = {
    name: string,
    title: string
};

const HeaderColumn = ({name, title}: HeaderColumnProps) => {
    const { toggleColumnSort, sortColumn, isSortAsc } = useTableContext();

    const getSortIndicator = () => {
        
        return name == sortColumn ?
                    isSortAsc ? "\u25B2" : "\u25BC"
                    : false;
    }

    return(
        <>
            <th className="table-header__col" onClick={() => toggleColumnSort(name)}>{title} <span>{getSortIndicator()}</span></th>
        </>
    );
};

export default HeaderColumn;
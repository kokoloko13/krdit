import './TableLoader.less';

const TableLoader = () => {
    return(
        <div className="table-loader">
            <span className="table-loader__spinner"></span>
            <p className="table-loader__info">Pobieranie danych</p>
        </div>
    );
};

export default TableLoader;
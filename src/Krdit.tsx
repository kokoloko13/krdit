import KrditHeader from "./components/KrditHeader/KrditHeader";
import './Krdit.less';
import KrditTable from "./components/Table/KrditTable";
import { useTableContext } from "./context/TableContext";
import ToastPortal from "./components/ToastPortal";

const Krdit = () => {
    const { responseError } = useTableContext();

    return (
        <>
            <div className="krdit">
                <KrditHeader />
                <main className="content">
                    <KrditTable />
                </main>
            </div>
            {responseError && 
                <ToastPortal message={responseError} />}
        </>
    );
}

export default Krdit;
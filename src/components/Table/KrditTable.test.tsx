import { fireEvent, render, screen } from "@testing-library/react";
import { useTableContext } from "../../context/TableContext";
import { DebtRow } from "../../shared/types";
import KrditTable from "./KrditTable";

jest.mock("../../context/TableContext", () => ({
    useTableContext: jest.fn(),
}));

describe('KrditTable', () => {
    let tableContextMock;
    
    it('should render the table', () => {
        tableContextMock = (useTableContext as jest.Mock).mockReturnValue({
            sortedDebtRows: [],
            isLoading: false,
            updateTopDebtRows: jest.fn()
        });

        render(<KrditTable />);

        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();
    });

    it('should render the loader', () => {
        tableContextMock = (useTableContext as jest.Mock).mockReturnValue({
            sortedDebtRows: [],
            isLoading: true,
            updateTopDebtRows: jest.fn()
        });

        render(<KrditTable />);

        const loaderText = screen.getByText(/Pobieranie danych/);
        expect(loaderText).toBeInTheDocument();
    });
});
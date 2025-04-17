import { fireEvent, render, screen } from "@testing-library/react";
import { useTableContext } from "../../context/TableContext";
import { DebtRow } from "../../shared/types";
import Search from "./Search";

jest.mock("../../context/TableContext", () => ({
    useTableContext: jest.fn(),
}));

describe('Search', () => {
    let tableContextMock;
    const mockFilterDebtRows = jest.fn();
    const mockUpdateTopDebtRows = jest.fn();
    
    beforeEach(() => {
        tableContextMock = (useTableContext as jest.Mock).mockReturnValue({
            filterDebtRows: mockFilterDebtRows,
            updateTopDebtRows: mockUpdateTopDebtRows
        });
        render(<Search />);
    });

    it('should render search label', () => {
        const label = screen.getByText(/podaj nip lub nazwę dłużnika/);
        expect(label).toBeInTheDocument();
    });

    it('should render search input', () => {
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
    });

    it('should render search button', () => {
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(/szukaj/);
    });

    it('should fill search input', () => {
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'Test' } })
        expect(input).toHaveValue('Test');
    });

    it('should call filterDebtRows with Test param after Search button click', () => {
        const input = screen.getByRole('textbox');
        const button = screen.getByRole('button');
        fireEvent.change(input, { target: { value: 'Test' } });
        fireEvent.click(button);
        expect(mockFilterDebtRows).toHaveBeenCalledWith('Test');
    });

    it('should call updateTopDebtRows after input clear', () => {
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'Test' } });
        fireEvent.change(input, { target: { value: '' } });
        expect(mockUpdateTopDebtRows).toHaveBeenCalled();
    });
});
import {render, screen } from "@testing-library/react";
import TableLoader from "./TableLoader";

describe('TableLoader', () => {
    it('should render the loader', () => {
        render(<TableLoader />);
        const loaderText = screen.getByText(/Pobieranie danych/);
        expect(loaderText).toBeInTheDocument();
    });
});
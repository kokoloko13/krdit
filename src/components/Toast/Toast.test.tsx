import { render, screen } from "@testing-library/react";
import Toast from "./Toast";

describe('Toast', () => {
    it('should render the toast', () => {
        render(<Toast message={'Test'} />);
        const toastMsg = screen.getByText(/Test/);
        expect(toastMsg).toBeInTheDocument();
    });
});
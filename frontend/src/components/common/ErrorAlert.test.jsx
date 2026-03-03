import { render, screen, fireEvent } from "@testing-library/react";
import ErrorAlert from "./ErrorAlert";

describe("ErrorAlert", () => {
  it("shows error message", () => {
    render(<ErrorAlert message="Something went wrong" />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("calls onRetry when button clicked", () => {
    const retry = vi.fn();
    render(<ErrorAlert message="Error" onRetry={retry} />);
    fireEvent.click(screen.getByText("Try Again"));
    expect(retry).toHaveBeenCalledTimes(1);
  });
});

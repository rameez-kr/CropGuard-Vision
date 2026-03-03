import { render, screen } from "@testing-library/react";
import LoadingSpinner from "./LoadingSpinner";

describe("LoadingSpinner", () => {
  it("renders default message", () => {
    render(<LoadingSpinner />);
    expect(screen.getByText("Analyzing your crop...")).toBeInTheDocument();
  });

  it("renders custom message", () => {
    render(<LoadingSpinner message="Please wait..." />);
    expect(screen.getByText("Please wait...")).toBeInTheDocument();
  });
});

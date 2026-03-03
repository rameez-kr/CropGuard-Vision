import { render, screen } from "@testing-library/react";
import ConfidenceMeter from "./ConfidenceMeter";

describe("ConfidenceMeter", () => {
  it("shows percentage and level", () => {
    render(<ConfidenceMeter value={92.3} level="high" />);
    expect(screen.getByText("92.3% — HIGH")).toBeInTheDocument();
  });
});

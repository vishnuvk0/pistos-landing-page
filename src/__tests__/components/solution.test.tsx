import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Solution } from "@/components/solution";
import { PROCESS_STEPS } from "@/lib/constants";

describe("Solution", () => {
  it("renders with correct section id", () => {
    const { container } = render(<Solution />);
    expect(container.querySelector("#solution")).toBeInTheDocument();
  });

  it("displays the section heading", () => {
    render(<Solution />);
    expect(
      screen.getByRole("heading", { level: 2, name: /how pistos works/i })
    ).toBeInTheDocument();
  });

  it("renders all process steps", () => {
    render(<Solution />);
    for (const step of PROCESS_STEPS) {
      expect(screen.getByText(step)).toBeInTheDocument();
    }
  });

  it("renders the terminal dots", () => {
    const { container } = render(<Solution />);
    const dots = container.querySelectorAll(".rounded-full.bg-white\\/10");
    expect(dots.length).toBe(3);
  });

  it("shows completion time on last step", () => {
    render(<Solution />);
    expect(screen.getByText("4m 12s")).toBeInTheDocument();
  });

  it("shows lead time comparison labels", () => {
    render(<Solution />);
    expect(screen.getByText("Lead Time")).toBeInTheDocument();
    expect(screen.getByText("4-8 weeks")).toBeInTheDocument();
    expect(screen.getByText(/Min/)).toBeInTheDocument();
  });

  it("shows data freshness comparison", () => {
    render(<Solution />);
    expect(screen.getByText("Data Freshness")).toBeInTheDocument();
    expect(screen.getAllByText("Quarterly updates").length).toBeGreaterThan(0);
    expect(screen.getByText("Real Time")).toBeInTheDocument();
  });

  it("renders integration badges", () => {
    render(<Solution />);
    expect(screen.getByText("Works with your stack")).toBeInTheDocument();
    for (const tool of ["Excel", "Python", "Bloomberg", "SAP", "SQL"]) {
      expect(screen.getByText(tool)).toBeInTheDocument();
    }
  });

  it("renders a flex row with 3 cards and a full-width chart below", () => {
    const { container } = render(<Solution />);
    const row = container.querySelector("#solution .flex.flex-col.md\\:flex-row.md\\:flex-wrap");
    expect(row).toBeInTheDocument();
    const cards = row!.querySelectorAll(":scope > div");
    expect(cards.length).toBe(3);
    expect(screen.getByText("Rating Accuracy")).toBeInTheDocument();
  });
});

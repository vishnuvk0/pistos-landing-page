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

  it("shows speed comparison labels", () => {
    render(<Solution />);
    expect(screen.getByText("Legacy Agencies")).toBeInTheDocument();
    expect(screen.getByText("Pistos")).toBeInTheDocument();
    expect(screen.getByText("4-8 weeks")).toBeInTheDocument();
    expect(screen.getByText("Minutes")).toBeInTheDocument();
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
});

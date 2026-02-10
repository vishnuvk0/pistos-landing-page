import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Problem } from "@/components/problem";
import { STATS } from "@/lib/constants";

describe("Problem", () => {
  it("renders with correct section id", () => {
    const { container } = render(<Problem />);
    expect(container.querySelector("#problem")).toBeInTheDocument();
  });

  it("displays the section heading", () => {
    render(<Problem />);
    expect(
      screen.getByRole("heading", { level: 2, name: /broken oligopoly/i })
    ).toBeInTheDocument();
  });

  it("renders all stat cards", () => {
    render(<Problem />);
    for (const stat of STATS) {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
    }
  });
});

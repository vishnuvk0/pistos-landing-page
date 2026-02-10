import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { About } from "@/components/about";
import { COMPANY } from "@/lib/constants";

describe("About", () => {
  it("renders with correct section id", () => {
    const { container } = render(<About />);
    expect(container.querySelector("#about")).toBeInTheDocument();
  });

  it("displays the section heading with company name", () => {
    render(<About />);
    expect(
      screen.getByRole("heading", { level: 2, name: new RegExp(COMPANY.name, "i") })
    ).toBeInTheDocument();
  });

  it("displays the company mission", () => {
    render(<About />);
    expect(screen.getByText(COMPANY.mission)).toBeInTheDocument();
  });
});

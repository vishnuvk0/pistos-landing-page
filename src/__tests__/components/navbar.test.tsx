import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Navbar } from "@/components/navbar";
import { COMPANY, NAV_LINKS } from "@/lib/constants";

describe("Navbar", () => {
  it("renders the company name", () => {
    render(<Navbar />);
    expect(screen.getByText(COMPANY.name)).toBeInTheDocument();
  });

  it("renders all navigation links on desktop", () => {
    render(<Navbar />);
    for (const link of NAV_LINKS) {
      expect(screen.getByRole("link", { name: link.label })).toHaveAttribute(
        "href",
        link.href
      );
    }
  });
});

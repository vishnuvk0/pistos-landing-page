import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Hero } from "@/components/hero";
import { COMPANY } from "@/lib/constants";

describe("Hero", () => {
  it("renders without crashing", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("displays the company tagline", () => {
    render(<Hero />);
    expect(screen.getByText(COMPANY.tagline)).toBeInTheDocument();
  });

  it("displays the company description", () => {
    render(<Hero />);
    expect(screen.getByText(COMPANY.description)).toBeInTheDocument();
  });
});

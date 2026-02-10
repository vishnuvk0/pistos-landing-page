import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Solution } from "@/components/solution";
import { FEATURES } from "@/lib/constants";

describe("Solution", () => {
  it("renders with correct section id", () => {
    const { container } = render(<Solution />);
    expect(container.querySelector("#solution")).toBeInTheDocument();
  });

  it("displays the section heading", () => {
    render(<Solution />);
    expect(
      screen.getByRole("heading", { level: 2, name: /speed of ai/i })
    ).toBeInTheDocument();
  });

  it("renders all feature cards", () => {
    render(<Solution />);
    for (const feature of FEATURES) {
      expect(screen.getByText(feature.title)).toBeInTheDocument();
    }
  });
});

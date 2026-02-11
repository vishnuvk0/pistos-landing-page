import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "@/app/page";

describe("Home page", () => {
  it("renders all sections in correct order", () => {
    const { container } = render(<Home />);

    const sectionIds = ["problem", "solution"];
    const sections = container.querySelectorAll("section[id]");
    const ids = Array.from(sections).map((s) => s.id);

    for (const id of sectionIds) {
      expect(ids).toContain(id);
    }
  });

  it("renders the hero heading", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("has nav link targets present in the document", () => {
    const { container } = render(<Home />);

    for (const id of ["problem", "solution"]) {
      expect(container.querySelector(`#${id}`)).toBeInTheDocument();
    }
  });

  it("renders the LogoMarquee section", () => {
    render(<Home />);
    expect(screen.getByText("Built by alumni from")).toBeInTheDocument();
  });
});

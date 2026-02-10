import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "@/app/page";
import { NAV_LINKS } from "@/lib/constants";

describe("Home page", () => {
  it("renders all sections in correct order", () => {
    const { container } = render(<Home />);

    const sectionIds = ["problem", "solution", "about"];
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

    // Check that section IDs from nav links (minus #) exist in the page
    // (Contact is in the footer which is in layout, not in page)
    const pageSectionLinks = NAV_LINKS.filter(
      (l) => l.href !== "#contact"
    );

    for (const link of pageSectionLinks) {
      const id = link.href.replace("#", "");
      expect(container.querySelector(`#${id}`)).toBeInTheDocument();
    }
  });
});

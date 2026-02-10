import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
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

  it("renders all stat values and labels in accordion triggers", () => {
    render(<Problem />);
    for (const stat of STATS) {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    }
  });

  it("accordion items start collapsed", () => {
    render(<Problem />);
    const buttons = screen.getAllByRole("button");
    for (const btn of buttons) {
      expect(btn).toHaveAttribute("aria-expanded", "false");
    }
  });

  it("expands accordion item on click to show description", async () => {
    const user = userEvent.setup();
    render(<Problem />);

    const firstButton = screen.getAllByRole("button")[0];
    await user.click(firstButton);

    expect(firstButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(STATS[0].description)).toBeInTheDocument();
  });

  it("collapses open item when another is clicked", async () => {
    const user = userEvent.setup();
    render(<Problem />);

    const buttons = screen.getAllByRole("button");
    await user.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");

    await user.click(buttons[1]);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "false");
    expect(buttons[1]).toHaveAttribute("aria-expanded", "true");
  });
});

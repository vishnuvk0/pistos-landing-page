import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import LoginPage from "@/app/login/page";

describe("Login page", () => {
  it("renders heading", () => {
    render(<LoginPage />);
    expect(
      screen.getByRole("heading", { name: /log in to pistos/i })
    ).toBeInTheDocument();
  });

  it("renders email input with label", () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<LoginPage />);
    expect(
      screen.getByRole("button", { name: /continue with email/i })
    ).toBeInTheDocument();
  });

  it("shows validation error for empty email on submit", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.click(screen.getByRole("button", { name: /continue with email/i }));

    expect(screen.getByRole("alert")).toHaveTextContent("Email is required");
  });

  it("shows validation error for invalid email format", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.type(screen.getByLabelText(/email address/i), "notanemail");
    await user.click(screen.getByRole("button", { name: /continue with email/i }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Please enter a valid email address"
    );
  });

  it("shows success message on valid email submit", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.type(screen.getByLabelText(/email address/i), "test@example.com");
    await user.click(screen.getByRole("button", { name: /continue with email/i }));

    expect(
      screen.getByRole("heading", { name: /check your email/i })
    ).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("email input has proper accessibility attributes on error", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.click(screen.getByRole("button", { name: /continue with email/i }));

    const input = screen.getByLabelText(/email address/i);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "email-error");
  });
});

import { useState, FormEvent } from "react";

interface FormState {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  govOrg: string;
  newsletter: boolean;
}

interface FormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  govOrg?: string;
}

const initialState: FormState = {
  email: "",
  firstName: "",
  lastName: "",
  country: "",
  govOrg: "",
  newsletter: false,
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validate(data: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!data.email) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!data.firstName.trim()) errors.firstName = "First name is required.";
  if (!data.lastName.trim()) errors.lastName = "Last name is required.";
  if (!data.country) errors.country = "Select a country.";
  if (!data.govOrg) errors.govOrg = "This field is required.";

  return errors;
}

export default function RegistrationForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus("error");
      setStatusMessage("Please fix the errors above.");
      return;
    }

    setStatus("loading");
    setStatusMessage("");

    try {
      // This calls OUR OWN serverless function, never Directus directly.
      // The Directus token lives only in the server-side environment
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setStatusMessage("You're registered! Check your inbox for confirmation details.");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setStatusMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  const isLoading = status === "loading";

  return (
    <section className="form-card">
      <h2 className="form-card__heading">Registration Details</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="your.email@example.com"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            aria-invalid={!!errors.email}
          />
          <p className="field-error">{errors.email}</p>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="firstName">
              First Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="John"
              value={form.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              aria-invalid={!!errors.firstName}
            />
            <p className="field-error">{errors.firstName}</p>
          </div>
          <div className="field">
            <label htmlFor="lastName">
              Last Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Doe"
              value={form.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              aria-invalid={!!errors.lastName}
            />
            <p className="field-error">{errors.lastName}</p>
          </div>
        </div>

        <div className="field">
          <label htmlFor="country">
            Country <span className="required">*</span>
          </label>
          <select
            id="country"
            value={form.country}
            onChange={(e) => updateField("country", e.target.value)}
            aria-invalid={!!errors.country}
          >
            <option value="" disabled>
              Select country (required)
            </option>
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
            <option>India</option>
            <option>Australia</option>
            <option>Other</option>
          </select>
          <p className="field-error">{errors.country}</p>
        </div>

        <div className="field">
          <label htmlFor="govAffiliated">
            Do you work for or primarily support a government or government-affiliated organization?{" "}
            <span className="required">*</span>
          </label>
          <select
            id="govAffiliated"
            value={form.govOrg}
            onChange={(e) => updateField("govOrg", e.target.value)}
            aria-invalid={!!errors.govOrg}
          >
            <option value="" disabled></option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <p className="field-error">{errors.govOrg}</p>
        </div>

        <hr className="divider" />

        {/* New field for this assignment */}
        <div className="field field--checkbox">
          <input
            type="checkbox"
            id="newsletterOptIn"
            checked={form.newsletter}
            onChange={(e) => updateField("newsletter", e.target.checked)}
          />
          <label htmlFor="newsletterOptIn">
            Yes, sign me up for the InnovateUS weekly newsletter with updates on new courses, workshops, and events.
          </label>
        </div>

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? "Registering…" : "Register"}
        </button>

        <div className={`form-status form-status--${status}`} role="status" aria-live="polite">
          {statusMessage}
        </div>

        <p className="help-text">
          Having trouble registering? Contact us at <a href="mailto:hello@innovate-us.org">hello [at] innovate-us.org</a>
        </p>
      </form>
    </section>
  );
}
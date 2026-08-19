const DIRECTUS_URL = "https://burnes-center.directus.app/items/cw_intake";
const WORKSHOP_SERIES = "Practical Approaches to Evaluating AI for Public Benefit";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const token = process.env.DIRECTUS_TOKEN;
  if (!token) {
    console.error("DIRECTUS_TOKEN is not set in the environment.");
    return res.status(500).json({ error: "Server is misconfigured. Please try again later." });
  }

  const { email, firstName, lastName, country, govOrg, newsletter } = req.body || {};

  const errors = [];
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("A valid email is required.");
  if (!firstName || !firstName.trim()) errors.push("First name is required.");
  if (!lastName || !lastName.trim()) errors.push("Last name is required.");
  if (!country) errors.push("Country is required.");
  if (!govOrg) errors.push("Government affiliation answer is required.");

  if (errors.length) {
    return res.status(400).json({ error: errors.join(" ") });
  }

  try {
    const directusResponse = await fetch(DIRECTUS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        first_name: firstName,
        last_name: lastName,
        country,
        gov_org: govOrg,
        workshop_series: WORKSHOP_SERIES,
        newsletter: !!newsletter,
      }),
    });

    const data = await directusResponse.json();

    if (!directusResponse.ok) {
      console.error("Directus error:", data);
      return res.status(502).json({ error: "Could not save your registration. Please try again." });
    }

    return res.status(200).json({ success: true, id: data?.data?.id ?? null });
  } catch (err) {
    console.error("Unexpected error calling Directus:", err);
    return res.status(500).json({ error: "Unexpected server error. Please try again." });
  }
}
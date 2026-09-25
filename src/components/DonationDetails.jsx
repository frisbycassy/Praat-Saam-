import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import Card from "./Card";
import Button from "./Button";
import BilingualText from "./BilingualText";
import styles from "./DonationDetails.module.css";

// The banking details shown on the page, in order. `copy` adds a copy button.
const FIELDS = [
  { key: "bank_name", af: "Bank", en: "Bank" },
  { key: "account_name", af: "Rekeninghouer", en: "Account holder" },
  { key: "account_number", af: "Rekeningnommer", en: "Account number", copy: true },
  { key: "branch_code", af: "Takkode", en: "Branch code", copy: true },
  { key: "account_type", af: "Rekeningtipe", en: "Account type" },
  { key: "reference", af: "Verwysing", en: "Reference" },
];

const EMPTY_DETAILS = Object.fromEntries(FIELDS.map((field) => [field.key, ""]));

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Copying isn't allowed in some browsers; the value is still on screen.
    }
  }

  return (
    <button
      type="button"
      className={styles.copyButton}
      onClick={handleCopy}
      aria-label="Kopieer (Copy)"
    >
      {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      {copied ? "Gekopieer! (Copied!)" : "Kopieer (Copy)"}
    </button>
  );
}

// The optional-donation message and the teacher's banking details. Shown on
// the Skenk page and on the learners' My Onderwyser page; anyone can see it,
// only the teacher can edit the details.
function DonationDetails() {
  const { user } = useAuth();
  const isTeacher = user?.role === "teacher";

  const [details, setDetails] = useState(EMPTY_DETAILS);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(EMPTY_DETAILS);
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      const { data } = await supabase.from("donation_details").select("*").eq("id", 1).maybeSingle();
      if (!active) return;
      if (data) {
        setDetails(Object.fromEntries(FIELDS.map((field) => [field.key, data[field.key] || ""])));
      }
      setLoading(false);
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  const hasDetails = FIELDS.some((field) => details[field.key].trim());

  function startEditing() {
    setDraft(details);
    setSaveError("");
    setIsEditing(true);
  }

  async function handleSave(event) {
    event.preventDefault();
    setSaveError("");
    setIsSaving(true);
    const cleaned = Object.fromEntries(FIELDS.map((field) => [field.key, draft[field.key].trim()]));
    const { error } = await supabase
      .from("donation_details")
      .update({ ...cleaned, updated_at: new Date().toISOString() })
      .eq("id", 1);
    setIsSaving(false);
    if (error) {
      setSaveError("Kon nie stoor nie. Probeer weer. (Could not save. Please try again.)");
      return;
    }
    setDetails(cleaned);
    setIsEditing(false);
  }

  return (
    <>
      <Card className={`${styles.section} ${styles.highlight}`}>
        <BilingualText
          af="Praat Saam! is en bly gratis vir elke leerder. As jy die onderwyser graag wil ondersteun, is 'n skenking baie welkom, maar glad nie nodig nie."
          en="Praat Saam! is and stays free for every learner. If you'd like to support the teacher, a donation is very welcome, but never required."
        />
        <BilingualText af="Baie dankie vir jou ondersteuning!" en="Thank you for your support!" />
      </Card>

      <Card className={styles.section}>
        <BilingualText as="h3" af="Bankbesonderhede" en="Banking Details" />

        {loading ? (
          <BilingualText af="Laai..." en="Loading..." />
        ) : isEditing ? (
          <form className={styles.form} onSubmit={handleSave}>
            {FIELDS.map((field) => (
              <div key={field.key} className={styles.field}>
                <label htmlFor={`donate-${field.key}`}>
                  {field.af} ({field.en})
                </label>
                <input
                  id={`donate-${field.key}`}
                  type="text"
                  value={draft[field.key]}
                  onChange={(event) => setDraft({ ...draft, [field.key]: event.target.value })}
                />
              </div>
            ))}
            <p className={styles.note}>
              Hierdie besonderhede is sigbaar vir enigiemand met die skakel na die webwerf. (These
              details are visible to anyone with the link to the website.)
            </p>
            {saveError && <p className={styles.error}>{saveError}</p>}
            <div className={styles.actions}>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Stoor..." : "Stoor (Save)"}
              </Button>
              <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>
                Kanselleer (Cancel)
              </Button>
            </div>
          </form>
        ) : hasDetails ? (
          <dl className={styles.details}>
            {FIELDS.filter((field) => details[field.key]).map((field) => (
              <div key={field.key} className={styles.row}>
                <dt>
                  <span>{field.af}</span>
                  <span className={styles.en}>{field.en}</span>
                </dt>
                <dd>
                  <span className={styles.value}>{details[field.key]}</span>
                  {field.copy && <CopyButton value={details[field.key]} />}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <BilingualText
            af="Bankbesonderhede kom binnekort."
            en="Banking details coming soon."
          />
        )}

        {isTeacher && !isEditing && !loading && (
          <Button variant="secondary" className={styles.editButton} onClick={startEditing}>
            Wysig Bankbesonderhede (Edit Banking Details)
          </Button>
        )}
      </Card>
    </>
  );
}

export default DonationDetails;

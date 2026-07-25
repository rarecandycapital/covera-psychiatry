export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="mx-auto max-w-5xl space-y-3 px-5 py-8 text-[13px] leading-relaxed text-ink-soft">
        <p className="font-medium text-ink">
          Hackathon prototype — not a medical service.
        </p>
        <p>
          Covera is a demonstration build. It provides no medical advice, no
          diagnosis, and no treatment. No real appointments are booked, no real
          insurance claims are filed, and all clinicians shown are fictional.
          Nothing here creates a patient–provider relationship.
        </p>
        <p className="text-ink">
          <span className="font-medium">If you are in crisis:</span> call or
          text{" "}
          <a
            href="tel:988"
            className="font-semibold text-danger underline underline-offset-2"
          >
            988
          </a>{" "}
          (Suicide &amp; Crisis Lifeline), text{" "}
          <span className="font-semibold">HOME to 741741</span>, or call{" "}
          <span className="font-semibold">911</span> for an emergency.
        </p>
      </div>
    </footer>
  );
}

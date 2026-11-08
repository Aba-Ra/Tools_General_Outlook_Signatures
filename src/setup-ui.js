// This screen connects only the signed-in person's profile, on their click.
export function mountSetup({office, readProfile, isConfigured, render, document}) {
  const button = document.getElementById('connect');
  const status = document.getElementById('status');
  const preview = document.getElementById('preview');
  const account = document.getElementById('account');
  const state = document.getElementById('connection-state');
  const empty = document.getElementById('preview-empty');
  const next = document.getElementById('next-step');
  const email = office?.context?.mailbox?.userProfile?.emailAddress;
  const show = (message, label) => {
    status.textContent = message;
    if (state) state.textContent = label;
  };
  const clearPreview = () => {
    preview.replaceChildren();
    preview.hidden = true;
    if (empty) empty.hidden = false;
    if (next) next.hidden = true;
  };
  clearPreview();
  button.disabled = true;
  if (!email) {
    if (account) account.textContent = 'Open this app inside Outlook to see your work account.';
    show('In Outlook, open a new email, choose Apps, then Matertec Signatures. Your administrator must assign the app to you first.', 'Open in Outlook');
    return;
  }
  if (account) account.textContent = email;
  if (!isConfigured()) {
    show('Your administrator is finishing setup. Please check back before connecting your work details.', 'Setup pending');
    return;
  }
  show('Connect your work details to see your own signature preview.', 'Ready to connect');
  button.disabled = false;
  button.addEventListener('click', async () => {
    // Guard rapid clicks and remove any old preview before refreshing.
    if (button.disabled) return;
    button.disabled = true;
    button.textContent = 'Connecting…';
    button.setAttribute('aria-busy', 'true');
    clearPreview();
    show('Connecting to your Microsoft work profile. Complete sign-in if Microsoft asks.', 'Connecting');
    try {
      const profile = await readProfile(email, true);
      // All profile values pass through the existing escaped signature renderer.
      preview.innerHTML = render(profile).html;
      preview.hidden = false;
      if (empty) empty.hidden = true;
      if (next) next.hidden = false;
      show('Your work details are connected. Start a new email and check the signature before sending.', 'Work details connected');
      button.textContent = 'Refresh my work details';
    } catch (_) {
      clearPreview();
      show('We could not connect your work details. Check that Outlook is using your company account, then try again. If it still fails, ask your administrator for help.', 'Please try again');
      button.textContent = 'Try connecting again';
    } finally {
      button.disabled = false;
      button.removeAttribute('aria-busy');
    }
  });
}

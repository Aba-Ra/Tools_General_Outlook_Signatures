# UnifiedSignatures

Public distribution of **UnifiedSignatures by Matertec**, a Microsoft 365 app for automatic company email signatures. Canonical private development source: [Matertec_apps_UnifiedSignatures](https://github.com/Aba-Ra/Matertec_apps_UnifiedSignatures). This repository and its existing Pages address remain the installed Matertec pilot’s distribution host.

The owner selected UnifiedSignatures on 8 November 2026. Branding-only version **1.4.1.0** preserves the existing add-in identity, permissions, assignments, signature templates and hosting addresses. The newer customer-configuration work remains separate in private PR #7; it is not included in this public package. Earlier dated snapshots below describe their original stages and are superseded by this current identity section where names or source ownership differ.

- Source: https://github.com/Aba-Ra/Tools_General_Outlook_Signatures
- Static site: https://aba-ra.github.io/Tools_General_Outlook_Signatures/
- Canonical manifest: https://aba-ra.github.io/Tools_General_Outlook_Signatures/manifest.xml
- Runtime: https://aba-ra.github.io/Tools_General_Outlook_Signatures/employee-pilot/runtime.html
- Profile setup: https://aba-ra.github.io/Tools_General_Outlook_Signatures/employee-pilot/setup.html

## Current pilot boundary

Version 1.3 replaces the existing add-in using the same app ID. Both enterprise-app and Microsoft 365 add-in assignments are limited to aba.raha@matertec.com while live acceptance is pending. Entra showed administrator-granted delegated User.Read consent at tenant level; this is not an individual-principal consent record. Assignment required = Yes restricts effective app sign-in to the assigned pilot user. No wider employee rollout is accepted. The original signature repository/host stays available as rollback history until Microsoft has picked up the new URL. Do not install concurrent copies.

The Microsoft Entra registration is single tenant Matertec, client ID d609b965-7852-45d3-8816-8277a51dae19. It requests only delegated Graph User.Read for the signed-in person's displayName, jobTitle, mail and businessPhones. No client secret, staff directory file, mailbox-content upload or telemetry is included. Personal mobile numbers are excluded by default. Shared Admin, Accounts and Info retain Aba's approved contacts and role labels. Profile data and token caches are memory-only. ReadWriteItem still grants access to the current item beyond the signature-only behaviour this code implements.

## Build and validate

Run `npm ci --ignore-scripts`, `npm test`, `npm run build`. Commit the matching employee bundles. The 38 checks include the unchanged original fixed-template runtime regressions, 18 employee profile, identity, escaping and event-race checks, two browser-timer receiver regressions, and four setup-state regressions. Manifest validation and passing mocks do not prove execution in Outlook. See [deployment instructions](deployment/README.md) for exact configuration, origin trust, classic-Windows root allowlist, web/phone acceptance and rollback.

### Live debugging status — 2026-11-08

Outlook still loaded the predecessor v1.0 event URL. The predecessor runtime HTML now bridges to the canonical employee bundle on the same origin (predecessor PR #4, merge 36e15ebd58e967b7eab8ebba5412a183616e42e2). Network inspection confirmed the bridge and current bundle loaded. A native Console error then identified an invalid browser timer receiver before sender selection. PR #3 fixes both timer defaults, with receiver-sensitive regressions that fail against the original code; it was independently reviewed and merged as 5729e98bb4c522303009fdb4974bb85a5596e6c8. Pages publication succeeded and downloaded runtime bytes matched the reviewed bundle.

At that initial debugging checkpoint, actual profile retrieval and live acceptance were unverified, the profile editor's readback remained blank, and a manual Edge restart was requested. The following verification supersedes that checkpoint. Native Outlook and Exchange fallback signatures remain enabled.

### Outlook web verification after Edge restart — 2026-11-08

The Aba pilot now performs real own-profile retrieval: the canonical runtime's Graph `GET /v1.0/me?$select=displayName,jobTitle,mail,businessPhones` returned HTTP 200. The inspected Response showed Aba Raha, Director | Business Innovation Architect, aba.raha@matertec.com and +61 404 777 442. Company name remains fixed template text and was not independently verified as a directory property.

New compose inserted the hosted stacked-logo signature. From changes to Admin, Accounts and Info replaced the signature with the correct role label, blank line and approved contacts; returning to Aba restored the personal signature. Internal tests `MTWEB-1108-COMPOSE`, `MTWEB-1108-ADMIN`, `MTWEB-1108-ACCOUNTS` and `MTWEB-1108-INFO` were sent to Aba and inspected in the Inbox, with one correct signature/logo per fresh message. The reply in the COMPOSE conversation arrived with one new personal signature above the preserved quoted original, without an extra appended signature.

Reply all and Forward also passed draft-only placement checks against existing signed history; those diagnostic drafts were discarded, not sent. Forward testing required correcting the automation's caret navigation; it did not require another runtime change. Browser diagnostics were closed, temporary cache bypass was switched off, and newly created diagnostic drafts were discarded. Older saved drafts were preserved. Outlook remains open on the test conversation.

Phone, classic Windows and wider employee acceptance are still pending. Assignments remain limited to Aba; no wider rollout was performed. On the actual phone, check new compose and a reply first. Microsoft's shared/delegated From-change event limitation on mobile remains applicable; web sender-switch success does not establish mobile shared-mailbox behaviour.

GitHub Pages publishes docs/ from main. This public repository contains only public app code, public configuration identifiers and the approved business contact/logo material; no private employee roster or hosting credentials. Changes can alter code loaded by Outlook, so publishing access is security-sensitive. Other Pages projects on aba-ra.github.io share this browser origin and remain part of its trust boundary.

## App identity and artwork

Earlier on 2026-11-08 the owner accepted **Tools_General_Outlook_Signatures** and the display name **Matertec Signatures** for the initial utility. That product name and source classification are superseded by UnifiedSignatures and the private app repository above. This public repository name is retained for installation compatibility.

The new small app icon combines a Matertec-inspired monogram on a dark navy rounded tile with a soft blue envelope badge. High-resolution source: docs/brand/matertec-signatures-icon-v1.png; Outlook delivery sizes: 64px and 128px. This is new tool artwork derived from the supplied Matertec mark, not an alteration of the approved company signature logo. The email signature still uses the unchanged approved PNG on matertec.com.

The owner accepted the app icon and requested vault/marketing filing on 2026-11-08. Official artwork masters are now in the company vault under Brand Assets/Matertec Signatures; the vault brand-assets.json records checksums and this repository's corresponding copies. The Marketing/Templates/Matertec_Signatures_App_Icon_v1 pack provides identical reusable artwork. The approved company logo and signature template are unchanged.


### Friendly setup screen — 2026-11-08

Open a received email in Outlook, choose Apps, then UnifiedSignatures (older cached clients can still show Matertec Reply Signature Pilot). The setup command is on the read-message surface. The screen uses the approved envelope app icon, shows your signed-in work address and connection progress, and provides an escaped personal preview plus a clear test step. Profile access begins only after pressing Connect my work details; refresh failures clear stale previews. The same page gives useful opening instructions outside Outlook. The 340px layout was visually checked without horizontal page overflow. No employee rollout or signature-template change is included.

### Company-wide product identity — 2026-11-08

The owner clarified that the product is a Matertec employee-signature tool, not a personally named app. Public screens now say Company email signatures and Designed by Matertec Pty Ltd, use admin@matertec.com for help, and describe automatic Outlook signatures using each employee's own work profile. Version 1.4.0.0 updates the name/description and setup command label without changing the app ID, permissions or runtime. Employee names still belong in their own generated email signatures; approved shared-role contact details are unchanged.

This is company-wide product branding and capability, not proof of tenant-wide deployment. The last verified effective assignment is still Aba only. Enable approved everyday employee accounts through Microsoft administration; exclude administrator and emergency identities. Actual phone/classic Windows acceptance remains open. Do not replace the individual profile reader with Aba's fixed signature or use the technical-account all@ group for rollout.

## Ownership and commercial licensing

Copyright (c) 2026 Matertec Pty Ltd. All rights reserved for Matertec-owned material. UnifiedSignatures is proprietary; external commercial use requires a separate written licence. See [LICENSE](LICENSE) and the public [ownership notice](https://aba-ra.github.io/Tools_General_Outlook_Signatures/legal.html).

Microsoft MSAL and other third-party components retain their own ownership and licence terms. Full notices are in [THIRD_PARTY_NOTICES.txt](THIRD_PARTY_NOTICES.txt), also distributed beside the public app. No third-party code is claimed as Matertec-owned. A copyright notice records the intended rights position; contributor/artwork assignments and customer terms remain separate commercial-readiness evidence.

## Contact routing

Use **info@matertec.com** for licensing, external enquiries and questions. **admin@matertec.com** is reserved for internal company administration. Technical Microsoft tenant administration continues through the separately named administrator account; this contact policy does not change mailbox permissions or sender mappings.

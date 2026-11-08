# Matertec Signatures

Single-purpose internal tool in the existing Tools_General repository category. The Outlook signature add-in uses with the approved Matertec logo/template and employee-specific Microsoft 365 work details.

- Source: https://github.com/Aba-Ra/Tools_General_Outlook_Signatures
- Static site: https://aba-ra.github.io/Tools_General_Outlook_Signatures/
- Canonical manifest: https://aba-ra.github.io/Tools_General_Outlook_Signatures/manifest.xml
- Runtime: https://aba-ra.github.io/Tools_General_Outlook_Signatures/employee-pilot/runtime.html
- Profile setup: https://aba-ra.github.io/Tools_General_Outlook_Signatures/employee-pilot/setup.html

## Current pilot boundary

Version 1.3 replaces the existing add-in using the same app ID. Assignment and profile consent are for aba.raha@matertec.com only while live acceptance is pending. No wider employee rollout is accepted. The original signature repository/host stays available as rollback history until Microsoft has picked up the new URL. Do not install concurrent copies.

The Microsoft Entra registration is single tenant Matertec, client ID d609b965-7852-45d3-8816-8277a51dae19. It requests only delegated Graph User.Read for the signed-in person's displayName, jobTitle, mail and businessPhones. No client secret, staff directory file, mailbox-content upload or telemetry is included. Personal mobile numbers are excluded by default. Shared Admin, Accounts and Info retain Aba's approved contacts and role labels. Profile data and token caches are memory-only. ReadWriteItem still grants access to the current item beyond the signature-only behaviour this code implements.

## Build and validate

Run `npm ci --ignore-scripts`, `npm test`, `npm run build`. Commit the matching employee bundles. The 32 checks include the unchanged original fixed-template runtime regression checks plus 18 employee profile, identity, escaping and event-race checks. Manifest validation and passing mocks do not prove execution in Outlook. See [deployment instructions](deployment/README.md) for exact configuration, origin trust, classic-Windows root allowlist, web/phone acceptance and rollback.

GitHub Pages publishes docs/ from main. This public repository contains only public app code, public configuration identifiers and the approved business contact/logo material; no private employee roster or hosting credentials. Changes can alter code loaded by Outlook, so publishing access is security-sensitive. Other Pages projects on aba-ra.github.io share this browser origin and remain part of its trust boundary.

## App identity and artwork

Owner accepted the recommended repository name **Tools_General_Outlook_Signatures** and Outlook display name **Matertec Signatures** on 2026-11-08 after review of the existing repository categories. This is an internal utility, not a registered Matertec platform module. Module naming rule A-03 does not determine this utility's category. The previous repository name matertec-tools is superseded.

The new small app icon combines a Matertec-inspired monogram on a dark navy rounded tile with a soft blue envelope badge. High-resolution source: docs/brand/matertec-signatures-icon-v1.png; Outlook delivery sizes: 64px and 128px. This is new tool artwork derived from the supplied Matertec mark, not an alteration of the approved company signature logo. The email signature still uses the unchanged approved PNG on matertec.com.

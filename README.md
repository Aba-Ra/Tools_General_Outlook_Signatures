# Matertec Tools

Dedicated source repository for Matertec business tools. The first app is the Outlook signature add-in, with the approved Matertec logo/template and employee-specific Microsoft 365 work details.

- Source: https://github.com/Aba-Ra/matertec-tools
- Static site: https://aba-ra.github.io/matertec-tools/
- Canonical manifest: https://aba-ra.github.io/matertec-tools/manifest.xml
- Runtime: https://aba-ra.github.io/matertec-tools/employee-pilot/runtime.html
- Profile setup: https://aba-ra.github.io/matertec-tools/employee-pilot/setup.html

## Current pilot boundary

Version 1.2 replaces the existing add-in using the same app ID. Assignment and profile consent are for aba.raha@matertec.com only while live acceptance is pending. No wider employee rollout is accepted. The original signature repository/host stays available as rollback history until Microsoft has picked up the new URL. Do not install concurrent copies.

The Microsoft Entra registration is single tenant Matertec, client ID d609b965-7852-45d3-8816-8277a51dae19. It requests only delegated Graph User.Read for the signed-in person's displayName, jobTitle, mail and businessPhones. No client secret, staff directory file, mailbox-content upload or telemetry is included. Personal mobile numbers are excluded by default. Shared Admin, Accounts and Info retain Aba's approved contacts and role labels. Profile data and token caches are memory-only. ReadWriteItem still grants access to the current item beyond the signature-only behaviour this code implements.

## Build and validate

Run `npm ci --ignore-scripts`, `npm test`, `npm run build`. Commit the matching employee bundles. The 32 checks include the unchanged original fixed-template runtime regression checks plus 18 employee profile, identity, escaping and event-race checks. Manifest validation and passing mocks do not prove execution in Outlook. See [deployment instructions](deployment/README.md) for exact configuration, origin trust, classic-Windows root allowlist, web/phone acceptance and rollback.

GitHub Pages publishes docs/ from main. This public repository contains only public app code, public configuration identifiers and the approved business contact/logo material; no private employee roster or hosting credentials. Changes can alter code loaded by Outlook, so publishing access is security-sensitive. Other Pages projects on aba-ra.github.io share this browser origin and remain part of its trust boundary.

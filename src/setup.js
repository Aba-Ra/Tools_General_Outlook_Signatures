import { readProfile, isConfigured } from "./profile.js";
import { render } from "./signature.js";
import { mountSetup } from "./setup-ui.js";
Office.onReady(() => mountSetup({office: Office, readProfile, isConfigured, render, document}));

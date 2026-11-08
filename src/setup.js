// Copyright (c) 2026 Matertec Pty Ltd. All rights reserved. See LICENSE.
import { readProfile, isConfigured } from "./profile.js";
import { render } from "./signature.js";
import { mountSetup } from "./setup-ui.js";
Office.onReady(() => mountSetup({office: Office, readProfile, isConfigured, render, document}));

// Copyright (c) 2026 Matertec Pty Ltd. All rights reserved. See LICENSE.
import { makeHandler } from "./handler.js";
import { readProfile } from "./profile.js";
Office.actions.associate("applyMatertecSignature", makeHandler(Office, readProfile));
Office.onReady(() => {});

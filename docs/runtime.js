/* Matertec personal-signature pilot. No mailbox-body reads, storage or telemetry. */
(function () {
  "use strict";
  var generation = 0;
  var signatures = {
  "aba.raha@matertec.com": {
    "html": "<table role=\"presentation\" width=\"450\" height=\"150\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:450px;height:150px;table-layout:fixed;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:18px;color:#526177\"><tr><td width=\"126\" height=\"150\" align=\"center\" valign=\"middle\" style=\"width:126px;height:150px;padding:0 18px 0 0;border-right:1px solid #D9D9D9;text-align:center;vertical-align:middle\"><img src=\"https://matertec.com/brand/matertec-email-logo-v05.png\" width=\"108\" height=\"150\" alt=\"Matertec \u2014 The technology that matters\" style=\"display:block;border:0\"></td><td width=\"288\" height=\"150\" valign=\"middle\" style=\"width:288px;height:150px;padding:0 0 0 18px;vertical-align:middle\"><strong style=\"font-size:15px;line-height:22px;color:#142843\">Aba Raha</strong><br><span style=\"font-size:12px\">Director | Business Innovation Architect</span><br><span style=\"font-size:12px\">Matertec Pty Ltd | Perth WA</span><br><a href=\"mailto:aba.raha@matertec.com\" style=\"color:#2155D8;text-decoration:none\">aba.raha@matertec.com</a><br>+61 404 777 442<br><a href=\"https://matertec.com\" style=\"color:#2155D8;text-decoration:none\">matertec.com</a></td></tr></table>",
    "text": "Aba Raha\nDirector | Business Innovation Architect\n\nMatertec Pty Ltd | Perth WA\naba.raha@matertec.com\n+61 404 777 442\nmatertec.com"
  },
  "admin@matertec.com": {
    "html": "<table role=\"presentation\" width=\"450\" height=\"150\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:450px;height:150px;table-layout:fixed;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:18px;color:#526177\"><tr><td width=\"126\" height=\"150\" align=\"center\" valign=\"middle\" style=\"width:126px;height:150px;padding:0 18px 0 0;border-right:1px solid #D9D9D9;text-align:center;vertical-align:middle\"><img src=\"https://matertec.com/brand/matertec-email-logo-v05.png\" width=\"108\" height=\"150\" alt=\"Matertec \u2014 The technology that matters\" style=\"display:block;border:0\"></td><td width=\"288\" height=\"150\" valign=\"middle\" style=\"width:288px;height:150px;padding:0 0 0 18px;vertical-align:middle\"><strong style=\"font-size:15px;line-height:22px;color:#142843\">Admin</strong><br><br><span style=\"font-size:12px\">Matertec Pty Ltd | Perth WA</span><br><a href=\"mailto:aba.raha@matertec.com\" style=\"color:#2155D8;text-decoration:none\">aba.raha@matertec.com</a><br>+61 404 777 442<br><a href=\"https://matertec.com\" style=\"color:#2155D8;text-decoration:none\">matertec.com</a></td></tr></table>",
    "text": "Admin\n\nMatertec Pty Ltd | Perth WA\naba.raha@matertec.com\n+61 404 777 442\nmatertec.com"
  },
  "accounts@matertec.com": {
    "html": "<table role=\"presentation\" width=\"450\" height=\"150\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:450px;height:150px;table-layout:fixed;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:18px;color:#526177\"><tr><td width=\"126\" height=\"150\" align=\"center\" valign=\"middle\" style=\"width:126px;height:150px;padding:0 18px 0 0;border-right:1px solid #D9D9D9;text-align:center;vertical-align:middle\"><img src=\"https://matertec.com/brand/matertec-email-logo-v05.png\" width=\"108\" height=\"150\" alt=\"Matertec \u2014 The technology that matters\" style=\"display:block;border:0\"></td><td width=\"288\" height=\"150\" valign=\"middle\" style=\"width:288px;height:150px;padding:0 0 0 18px;vertical-align:middle\"><strong style=\"font-size:15px;line-height:22px;color:#142843\">Accounts</strong><br><br><span style=\"font-size:12px\">Matertec Pty Ltd | Perth WA</span><br><a href=\"mailto:aba.raha@matertec.com\" style=\"color:#2155D8;text-decoration:none\">aba.raha@matertec.com</a><br>+61 404 777 442<br><a href=\"https://matertec.com\" style=\"color:#2155D8;text-decoration:none\">matertec.com</a></td></tr></table>",
    "text": "Accounts\n\nMatertec Pty Ltd | Perth WA\naba.raha@matertec.com\n+61 404 777 442\nmatertec.com"
  },
  "info@matertec.com": {
    "html": "<table role=\"presentation\" width=\"450\" height=\"150\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:450px;height:150px;table-layout:fixed;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:18px;color:#526177\"><tr><td width=\"126\" height=\"150\" align=\"center\" valign=\"middle\" style=\"width:126px;height:150px;padding:0 18px 0 0;border-right:1px solid #D9D9D9;text-align:center;vertical-align:middle\"><img src=\"https://matertec.com/brand/matertec-email-logo-v05.png\" width=\"108\" height=\"150\" alt=\"Matertec \u2014 The technology that matters\" style=\"display:block;border:0\"></td><td width=\"288\" height=\"150\" valign=\"middle\" style=\"width:288px;height:150px;padding:0 0 0 18px;vertical-align:middle\"><strong style=\"font-size:15px;line-height:22px;color:#142843\">Info</strong><br><br><span style=\"font-size:12px\">Matertec Pty Ltd | Perth WA</span><br><a href=\"mailto:aba.raha@matertec.com\" style=\"color:#2155D8;text-decoration:none\">aba.raha@matertec.com</a><br>+61 404 777 442<br><a href=\"https://matertec.com\" style=\"color:#2155D8;text-decoration:none\">matertec.com</a></td></tr></table>",
    "text": "Info\n\nMatertec Pty Ltd | Perth WA\naba.raha@matertec.com\n+61 404 777 442\nmatertec.com"
  }
};

  function applyMatertecSignature(event) {
    var ticket = ++generation;
    var done = false;
    var timer;
    function finish() {
      if (done) return;
      done = true;
      clearTimeout(timer);
      event.completed();
    }
    function active() { return !done && ticket === generation; }
    function success(result) {
      return result && result.status === Office.AsyncResultStatus.Succeeded;
    }
    timer = setTimeout(finish, 8000);
    try {
      var item = Office.context.mailbox.item;
      if (!item || !item.from || !item.body ||
          typeof item.from.getAsync !== "function" ||
          typeof item.body.getTypeAsync !== "function" ||
          typeof item.body.setSignatureAsync !== "function") { finish(); return; }
      item.from.getAsync(function (sender) {
        if (!active()) { finish(); return; }
        if (!success(sender) || !sender.value) { finish(); return; }
        var signature = signatures[String(sender.value.emailAddress).trim().toLowerCase()];
        if (!signature) { finish(); return; }
        try {
          item.body.getTypeAsync(function (type) {
            if (!active()) { finish(); return; }
            if (!success(type)) { finish(); return; }
            var html = type.value === Office.CoercionType.Html;
            if (!html && type.value !== Office.CoercionType.Text) { finish(); return; }
            try {
              // Outlook owns signature placement. Never parse or rewrite quoted history.
              item.body.setSignatureAsync(html ? signature.html : signature.text,
                { coercionType: html ? Office.CoercionType.Html : Office.CoercionType.Text },
                function () { finish(); });
            } catch (_) { finish(); }
          });
        } catch (_) { finish(); }
      });
    } catch (_) { finish(); }
  }
  Office.actions.associate("applyMatertecSignature", applyMatertecSignature);
})();

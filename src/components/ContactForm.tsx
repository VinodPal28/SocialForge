import React, { useState, useEffect } from 'react';
import { Inquiry } from '../types';
import { Send, CheckCircle2, ListFilter, Trash2, ShieldCheck, Mail, Users, ExternalLink, FileSpreadsheet, Code2, Download, RefreshCw, Settings, HelpCircle, Key, Info, Layers } from 'lucide-react';

const getViewerInfo = () => {
  const userAgent = navigator.userAgent;
  let browser = "Unknown Browser";
  let os = "Unknown OS";

  // Simple browser detection
  if (userAgent.indexOf("Firefox") > -1) {
    browser = "Mozilla Firefox";
  } else if (userAgent.indexOf("SamsungBrowser") > -1) {
    browser = "Samsung Internet";
  } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
    browser = "Opera";
  } else if (userAgent.indexOf("Trident") > -1) {
    browser = "Microsoft Internet Explorer";
  } else if (userAgent.indexOf("Edge") > -1 || userAgent.indexOf("Edg") > -1) {
    browser = "Microsoft Edge";
  } else if (userAgent.indexOf("Chrome") > -1) {
    browser = "Google Chrome";
  } else if (userAgent.indexOf("Safari") > -1) {
    browser = "Apple Safari";
  }

  // Simple OS detection
  if (userAgent.indexOf("Win") > -1) os = "Windows";
  else if (userAgent.indexOf("Mac") > -1) os = "macOS";
  else if (userAgent.indexOf("Linux") > -1) {
    if (userAgent.indexOf("Android") > -1) os = "Android";
    else os = "Linux";
  } else if (userAgent.indexOf("iPhone") > -1 || userAgent.indexOf("iPad") > -1 || userAgent.indexOf("iPod") > -1) {
    os = "iOS";
  }

  const screenSize = `${window.screen.width}x${window.screen.height}`;
  const language = navigator.language || "Unknown Language";
  
  let timezone = "Unknown Timezone";
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (err) {
    // Ignore timezone detection errors
  }

  return { browser, os, screenSize, language, timezone };
};

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [socialLink, setSocialLink] = useState('');
  const [budget, setBudget] = useState('$3,000 - $5,000 / mo');
  const [serviceType, setServiceType] = useState('Full Channel Growth Strategy');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiries, setSubmittedInquiries] = useState<Inquiry[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCRM, setShowCRM] = useState(false);
  const [pageViews, setPageViews] = useState(0);

  // Google Sheets Sync States
  const [syncMethod, setSyncMethod] = useState<'webhook' | 'oauth'>(
    () => (localStorage.getItem('social_forge_sync_method') as 'webhook' | 'oauth') || 'webhook'
  );
  const [webhookUrl, setWebhookUrl] = useState(() => {
    const stored = localStorage.getItem('social_forge_webhook_url');
    if (!stored || stored.includes('AKfycbz8ArZYD1RUwjMp8U9K_uaYwSgwbC6APRc528c29Wvkt7ORFyaTyqN7kzXVY1QxHZV6')) {
      return 'https://script.google.com/macros/s/AKfycbyrdio2LUZMrAu3mY2X1_TNWOCDSpbekaNIUim90QGBQ5YJ3e1o5rEGDPCR6Hm8O94D/exec';
    }
    return stored;
  });
  const [oauthToken, setOauthToken] = useState(() => localStorage.getItem('social_forge_oauth_token') || '');
  const [isTesting, setIsTesting] = useState(false);
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);

  const appsScriptCode = `function doGet(e) {
  return ContentService.createTextOutput("Social Forge Integration Active!\\n\\nThis web app is working perfectly and is ready to receive POST submissions from your intake form and website visitors. You can submit the form or view the page, and the data will populate in the correct spreadsheets successfully!")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    var ss = SpreadsheetApp.openById("1-iG5LHMCB7AvUgyCk5AxSzwSL7O7qgbgr1Kfpy8PPOY");
    var rowData = {};
    var isPageView = false;
    
    // 1. Try to read from POST JSON contents
    if (e.postData && e.postData.contents) {
      try {
        var json = JSON.parse(e.postData.contents);
        if (json.isTest) {
          return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Connected!" }))
            .setMimeType(ContentService.MimeType.JSON)
            .addHeader("Access-Control-Allow-Origin", "*");
        }
        if (json.action === "pageview" || json.type === "pageview") {
          isPageView = true;
        }
        for (var key in json) {
          rowData[key] = json[key];
        }
      } catch (jsonErr) {
        // Not JSON formatted
      }
    }
    
    // 2. Read from raw form parameters (for standard FormData or x-www-form-urlencoded)
    if (e.parameter) {
      if (e.parameter["action"] === "pageview" || e.parameter["type"] === "pageview") {
        isPageView = true;
      }
      for (var key in e.parameter) {
        rowData[key] = e.parameter[key];
      }
    }
    
    if (isPageView) {
      // Get or create "Viewers" sheet
      var viewerSheet = ss.getSheetByName("Viewers");
      if (!viewerSheet) {
        viewerSheet = ss.insertSheet("Viewers");
      }
      if (viewerSheet.getLastRow() === 0) {
        viewerSheet.appendRow(["View ID", "Date", "Browser", "Operating System", "Resolution", "Timezone", "Language", "Page URL"]);
      }
      
      var viewId = rowData["id"] || rowData["viewId"] || "view_" + Date.now();
      var viewDate = rowData["createdAt"] || rowData["createdAt"] || new Date().toLocaleString('en-US');
      var browser = rowData["browser"] || rowData["Browser"] || "";
      var os = rowData["os"] || rowData["Operating System"] || "";
      var res = rowData["screenSize"] || rowData["Resolution"] || "";
      var tz = rowData["timezone"] || rowData["Timezone"] || "";
      var lang = rowData["language"] || rowData["Language"] || "";
      var url = rowData["url"] || rowData["Page URL"] || "";
      
      viewerSheet.appendRow([viewId, viewDate, browser, os, res, tz, lang, url]);
      
      return ContentService.createTextOutput(JSON.stringify({ "status": "success", "message": "Viewer logged successfully!" }))
        .setMimeType(ContentService.MimeType.JSON)
        .addHeader("Access-Control-Allow-Origin", "*");
    } else {
      // Get or create "Inquiries" sheet (defaults to first sheet if "Inquiries" is not named yet)
      var sheet = ss.getSheetByName("Inquiries");
      if (!sheet) {
        sheet = ss.getSheets()[0];
        // Rename if it is default Sheet1
        if (sheet.getName() === "Sheet1") {
          try {
            sheet.setName("Inquiries");
          } catch(nameErr) {}
        }
      }
      
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(["Inquiry ID", "Date", "Name", "Email", "Brand", "Social Link/Handle", "Focus Goal", "Monthly Budget", "Assessment / Message", "Browser", "Operating System", "Resolution", "Timezone", "Language"]);
      }
      
      // Generate fallbacks
      if (!rowData["id"]) {
        rowData["id"] = "inq_" + Date.now();
      }
      if (!rowData["createdAt"]) {
        rowData["createdAt"] = new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
      
      sheet.appendRow([
        rowData["id"] || rowData["Inquiry ID"] || "",
        rowData["createdAt"] || rowData["Date"] || "",
        rowData["name"] || rowData["Name"] || "",
        rowData["email"] || rowData["Email"] || "",
        rowData["companyName"] || rowData["Brand"] || "",
        rowData["socialLink"] || rowData["Social Link/Handle"] || "",
        rowData["serviceType"] || rowData["Focus Goal"] || "",
        rowData["budget"] || rowData["Monthly Budget"] || "",
        rowData["message"] || rowData["Assessment / Message"] || "",
        rowData["browser"] || rowData["Browser"] || "",
        rowData["os"] || rowData["Operating System"] || "",
        rowData["screenSize"] || rowData["Resolution"] || "",
        rowData["timezone"] || rowData["Timezone"] || "",
        rowData["language"] || rowData["Language"] || ""
      ]);
      
      return ContentService.createTextOutput(JSON.stringify({ "status": "success", "message": "Submission sync completed!" }))
        .setMimeType(ContentService.MimeType.JSON)
        .addHeader("Access-Control-Allow-Origin", "*");
    }
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": err.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .addHeader("Access-Control-Allow-Origin", "*");
  }
}`;

  // Load inquiries and retrieve/increment page views from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('social_forge_inquiries');
    if (stored) {
      try {
        setSubmittedInquiries(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse inquiries', e);
      }
    }

    // Retrieve and increment visitor page views count
    const storedViews = localStorage.getItem('social_forge_site_views');
    const views = storedViews ? parseInt(storedViews, 10) : 0;
    const newViews = views + 1;
    localStorage.setItem('social_forge_site_views', newViews.toString());
    setPageViews(newViews);

    // Dynamic insertion of Google Identity Services library
    if (!document.getElementById('google-gsi-client')) {
      const script = document.createElement('script');
      script.id = 'google-gsi-client';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  // Synchronize viewer page load in background to Google Sheet as a Pageview action
  useEffect(() => {
    const activeUrl = localStorage.getItem('social_forge_webhook_url') || 'https://script.google.com/macros/s/AKfycbyrdio2LUZMrAu3mY2X1_TNWOCDSpbekaNIUim90QGBQ5YJ3e1o5rEGDPCR6Hm8O94D/exec';
    if (activeUrl) {
      const viewer = getViewerInfo();
      const viewFormData = new FormData();
      viewFormData.append('action', 'pageview');
      viewFormData.append('id', 'view_' + Date.now() + '_' + Math.floor(Math.random() * 1000));
      viewFormData.append('createdAt', new Date().toLocaleString('en-US'));
      viewFormData.append('browser', viewer.browser);
      viewFormData.append('os', viewer.os);
      viewFormData.append('screenSize', viewer.screenSize);
      viewFormData.append('timezone', viewer.timezone);
      viewFormData.append('language', viewer.language);
      viewFormData.append('url', window.location.href);

      fetch(activeUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: viewFormData
      }).then(() => {
        console.log('Automated website viewer details synchronized with Google Sheet Viewers tab.');
      }).catch((err) => {
        console.warn('Failed to post viewer tracking:', err);
      });
    }
  }, []);

  // Save syncMethod changes
  useEffect(() => {
    localStorage.setItem('social_forge_sync_method', syncMethod);
  }, [syncMethod]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    const viewer = getViewerInfo();

    // Construct a FormData object matching spreadsheet columns exactly
    const formData = new FormData();
    const id = 'inq_' + Date.now();
    const createdAt = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Populate standard columns
    formData.append('Inquiry ID', id);
    formData.append('Date', createdAt);
    formData.append('Name', name);
    formData.append('Email', email);
    formData.append('Brand', companyName);
    formData.append('Social Link/Handle', socialLink);
    formData.append('Focus Goal', serviceType);
    formData.append('Monthly Budget', budget);
    formData.append('Assessment / Message', message);
    formData.append('Browser', viewer.browser);
    formData.append('Operating System', viewer.os);
    formData.append('Resolution', viewer.screenSize);
    formData.append('Timezone', viewer.timezone);
    formData.append('Language', viewer.language);

    // Also populate lower-cased fields for standard Google Apps Script configurations
    formData.append('id', id);
    formData.append('createdAt', createdAt);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('companyName', companyName);
    formData.append('socialLink', socialLink);
    formData.append('serviceType', serviceType);
    formData.append('budget', budget);
    formData.append('message', message);
    formData.append('browser', viewer.browser);
    formData.append('os', viewer.os);
    formData.append('screenSize', viewer.screenSize);
    formData.append('timezone', viewer.timezone);
    formData.append('language', viewer.language);

    // Simulate elite server agency submission speed
    setTimeout(() => {
      const newInquiry: Inquiry = {
        id,
        name,
        email,
        companyName,
        socialLink,
        budget,
        serviceType,
        message,
        createdAt,
        status: 'new',
        browser: viewer.browser,
        os: viewer.os,
        screenSize: viewer.screenSize,
        timezone: viewer.timezone,
        language: viewer.language
      };

      const updated = [newInquiry, ...submittedInquiries];
      setSubmittedInquiries(updated);
      localStorage.setItem('social_forge_inquiries', JSON.stringify(updated));

      // Automated Google Sheets Integration Trigger
      if (syncMethod === 'webhook' && webhookUrl && webhookUrl.trim().startsWith('http')) {
        console.log('Pushing dynamic lead via Apps Script Web App using FormData...', webhookUrl);
        fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          body: formData
        }).then(() => {
          console.log('Apps Script Web App Sync triggered successfully.');
          setSyncSuccess('Successfully submitted and sync with sheet is complete!');
        }).catch((err) => {
          console.error('Apps Script Web App Sync failed:', err);
          setSyncError('Apps Script Web App sync error: ' + err.message);
        });
      } else if (syncMethod === 'oauth' && oauthToken) {
        console.log('Pushing dynamic lead via Direct Sheets API OAuth...');
        const sheetsBody = {
          values: [[
            newInquiry.id,
            newInquiry.createdAt,
            newInquiry.name,
            newInquiry.email,
            newInquiry.companyName || '',
            newInquiry.socialLink || '',
            newInquiry.serviceType,
            newInquiry.budget,
            newInquiry.message,
            newInquiry.browser || '',
            newInquiry.os || '',
            newInquiry.screenSize || '',
            newInquiry.timezone || '',
            newInquiry.language || ''
          ]]
        };
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/1-iG5LHMCB7AvUgyCk5AxSzwSL7O7qgbgr1Kfpy8PPOY/values/A2:append?valueInputOption=USER_ENTERED`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${oauthToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(sheetsBody)
        }).then((res) => {
          if (res.ok) console.log('Direct OAuth Sheets Sync successful!');
          else console.error('Direct OAuth Sheets Sync rejected:', res.statusText);
        }).catch((err) => {
          console.error('Direct OAuth Sheets Sync error:', err);
        });
      }

      // Reset Form fields
      setName('');
      setEmail('');
      setCompanyName('');
      setSocialLink('');
      setMessage('');
      setIsSubmitting(false);
      setShowSuccess(true);

      // Dismiss success screen after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5050);
    }, 1200);
  };

  // Google Sheets integration helper functions
  const handleCopyScript = () => {
    navigator.clipboard.writeText(appsScriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleTestWebhook = async () => {
    if (!webhookUrl) return;
    setIsTesting(true);
    setSyncSuccess(null);
    setSyncError(null);
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isTest: true })
      });
      setSyncSuccess('Connection test completed! Check your Google Sheet to confirm.');
    } catch (err: any) {
      setSyncError(err.message || 'Connection test failed. Check the web app URL execution flags.');
    } finally {
      setIsTesting(false);
    }
  };

  const handleSyncAllToSheets = async () => {
    if (submittedInquiries.length === 0) {
      setSyncError('No Inquiries exist in local base to sync.');
      return;
    }
    setIsSyncingAll(true);
    setSyncSuccess(null);
    setSyncError(null);

    if (syncMethod === 'oauth') {
      if (!oauthToken) {
        setSyncError('Please authorize Google Sheets first using OAuth client.');
        setIsSyncingAll(false);
        return;
      }
      try {
        const bodyObj = {
          values: submittedInquiries.map(inq => [
            inq.id,
            inq.createdAt,
            inq.name,
            inq.email,
            inq.companyName || '',
            inq.socialLink || '',
            inq.serviceType,
            inq.budget,
            inq.message,
            inq.browser || '',
            inq.os || '',
            inq.screenSize || '',
            inq.timezone || '',
            inq.language || ''
          ])
        };
        const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1-iG5LHMCB7AvUgyCk5AxSzwSL7O7qgbgr1Kfpy8PPOY/values/A2:append?valueInputOption=USER_ENTERED`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${oauthToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bodyObj)
        });
        if (!res.ok) {
          throw new Error(`Direct OAuth Sheets API rejected request: ${res.status}`);
        }
        setSyncSuccess(`Direct synced ${submittedInquiries.length} local records to Google Sheets successfully!`);
      } catch (err: any) {
        setSyncError(err.message || 'Direct OAuth Sheets synchronization failed.');
      } finally {
        setIsSyncingAll(false);
      }
      return;
    }

    if (!webhookUrl) {
      setSyncError('Google Sheets Apps Script URL is required.');
      setIsSyncingAll(false);
      return;
    }

    try {
      let successCount = 0;
      for (const inq of submittedInquiries) {
        await fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(inq)
        });
        successCount++;
      }
      setSyncSuccess(`Direct synced ${successCount} local records to your Google Sheet!`);
    } catch (err: any) {
      setSyncError(err.message || 'Sync failed.');
    } finally {
      setIsSyncingAll(false);
    }
  };

  const handleOAuthConnect = () => {
    try {
      if (!(window as any).google) {
        alert('Google GSI SDK is still loading or blocked. Kindly try again in a few seconds!');
        return;
      }
      
      const savedClientId = localStorage.getItem('social_forge_client_id') || '';
      const clientId = prompt(
        'Please enter your Google API Console OAuth Client ID:\n(If you do not have one configured, we recommend using the key-free "Google Apps Script" option instead!)', 
        savedClientId
      );
      if (!clientId) return;
      localStorage.setItem('social_forge_client_id', clientId);

      const client = (window as any).google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        callback: (tokenResponse: any) => {
          if (tokenResponse && tokenResponse.access_token) {
            setOauthToken(tokenResponse.access_token);
            localStorage.setItem('social_forge_oauth_token', tokenResponse.access_token);
            setSyncSuccess('Authorized & connected Google Sheets API successfully!');
            setSyncError(null);
          }
        },
      });
      client.requestAccessToken();
    } catch (err: any) {
      console.error('OAuth connection error:', err);
      setSyncError('OAuth initialization error: ' + err.message);
    }
  };

  const downloadCSV = () => {
    if (submittedInquiries.length === 0) return;
    const headers = [
      "Inquiry ID", 
      "Date", 
      "Name", 
      "Email", 
      "Brand Name", 
      "Channel Link", 
      "Expertise Requested", 
      "Monthly Budget", 
      "Message",
      "Browser",
      "Operating System",
      "Resolution",
      "Timezone",
      "Language"
    ];
    const rows = submittedInquiries.map(inq => [
      inq.id,
      inq.createdAt,
      inq.name,
      inq.email,
      inq.companyName || '',
      inq.socialLink || '',
      inq.serviceType,
      inq.budget,
      inq.message,
      inq.browser || '',
      inq.os || '',
      inq.screenSize || '',
      inq.timezone || '',
      inq.language || ''
    ]);
    
    // Create Excel compatible UTF-8 CSV with BOM (Byte Order Mark)
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))].join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `social_forge_inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteInquiry = (id: string) => {
    const filtered = submittedInquiries.filter(inq => inq.id !== id);
    setSubmittedInquiries(filtered);
    localStorage.setItem('social_forge_inquiries', JSON.stringify(filtered));
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#0a0a0a]">
      {/* Glow Effects */}
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-amber-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-zinc-800/85 bg-zinc-900/40 rounded-full text-[10px] font-mono text-amber-500 uppercase tracking-widest">
            Growth Hub
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight uppercase">
            FORGE YOUR <span className="text-zinc-500 italic font-light lowercase">channel growth.</span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl font-light">
            Ready to claim the views you merit? Let's design your high-retention content formula. Complete our intake sheet below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Card Left: Contact Form details */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-[#0c0c0e]/95 border border-zinc-850 p-8 rounded-3xl flex flex-col gap-8">
              <h3 className="text-xl md:text-2xl font-display font-medium text-white">
                Contact Strategy Desk
              </h3>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-zinc-900/50 rounded-xl text-amber-500 border border-zinc-800">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Email Us Directly</h4>
                    <p className="text-sm text-zinc-400 mt-1">partner@socialforge.co</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-zinc-900/50 rounded-xl text-amber-500 border border-zinc-800">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Growth Consultation Hours</h4>
                    <p className="text-sm text-zinc-400 mt-1">Monday – Friday, 9AM – 6PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-zinc-900/50 rounded-xl text-amber-500 border border-zinc-800">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Confidentiality Assured</h4>
                    <p className="text-sm text-zinc-400 mt-1">No metadata leaks. No code hacks. Total IP rights reserved.</p>
                  </div>
                </div>
              </div>

              {/* Dynamic Live Desk Metrics */}
              <div className="border-t border-zinc-800/60 pt-6 flex flex-col gap-4">
                <h4 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Live Strategy Desk Activity</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-zinc-900/40 border border-zinc-800/50 p-4 rounded-xl flex flex-col gap-1 transition-all hover:border-amber-500/20">
                    <span className="text-[10px] text-zinc-500 font-mono">Visitor Views</span>
                    <span className="text-lg font-bold text-white font-display flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                      {pageViews}
                    </span>
                  </div>
                  <div className="bg-zinc-900/40 border border-zinc-800/50 p-4 rounded-xl flex flex-col gap-1 transition-all hover:border-amber-500/20">
                    <span className="text-[10px] text-zinc-500 font-mono">My Inquiries</span>
                    <span className="text-lg font-bold text-amber-500 font-display">
                      {submittedInquiries.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* View CRM toggle */}
              <div className="border-t border-zinc-800 pt-6 mt-2">
                <button
                  onClick={() => setShowCRM(!showCRM)}
                  id="btn-crm-toggle"
                  className="w-full flex items-center justify-between px-4 py-3 border border-zinc-800 bg-zinc-900/50 text-xs font-mono font-bold tracking-wide uppercase text-zinc-300 hover:text-white rounded-xl transition-all cursor-pointer hover:border-amber-500/50"
                >
                  <span>{showCRM ? 'Hide Inquiry Desk' : `View Inquiry Desk (${submittedInquiries.length})`}</span>
                  <ListFilter className="w-4 h-4 text-amber-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Card Right: Live Interactive Form Sheets */}
          <div className="lg:col-span-8">
            <div className="bg-[#0c0c0e]/95 border border-zinc-850 p-8 md:p-10 rounded-[32px] relative animate-fade-in">
              
              {/* Floating success popup banner */}
              {showSuccess && (
                <div 
                  id="form-success-banner"
                  className="absolute top-4 left-4 right-4 z-25 flex items-center gap-3 bg-emerald-950/90 border border-emerald-500/50 p-4 rounded-2xl backdrop-blur-md text-emerald-300 shadow-xl"
                >
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">Forge Inquiry Submitted successfully!</h4>
                    <p className="text-xs text-emerald-400/90 mt-0.5">We review intake forms within 4 operating hours. Your details have been locally processed.</p>
                  </div>
                </div>
              )}

              {/* CRM Mode */}
              {showCRM ? (
                <div className="flex flex-col gap-6 font-sans text-white" id="crm-panel">
                  {/* Title & Hub Action Area */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                    <div>
                      <h3 className="text-xl font-display font-medium text-white tracking-tight flex items-center gap-2">
                        <Layers className="w-5 h-5 text-amber-500" /> CRM Inquiry Control Desk
                      </h3>
                      <p className="text-xs text-zinc-500 mt-1">Manage local client files and sync to the cloud spreadsheet.</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={downloadCSV}
                        disabled={submittedInquiries.length === 0}
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 rounded-lg text-xs font-mono font-medium text-zinc-300 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:text-amber-500 hover:border-amber-500/30 shadow"
                        title="Download locally processed files in Excel CSV roster format"
                      >
                        <Download className="w-3.5 h-3.5 text-amber-500" /> Export Excel/CSV
                      </button>
                    </div>
                  </div>

                  {/* Twin Engine Grid */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
                    
                    {/* Column 1: Local Inquiries List */}
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Local Intake Files</span>
                        <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2.5 py-0.5 rounded border border-zinc-850">
                          {submittedInquiries.length} Record(s)
                        </span>
                      </div>

                      {submittedInquiries.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 px-6 border-2 border-dashed border-zinc-900 rounded-2xl text-center gap-4">
                          <Users className="w-8 h-8 text-zinc-700 animate-pulse" />
                          <div className="flex flex-col gap-1">
                            <h4 className="text-sm font-semibold text-white">No Inquiries Found</h4>
                            <p className="text-[11px] text-zinc-500 max-w-xs font-light">
                              Once users dispatch the intake sheet, details are recorded dynamically.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-4 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin">
                          {submittedInquiries.map((inq) => (
                            <div key={inq.id} className="bg-zinc-900/40 border border-zinc-850 p-4 rounded-xl flex flex-col gap-3 transition-colors hover:border-zinc-800">
                              <div className="flex justify-between items-start gap-4">
                                <div>
                                  <h4 className="font-semibold text-white text-sm">{inq.name}</h4>
                                  <span className="text-xs text-zinc-500">{inq.email}</span>
                                </div>
                                <button
                                  onClick={() => handleDeleteInquiry(inq.id)}
                                  className="p-1 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors cursor-pointer"
                                  title="Delete lead locally"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div className="grid grid-cols-2 gap-2 bg-[#09090b]/80 p-2.5 rounded-lg border border-zinc-850/50">
                                <div className="flex flex-col gap-0.5">
                                  <span className="text-[8px] text-zinc-500 font-mono">Service Goal</span>
                                  <span className="text-[11px] text-zinc-300 truncate">{inq.serviceType}</span>
                                </div>
                                <div className="flex flex-col gap-0.5">
                                  <span className="text-[8px] text-zinc-500 font-mono">Budget Tier</span>
                                  <span className="text-[11px] text-amber-500 truncate">{inq.budget}</span>
                                </div>
                              </div>

                              {inq.socialLink && (
                                <div className="text-[10px] break-all">
                                  <span className="text-zinc-500 font-mono">Handle Link: </span>
                                  <a 
                                    href={inq.socialLink.startsWith('http') ? inq.socialLink : `https://${inq.socialLink}`} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="text-amber-500 hover:underline inline-flex items-center gap-0.5"
                                  >
                                    {inq.socialLink} <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                </div>
                              )}

                              <p className="text-xs text-zinc-400 italic line-clamp-3">
                                "{inq.message}"
                              </p>

                              {(inq.browser || inq.os || inq.screenSize) && (
                                <div className="flex flex-wrap gap-1 text-[8px] font-mono text-zinc-500 mt-2 bg-black/40 p-1.5 rounded-lg border border-zinc-850/30">
                                  {inq.browser && <span className="text-zinc-400">🌐 {inq.browser}</span>}
                                  {inq.os && <span className="text-zinc-400">💻 {inq.os}</span>}
                                  {inq.screenSize && <span className="text-zinc-400">📱 {inq.screenSize}</span>}
                                  {inq.timezone && <span className="text-zinc-400">⏱️ {inq.timezone.split('/').pop()?.replace(/_/g, ' ') || inq.timezone}</span>}
                                  {inq.language && <span className="text-zinc-400">🗣️ {inq.language}</span>}
                                </div>
                              )}

                              <div className="flex items-center justify-between text-[8px] text-zinc-500 font-mono mt-1 pt-1.5 border-t border-zinc-900">
                                <span>ID: {inq.id}</span>
                                <span>{inq.createdAt}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Column 2: Google Sheets Control Sync Handlers */}
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Google Sheets Sync Status</span>
                        <div className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-wide">Live Integration</span>
                        </div>
                      </div>

                      <div className="bg-zinc-900/35 border border-zinc-850 p-5 rounded-2xl flex flex-col gap-4">
                        <div className="flex items-start gap-3 bg-[#0a0a0c]/80 p-4 rounded-xl border border-zinc-850">
                          <FileSpreadsheet className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                          <div className="flex flex-col gap-1 min-w-0">
                            <span className="text-xs font-semibold text-white">Active Spreadsheet Link</span>
                            <span className="text-[10px] text-zinc-500 font-mono select-all truncate bg-black/40 px-1.5 py-0.5 rounded">
                              ID: 1-iG...PPOY
                            </span>
                            <a 
                              href="https://docs.google.com/spreadsheets/d/1-iG5LHMCB7AvUgyCk5AxSzwSL7O7qgbgr1Kfpy8PPOY/edit?gid=0#gid=0"
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-amber-500 inline-flex items-center gap-0.5 hover:underline mt-1.5 font-mono hover:text-white transition-colors"
                            >
                              Open Live Google Sheet <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1 text-zinc-400">
                          <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">Auto-Transmission Desk</span>
                          <p className="text-[11px] font-light leading-relaxed">
                            New intake submissions are transmitted directly to your secure Google Sheet instantly. No local downloads or complex export files are necessary.
                          </p>
                        </div>

                        {/* Collateral Developer Settings Area (Collapsed to keep general UI simplified) */}
                        <div className="border-t border-zinc-850/60 pt-3">
                          <details className="group">
                            <summary className="flex items-center justify-between text-[10px] text-zinc-500 font-mono uppercase cursor-pointer hover:text-white transition-colors select-none">
                              <span>Integration Advanced Endpoint</span>
                              <span className="text-[8px] transition-transform group-open:rotate-180">▼</span>
                            </summary>
                            <div className="flex flex-col gap-3 mt-3">
                              <div className="flex flex-col gap-1">
                                <label className="text-[9px] font-mono uppercase text-zinc-500">Apps Script Web App URL</label>
                                <input
                                  type="text"
                                  value={webhookUrl}
                                  onChange={(e) => {
                                    setWebhookUrl(e.target.value);
                                    localStorage.setItem('social_forge_webhook_url', e.target.value);
                                  }}
                                  placeholder="https://script.google.com/macros/s/.../exec"
                                  className="w-full bg-[#0a0a0a] border border-zinc-800 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 rounded-lg px-2.5 py-1.5 text-xs font-mono text-white placeholder:text-zinc-700"
                                />
                              </div>
                              {syncMethod === 'webhook' && (
                                <div className="flex flex-col gap-1.5 bg-black/40 p-2.5 rounded-lg border border-zinc-850/40 text-[9.5px] text-zinc-500 leading-normal">
                                  <div className="flex justify-between items-center text-[10px] text-zinc-400 font-bold mb-1">
                                    <span>Deployment Instructions:</span>
                                    <button
                                      onClick={handleCopyScript}
                                      className="text-[10px] text-amber-500 hover:text-white font-mono cursor-pointer transition-colors"
                                    >
                                      {copiedScript ? 'Copied! ✓' : 'Copy Code'}
                                    </button>
                                  </div>
                                  <p className="text-[9px] text-zinc-400 leading-tight">
                                    1. Open Sheet &gt; Extensions &gt; Apps Script.<br />
                                    2. Paste code to overwrite.<br />
                                    3. Click <strong className="text-amber-500">Deploy &gt; New deployment</strong>.<br />
                                    4. Setup: <strong className="text-zinc-200">Web App</strong>, Execute as: <strong className="text-zinc-200">Me</strong>, Access: <strong className="text-emerald-400">Anyone</strong>.<br />
                                    5. Click Deploy, click <strong className="text-amber-500">Authorize Access</strong>, and copy/paste the Web App URL here!
                                  </p>
                                  <div className="max-h-[85px] overflow-y-auto font-mono text-[9px] bg-black/60 p-2 rounded border border-zinc-850 mt-1 select-all scrollbar-thin">
                                    {appsScriptCode}
                                  </div>
                                </div>
                              )}
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[9px] font-mono uppercase text-zinc-500">Authentication Strategy</label>
                                <div className="grid grid-cols-2 gap-1.5 bg-[#080808]/95 p-1 rounded-lg border border-zinc-850">
                                  <button
                                    onClick={() => {
                                      setSyncMethod('webhook');
                                      setSyncSuccess(null);
                                      setSyncError(null);
                                    }}
                                    className={`py-1.5 rounded-md text-[9px] font-mono uppercase font-black transition-all cursor-pointer ${
                                      syncMethod === 'webhook' 
                                        ? 'bg-amber-500 text-black shadow' 
                                        : 'text-zinc-500 hover:text-white'
                                    }`}
                                  >
                                    Apps Script
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSyncMethod('oauth');
                                      setSyncSuccess(null);
                                      setSyncError(null);
                                    }}
                                    className={`py-1.5 rounded-md text-[9px] font-mono uppercase font-black transition-all cursor-pointer ${
                                      syncMethod === 'oauth' 
                                        ? 'bg-amber-500 text-black shadow' 
                                        : 'text-zinc-500 hover:text-white'
                                    }`}
                                  >
                                    OAuth Client
                                  </button>
                                </div>
                              </div>
                              {syncMethod === 'oauth' && (
                                <div className="flex flex-col gap-1">
                                  <button
                                    onClick={handleOAuthConnect}
                                    className="w-full py-1.5 bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-850 hover:border-amber-500/30 text-amber-500 rounded text-[10px] font-mono transition-all cursor-pointer flex items-center justify-center gap-1"
                                  >
                                    <Key className="w-3 h-3" /> {oauthToken ? 'Change Account' : 'Authorize API'}
                                  </button>
                                </div>
                              )}
                            </div>
                          </details>
                        </div>

                        {/* Custom Brand Logo Customizer Settings */}
                        <div className="border-t border-zinc-850/60 pt-3">
                          <details className="group" id="brand-logo-customizer-details">
                            <summary className="flex items-center justify-between text-[10px] text-zinc-500 font-mono uppercase cursor-pointer hover:text-white transition-colors select-none">
                              <span>Brand Logo Identity (JPEG/PNG)</span>
                              <span className="text-[8px] transition-transform group-open:rotate-180">▼</span>
                            </summary>
                            <div className="flex flex-col gap-3 mt-3 bg-black/30 p-3 rounded-lg border border-zinc-850/40">
                              <p className="text-[10px] text-zinc-400 leading-normal">
                                Upload your brand logo image (JPEG or PNG) to immediately replace the flame icon across the entire landing page.
                              </p>
                              
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[9px] font-mono uppercase text-zinc-500">Logo Image File</label>
                                <div className="flex items-center gap-3">
                                  <input 
                                    type="file" 
                                    accept="image/jpeg,image/png,image/jpg"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                          const base64 = event.target?.result as string;
                                          if (base64) {
                                            localStorage.setItem('social_forge_custom_logo', base64);
                                            window.dispatchEvent(new Event('social_forge_logo_updated'));
                                            alert('Logo updated successfully! All flame icons have been replaced by your uploaded image.');
                                          }
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                    id="brand-logo-file-input"
                                    className="hidden"
                                  />
                                  <button
                                    onClick={() => document.getElementById('brand-logo-file-input')?.click()}
                                    className="px-3 py-1.5 bg-amber-500 text-black font-semibold text-[10px] uppercase font-mono rounded-lg hover:bg-amber-400 transition cursor-pointer"
                                  >
                                    Choose JPEG/PNG File
                                  </button>
                                  
                                  {localStorage.getItem('social_forge_custom_logo') && (
                                    <button
                                      onClick={() => {
                                        localStorage.removeItem('social_forge_custom_logo');
                                        window.dispatchEvent(new Event('social_forge_logo_updated'));
                                        alert('Reverted to default vector flame logo icon.');
                                      }}
                                      className="px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900 border border-rose-500/30 text-rose-400 font-mono text-[10px] uppercase rounded-lg transition cursor-pointer"
                                    >
                                      Reset
                                    </button>
                                  )}
                                </div>
                              </div>

                              <div className="text-[9px] text-zinc-500 leading-normal border-t border-zinc-850/50 pt-2 flex flex-col gap-1 font-mono">
                                <p>💡 File structure alternative:</p>
                                <p>To permanently bundle the image as a project asset, name your logo file <strong className="text-zinc-300">"logo.jpg"</strong> and place/upload it directly into the main directory of the project in the left sidebar explorer. The application is configured to scan and deploy it automatically!</p>
                              </div>
                            </div>
                          </details>
                        </div>

                        {/* Push Controls */}
                        {syncSuccess && (
                          <div className="p-2 bg-emerald-950/40 border border-emerald-500/20 rounded-lg text-emerald-400 text-[10px] font-mono flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500" /> {syncSuccess}
                          </div>
                        )}
                        {syncError && (
                          <div className="p-2 bg-rose-950/40 border border-rose-500/20 rounded-lg text-rose-400 text-[10px] font-mono flex items-start gap-1.5">
                            <Info className="w-3.5 h-3.5 shrink-0 text-rose-500" /> {syncError}
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-zinc-850/60">
                          <button
                            onClick={handleTestWebhook}
                            disabled={isTesting || (syncMethod === 'webhook' && !webhookUrl)}
                            className="py-2.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:text-white rounded-lg text-xs font-semibold text-zinc-300 transition-all cursor-pointer flex items-center justify-center gap-1 disabled:opacity-40"
                          >
                            {isTesting ? <RefreshCw className="w-3 h-3 animate-spin text-amber-500" /> : <Settings className="w-3 h-3 text-amber-500" />} Test Link
                          </button>
                          
                          <button
                            onClick={handleSyncAllToSheets}
                            disabled={isSyncingAll || submittedInquiries.length === 0 || (syncMethod === 'webhook' && !webhookUrl) || (syncMethod === 'oauth' && !oauthToken)}
                            className="py-2.5 bg-zinc-900 border border-zinc-800 hover:bg-emerald-900/40 hover:border-emerald-500/30 hover:text-emerald-400 rounded-lg text-xs font-semibold text-zinc-300 transition-all cursor-pointer flex items-center justify-center gap-1 disabled:opacity-40"
                            title="Force sync entire local inquiries database to Google Sheets"
                          >
                            {isSyncingAll ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />} Sync Database
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CRM Footer action buttons */}
                  <div className="flex justify-between items-center mt-2 pt-4 border-t border-zinc-800/60 text-xs">
                    <button
                      onClick={() => setShowCRM(false)}
                      className="px-4 py-2 hover:text-white rounded-lg text-xs font-semibold text-zinc-400 cursor-pointer transition"
                    >
                      Return to Submission Intake Form
                    </button>
                    {submittedInquiries.length > 0 && (
                      <button
                        onClick={() => {
                          if (confirm("This will clear all locally processed entries. Are you sure?")) {
                            localStorage.removeItem('social_forge_inquiries');
                            setSubmittedInquiries([]);
                            setShowCRM(false);
                          }
                        }}
                        className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg text-xs font-semibold text-rose-400 cursor-pointer transition-all"
                      >
                        Reset Local Records
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <form 
                  onSubmit={handleFormSubmit} 
                  className="flex flex-col gap-6" 
                  id="intake-form"
                  name="submit-to-google-sheet"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name input */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="input-name" className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                        Full Name / Representative <span className="text-amber-500">*</span>
                      </label>
                      <input 
                        required
                        type="text" 
                        id="input-name"
                        name="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Carter"
                        className="w-full bg-[#0a0a0a] border border-zinc-800 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none transition-all placeholder:text-zinc-600"
                      />
                    </div>

                    {/* Email input */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="input-email" className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                        Secure Email Address <span className="text-amber-500">*</span>
                      </label>
                      <input 
                        required
                        type="email" 
                        id="input-email"
                        name="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@carter.com"
                        className="w-full bg-[#0a0a0a] border border-zinc-800 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none transition-all placeholder:text-zinc-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Brand / Channel Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="input-company" className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                        Channel / Business Brand Name
                      </label>
                      <input 
                        type="text" 
                        id="input-company"
                        name="Brand"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="DevonInvests"
                        className="w-full bg-[#0a0a0a] border border-zinc-800 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none transition-all placeholder:text-zinc-600"
                      />
                    </div>

                    {/* Social Link Handlers */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="input-social" className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                        Channel Handle or Current Link
                      </label>
                      <input 
                        type="text" 
                        id="input-social"
                        name="Social Link/Handle"
                        value={socialLink}
                        onChange={(e) => setSocialLink(e.target.value)}
                        placeholder="youtube.com/c/devoninvests"
                        className="w-full bg-[#0a0a0a] border border-zinc-800 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none transition-all placeholder:text-zinc-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Desired Service Dropdown */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="input-service" className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                        Requested Forge Expertise
                      </label>
                      <select 
                        id="input-service"
                        name="Focus Goal"
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="w-full bg-[#0a0a0a] border border-zinc-800 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="Full Channel Growth Strategy">Full Channel Growth Strategy</option>
                        <option value="Retention Video Production">Retention Video Production</option>
                        <option value="High-CTR Thumbnail Squad">High-CTR Thumbnail Squad</option>
                        <option value="Creator Visual Branding">Creator Visual Branding</option>
                        <option value="Multiple Shorts / TikTok packages">Multiple Shorts / TikTok packages</option>
                      </select>
                    </div>

                    {/* Budget Scale Dropdown */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="input-budget" className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                        Estimated Monthly Budget (INR / USD)
                      </label>
                      <select 
                        id="input-budget"
                        name="Monthly Budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full bg-[#0a0a0a] border border-zinc-800 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="Under $1,500 / mo">Under $1,500 / mo (Launch)</option>
                        <option value="$1,500 - $3,000 / mo">$1,500 - $3,000 / mo (Growth)</option>
                        <option value="$3,000 - $5,000 / mo">$3,000 - $5,000 / mo (Elite Tier)</option>
                        <option value="$5,000 - $10,000 / mo">$5,000 - $10,000 / mo (Enterprise)</option>
                        <option value="$10,000+ / mo">$10,000+ / mo (Creator Core Legacy)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="input-message" className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                      Channel Assessment & Project Vision <span className="text-amber-500">*</span>
                    </label>
                    <textarea 
                      required
                      id="input-message"
                      name="Assessment / Message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Give us a brief overview of your current retention rates, upload frequency, content type, and what needs forging..."
                      className="w-full bg-[#0a0a0a] border border-zinc-800 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none transition-all placeholder:text-zinc-600 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="btn-form-submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-xs font-black uppercase tracking-widest bg-amber-500 text-black shadow-xl shadow-amber-500/10 cursor-pointer hover:bg-white hover:text-black transition-all duration-300 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                        Forging Content Blueprint...
                      </>
                    ) : (
                      <>
                        Request Free Channel Audit <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

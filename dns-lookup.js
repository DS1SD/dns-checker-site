<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DNS Lookup Tool</title>
    <style>
        body {
            background-color: black;
            color: #00FF00;
            font-family: monospace;
        }
        .terminal {
            padding: 20px;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        input, button {
            background-color: #003300;
            color: #00FF00;
            border: 1px solid #00FF00;
            padding: 5px;
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="terminal">
        <h1>DNS Lookup Tool</h1>
        <input type="text" id="domainInput" placeholder="Enter domain name" />
        <button onclick="fetchDNSRecords()">Lookup</button>
        <div id="output"></div>
        <div>
            <p>DKIM Disclaimer: Using default M365 selector 'selector1' for DKIM lookup.</p>
            <label for="dkimSelector">DKIM Selector (optional):</label>
            <input type="text" id="dkimSelector" placeholder="Enter DKIM selector" />
        </div>
    </div>
    <script src="dns-lookup.js"></script>
</body>
</html>

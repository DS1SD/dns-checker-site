async function fetchDNSRecords() {
    const domain = document.getElementById('domainInput').value;
    const output = document.getElementById('output');
    const dkimSelector = document.getElementById('dkimSelector').value || 'selector1';
    output.textContent = 'Fetching DNS records...\n';

    const recordTypes = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SOA'];
    
    for (const type of recordTypes) {
        try {
            const response = await fetch(`https://dns.google/resolve?name=${domain}&type=${type}`);
            const data = await response.json();
            output.textContent += `\n${type} Records:\n`;
            if (data.Answer) {
                data.Answer.forEach(record => {
                    output.textContent += `${record.name} ${record.TTL} IN ${type} ${record.data}\n`;
                });
            } else {
                output.textContent += 'No records found.\n';
            }
        } catch (error) {
            output.textContent += `Error fetching ${type} records: ${error}\n`;
        }
    }

    // Check for SPF, DMARC, BIMI, and DKIM records
    await checkSpecialRecords(domain, dkimSelector, output);
}

async function checkSpecialRecords(domain, dkimSelector, output) {
    const specialRecords = [
        { name: 'SPF', lookup: domain },
        { name: 'DMARC', lookup: `_dmarc.${domain}` },
        { name: 'BIMI', lookup: `default._bimi.${domain}` },
        { name: 'DKIM', lookup: `${dkimSelector}._domainkey.${domain}` }
    ];

    for (const record of specialRecords) {
        try {
            const response = await fetch(`https://dns.google/resolve?name=${record.lookup}&type=TXT`);
            const data = await response.json();
            output.textContent += `\n${record.name} Record:\n`;
            if (data.Answer) {
                data.Answer.forEach(ans => {
                    if (ans.data.includes(record.name.toLowerCase()) || record.name === 'DKIM') {
                        output.textContent += `${ans.data}\n`;
                    }
                });
            } else {
                output.textContent += 'No record found.\n';
            }
        } catch (error) {
            output.textContent += `Error fetching ${record.name} record: ${error}\n`;
        }
    }
}

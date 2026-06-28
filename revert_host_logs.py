import re

def revert_host_logs(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the HTML container
    # I replaced it with flex container earlier, I'll put it back to table.
    
    new_html = '''<div id="host-logs-table-wrapper"
                                style="max-height: 250px; overflow-y: auto; background: rgba(0,0,0,0.25); border-radius: 8px; padding: 0.5rem; border: 1px solid rgba(255,255,255,0.05);">
                                <table
                                    style="width: 100%; border-collapse: collapse; font-size: 0.85rem; color: var(--text-main); text-align: left;">
                                    <thead>
                                        <tr
                                            style="border-bottom: 1px solid rgba(255,255,255,0.1); color: var(--text-muted);">
                                            <th style="padding: 0.4rem;">పేరు (Name)</th>
                                            <th style="padding: 0.4rem; text-align: center;">మార్కులు (Score)</th>
                                            <th style="padding: 0.4rem; text-align: center;">సమయం (Time)</th>
                                            <th style="padding: 0.4rem; text-align: right;">తేదీ (Date)
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="host-logs-tbody">
                                        <!-- Logs populated dynamically -->
                                    </tbody>
                                </table>
                            </div>'''
                            
    # We regex replace the whole wrapper
    content = re.sub(r'<div id="host-logs-table-wrapper"[\s\S]*?<!-- Logs populated dynamically as cards -->\s*</div>', new_html, content)


    # Revert JS
    new_js = '''        function loadHostLogs() {
            const tbody = document.getElementById("host-logs-tbody");
            if (!tbody) return;
            tbody.innerHTML = "";

            try {
                const logs = JSON.parse(localStorage.getItem("bible_exam_results") || "[]");
                if (logs.length === 0) {
                    tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; padding: 1rem; color: var(--text-muted);">ఎటువంటి ఫలితాలు లేవు (No records found)</td></tr>`;
                    return;
                }

                // Show latest first
                logs.reverse().forEach(log => {
                    const tr = document.createElement("tr");
                    tr.style.borderBottom = "1px solid rgba(255,255,255,0.05)";

                    const nameTd = document.createElement("td");
                    nameTd.style.padding = "0.4rem";
                    nameTd.innerText = log.fullName || `${log.surname} ${log.name}`;

                    const scoreTd = document.createElement("td");
                    scoreTd.style.padding = "0.4rem";
                    scoreTd.style.textAlign = "center";
                    scoreTd.innerText = `${log.score} / ${log.total || 260}`;

                    const timeTakenTd = document.createElement("td");
                    timeTakenTd.style.padding = "0.4rem";
                    timeTakenTd.style.textAlign = "center";
                    timeTakenTd.innerText = log.timeTaken || '-';

                    const dateTd = document.createElement("td");
                    dateTd.style.padding = "0.4rem";
                    dateTd.style.textAlign = "right";
                    dateTd.innerText = `${log.date} ${log.time || ''}`;

                    tr.appendChild(nameTd);
                    tr.appendChild(scoreTd);
                    tr.appendChild(timeTakenTd);
                    tr.appendChild(dateTd);
                    tbody.appendChild(tr);
                });
            } catch (e) {
                console.error("Error loading host logs:", e);
            }
        }'''
        
    # Find current JS
    content = re.sub(r'function loadHostLogs\(\) \{[\s\S]*?\}\n        \}\n', new_js + '\n', content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("Reverted to table format with added time column.")

if __name__ == '__main__':
    revert_host_logs('c:\\websites 000\\SPH\\exam.html')

import re

def update_host_logs(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Step 1: Replace the HTML table structure in host-results-log
    old_html = '''<div id="host-logs-table-wrapper"
                                style="max-height: 200px; overflow-y: auto; background: rgba(0,0,0,0.25); border-radius: 8px; padding: 0.5rem; border: 1px solid rgba(255,255,255,0.05);">
                                <table
                                    style="width: 100%; border-collapse: collapse; font-size: 0.85rem; color: var(--text-main); text-align: left;">
                                    <thead>
                                        <tr
                                            style="border-bottom: 1px solid rgba(255,255,255,0.1); color: var(--text-muted);">
                                            <th style="padding: 0.4rem;">పేరు (Name)</th>
                                            <th style="padding: 0.4rem; text-align: center;">మార్కులు (Score)</th>
                                            <th style="padding: 0.4rem; text-align: right;">తేదీ & సమయం (Date & Time)
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="host-logs-tbody">
                                        <!-- Logs populated dynamically -->
                                    </tbody>
                                </table>
                            </div>'''
                            
    new_html = '''<div id="host-logs-table-wrapper"
                                style="max-height: 400px; overflow-y: auto; background: rgba(0,0,0,0.25); border-radius: 8px; padding: 1rem; border: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; gap: 1.5rem;">
                                <!-- Logs populated dynamically as cards -->
                            </div>'''
                            
    if old_html in content:
        content = content.replace(old_html, new_html)
    else:
        # Fallback if whitespace differs
        print("Warning: Could not find exact HTML string. Using regex.")
        content = re.sub(r'<div id="host-logs-table-wrapper"[\s\S]*?</div>', new_html, content, count=1)

    # Step 2: Replace loadHostLogs JS function
    old_js = '''        function loadHostLogs() {
            const tbody = document.getElementById("host-logs-tbody");
            if (!tbody) return;
            tbody.innerHTML = "";

            try {
                const logs = JSON.parse(localStorage.getItem("bible_exam_results") || "[]");
                if (logs.length === 0) {
                    tbody.innerHTML = `<tr><td colspan="3" style="text-align: center; padding: 1rem; color: var(--text-muted);">ఎటువంటి ఫలితాలు లేవు (No records found)</td></tr>`;
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

                    const dateTd = document.createElement("td");
                    dateTd.style.padding = "0.4rem";
                    dateTd.style.textAlign = "right";
                    dateTd.innerText = `${log.date} ${log.time || ''}`;

                    tr.appendChild(nameTd);
                    tr.appendChild(scoreTd);
                    tr.appendChild(dateTd);
                    tbody.appendChild(tr);
                });
            } catch (e) {
                console.error("Error loading host logs:", e);
            }
        }'''
        
    new_js = '''        function loadHostLogs() {
            const wrapper = document.getElementById("host-logs-table-wrapper");
            if (!wrapper) return;
            wrapper.innerHTML = "";

            try {
                const logs = JSON.parse(localStorage.getItem("bible_exam_results") || "[]");
                if (logs.length === 0) {
                    wrapper.innerHTML = `<div style="text-align: center; padding: 1rem; color: var(--text-muted);">ఎటువంటి ఫలితాలు లేవు (No records found)</div>`;
                    return;
                }

                // Show latest first
                logs.reverse().forEach(log => {
                    const percentage = Math.round((log.score / (log.total || 260)) * 100) || 0;
                    
                    const cardHTML = `
                        <div class="glass-card" style="padding: 1.5rem;">
                            <div class="results-hero" style="padding: 1rem;">
                                <i class="fa-solid fa-award" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem;"></i>
                                <h2 class="telugu" style="font-size: 1.5rem; margin-bottom: 0.5rem; color: #fff;">పరీక్ష ఫలితాలు (Exam Results)</h2>
                                
                                <div class="score-circle" style="width: 120px; height: 120px; --percentage: ${percentage}; margin: 1rem auto;">
                                    <style>.score-circle[style*="--percentage: ${percentage}"]::after { width: 100px; height: 100px; }</style>
                                    <div class="score-value">
                                        <div class="score-num" style="font-size: 2rem;">${log.score}</div>
                                        <div class="score-label" style="font-size: 0.7rem;">${log.total || 260} కి</div>
                                    </div>
                                </div>
                            </div>

                            <div class="results-details telugu" style="margin: 1rem 0 0 0; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; text-align: center;">
                                <div class="detail-card" style="background: rgba(255,255,255,0.02); padding: 1rem; border-radius: 8px;">
                                    <i class="fa-regular fa-user" style="color: var(--accent); margin-bottom: 0.5rem; font-size: 1.2rem;"></i>
                                    <div class="detail-label" style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.25rem;">అభ్యర్థి పేరు</div>
                                    <div class="detail-value" style="font-weight: 600;">${log.fullName || (log.surname + ' ' + log.name)}</div>
                                </div>
                                <div class="detail-card" style="background: rgba(255,255,255,0.02); padding: 1rem; border-radius: 8px;">
                                    <i class="fa-regular fa-calendar" style="color: var(--accent); margin-bottom: 0.5rem; font-size: 1.2rem;"></i>
                                    <div class="detail-label" style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.25rem;">తేదీ & సమయం</div>
                                    <div class="detail-value" style="font-weight: 600; font-size: 0.85rem;">${log.date}<br>${log.time || ''}</div>
                                </div>
                                <div class="detail-card" style="background: rgba(255,255,255,0.02); padding: 1rem; border-radius: 8px;">
                                    <i class="fa-regular fa-hourglass-half" style="color: var(--accent); margin-bottom: 0.5rem; font-size: 1.2rem;"></i>
                                    <div class="detail-label" style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.25rem;">తీసుకున్న సమయం</div>
                                    <div class="detail-value" style="font-weight: 600;">${log.timeTaken || '-'}</div>
                                </div>
                            </div>
                        </div>
                    `;
                    const div = document.createElement("div");
                    div.innerHTML = cardHTML;
                    wrapper.appendChild(div);
                });
            } catch (e) {
                console.error("Error loading host logs:", e);
            }
        }'''
        
    if old_js in content:
        content = content.replace(old_js, new_js)
    else:
        print("Warning: Could not find exact JS string. Attempting regex replacement.")
        # It's safer to just replace using regex block
        content = re.sub(r'function loadHostLogs\(\) \{[\s\S]*?\}\n        \}\n', new_js + '\n', content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("Success")

if __name__ == '__main__':
    update_host_logs('c:\\websites 000\\SPH\\exam.html')

with open('exam.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace host-minutes default value
content = content.replace(
    '<input type="number" id="host-minutes" class="input-field" value="4"',
    '<input type="number" id="host-minutes" class="input-field" value="40"'
)

# Replace JS fallback defaults
content = content.replace('64 * 60', '100 * 60')
content = content.replace('1h 4m = 3840 seconds', '1h 40m = 6000 seconds')

with open('exam.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Time defaults updated successfully.")

import re
import json

def parse_raw_options(file_path):
    questions_data = {}
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        for line in lines:
            line = line.strip()
            if not line:
                continue
            
            # Match format: "1. A) ఎఫెసు, B) కొరింథు, C) అంతియొకయ, D) గలతీయ (B)"
            match = re.match(r'^(\d+)\.\s+(.*)\s+\(([A-D])\)$', line)
            if match:
                q_id = int(match.group(1))
                options_str = match.group(2)
                correct_letter = match.group(3)
                
                # Extract options
                options_match = re.findall(r'[A-D]\)\s+([^,]+)', options_str)
                if not options_match:
                    # Sometimes there is no comma before the next option, let's split by A), B), C), D)
                    parts = re.split(r'[A-D]\)\s+', options_str)
                    options_match = [p.strip().strip(',') for p in parts if p.strip()]
                else:
                    options_match = [o.strip() for o in options_match]
                
                # Check split length
                if len(options_match) != 4:
                    parts = re.split(r'[A-D]\)\s+', options_str)
                    options_match = [p.strip().strip(',') for p in parts if p.strip()]

                questions_data[q_id] = {
                    'options': options_match,
                    'answer_idx': ord(correct_letter) - ord('A')
                }
    return questions_data

def update_html(html_path, raw_data_path):
    parsed_data = parse_raw_options(raw_data_path)
    
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract the questions array using regex or simple parsing
    # The array starts at "const questions = [" and ends at "];\n\n        // =========================================="
    start_str = 'const questions = ['
    end_str = '];\n\n        // =========================================='
    
    start_idx = content.find(start_str)
    if start_idx == -1:
        print("Could not find questions array start")
        return
    
    end_idx = content.find(end_str, start_idx)
    if end_idx == -1:
        # Try a different end string
        end_idx = content.find('];', start_idx)
        if end_idx == -1:
            print("Could not find questions array end")
            return
    
    json_str = content[start_idx + len('const questions = '):end_idx + 1]
    
    # The JSON string might not be perfect, but it's likely valid JSON
    # However, to be safe since it's JS, we can parse it using json module if it's strictly JSON
    # Wait, the js file had 'const questions = [...' which is valid JSON except maybe trailing commas
    try:
        # Let's clean up potential JS comments in the JSON string if any
        questions_array = json.loads(json_str)
    except Exception as e:
        print("Error parsing JSON array:", e)
        # Try to fix trailing commas
        json_str_fixed = re.sub(r',\s*]', ']', json_str)
        try:
            questions_array = json.loads(json_str_fixed)
        except Exception as e2:
            print("Error parsing fixed JSON array:", e2)
            return

    # Update questions
    for q in questions_array:
        q_id = q['id']
        if q_id in parsed_data:
            data = parsed_data[q_id]
            if len(data['options']) == 4:
                q['options'] = data['options']
                ans_idx = data['answer_idx']
                q['answer'] = data['options'][ans_idx]
            else:
                print(f"Warning: Question {q_id} does not have exactly 4 options parsed. Found: {data['options']}")
    
    # Serialize back to JSON string with pretty printing
    updated_json_str = json.dumps(questions_array, ensure_ascii=False, indent=4)
    
    # Replace in file content
    new_content = content[:start_idx + len('const questions = ')] + updated_json_str + content[end_idx + 1:]
    
    # Also fix the shuffleArray logic
    new_content = new_content.replace('examState.options[q.id] = shuffleArray([...q.options]);', 'examState.options[q.id] = [...q.options];')
    
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("Successfully updated exam.html!")

if __name__ == '__main__':
    update_html('c:\\websites 000\\SPH\\exam.html', 'c:\\websites 000\\SPH\\raw_options.txt')

import json
import re
from collections import defaultdict

# File path to the JSON file
json_file_path = './src/python/NodeArrayUpdated.json'
output_file_path = './src/python/GlobalHTMLAnalysis.json'

# Function to analyze HTML string and update global metrics
def analyze_html_string(html_string, global_metrics):
    depth = 0
    max_depth = 0
    tag_stack = []

    # Regex patterns to find tags, classes, ids, and inline styles
    tag_pattern = re.compile(r'<(/?)(\w+)[^>]*>')
    class_pattern = re.compile(r'class="([^"]+)"')
    id_pattern = re.compile(r'id="([^"]+)"')
    style_pattern = re.compile(r'style="[^"]+"')

    for match in tag_pattern.finditer(html_string):
        closing, tag_name = match.groups()
        if closing:
            # Closing tag
            if tag_stack:
                tag_stack.pop()
                depth -= 1
        else:
            # Opening tag
            tag_stack.append(tag_name)
            depth += 1
            max_depth = max(max_depth, depth)
            global_metrics["tag_types"][tag_name] += 1

            if tag_name in ['div', 'br', 'p', 'span']:
                global_metrics["special_items"][tag_name] += 1
            
            # Checking for classes
            class_match = class_pattern.search(match.group(0))
            if class_match:
                class_names = class_match.group(1).split()
                for class_name in class_names:
                    global_metrics["classes"][class_name] += 1
            
            # Checking for IDs
            id_match = id_pattern.search(match.group(0))
            if id_match:
                id_name = id_match.group(1)
                global_metrics["ids"][id_name] += 1
            
            # Checking for inline styles
            if style_pattern.search(match.group(0)):
                global_metrics["inline_styles"] += 1

    global_metrics["max_depth"] = max(global_metrics["max_depth"], max_depth)

# Function to traverse the JSON and analyze HTML strings in arrays
def analyze_json_content(data):
    global_metrics = {
        "max_depth": 0,
        "classes": defaultdict(int),
        "ids": defaultdict(int),
        "inline_styles": 0,
        "special_items": defaultdict(int),
        "tag_types": defaultdict(int)
    }

    def traverse(obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                traverse(value)
        elif isinstance(obj, list):
            for item in obj:
                if isinstance(item, str):
                    if ('<' in item and '>' in item):
                        analyze_html_string(item, global_metrics)
                    elif item.startswith('http') or item.startswith('/'):
                        # Ignore URLs
                        continue
                elif isinstance(item, (dict, list)):
                    traverse(item)

    traverse(data)
    return global_metrics

# Main script execution
if __name__ == "__main__":
    with open(json_file_path, 'r', encoding='utf-8') as file:
        json_data = json.load(file)
    
    global_metrics = analyze_json_content(json_data)

    # Convert defaultdict to regular dict for JSON serialization
    global_metrics["classes"] = dict(global_metrics["classes"])
    global_metrics["ids"] = dict(global_metrics["ids"])
    global_metrics["special_items"] = dict(global_metrics["special_items"])
    global_metrics["tag_types"] = dict(global_metrics["tag_types"])

    # Save the global analysis results to a JSON file
    with open(output_file_path, 'w', encoding='utf-8') as outfile:
        json.dump(global_metrics, outfile, ensure_ascii=False, indent=4)

    print(f"Global analysis completed. Results saved to {output_file_path}")

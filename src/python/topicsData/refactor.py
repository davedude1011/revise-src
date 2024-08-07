import json
from bs4 import BeautifulSoup, NavigableString

# File path to the original and new JSON files
input_file_path = './src/python/NodeArrayUpdated.json'
output_file_path = './src/python/NodeArrayRefactored.json'

# Function to extract text directly within an element, excluding its children
def get_direct_text(element):
    return ''.join([t for t in element if isinstance(t, NavigableString)]).strip()

# Function to convert HTML string to a structured format using BeautifulSoup
def refactor_html_string(html_string):
    structured_data = []
    soup = BeautifulSoup(html_string, 'html.parser')

    def process_element(element):
        if isinstance(element, NavigableString):
            # Directly process text nodes
            text = element.strip()
            if text:
                structured_data.append({
                    'type': 'text',
                    'content': text
                })
        elif element.name == 'div' and element.get('class') and element.get('class')[0] not in ["subject", "date", "title"]:
            # Handling divs with class attributes
            class_name = element.get('class')[0]  # Take the first class if multiple are present
            content = get_direct_text(element)
            if content:
                structured_data.append({
                    'type': class_name.replace('-', '_'),
                    'content': content
                })
        elif element.name == 'li':
            # Treat each <li> as a text_list item
            content = get_direct_text(element)
            if content:
                structured_data.append({
                    'type': 'text-list',
                    'content': content
                })
        elif element.name in ['img', 'iframe', 'a']:
            tag_info = {'type': element.name}
            if element.name == 'a':
                tag_info['href'] = element.get('href', '')
            elif element.name in ['img', 'iframe']:
                tag_info['src'] = element.get('src', '')
            structured_data.append(tag_info)

    for element in soup.descendants:
        if isinstance(element, NavigableString):
            # Only add NavigableString content if it has no parent tag processed
            parent = element.parent
            if parent.name not in ['div', 'li', 'a', 'span']:
                process_element(element)
        else:
            process_element(element)

    return structured_data

# Function to traverse the JSON and refactor HTML strings in arrays
def refactor_json_content(data):
    def traverse_and_refactor(obj):
        if isinstance(obj, dict):
            return {key: traverse_and_refactor(value) for key, value in obj.items()}
        elif isinstance(obj, list):
            return [traverse_and_refactor(item) for item in obj]
        elif isinstance(obj, str):
            if '<' in obj and '>' in obj:
                # Process HTML string
                return refactor_html_string(obj)
            elif obj.startswith('http') or obj.startswith('/'):
                # Return URL as-is
                return obj
        return obj

    return traverse_and_refactor(data)

# Main script execution
if __name__ == "__main__":
    with open(input_file_path, 'r', encoding='utf-8') as file:
        original_data = json.load(file)
    
    refactored_data = refactor_json_content(original_data)

    # Save the refactored data to a new JSON file
    with open(output_file_path, 'w', encoding='utf-8') as outfile:
        json.dump(refactored_data, outfile, ensure_ascii=False)

    print(f"Refactoring completed. Refactored data saved to {output_file_path}")

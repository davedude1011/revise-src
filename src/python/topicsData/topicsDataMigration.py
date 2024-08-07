import json

def get_parent_tree(data, nodeId):
    for node in data:
        if nodeId in node["children"]:
            parentTree = get_parent_tree(data, node["id"])
            if parentTree:
                return parentTree + [node["value"]]
            return [node["value"]]
    return []

def iterate_layer(data):
    structure = {}

    # Create a map from id to node for quick lookup
    id_to_node = {node["id"]: node for node in data}

    for node in data:
        if node["children"]:
            parentTree = get_parent_tree(data, node["id"])
            structure_position = structure

            # Navigate through the structure according to parentTree
            for parent in parentTree:
                if parent not in structure_position:
                    structure_position[parent] = {}
                structure_position = structure_position[parent]

            # Initialize this node's entry in the structure
            structure_position[node["value"]] = {}

        else:
            parentTree = get_parent_tree(data, node["id"])
            structure_position = structure

            for parent in parentTree:
                if parent not in structure_position:
                    structure_position[parent] = {}
                structure_position = structure_position[parent]

            if isinstance(structure_position, dict):
                structure_position[node["value"]] = []

    return structure

def convert_to_arrays(structure):
    for key, value in list(structure.items()):
        if isinstance(value, dict):
            # Check if all values are empty lists, indicating a final leaf level
            if all(isinstance(v, list) for v in value.values()):
                structure[key] = list(value.keys())
            else:
                # Recursively process sub-structures
                convert_to_arrays(value)

# Example usage:
try:
    with open("./src/python/NodeArray.json", "r", encoding="utf-8") as f:
        data = json.load(f)
        structure = iterate_layer(data)
        convert_to_arrays(structure)  # Convert the final root structure to arrays where necessary
        with open("./src/python/output.json", "w", encoding="utf-8") as f2:
            json.dump(structure, f2, indent=4)
except FileNotFoundError:
    print("File not found.")
except Exception as e:
    print(f"An error occurred: {e}")

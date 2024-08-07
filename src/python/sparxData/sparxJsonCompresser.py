import json

paths = [
    "filePathsAlgebra",
    "filePathsGeometry",
    "filePathsNumber",
    "filePathsProbability",
    "filePathsRatioAndProportion",
    "filePathsStatistics",
]

for path in paths:
    with open(f"./src/python/sparxData/filePaths/{path}.json", "r", encoding="utf-8") as f:
        data = json.load(f)
    
    newDataArray = []

    for item in data:
        newDataArray.append(
            item.replace(f"-GCSE-", "").replace("-", ".").replace("][", "-").replace("[", "").replace("]", "").replace(".png", "").replace("Algebra", "a-").replace("Geometry", "g-").replace("Number", "n-").replace("Probability", "p-").replace("Ratio and Proportion", "r-").replace("Statistics", "s-")
        )
    
    with open(f"./src/python/sparxData/filePathsCompressed/{path.split('filePaths')[1]}Compressed.json", "w", encoding="utf-8") as f:
        json.dump(newDataArray, f, ensure_ascii=False)
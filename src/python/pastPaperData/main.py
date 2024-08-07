import json

def reformat_data(data):
    reformatted = {}
    
    for subject, exams in data.items():
        reformatted[subject] = {}
        
        for exam, types in exams.items():
            reformatted[subject][exam] = {"Question Papers": {}, "Mark Sheets": {}}
            
            for paper_type, levels in types.items():
                reformatted[subject][exam][paper_type] = {}
                for level, papers in levels.items():
                    # Debugging: Check types of variables
                    print(f"Processing: Subject={subject}, Exam={exam}, Paper Type={paper_type}, Level={level}")
                    if isinstance(papers, list):
                        reformatted[subject][exam][paper_type][level] = {}
                        for paper in papers:
                            # Debugging: Check structure of each paper
                            print(f"Paper: {paper}")
                            reformatted[subject][exam][paper_type][level][paper["title"]] = [paper["src"]]
                    else:
                        print(f"Unexpected data format in {subject} -> {exam} -> {paper_type} -> {level}")
                        
    return reformatted

with open("./src/python/pastPaperData/pastPaperData.json", "r") as f:
    data = json.load(f)

reformatted_data = reformat_data(data)

with open("./src/python/pastPaperData/reformattedPastPaperData.json", "w") as f:
    json.dump(reformatted_data, f, indent=4)

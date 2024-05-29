""" summarize.py 
    || Summarizes current project information into text file. 
    ex:     
        ----------------------------------------
        project goal (readme): 
        {text from readme.md}
        ----------------------------------------
        current project structure: // summarize goes thru all files in project and lists them
        gui
            input_dialog.py
            main_window.py
        main.py
        summarize.py
        README.md
        ----------------------------------------
        main.py:
        {text from main.py}
        ----------------------------------------
        gui/main_window.py:
        ...
        ----------------------------------------
"""
import os
import datetime

def summarize_project_info():
    # read readme
    with open('README.md', 'r') as readme_file:
        readme_text = readme_file.read()

    # get list of files in directory
    project_files = []
    excluded_dirs = ['.git', '.vscode', '__pycache__', 'summaries']
    excluded_files = ['summarize.py', 'LICENSE']
    for root, dirs, files in os.walk('.'):
        # exclude directories in excluded_dirs list
        dirs[:] = [d for d in dirs if d not in excluded_dirs]
        for file in files:
            # exclude files in excluded_files list
            if file not in excluded_files:
                project_files.append(os.path.join(root, file))

    # create summary text file
    date = datetime.datetime.now().strftime('%Y-%m-%d')
    os.makedirs(f'summaries', exist_ok=True)
    with open(f'summaries/{date}_summary.txt', 'w') as summary_file:
        # write project goal from readme
        summary_file.write('----------------------------------------\n')
        summary_file.write('project goal (readme):\n')
        summary_file.write(readme_text)
        summary_file.write('----------------------------------------\n')

        # write project structure
        summary_file.write('current project structure:\n')
        for file in project_files:
            summary_file.write(file + '\n')
        summary_file.write('----------------------------------------\n')

        # write content of each file
        for file in project_files:
            summary_file.write(file + ':\n')
            with open(file, 'r') as file_content:
                summary_file.write(file_content.read())
            summary_file.write('----------------------------------------\n')

summarize_project_info()
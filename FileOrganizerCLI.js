/*
** @Author: HamidReza Ghavami
** @Date: 2025-09-18
** @Description: A simple CLI tool to organize files into folders based on their extensions.
*/
import fs from 'fs';
import path from 'path';

function getDirectoryPath () { 
    const args = process.argv.slice(2);
    if ( args.length === 0 ) { 
        console.log("Please provide a directory path.");
        process.exit(1);
    }
    return args[0];
}

function getCategory (ext) { 
    const CategoryMap = {
        images: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg', '.apng', '.bmp', '.ico', '.tif', '.tiff'],
        documents: ['.pdf', '.doc', '.docx', '.txt', '.odt', '.rtf', '.tex'],
        spreadsheets: ['.xls', '.xlsx', '.ods', '.csv'],
        presentations: ['.ppt', '.pptx', '.odp'],
        videos: ['.mp4', '.mkv', '.mov', '.avi'],
        music: ['.mp3', '.wav']
    };
    for ( const category in CategoryMap ) { 
        if ( CategoryMap[category].includes(ext.toLowerCase())) { 
            return category;
        }
    }
    return 'others';
}

function createFolderIfNotExists (folderpath) { 
    if (!fs.existsSync(folderpath)) { 
        fs.mkdirSync(folderpath);
    }
}

function moveFile (filePath, targetPath) { 
    fs.renameSync(filePath, targetPath);
}

function organizeFiles (dirPath) { 
    const files = fs.readdirSync(dirPath);

    for ( const file of files ) { 
        const ext = path.extname(file);
        if (!ext) continue;

        const category = getCategory(ext);
        const categoryFolder = path.join(dirPath, category);

        createFolderIfNotExists(categoryFolder);

        const oldPath = path.join(dirPath, file);
        const newPath = path.join(categoryFolder, file);

        moveFile(oldPath, newPath);
    }
    console.log("Files organized successfully!");
}

// run the porgram
const dirPath = getDirectoryPath();
organizeFiles(dirPath);
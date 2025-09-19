/*
** @Author: HamidReza Ghavami
** @Date: 2025-09-18
** @Description: A simple CLI tool to organize files into folders based on their extensions.
*/
import fs from 'fs';
import path from 'path';

function getFile () { 
    const args = process.argv.slice(2);
    if ( args.length === 0 ) { 
        console.error('Please provide a directory path.');
        process.exit(1);
    }
    return args[0];
}

function getCategory (ext) { 
    const CategoryMap = {
        images: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg', '.apng', '.bmp', '.ico', '.tif', '.tiff'],
        documents: ['.pdf', '.doc', '.docx', '.txt', '.odt', '.rtf', '.tex'],
        speardsheets: ['.xls', '.xlsx', '.ods', '.csv'],
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
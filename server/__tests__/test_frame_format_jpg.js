const fs = require('fs');
const path = require('path');

// Function to check if all images in a directory are in a specific format
function checkImageFormat(directoryPath, expectedFormat) {
    // Get list of files in directory
    const files = fs.readdirSync(directoryPath);
    
    // Filter out only image files
    const imageFiles = files.filter(file => {
        const extension = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif'].includes(extension);
    });
    
    // Check if all image files have the expected format
    const allImagesInExpectedFormat = imageFiles.every(file => {
        const extension = path.extname(file).toLowerCase();
        return extension === expectedFormat.toLowerCase();
    });
    
    return allImagesInExpectedFormat;
}

describe('Check Image Format in Directory', () => {
    test('All images are in a specific format', () => {
        const directoryPath = 'C:/Users/deexi/OneDrive/Desktop/BotanicRX/server/prep'; // Replace this with your actual path
        const expectedFormat = '.jpg'; // Change this to your expected image format
        
        // Call the function to check image format
        const allImagesInExpectedFormat = checkImageFormat(directoryPath, expectedFormat);
        
        // Assert that all images are in the expected format
        expect(allImagesInExpectedFormat).toBe(true);
    });
});

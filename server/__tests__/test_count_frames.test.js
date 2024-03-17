const fs = require('fs');
const path = require('path');

// Function to count images in a directory
function countImages(directoryPath) {
    // Get list of files in directory
    const files = fs.readdirSync(directoryPath);
    
    // Filter out only image files (assuming images have extensions like .jpg, .png, .gif, etc.)
    const imageFiles = files.filter(file => {
        const extension = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png'].includes(extension);
    });
    
    // Return the count of image files
    return imageFiles.length;
}

describe('Count Images in Directory', () => {
    test('Counts the number of images in a directory', () => {
        const directoryPath = 'C:/Users/deexi/OneDrive/Desktop/BotanicRX/server/prep'; // Replace this with your actual path
        
        // Call the function to count images
        const numberOfImages = countImages(directoryPath);
        
        // Assert that the number of images is as expected
        expect(numberOfImages).toBe(9); // Change 5 to the expected count of images
    });
});

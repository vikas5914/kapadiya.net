/**
 * Generates an excerpt from a given text string
 * @param {string} text - The input text to generate excerpt from
 * @param {number} [maxLength=150] - Maximum length of the excerpt
 * @param {string} [suffix='...'] - String to append if text is truncated
 * @returns {string} The generated excerpt
 */
export function excerpt(
    text: string = '',
    maxLength: number = 150,
    suffix: string = '...'
): string {
    // Remove HTML tags
    const cleanText = text.replace(/<[^>]*>/g, '');
    
    // Remove extra whitespace
    const trimmedText = cleanText.replace(/\s+/g, ' ').trim();
    
    if (trimmedText.length <= maxLength) {
        return trimmedText;
    }
    
    // Find the last space before maxLength to avoid cutting words
    const lastSpace = trimmedText.lastIndexOf(' ', maxLength);
    const truncatedText = trimmedText.substring(0, lastSpace > 0 ? lastSpace : maxLength);
    
    return truncatedText + suffix;
}
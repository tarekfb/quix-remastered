export const cleanString = (text: string) => {
    // this checks if first char is space
    if (text[0] === " ") text = text.substring(1);

    // this checks checks if last character is a space
    if (text[text.length - 1] === " ") text = text.substring(0, text.length - 1);

    // regex to delete multiple white spaces in a row
    text = text.replace(/\s{2,}/g, ' ');

    return text;
}
export const getReadingTimeInMinutes = (text: string) => {
  const wordsPerMiunte = 200;
  const numberOfWords = text.trim().split(/\s+/).length;
  const readingTimeInMinutes = Math.ceil(numberOfWords / wordsPerMiunte);
  return readingTimeInMinutes;
};

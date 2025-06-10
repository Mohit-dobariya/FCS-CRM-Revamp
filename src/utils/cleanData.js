const cleanDataForExport = (data) => {
  if (!data) return [];
  return data.map((item) => {
    const cleanItem = { ...item };
    Object.keys(cleanItem).forEach((key) => {
      if (typeof cleanItem[key] === 'string') {
        cleanItem[key] = cleanItem[key]
          .replace(/<[^>]*>/g, '')
          .replace(/\n/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
      }
    });
    return cleanItem;
  });
};

export default cleanDataForExport;

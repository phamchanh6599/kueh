const fetchList = async (url) => {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    throw new Error(`Fetch fail: ${err}`);
  }
};

export { fetchList };

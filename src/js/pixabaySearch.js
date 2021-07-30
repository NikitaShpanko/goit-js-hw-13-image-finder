import config from '../config.json';

export default async function (queryText, pageNum = 1) {
  try {
    const f = await fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=${config.orientation}&q=${queryText}&page=${pageNum}&per_page=${config.per_page}&key=${config.key}`,
    );
    return await f.json();
  } catch {
    return null;
  }
}

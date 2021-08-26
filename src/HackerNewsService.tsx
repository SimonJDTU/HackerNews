import {
  fetchStoryItem,
  fetchTopStoryItems,
  fetchUserInfo,
} from './HackerNewsApi';
import {hackerAuthor, hackerStory} from './types';

const MAX_ITEM_FETCH = 10;

export const fetchRandomHackerNews = async (): Promise<
  hackerStory[] | null
> => {
  var displayArray: Array<hackerStory> = [];

  // fetch all top stories and save 10 randomly selected ids
  const idArray = await fetchTopStoryItems().then(data => {
    return selectRandomFromArray(data as Array<number>, MAX_ITEM_FETCH);
  });

  // null check from fetch
  if (idArray == null) return null;

  // for each id, fetch information about the user
  for (const id in idArray) {
    const story = await fetchStoryItem(idArray[id]).then(story => {
      return story as hackerStory;
    });
    // if a story was fetched, add fetch user and add user karma to the story object
    if (story) {
      await fetchUserInfo(story.by).then(user => {
        story.karma = (user as hackerAuthor).karma;
        displayArray.push(story);
      });
    }
  }

  return sortListAscending(displayArray);
};

const sortListAscending = (array: Array<hackerStory>): Array<hackerStory> => {
  return array.sort((a, b) => (a.score > b.score ? 1 : -1));
};

const selectRandomFromArray = (
  array: Array<any>,
  amount: number,
): Array<number> => {
  //if requested ids are greater than the length of fetched data, return fetched data
  if (amount > array.length) return array;

  //selects a random index from array and stores in return array
  const selectedArray: Array<any> = [];
  for (let i = 0; i < amount; i++) {
    const selectIndex = Math.floor(Math.random() * array.length);
    const selectObject = array[selectIndex];
    array.splice(selectIndex, 1);
    selectedArray.push(selectObject);
  }

  return selectedArray;
};

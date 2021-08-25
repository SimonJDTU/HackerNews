import {
  fetchStoryItem,
  fetchTopStoryItems,
  fetchUserInfo,
} from './HackerNewsApi';
import {displayObject, hackerAuthor, hackerStory} from './types';

const MAX_ITEM_FETCH = 10;

export const fetchRandomHackerNews = async () => {
  var displayArray: Array<hackerStory> = [];

  // fetch all top stories and select 10 at random
  const idArray: Array<number> | void = await fetchTopStoryItems().then(
    data => {
      return selectRandomFromArray(data as Array<number>);
    },
    _ => {
      //Inform user of error
    },
  );

  // null check from fetch
  if (idArray == null) return null;

  // for each id, fetch information about the user and add to story object
  for (const id in idArray) {
    const story = await fetchStoryItem(idArray[id]).then(
      story => {
        return story as hackerStory;
      },
      _ => {
        //Inform user of error
      },
    );

    if (story) {
      fetchUserInfo(story.by)
        .then(user => user as hackerAuthor)
        .then(
          user => {
            story.karma = user.karma;
            displayArray.push(story);
          },
          _ => {
            //Inform user of error
          },
        );
    }
  }

  return displayArray;
};

const selectRandomFromArray = (idArray: Array<number>): Array<number> => {
  var randomIDArray: Array<number> = [];
  for (let i = 0; i < MAX_ITEM_FETCH; i++) {
    const selectIndex = Math.floor(Math.random() * idArray.length);
    const selectObject = idArray[selectIndex];
    if (selectIndex > -1) {
      idArray.splice(selectIndex, 1);
    }
    randomIDArray.push(selectObject);
  }

  return randomIDArray;
};

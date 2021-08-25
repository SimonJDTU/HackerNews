export const fetchTopStoryItems = () => {
  return fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.error(error);
    });
};

export const fetchStoryItem = (id: number) => {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.error(error);
    });
};

export const fetchUserInfo = (userID: string) => {
  return fetch(`https://hacker-news.firebaseio.com/v0/user/${userID}.json`)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.error(error);
    });
};

import { atom } from 'recoil';

let x;
export const configsContext = () => {
  if (!x) {
    x = atom({
      key: 'configsContext',
      default:
        typeof window !== 'undefined' && localStorage.getItem('configsContext')
          ? JSON.parse(localStorage.getItem('configsContext'))
          : // : {},
            {
              Hand: true,
              Keyboard: true,
              Dark: false,
              Progress: true,
              Speed: true,
              Accuracy: true,
              lsnIndex: 0,
              storyIndex: 0,
              customStoryIndex: 0,
              language: 'English',
              isModalOpen: false,
            },
    });
  }
  return x;
};

let y;
export const customStoriesContext = () => {
  if (!y) {
    y = atom({
      key: 'customStoriesContext',
      default:
        typeof window !== 'undefined' &&
        localStorage.getItem('customStoriesContext')
          ? JSON.parse(localStorage.getItem('customStoriesContext'))
          : [],
    });
  }
  return y;
};

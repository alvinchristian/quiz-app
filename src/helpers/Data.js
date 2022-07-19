export const CATEGORY = [
    {
        title: "General Knowledge",
        value: 9,
    },
    { title: "Books", value: 10 },
    { title: "Films", value: 11 },
    { title: "Music", value: 12 },
    { title: "Musicals and Theaters", value: 13 },
    { title: "Television", value: 14 },
    { title: "Video Games", value: 15 },
    { title: "Board Games", value: 16 },
    { title: "Science and Nature", value: 17 },
    { title: "Computer", value: 18 },
    { title: "Mathematics", value: 19 },
    { title: "Mythology", value: 20 },
    { title: "Sports", value: 21 },
    { title: "Geography", value: 22 },
    { title: "History", value: 23 },
    { title: "Politics", value: 24 },
    { title: "Celebrities", value: 26 },
    { title: "Animals", value: 27 },
    { title: "Vehicles", value: 28 },
    { title: "Comics", value: 29 },
    { title: "Gadgets", value: 30 },
    { title: "Japanese Anime", value: 31 },
    { title: "Cartoon and Animations", value: 32 },
];

export const DIFFICULTY = [
    {
        title: "Easy",
        value: "easy",
    },
    {
        title: "Medium",
        value: "medium",
    },
    {
        title: "Hard",
        value: "hard",
    },
];

export const BASE_URL = (category, diff) =>
    `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${diff}&type=multiple`;

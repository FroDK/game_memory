import shuffleArray from "./shuffleArray";

const generateArray = (length=6) => {
    return shuffleArray([].concat(...[...Array(2)].map(() => [...Array(length).keys()].map(i => i + 1))))
}

export default generateArray;
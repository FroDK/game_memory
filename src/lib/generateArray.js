import shuffleArray from "./shuffleArray";

// GENERATE AND SHUFFLE ARRAY OF INDEXES
    // length is unique indexes e.g. (6+6=12 total pairs of cards)
const generateArray = (length=6) => {
    return shuffleArray([].concat(...[...Array(2)].map(() => [...Array(length).keys()])))
}

export default generateArray;
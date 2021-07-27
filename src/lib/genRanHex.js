const genRanHex = () => {
    return [...Array(16)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}

export default genRanHex;
const importImages = r => {
    return r.keys().map((item) => r(item).default);
}

export default importImages;
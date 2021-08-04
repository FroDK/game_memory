const convertToTime = (timer) => {
    const minutes = Math.floor(timer / 60)
    const seconds = timer - minutes * 60

    return `${minutes}:${seconds}`
}

export default convertToTime;
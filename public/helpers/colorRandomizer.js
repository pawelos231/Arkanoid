export const colorRandomizer = () => {
    let sum = "#";
    const togenerate = "123456789ABCDFE";
    for (let i = 0; i < 6; i++) {
        const random = Math.abs(Math.floor(Math.random() * togenerate.length - 1));
        console.log(random);
        sum += togenerate[random];
    }
    return sum;
};

export const format = (time: number) => {
  const t = Math.round(time);
  const sec = t % 60;
  const min = Math.floor(t / 60) % 60;
  // const hour = Math.floor(t / 3600);

  return `${min.toString().padStart(2, "0")}:${sec
    .toString()
    .padStart(2, "0")}`;
};

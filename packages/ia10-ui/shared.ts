export const getIsDesktop = (userAgent?: string): boolean => {
  if (!userAgent) {
    return false;
  }

  const nonDesktopDevices = ["iphone", "ipod", "android", "mobile", "ipad"];

  for (const device of nonDesktopDevices) {
    if (userAgent.toLowerCase().indexOf(device) > 0) {
      return false;
    }
  }

  return true;
};

export const format = (time: number): string => {
  const t = Math.round(time);
  const sec = t % 60;
  const min = Math.floor(t / 60) % 60;
  // const hour = Math.floor(t / 3600);

  return `${min.toString().padStart(2, "0")}:${sec
    .toString()
    .padStart(2, "0")}`;
};

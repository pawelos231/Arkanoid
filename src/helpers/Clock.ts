export const clock = (timeInS: number): string => {
  const seconds: number = timeInS % 60;
  const minutes: number = Math.floor((timeInS / 60) % 60);
  const hours: number = Math.floor(timeInS / 3600);

  const formattedHours: string = hours.toString().padStart(2, "0");
  const formattedMinutes: string = minutes.toString().padStart(2, "0");
  const formattedSeconds: string = seconds.toString().padStart(2, "0");

  const clockString: string = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  return clockString;
};

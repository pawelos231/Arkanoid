export const clock = (timeInS: number): string => {
  const seconds: number = timeInS % 60;
  const minutes: number = Math.floor((timeInS / 60) % 60);
  const hours: number = Math.floor(timeInS / 3600);

  const formattedHours: string =
    hours > 0 ? hours.toString().padStart(2, "0") : "";
  const formattedMinutes: string =
    hours > 0 || minutes > 0 ? minutes.toString().padStart(2, "0") : "";
  const formattedSeconds: string = seconds.toString().padStart(2, "0");

  const clockString: string = `${formattedHours}${
    formattedHours && formattedMinutes ? ":" : ""
  }${formattedMinutes}:${formattedSeconds}`;

  return clockString;
};

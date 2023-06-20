import { useEffect } from 'react';

const useDateFormatting = () => {
  const formatDateTimeRange = (opening, closing) => {
    const openingTime = new Date(opening);
    const closingTime = new Date(closing);

    if (openingTime.getDate() === closingTime.getDate()) {
      const day = openingTime.getDate();
      const month = openingTime.getMonth() + 1;
      const year = openingTime.getFullYear();
      const openingHours = String(openingTime.getHours()).padStart(2, '0');
      const openingMinutes = String(openingTime.getMinutes()).padStart(2, '0');
      const closingHours = String(closingTime.getHours()).padStart(2, '0');
      const closingMinutes = String(closingTime.getMinutes()).padStart(2, '0');

      return `${day}/${month}/${year} from (${openingHours}:${openingMinutes}) to (${closingHours}:${closingMinutes})`;
    } else {
      // Handle the case when opening and closing hours are on different dates
      const formattedOpening = formatDateTime(opening);
      const formattedClosing = formatDateTime(closing);
      return `${formattedOpening} to ${formattedClosing}`;
    }
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const day = dateTime.getDate();
    const month = dateTime.getMonth() + 1;
    const year = dateTime.getFullYear();
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return { formatDateTimeRange, formatDateTime };
};

export default useDateFormatting;

const formatMessageTime = (dateString: Date) => {
  const messageDate = new Date(dateString);

  const hours = messageDate.getHours();
  const minutes = messageDate.getMinutes();

  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const period = hours < 12 ? "am" : "pm";

  return `${displayHours}:${displayMinutes} ${period}`;
};

export const getMessageTime = (dateString: Date) => {
  const messageDate = new Date(dateString);
  const currentDateTime = new Date();

  const isSameDay =
    messageDate.toDateString() === currentDateTime.toDateString();

  if (isSameDay) {
    return "Hoje " + formatMessageTime(dateString);
  } else {
    return messageDate.toLocaleString("pt-BR", {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  }
};

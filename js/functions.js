const checkStringLength = (string = '', maxLength = 1) =>
  string.length <= maxLength;

const isPalindrom = (string = '') => {
  string = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += reversedString + string[i];
  }
  return string === reversedString;
};

const translateStringToNumbers = (string = '') => {
  const extracedNumbers = [...string]
    .filter((word) => !isNaN(parseInt(word, 10)))
    .join('');
  return extracedNumbers;
};

checkStringLength('lorem', 5);
isPalindrom('lorem');
translateStringToNumbers('lore');

const isMeetingInWorkTime = (
  workStartTime = '',
  workEndTime = '',
  meetingStartTime = '',
  meetingDuration
) => {
  const translateTimeToMinutes = (time = '') => {
    const timeSplitted = time.split(':');
    return Number(timeSplitted[0]) * 60 + Number(timeSplitted[1]);
  };
  workStartTime = translateTimeToMinutes(workStartTime);
  workEndTime = translateTimeToMinutes(workEndTime);
  meetingStartTime = translateTimeToMinutes(meetingStartTime);

  return (
    meetingStartTime + meetingDuration <= workEndTime &&
    meetingStartTime >= workStartTime
  );
};

isMeetingInWorkTime('08:00', '17:30', '14:00', 90); // true
isMeetingInWorkTime('8:0', '10:0', '8:0', 120); // true
isMeetingInWorkTime('08:00', '14:30', '14:00', 90); // false
isMeetingInWorkTime('14:00', '17:30', '08:0', 90); // false
isMeetingInWorkTime('8:00', '17:30', '08:00', 900); // false

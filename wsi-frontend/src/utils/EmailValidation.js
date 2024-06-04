export default function validateEmail(email) {
  // Regular expression to match emails ending with @???.edu???.
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

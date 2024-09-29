export const validate = (email, password, fullName, confirmPassword) => {
  console.log(email, password, fullName, confirmPassword);

  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );

  const isPasswordValid =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      password
    );

  const isFullNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(fullName);

  if (fullName !== false && !isFullNameValid) return "Fullname is not valid";

  if (!isEmailValid) return "Email is not valid";

  if (!isPasswordValid)
    return "Password must have 8+ characters, 1 uppercase, 1 special character, and 1 number";

  if (confirmPassword !== false && password !== confirmPassword)
    return "Password not matched";

  return null;
};

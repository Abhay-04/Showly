export const validate = (email, password, fullName, confirmPassword) => {

 console.log(email)
  const isEmailValid = /^[\w-\=.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  const isFullNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(fullName);

  if (!isFullNameValid) return "Fullname is not valid";
  
  if (!isEmailValid) return "Email is not valid";

  if (!isPasswordValid) return "Password is not valid ";

  if (password !== confirmPassword) return "Password not matched";

  return null;
};

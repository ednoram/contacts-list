export const contactDataIsValid = (contactData) =>
  (contactData.firstName.trim() || contactData.lastName.trim()) &&
  (contactData.phoneNumbers.length < 1 ||
    !contactData.phoneNumbers
      .map(
        (phoneNumber) =>
          !phoneNumber || Boolean(phoneNumber.match(/^[- +()0-9]+$/))
      )
      .includes(false));

export const processContactData = (contactData) => ({
  ...contactData,
  company: contactData.company.replace(/\s\s+/g, " ").trim(),
  lastName: contactData.lastName.replace(/\s\s+/g, " ").trim(),
  firstName: contactData.firstName.replace(/\s\s+/g, " ").trim(),
  phoneNumbers: contactData.phoneNumbers
    .filter((phoneNumber) => phoneNumber != "")
    .map((phoneNumber) => phoneNumber.trim()),
  emails: contactData.emails
    .filter((email) => email != "")
    .map((email) => email.trim()),
});

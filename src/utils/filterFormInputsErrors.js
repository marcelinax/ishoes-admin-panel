export const filterFormInputsErrors = (errors, error) => {
    return errors.filter(err => err === error)[0];
};
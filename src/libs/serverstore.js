const confirmations = {};

export function setConfirmation(phone, confirmation) {
    confirmations[phone] = confirmation;
}

export function getConfirmation(phone) {
    return confirmations[phone];
}

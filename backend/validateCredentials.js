const validateUsername = (username) => {
    if (!username) {
        return { error: 'Username is required', statusCode: 400 };
    }
    if (username.length < 6) {
        return { error: 'Username must be at least 6 characters long', statusCode: 400 };
    }
    return null; // No error, validation passed
}

const validatePassword = (password) => {
    if (!password) {
        return { error: 'Password is required', statusCode: 400 };
    }
    if (password.length < 8) {
        return { error: 'Password must be at least 8 characters long', statusCode: 400 };
    }
    return null; // No error, validation passed
}
const validateLogin = (username, password) => {
    if (!username && !password) {
        return { error: 'Enter credentials', statusCode: 400 };
    }
    if (!username) {
        return { error: 'Username is required', statusCode: 400 };
    }
    if (!password) {
        return { error: 'Password is required', statusCode: 400 };
    }

    return null;

}

module.exports = {
    validateUsername,
    validatePassword,
    validateLogin
};

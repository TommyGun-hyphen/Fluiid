exports.allAccess = (req, res) => {
    res.send("Public content.");
};

exports.userAccess = (req, res) => {
    res.send("User content.");
};

exports.adminAccess = (req, res) => {
    res.send("Admin content.");
};

exports.moderatorAccess = (req, res) => {
    res.send("Moderator content.");
};
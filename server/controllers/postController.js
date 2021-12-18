exports.home = async (req, res) => {
    console.log("hit home")
    res.status(200).json({
        success: true,
        greeting: "Hello from API",
    });
};
const { execSync } = require("child_process");

module.exports = (execStr) => {
    try {
        execSync(execStr, { stdio: 'inherit' });
        return { ok: true, message: "executed" };
    } catch (error) {
        return { ok: false, message: error };
    }
}

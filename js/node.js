
const express = require('express');
const { exec } = require('child_process');
const app = express();

app.get('/run-bash', (req, res) => {
    exec('ls -la', (error, stdout, stderr) => {
        if (error) {
            return res.send(`Error: ${error.message}`);
        }
        if (stderr) {
            return res.send(`Stderr: ${stderr}`);
        }
        res.send(`<pre>${stdout}</pre>`);
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
const puppeteer = require('puppeteer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const PDFGenerator = async (req, res) => {
    const { BonDepot } = req.params;
    const pdfTemplate = require(`../documents/${BonDepot}`);
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Set the page size to A4
        await page.setViewport({ width: 595, height: 842 }); // A4 dimensions in pixels

        const content = pdfTemplate(req.body);

        // Set the HTML content of the page
        await page.setContent(content);

        // Generate the PDF
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
        });

        const uniqueFilename = `${uuidv4()}.pdf`;
        const filePath = path.join(__dirname, '..', 'files', uniqueFilename);

        // Write the PDF to a file
        require('fs').writeFileSync(filePath, pdfBuffer);

        await browser.close();

        res.status(200).send(uniqueFilename);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error generating PDF");
    }
};

const PDFSender = async (req, res) => {
    try {
        const filename = req.query.filename;
        if (!filename) {
            return res.status(400).send("Filename parameter missing");
        }

        const filePath = path.join(__dirname, '..', 'files', filename);
        res.sendFile(filePath);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error sending PDF");
    }
};

module.exports = {
    PDFGenerator,
    PDFSender
};

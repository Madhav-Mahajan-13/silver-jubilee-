import db from "../dbConnection.js";
import dotenv  from "dotenv";



dotenv.config();

export const submit = async (req, res) => {
    console.log(req.body);
    const { name, batch, email, contact, linkedinurl, img } = req.body;

    // Validate input fields
    if (!name || !email || !batch || !contact || !linkedinurl || !img) {
        return res.status(400).json({ message: "All fields are necessary" });
    }

    try {
        // Use parameterized query to prevent SQL injection
        const result = await db.query(
            `INSERT INTO users (name, batch, contact_number, email, linkedinurl, img) 
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [name, batch, contact, email, linkedinurl, img]
        );

        // Respond with success message
        return res.status(201).json({ message: "User added successfully", user: result.rows[0] });
    } catch (error) {
        console.error("Error inserting data:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

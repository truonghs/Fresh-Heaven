Test Cart number: 4111 1111 1111 1111
mongo:
tk: 21521864@gm.uit.edu.vn
mk: GiaBao@1002@

const sendVerificationEmail = async (email, verificationToken) => {
// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
// Configure the email service or SMTP details here
service: "gmail",
auth: {
user: "sendfromtruonghs@gmail.com",
pass: "cmgmhgmfkqxglddr",
},
});

    // Compose the email message
    const mailOptions = {
        from: "amazon.com",
        to: email,
        subject: "Email Verification",
        text: `Please click the following link to verify your email: http://${Ip}:3000/verify/${verificationToken}`,
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log("Verification email sent successfully");
    } catch (error) {
        console.error("Error sending verification email:", error);
    }

};
// Register a new user
// ... existing imports and setup ...

app.post("/register", async (req, res) => {
try {
const { name, email, password } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Email already registered:", email); // Debugging statement
            return res.status(400).json({ message: "Email already registered" });
        }

        // Create a new user
        const newUser = new User({ name, email, password });

        // Generate and store the verification token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");

        // Save the user to the database
        await newUser.save();
        // Send verification email to the user
        // Use your preferred email service or library to send the email
        sendVerificationEmail(newUser.email, newUser.verificationToken);

        // Debugging statement to verify data
        console.log("New User Registered:", newUser);

        res.status(201).json({
            message: "Registration successful. Please check your email for verification.",
        });
    } catch (error) {
        console.log("Error during registration:", error); // Debugging statement
        res.status(500).json({ message: "Registration failed" });
    }

});

//endpoint to verify the email
app.get("/verify/:token", async (req, res) => {
try {
const token = req.params.token;

        //Find the user witht the given verification token
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({ message: "Invalid verification token" });
        }

        //Mark the user as verified
        user.verified = true;
        user.verificationToken = undefined;

        await user.save();

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Email Verificatioion Failed" });
    }

});

const generateSecretKey = () => {
const secretKey = crypto.randomBytes(32).toString("hex");

    return secretKey;

};

const secretKey = generateSecretKey();

//endpoint to login the user!
app.post("/login", async (req, res) => {
try {
const { email, password } = req.body;

        //check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        //check if the password is correct
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        //generate a token
        if (user.verified) {
            var token = jwt.sign({ userId: user._id }, secretKey);
        } else {
            var token = false;
        }

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Login Failed!" });
    }

});

//endpoint to store a new address to the backend
app.post("/addresses", async (req, res) => {
try {
const { userId, address } = req.body;

        //find the user by the Userid
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(address);
        //add the new address to the user's addresses array
        user.addresses.push(address);

        //save the updated user in te backend
        await user.save();

        res.status(200).json({ message: "Address created Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error addding address" });
    }

});

//endpoint to get all the addresses of a particular user
app.get("/addresses/:userId", async (req, res) => {
try {
const userId = req.params.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const addresses = user.addresses;
        res.status(200).json({ addresses });
    } catch (error) {
        res.status(500).json({ message: "Error retrieveing the addresses" });
    }

});
//////a

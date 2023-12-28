const User = require("../models/User");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const Ip = "10.0.183.47";
const jwt = require("jsonwebtoken");
const { log } = require("console");
const { use } = require("../routes/user");
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
const sendOTPEmail = async (email, otp) => {
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
        html: `<p>Please enter the following <strong style="font-weight: bold; color: red;">otp</strong> to reset your password: <strong>${otp}</strong></p>`,
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log("OTP email sent successfully");
    } catch (error) {
        console.error("Error sending OTP email:", error);
    }
};
module.exports = {
    // Register a new user
    // ... existing imports and setup ...
    regitation: async (req, res) => {
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

            console.log(1);
            // Save the user to the database
            await newUser.save();
            // Send verification email to the user
            // Use your preferred email service or library to send the email
            sendVerificationEmail(newUser.email, newUser.verificationToken);

            // Debugging statement to verify data
            console.log("New User Registered:", newUser);
            console.log();
            res.status(201).json({
                message: "Registration successful. Please check your email for verification.",
            });
        } catch (error) {
            console.log("Error during registration:", error); // Debugging statement
            res.status(500).json({ message: "Registration failed" });
        }
    },
    //endpoint to verify the email
    verifyToken: async (req, res) => {
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
    },

    //endpoint to login the user!
    login: async (req, res) => {
        console.log(req.body);

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
                const generateSecretKey = () => {
                    const secretKey = crypto.randomBytes(32).toString("hex");

                    return secretKey;
                };
                var secretKey = generateSecretKey();
                var token = jwt.sign({ userId: user._id, firstTime: user.firstTime }, secretKey);
            } else {
                var token = false;
            }
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: "Login Failed!" });
        }
    },
    updateUserInfo: async (req, res) => {
        try {
            const { userId } = req.params;
            const { isEdit } = req.body;
            const existingUser = await User.findById(userId);
            if (!existingUser) {
                return res.status(404).send({
                    status: false,
                    message: "User not found",
                });
            }
            if (isEdit) {
                Object.assign(existingUser, req.body);
            } else {
                const { firstName, lastName, phoneNumber, paymentMethod, avatar, address } = req.body;

                Object.assign(existingUser, {
                    firstName,
                    lastName,
                    phoneNumber,
                    paymentMethod,
                    avatar,
                    firstTime: false,
                });
                existingUser.addresses.push(address);
            }
            const updatedUser = await existingUser.save();

            return res.status(201).send({
                status: true,
                message: "User Account Updated Successfully!",
                data: updatedUser,
            });
        } catch (err) {
            return res.status(500).send({
                status: false,
                error: err.message,
            });
        }
    },
    //endpoint to store a new address to the backend
    setAddress: async (req, res) => {
        try {
            const { userId } = req.params;

            //find the user by the Userid
            const user = await User.findById(userId);
            if (!user) {
                return res.status(402).json({ message: "User not found" });
            }
            if (Array.isArray(req.body)) {
                user.addresses = [...req.body];
            } else {
                user.addresses.push(req.body);
            }
            //add the new address to the user's addresses array

            //save the updated user in te backend
            await user.save();

            res.status(200).json({ message: "Address created Successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error addding address" });
        }
    },

    //get the user profile
    getUserProfile: async (req, res) => {
        try {
            const userId = req.params.userId;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ message: "Error retrieving the user profile" });
        }
    },
    //endpoint to get all the addresses of a particular user
    getAddress: async (req, res) => {
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
    },
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: "This email doesn't exist" });
            }
            const otp = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
            const expireAt = new Date(Date.now() + 5 * 60 * 1000);
            const otpObj = {
                otp,
                expireAt,
            };
            console.log("otp: ", otp);
            user.otp = otpObj;
            console.log(user);
            await user.save();
            sendOTPEmail(email, otp);
            res.status(200).json({ message: "An email has been sent!" });
        } catch (error) {
            res.status(500).json({
                message: "An error occurs while sending the email. Please try again later!",
            });
        }
    },
    giveOTP: async (req, res) => {
        try {
            const { email, otp } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: "This email doesn't exist" });
            }
            if (user.otp.otp != otp) {
                return res.status(405).json({ message: "OTP incorrect!" });
            } else if (user.otp.expireAt < new Date()) {
                user.otp = undefined;
                await user.save();
                return res.status(406).json({ message: "OTP is expired!" });
            }

            passwordToken = crypto.randomBytes(20).toString("hex");
            expireAt = new Date(Date.now() + 5 * 60 * 1000);
            passwordTokenObj = {
                passwordToken,
                expireAt,
            };
            user.passwordToken = passwordTokenObj;
            await user.save();
            // user.otp=undefined,
            res.status(200).json({ token: user.passwordToken.passwordToken });
        } catch (error) {
            res.status(500).json({
                message: "An error occurs while verifying OTP. Please try again later!",
            });
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { email, newPassword, token } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                res.status(404).json({ message: "This email does not exist" });
            }
            if (user.passwordToken.passwordToken == token || user.passwordToken.expireAt >= new Date()) {
                console.log(token);
                user.password = newPassword;
                user.passwordToken = undefined;
                user.otp = undefined;
                await user.save();
                return res.status(200).json({ message: "Password change successfully!" });
            } else {
                user.otp = undefined;
                user.passwordToken = undefined;
                user.save();
                res.status(405).json({ message: "Reset password token incorrect or expired!" });
            }
        } catch (error) {
            res.status(500).json({
                message: "An error occurs while changing password. Please try again later!",
            });
        }
    },
};
